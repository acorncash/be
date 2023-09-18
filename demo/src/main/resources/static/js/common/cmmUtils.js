// let apiUrl = contextPath+"/";
// let modalPopupId = '';
// /**@function : modalPopup
//  * @param    : url
//  * @return   : X
//  * @etc      : 모달 팝업 OPEN
//  * */
// const modalPopup =function(url,callFun,param){
// 	let isTrue = false;
// 	return  $.ajax({
// 		url:contextPath+url,
// 		method: "get",
// 		type:'HTML',
// 		async:'true'
// 	}).then(function(data){
// 		$(document.body).append($(data));
// 		let modalId = $(data).filter('.modal').attr('id');
// 		$('#'+modalId).modal('toggle');
// 		modalPopupId = modalId;
//
// 		if(modalPopupId == 'alert-popup'){
// 			keyCodeEvent(27,true,"closeModal",()=>alertClose(param.callback));
// 		}else{
// 			keyCodeEvent(27,true,"closeModal",modalClose);
// 		}
// 		if(typeof callFun  == 'function'){
// 			callFun(modalId,param);
// 		}
// 		isTrue = true;
// 		return isTrue;
// 	},function(data,errorcode){
// 		return isTrue;
// 	})
// }
//
// /**@function : modalClose
//  * @param    : fn  = calback function ,data = 받을 데이터(type:json) id_ = modalpopupid (defalut = 현재 열려있는 팝업)
//  * @return   : X
//  * @etc      : 모달 팝업 close
//  * */
// function modalClose(fn,data,id_){
// 	let id = id_;
// 	if(id == null || id == '' ||  id == undefined ){
// 		id = $('.modal').attr('id');
// 	}
//
// 	if(event != null)event.stopImmediatePropagation();
//
// 	keyCodeEvent(27,false,"closeModal",modalClose);
//
//
// 	if(id_ =="alert-popup"){
// 		$('#'+id).next().remove();
// 		$('#'+id).remove();
// 		if(typeof fn  == 'function'){
// 			fn(data);
// 		}
// 		let modalItem = $('.modal').get();
// 		if(modalItem.length==0)$('body').removeClass('modal-open');
// 	}
//
//
// 	$('#'+id).on('hidden.bs.modal', function (e) {
// 		$('.modal-backdrop').remove();
// 		$('#'+id).remove();
// 		modalPopupId = "";
// 		if(typeof fn  == 'function'){
// 			fn(e,data);
// 		}
// 	});
// 	$('#'+id).modal('toggle');
// }
//
// /**@function : keyCodeEvent
//  * @param    :  key = keycode , active = ture&false, eventFn = eventfunction
//  * @return   : X
//  * @etc      : 키Down 누를시 이벤트 생성 및 삭제
//  * */
// function keyCodeEvent(key,active,target,eventFn){
// 	let eventCode = 'keydown'.concat('.'+target);
// 	if(active == true){
// 		$(document).on(eventCode,function(e) {
// 			if(e.keyCode == key){
// 				eventFn();
// 			}
// 		})
// 	}else{
// 		$(document).off(eventCode)
// 	}
//
// }
//
// /**@function : comAjax
//  * @param    : data = {url,data,method},callbackFn
//  * @return   : X
//  * @etc      : ajaxData 통신
//  **/
// async function comAjax(url,option_){
// 	let option ={
// 			type 	    : 'post',
// 			contentType : 'application/json',
// 			beforeSend  : (a,b)=>{},
// 			crossDomain : true,
// 			sucess      : (rsData,code,xhr)=>{
// 				if(rsData.response_code === "901") {
// 					modalClose();
// 					errorAlert();
// 				}
// 				return {rsData,code,xhr}},
// 			error       : (rsData,code,xhr)=>{
// 				return errorAlert();
// 			},
// 			data        : {}
// 		};
// 	if(url.indexOf(apiUrl+'/') > -1) url = url.replace(apiUrl+'/',apiUrl);
// 	option        = $.extend(option, option_);
// 	if(option.contentType =='application/json'){
// 		if(option.type.toUpperCase()=="POST"){
// 			option.data   = JSON.stringify(option.data);
// 		}else if(option.type.toUpperCase()=="GET"){
// 			url += '?'
// 			for(let key of Object.keys(option.data)){
// 				url += key+'='+encodeURIComponent(option.data[key])+'&';
// 			}
// 			option.data = null;
// 		}
//
// 	}
//
// 	return $.ajax(url,option).then(option.sucess);
// }
//
//
//
//
// /*********************************************************************
//  * 화면 이동 COMPONENT
//  ********************************************************************/
// /**@function : pageMove
//  * @param    : url,data(type:json)
//  * @return   : X
//  * @etc      : page이동 함수
//  * */
// function pageMove(url,data={}){
// 	let moveFormData = new FormData();
// 	let moveForm = document.createElement('form');
// 	let moveData = document.createElement('input');
// 	let preUrl = '';
//
// 	moveForm.action = contextPath+url;
// 	moveForm.method = 'get';
// 	moveForm.name = 'moveForm';
// 	moveData.name = 'moveData'
// 	moveData.type = 'text';
// 	moveData.value	= JSON.stringify(data);
//
// 	moveForm.append(moveData);
// 	document.body.append(moveForm);
// 	moveForm.submit();
// }
//
// /**@function : curDate
//  * @return   : {string} date 날짜
//  * @etc      : 현재 날짜 가져오기
//  * */
// const curDate = function(){
// 	const date = new Date();
// 	const year = date.getFullYear();
// 	const month = date.getMonth() + 1;
// 	const day = date.getDate();
//
// 	return year.toString()+month.toString().padStart(2,0)+day.toString().padStart(2,0);
// }
//
// /**@function : getDday
//  * @param    : {string} endDate 마감일자 가져오기
//  * @return   : {string} Dday
//  * @etc      : DDAY 가져오기
//  * */
// const getDday = function(endDate){
// 	let date =curDate();
// 	const date1 = new Date(date.substr(0,4),date.substr(4,2),date.substr(6,2));
// 	const date2 = new Date(endDate.substr(0,4),endDate.substr(4,2),endDate.substr(6,2));
// 	if(date1 > date2){
// 		return 'D-end'
// 	}else if(date1 < date2){
// 		const diffDate = date1.getTime() - date2.getTime();
// 		let diffDayStr = Math.abs(diffDate / (1000 * 60 * 60 * 24)).toString();
// 		return 'D-'+diffDayStr.padStart(2,0);
// 	}else{
// 		return 'D-day';
// 	}
// }
//
// /**@function : validTelNo
//  * @return   :
//  * @etc      : 전화번호 가공
//  * */
// const validTelNo = function(telNo){
// 	telNo = telNo.replaceAll('-','');
//
// 	if(telNo.length === 8){
// 		return telNo.substr(0,4) + "-" + telNo.substr(4,4);
// 	}
//
// 	const value = telNo.split("");
//
// 	const textArr = [
// 		// 첫번째 구간 (00 or 000)
// 	    [0, value.length > 9 ? 3 : 2],
// 	    // 두번째 구간 (000 or 0000)
// 	    [0, value.length > 10 ? 4 : 3],
// 	    // 남은 마지막 모든 숫자
// 	    [0, 4]
// 	];
//
// 	//총 3번의 반복 ({2,3}) - ({3,4}) - ({4})
// 	telNo = textArr
// 		.map(function(v)  {
// 			return value.splice(v[0], v[1]).join("")
// 		})
// 		.filter(function(text) {
// 			return text
// 		})
// 		.join("-");
//
// 	return telNo;
// }
//
// /**@function : yyyMMddView
//  * @param    : upCd
//  * @param    : cdDepth
//  * @return   : X
//  * @etc      : 날짜 형식으로
//  **/
// const yyyMMddView = function(str){
// 	if(str == undefined) return  '';
// 	if(str == '') return  '';
// 	if(str == null) return  '';
//
// 	let rStr = str.replace(/[^0-9]/g, '');;
//
// 	if(rStr.length<5){
// 		rStr = rStr.substr(0,4)
// 	}else if(rStr.length < 7){
// 		rStr = rStr.substr(0,4)
// 		+'-'
// 		+rStr.substr(4,2)
// 	}else if(rStr.length < 9){
// 		rStr = rStr.substr(0,4)
// 		+'-'
// 		+rStr.substr(4,2)
// 		+'-'
// 		+rStr.substr(6,2)
// 	}
// 	return rStr;
// }
//
// /**@function : getComCode
//  * @param    : upCd
//  * @param    : cdDepth
//  * @return   : X
//  * @etc      : 공통코드 가져오는 기능
//  **/
//
// const getComCode  =async function(upCd,cdDepth='',elemetId){
// 	let comCodeList =await comAjax(apiUrl + "/api/code/getCodeList",{type:'get',data:{upCd,cdDepth}});
// 	let cdList = comCodeList.rsData.data;
// 	for (let cdItem of cdList){
// 		$('#'+elemetId).append(`<option value = '${cdItem.cd}'>${cdItem.cdNm}</option>`);
// 	}
// 	return cdList;
// }
//
// /**@function : getMajorCode
//  * @param    : upCd
//  * @param    : cdDepth
//  * @return   : X
//  * @etc      : 진료과 조회
//  **/
// const getMajorCode =async function(elemetId =''){
// 	//진료과 조회
// 	let medicalSubj = await comAjax(apiUrl + "/api/code/getMajorCode",{type:'get'});
// 	let cdList = medicalSubj.rsData.data;
// 	if(elemetId !=''){
// 		for (cdItem of cdList){
// 			$('#'+elemetId).append(`<option value = '${cdItem.cd}'>${cdItem.cdNm}</option>`);
// 		}
// 	}
// 	return cdList;
// }
//
// const inputCheckNumber = function(e){
// 	let value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace('.','');
// 	e.value = value;
// }
//
// const validEmailAddr = function(email){
//     var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//     if(emailReg.test(email)){
// 		return email;
// 	}else{
// 		return '';
// 	}
// }
//
// const nvl = function(str, str2){
// 	if(str){
// 		return str;
// 	}else{
// 		if(str2){
// 			return str2;
// 		}
// 	}
// 	return '';
// }
//
//
// function unescapeHtml(str) {
//
// 	if (str == null) {
//
// 	return "";
//
// 	}
//
// 	return str
//
// 	.replace(/&amp;/g, '&')
//
// 	.replace(/&lt;/g, '<')
//
// 	.replace(/&gt;/g, '>')
//
// 	.replace(/&quot;/g, '"')
//
// 	.replace(/&#039;/g, "'")
//
// 	.replace(/&#39;/g, "'");
//
// 	}