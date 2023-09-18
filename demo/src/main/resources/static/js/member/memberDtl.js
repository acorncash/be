// /**
//  *
//  */
// $(()=>{
// 	sessionStorage.setItem("prev", "memberDtl");
// });
//
// function doctorInit(){
// 	let searchData = {
// 		mbrCd: "MC_01"
// 		, mbrNo: pageMoveData.mbrNo
// 	};
//
// 	/*etc : 데이터 가져오는 restApi*/
// 	comAjax(apiUrl + "/api/memberDtl/getMemberDtl",{type:"get", data:searchData}).then(response => {
// 		const data =response.rsData.data;
//
// 		if(data.agreement.pushAgmYn === "Y") $("#check1").prop("checked", true);
// 		if(data.agreement.smsAgmYn === "Y") $("#check2").prop("checked", true);
//
// 		let profileImgHtml = ``
// 		if(data.profileImg) profileImgHtml += `<div class="img"><img src="/uploadImg${data.profileImg}"/></div>`;
// 		else profileImgHtml += `<div class="img"><img src="/static/images/defaul_profile.png"/></div>`;
//
// 		$(".avatar").html(profileImgHtml);
// 		if(data.mbrId) $("#mbrId").html(data.mbrId);
// 		if(data.mbrStatus) $("#mbrStatus").html(data.mbrStatus);
// 		if(data.mbrNm) $("#mbrNm").html(data.mbrNm);
// 		if(data.birth) $("#birth").html(data.birth.substr(0,4) + "." + data.birth.substr(4,2) + "." + data.birth.substr(6,2));
// 		if(data.gender) $("#gender").html(data.gender);
// 		if(data.phoneNum) $("#phone").html(validTelNo(data.phoneNum));
// 		if(data.email) $("#email").html(data.email);
// 		if(data.addr) $("#addr").html(data.addr);
// 		if(data.licenseNo) $("#licenseNo").html(data.licenseNo);
// 		if(data.univNm) $("#univNm").html(data.univNm);
// 		if(data.degree) $("#degree").html(data.degree);
//
// 		if(data.admissionDt && data.graduateDt){
// 			$("#graduateDt").html(data.admissionDt.substr(0,4) + "." + data.admissionDt.substr(4,2) + " / " + data.graduateDt.substr(0,4) + "." + data.graduateDt.substr(4,2));
// 		}else if(data.admissionDt){
// 			$("#graduateDt").html(data.admissionDt.substr(0,4) + "." + data.admissionDt.substr(4,2) + " / ");
// 		}else if(data.graduateDt){
// 			$("#graduateDt").html(" / " + data.graduateDt.substr(0,4) + "." + data.graduateDt.substr(4,2));
// 		}
//
// 		if(data.graduateNm) $("#graduateNm").html(data.graduateNm);
// 		if(data.specialistYn) $("#specialist").html(data.specialistYn);
// 		if(data.workHosnm) $("#workHosNm").html(data.workHosnm);
// 		if(data.workType) $("#workType").html(data.workType);
// 		if(data.hosAddr) $("#hosAddr").html(data.hosAddr);
// 		if(data.pay) $("#pay").html(data.pay + " 만원");
//
// 		$(data.majorList).each((idx, item) => {
// 			$("#major" + idx).html(item.cdNm);
// 		});
// 	});
// }
//
// function hosInit(){
// 	let searchData = {
// 		mbrCd: "MC_02"
// 		, mbrNo: pageMoveData.mbrNo
// 	};
//
// 	/*etc : 데이터 가져오는 restApi*/
// 	comAjax(apiUrl + "/api/memberDtl/getMemberDtl",{type:"get", data:searchData}).then(response => {
// 		const data =response.rsData.data;
//
// 		if(data.agreement.pushAgmYn === "Y") $("#check1").prop("checked", true);
// 		if(data.agreement.smsAgmYn === "Y") $("#check2").prop("checked", true);
// 		if(data.agreement.keepAgmYn === "A"){
// 			$("#radio1").prop("checked", true);
// 		}else if(data.agreement.keepAgmYn === "1"){
// 			$("#radio2").prop("checked", true);
// 		}else{
// 			$("#radio3").prop("checked", true);
// 		}
//
// 		let profileImgHtml = ``
// 		if(data.profileImg) profileImgHtml += `<div class="img"><img src="/uploadImg${data.profileImg}"/></div>`;
// 		else profileImgHtml += `<div class="img"><img src="/static/images/defaul_profile.png"/></div>`;
//
// 		$(".avatar").html(profileImgHtml);
// 		if(data.mbrId) $("#mbrId").html(data.mbrId);
// 		if(data.mbrStatus) $("#mbrStatus").html(data.mbrStatus);
// 		if(data.mbrNm) $("#mbrNm").html(data.mbrNm);
// 		if(data.hosNo) $("#hosNo").html(data.hosNo);
// 		if(data.mngBirth) $("#mngBirth").html(data.mngBirth.substr(0,4) + "." + data.mngBirth.substr(4,2) + "." + data.mngBirth.substr(6,2));
// 		if(data.mngGender) $("#mngGender").html(data.mngGender);
// 		if(data.phoneNum) $("#phoneNum").html(validTelNo(data.phoneNum));
// 		if(data.mngPhoneNum) $("#mngPhoneNum").html(validTelNo(data.mngPhoneNum));
// 		if(data.email) $("#email").html(data.email);
// 		if(data.addr) $("#addr").html(data.addr);
// 		if(data.businessNo) $("#businessNo").html(data.businessNo);
// 		if(data.bossNm) $("#bossNm").html(data.bossNm);
// 		if(data.mngNm) $("#mngNm").html(data.mngNm);
// 		if(data.drWork1 && data.drWork2){
// 			$("#workerDoc").html(`상근 ${data.drWork1}명 / 비상근 ${data.drWork2}명`);
// 		}else if(data.drWork1){
// 			$("#workerDoc").html(`상근 ${data.drWork1}명 / 비상근 0명`);
// 		}else if(data.drWork2){
// 			$("#workerDoc").html(`상근 0명 / 비상근 ${data.drWork2}명`);
// 		}
// 		if(data.mngEmail) $("#mngEmail").html(data.mngEmail);
// 		if(data.employeesNo) $("#worker").html(data.employeesNo);
// 		if(data.bedsNo) $("#beds").html(data.bedsNo);
// 		if(data.hosUrl) $("#hosUrl").html(data.hosUrl);
// 		if(data.foundingDt) $("#foundingDt").html(`${data.foundingDt.substr(0,4) + "." + data.foundingDt.substr(4,2) +"."+ data.foundingDt.substr(6,2)}`);
// 		if(data.pclcd) $("#pclcd").html(data.pclcd);
//
// 		let majorHtml = ``;
// 		$(data.majorList).each((idx, item) => {
// 			majorHtml += `<li class="active"><a href="#" onclick="javascript: return false;" style="cursor:default;">${item.cdNm}</a></li>`;
// 		});
//
// 		$(".category-list > ul").html(majorHtml);
//
// 		let imgHtml = ``;
// 		$(data.getHosImgList).each((idx, item) => {
// 			imgHtml += `<li><a href="#" onclick="javascript: return false;" style="cursor:default;"><img src="/uploadImg${item.path}"></a></li>`;
// 		});
//
// 		$(".photo-upload > ul").html(imgHtml);
//
// 		imgHtml = ``;
// 		for(let i=3, ii=$(".photo-upload > ul > li").length; i>ii; i--){
// 			imgHtml += `<li><a href="#" onclick="javascript: return false;" style="cursor:default;"><img src="/static/images/defaul_thum.png"></a></li>`;
// 		}
//
// 		$(".photo-upload > ul").append(imgHtml);
//
// 		$("#resetBtn").on("click", () => {
// 			cmmConfirm("해당 회원의 비밀번호를 초기화 하시겠습니까?", () => {
// 				let param = {
// 					mbrNo: pageMoveData.mbrNo
// 					, mbrCd: "MC_02"
// 					, regId: 1
// 				};
// 				comAjax(apiUrl + "/api/memberDtl/resetPwd",{data:param}).then(response => {
// 					if(response.rsData.response_code === "901") return;
// 					cmmAlert("비밀번호 초기화가 완료되었습니다.");
// 				});
// 			});
// 		});
// 	});
// }