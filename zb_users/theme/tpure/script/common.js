/* 
 *Description:   Theme Javascript
 *Author:    toyean
 *Website:   http://www.toyean.com/
 *Mail:      toyean@qq.com
 *Weibo: http://weibo.com/toyean
 *Version:   1.3(2020-03-10)
 */

$(function(){var s=document.location;$(".menu a").each(function(){if(this.href==s.toString().split("#")[0]){$(this).parents("li").addClass("on").parent(".subnav").prev().addClass("on");return false}});$(".subnav a").each(function(){if(this.href==s.toString().split("#")[0]){$(this).addClass("on");return false}});var useragent=navigator.userAgent;var ismobile=useragent.match("Mobile");$('.subcate>a').click(function(){if(ismobile==null){window.location.href=$(this).attr('href')}else{$(this).parent().toggleClass("slidedown").siblings().removeClass("slidedown");return false}});$(".menu li>a").hover(function(){$(this).addClass("on")},function(){$(this).removeClass("on")});$(".menuico").on('click',function(){$(this).toggleClass("on");$(".menu,.fademask").toggleClass("on")});$(".fademask").click(function(){$(".menu,.menuico,.fademask").removeClass("on")});$(window).resize(function(){var window_width=$(window).width();if(window_width>1080){$(".menu,.fademask").removeClass("on")}else{$(".menuico").removeClass("on")}});$(".schico.statepop").click(function(){$(this).nextAll(".schbox").addClass("on");$(".schinput").focus()});$(".schclose,.schbg").click(function(){$(this).parents(".schbox").removeClass("on")});$(".schico.statefixed a").click(function(e){e.stopPropagation();if($(".menuico,.menu").hasClass("on")){$(".menuico,.menu").removeClass("on");$(".fademask").remove()}var u=navigator.userAgent;var isiOS=!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);if(isiOS){$("html, body").animate({scrollTop:0},0)}$(this).nextAll(".schfixed").toggleClass("on");$(".schinput").focus()});$(document).click(function(e){var _con=$('.schfixed');if(!_con.is(e.target)&&_con.has(e.target).length===0){$('.schfixed').removeClass("on")}});$(document).keyup(function(event){switch(event.keyCode){case 27:$(".menu,.menuico,.schico,.schfixed").removeClass("on");return false}});$("#txaArticle").focus(function(){var cmtnum=$(".cmtform .text").length;if(cmtnum>0){$(".cmtform").slideDown()}});zbp.plugin.on("comment.post.success","tpure",function(){$(".cmts").removeAttr("data-content");$(".cmts").removeClass("nocmt")});if(tpure.backtotop){(function(){var $backToTopTxt="返回顶部",$backToTopEle=$('<a class="backtotop"><i></i></a>').appendTo($("body")).attr("title",$backToTopTxt).click(function(){$("html, body").animate({scrollTop:0},0)}),$backToTopFun=function(){var st=$(document).scrollTop(),winh=$(window).height();(st>500)?$backToTopEle.show():$backToTopEle.hide();if(!window.XMLHttpRequest){$backToTopEle.css("top",st+winh-166)}};$(window).bind("scroll",$backToTopFun);$backToTopFun()})()}if(tpure.fixmenu){$(window).scroll(function(){var $t=$(window).scrollTop();var $headh=$(".header").data("headh");if($t<=$headh){$(".header").removeClass("headbg")}if($t>=$headh){$(".header").addClass("headbg")}})}if(tpure.bannerdisplay){var $window=$(window);var $slide=$('.banner');var $menu=$('.menu');var windowHeight=$window.height();$('.banner').bind('display',function(event,visible){if(visible==true){$(this).addClass("display")}else{$(this).removeClass("display")}});function newPos(x,selectortop,pos,inertia){return x+"% "+(selectortop.position().top-pos)/2+"px"}function Move(){var pos=$window.scrollTop();if($slide.hasClass("display")){if(navigator.userAgent.match(/mobile/i)){$slide.css({'backgroundPosition':50%0})}else{$slide.css({'backgroundPosition':newPos(50,$menu,pos,2)})}}}Move();$window.resize(function(){Move()});$window.bind('scroll',function(){Move()})}if(tpure.singlekey){var singleprev=$(".single-prev").attr("href");var singlenext=$(".single-next").attr("href");$("body").keydown(function(event){if(event.keyCode==37&&singleprev!=undefined)location=singleprev;if(event.keyCode==39&&singlenext!=undefined)location=singlenext})}if(tpure.pagekey){var pageprev=$(".pagebar .now-page").prev().attr("href");var pagenext=$(".pagebar .next-page a").attr("href");$("body").keydown(function(event){if(event.keyCode==37&&pageprev!=undefined)location=pageprev;if(event.keyCode==39&&pagenext!=undefined)location=pagenext})}if(tpure.selectstart){copyright()}if(tpure.removep){$(".postcon p").each(function(){var $null=$(this).html();if($null==='&nbsp;'||$null==='<br>'||$null===' '){$(this).remove()}})}if(tpure.viewall){var $viewallheight=tpure.viewallheight;var $viewallstyle=tpure.viewallstyle;var a=$(".postcon").outerHeight();var arr=document.location.pathname.split("/");var arrLen=arr.length;var styleEle='<style type="text/css">'+'.postcon{ height:'+$viewallheight+'px;}'+'</style>';$("body").prepend(styleEle);var b=$(".postcon").outerHeight();var sheight=100-Math.ceil(b/a*100);if(sheight>0&&arr[arrLen-1].indexOf("_")<0){if($viewallstyle=='1'){$(".postcon").append('<div class="teles"><i>阅读剩余的'+sheight+"%"+'</i></div>')}else{$(".postcon").append('<div class="telesmore"><i>阅读更多</i></div>')}$(".teles,.telesmore").on("click",function(){$(".postcon").animate({height:a},function(){$(".postcon").height('auto')});$(this).remove();return false})}else{$(".postcon").css("height",'auto')}}});