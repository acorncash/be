// /**
//  * @file header.js
//  * @since 2022-08-30
//  */
//
//
// /**
// * @function headerInit
// * @param
// * @returns
// * @see header ready 함수
//  */
//  $(document).ready(e=>{
// 	$('.menu').hide();
// 	comAjax(apiUrl+'/api/member/getLoginInfo',{type:'get'}).then(info=>{
// 		let mngInfo = info.rsData.data;
// 		if(mngInfo.mngAuth == 'AG_01'){
// 			$('.header .username').text(`${mngInfo.mngNm} 님`);
// 		}else{
// 			$('.header .username').text(`${mngInfo.mngNm} ${mngInfo.mngRank} 님`);
// 		}
// 	})
// 	let activeItem = $('#menu-bar').find("."+activeMenu);
// 	if(activeMenu === "managerDtl" && !$("#managerList").is(":visible")) activeItem.addClass("active");
// 	else if(activeMenu !== "managerDtl") activeItem.addClass("active");
//
//
// 	comAjax(apiUrl+'/api/member/getMngMenu',{type:'get'}).then(result =>{
// 		let menuList = [...result.rsData.data];
// 		for(let menu of menuList){
// 			$(`#${menu.menuId}`).show();
// 			$(`#${menu.menuId}`).parentsUntil('','.upperMenu').show();
// 		}
// 		$('.upperMenu').each(function(index,item){
//     		let menuView  = $(item).find('.menu').get().some(m=>m.style.display!='none');
//     		if(!menuView)  item.remove();
//
// 		})
//
// 	});
// 	$.getScript(contextPath+'/static/js/layout/app.min.js');
// 	$.getScript(contextPath+'/static/js/layout/common.js');
// });
//
//
//
// const targetMove= function(target){
// 	if(target == 'intra'){
// 		window.open("//int.godoctor.co.kr/", "intraSite");
// 	}
// 	if(target == 'client'){
// 		window.open("//godoctor.co.kr/", "portalSite");
// 	}
// 	if(target == 'gw'){
// 		window.open("//gw.teddywindy2.cafe24.com/", "gwSite");
// 	}
// }
//
//
//
//
//
//
