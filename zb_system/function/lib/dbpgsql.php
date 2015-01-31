<?php
/**
 * PgSQL数据库操作类
 *
 * @package Z-BlogPHP
 * @subpackage ClassLib/DataBase 类库
 */
class DbPgSQL implements iDataBase {

	/**
	* @var string|null 数据库名前缀
	*/
	public $dbpre = null;
	private $db = null; #数据库连接
	/**
	* @var string|null 数据库名
	*/
	public $dbname = null;
	/**
	 * @var DbSql|null DbSql实例
	 */
	public $sql=null;
	/**
	 * 构造函数，实例化$sql参数
	 */
	function __construct()
	{
		$this->sql=new DbSql($this);
	}

	/**
     * 对字符串进行转义，在指定的字符前添加反斜杠，即执行addslashes函数
     * @use addslashes
	 * @param string $s
	 * @return string
	 */
	public function EscapeString($s){
		return pg_escape_string($s);
	}

	/**
     * 连接数据库
	 * @param array $array 数据库连接配置
	 *              $array=array(
	 *                  'pgsql_server',
	 *                  'pgsql_username',
	 *                  'pgsql_password',
	 *                  'pgsql_name',
	 *                  'pgsql_pre',
	 *                  'pgsql_port',
	 *                  'persistent')
	 *                  )
	 * @return bool
	 */
	function Open($array){

		$s="host={$array[0]} port={$array[5]} dbname={$array[3]} user={$array[1]} password={$array[2]} options='--client_encoding=UTF8'";
		if(false == $array[5]){
			$db_link = pg_connect($s);
		}else{
			$db_link = pg_pconnect($s);
		}

		if(!$db_link){
			return false;
		} else {
			$this->dbpre = $array[4];
			$this->db = $db_link;
			return true;
		}
	}

	/**
	 * 关闭数据库连接
	 */
	function Close(){
		if(is_resource($this->db))
			pg_close($this->db);
	}

	/**
	* 执行多行SQL语句
	* @param string $s 以;号分隔的多条SQL语句
	*/
	function QueryMulit($s){
		//$a=explode(';',str_replace('%pre%', $this->dbpre,$s));
		$a=explode(';',$s);
		foreach ($a as $s) {
			$s=trim($s);
			if($s<>''){
				pg_query($this->db , $this->sql->Filter($s));
			}
		}
	}

	/**
	 * 执行SQL查询语句
	 * @param string $query
	 * @return array 返回数据数组
	 */
	function Query($query){
		//$query=str_replace('%pre%', $this->dbpre, $query);
		logs($this->sql->Filter($query));
		$results = pg_query($this->db , $this->sql->Filter($query));
		//if(mysql_errno())trigger_error(mysql_error($this->db),E_USER_NOTICE);
		$data = array();
		if(is_resource($results)){
			while($row = pg_fetch_assoc($results)){
				$data[] = $row;
			}
		}else{
			$data[] = $results;
		}

		return $data;
	}

	/**
	 * 更新数据
	 * @param string $query SQL语句
	 * @return resource
	 */
	function Update($query){
		//$query=str_replace('%pre%', $this->dbpre, $query);
		return pg_query($this->db , $this->sql->Filter($query));
	}

	/**
	* 删除数据
	* @param string $query SQL语句
	* @return resource
	*/
	function Delete($query){
		//$query=str_replace('%pre%', $this->dbpre, $query);
		return pg_query($this->db , $this->sql->Filter($query));
	}

	/**
	* 插入数据
	* @param string $query SQL语句
	* @return int 返回ID序列号
	*/
	function Insert($query){
		//$query=str_replace('%pre%', $this->dbpre, $query);
		pg_query($this->db , $this->sql->Filter($query));
		$seq = explode(' ',$query,4);
		$seq = $seq[2] . '_seq';
		$r = pg_query('SELECT CURRVAL(\'' . $seq . '\')');
		$id = pg_fetch_result($r, 0, 0);
		return (int)$id;
	}

	/**
	* 新建表
	* @param string $tablename 表名
	* @param array $datainfo 表结构
	*/
	function CreateTable($table,$datainfo){
		$this->QueryMulit($this->sql->CreateTable($table,$datainfo));
	}

	/**
	* 删除表
	* @param string $table 表名
	*/
	function DelTable($table){
		$this->QueryMulit($this->sql->DelTable($table));
	}

	/**
	* 判断数据表是否存在
	* @param string $table 表名
	* @return bool
	*/
	function ExistTable($table){
		$a=$this->Query($this->sql->ExistTable($table,$this->dbname));
		if(!is_array($a))return false;
		$b=current($a);
		if(!is_array($b))return false;
		$c=(int)current($b);
		if($c>0){
			return true;
		}else{
			return false;
		}
	}
}