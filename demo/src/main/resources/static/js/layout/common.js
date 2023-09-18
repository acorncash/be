// 좌측메뉴 : 2dep에서 active를 찾으면 자동으로 쳘쳐짐
$(function() {
	var secfind = $(".metismenu > li > ul").find(".active");	
	secfind.parent().parent().addClass("mm-active");
	secfind.parent().addClass("mm-collapse").addClass("mm-show");

	var delact = $("[aria-expanded='false']");
	delact.removeClass("active");
});

// Chatbox
$(document).ready(function(){
	// 닫기, 열기
	$(".chat-close").click(function(c){
		return c.preventDefault(),$(".chatbox").css({opacity:"0"}).hide(),!1}),
	$(".open-chat").click(function(c){
		return c.preventDefault(),$(".chatbox").css({opacity:"0",display:"block"
	}).show().animate({opacity:1}),!1})

	// 스크롤 : P.I 서비스상담 채팅창
	$(".conversation-list").slimScroll({
    	width: "100%",
        height: "100%",
        railVisible: true,
    	wheelStep: 10,
    	allowPageScroll: false,
    	disableFadeOut: false
    });

    // 스크롤 : 통계데이터 추출
    $(".statistics-list .wrap").slimScroll({
    	width: "100%",
        height: "100%",
        railVisible: true,
    	wheelStep: 10,
    	allowPageScroll: false,
    	disableFadeOut: false
    });
});
