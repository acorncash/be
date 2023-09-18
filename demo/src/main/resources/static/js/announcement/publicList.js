// /**
//  *
//  */
//
// $(()=>{
// 	comAjax(apiUrl + "/api/code/getMajorCodeList",{type:"get"}).then(response => {
// 		let html = `<option value="">선택</option>`;
//
// 		$(response.rsData.data).each((idx, item) => {
// 			html += `<option value="${item.cd}">${item.cdNm}</option>`;
// 		});
// 		$("#searchMajor").html(html);
// 	});
//
// 	$("#searchContent").on("keyup", e =>{
// 		if(e.keyCode === 13) publicSearch();
// 	});
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	publicSearch();
// });
//
// /**
//  * @function : publicInvitationSearch
//  * @param    : {int} pageNum page번호 defalut 1
//  * @return   : x
//  * @target   : publicInvitation
//  * @etc      : public 데이터 목록 조회 및 세팅
//  * */
// const publicSearch =async function(pageNo=1){
// 	let publicList  = await publicListSearch(pageNo);
// 	let totalCount = publicListView(publicList);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCount,publicSearch);
// }
//
// /**
//  * @function : publicListSearch
//  * @param    : {json} data 조회 내용
//  * @return   : x
//  * @target   : publicInvitation
//  * @etc      : public 목록 데이터 조회
//  * */
// const publicListSearch =function(pageNo=1){
// 	/*type : Array*/
// 	let searchData = {
// 		pageNo: pageNo
// 		, pageSize: 10
// 		, searchSe: $("#searchSe").val()
// 		, searchContent: $("#searchSe").val() === "05" ? $("#searchMajor").val() : $("#searchContent").val().replaceAll(" ","")
// 		, orderSe: $("#orderSe").val()
// 	};
// 	/*etc : 데이터 가져오는 restApi*/
// 	return comAjax(apiUrl + "/api/publicList/getPublicList",{type:"get", data:searchData});
// }
//
// /**
//  * @function : publicListView
//  * @param    : {jsonArray} dataList : 초빙공고 목록 리스트
//  * @return   : x
//  * @target   : publicInvitation
//  * @etc      : 초빙공고 목록 조회 및 화면에 그리기
//  * */
// const publicListView = function(dataList){
// 	if(dataList.rsData.response_code === "201"){
// 		$(".count").html(`전체 <em>0</em>건`);
// 		$("#publicListTable > tbody").html(`<tr><td colspan="9"><div class="none">검색된 Public 공고 목록이 없습니다.</div></td></tr>`);
// 		return 0;
// 	}
// 	$(".count").html(`전체 <em>${dataList.rsData.total_count}</em>건`);
//
// 	let html = ``;
// 	$(dataList.rsData.data).each((idx, item) => {
// 		html += `<tr ${item.tempYn === "Y" ? `style="background-color: #f4eeec;"` : ``}>`;
// 	    html += `    <td><input value="${item.anntNo}" type="checkbox" class="chk"></td>`;
// 	    html += `    <td>${item.anntNo}</td>`;
// 	    html += `    <td class="text-left"><a class="click-tag" href="#" onclick="javascript:publicDtlPopup(${item.anntNo}); return false;">${item.title}</a></td>`;
// 	    html += `    <td>${item.mbrNm}</td>`;
// 	    html += `    <td>${item.addr}</td>`;
// 	    html += `    <td>${item.deadline ? item.deadline.substr(0,4) + "." + item.deadline.substr(4,2) + "." + item.deadline.substr(6,2) : "채용마감시까지"}</td>`;
// 	    html += `    <td>${item.applyCnt}</td>`;
// 	    html += `    <td>${item.placement ? item.placement : ""}</td>`;
// 	    html += `    <td>${item.regDt}</td>`;
// 	    html += `</tr>`;
// 	});
// 	$("#publicListTable > tbody").html(html);
// 	$(".chk").on("click", () => {
// 		if($(".chk").length === $(".chk:checked").length) $("#selectAll").prop("checked", true)
// 		else $("#selectAll").prop("checked", false)
// 	});
// 	return dataList.rsData.total_count ;
// }
//
// function publicDtlSet(modalId, param){
// 	let searchData = {
// 		anntNo: param
// 	};
// 	/*etc : 데이터 가져오는 restApi*/
// 	comAjax(apiUrl + "/api/publicList/getPublicDtl",{type:"get", data:searchData}).then( response => {
// 		const data = response.rsData.data;
// 		$(".num").html(data.anntNo);
//
// 		//상세-병원 명
// 		$('#hospitalName').html(data.hospitalNm);
// 		//상세-제목타이틀
// 		$('#hospitalSbj').html(data.title);
// 		//상세-D-DAY
// 		if(data.deadline == ""){
// 			$('#dDAY').html("채용마감시까지");
// 			$('#endDay').html("채용마감시까지");
// 		}else{
// 			$('#dDAY').html(getDday(data.deadline));
// 			$('#endDay').html(data.deadline.substr(0,4) + "/" + data.deadline.substr(4,2) + "/" + data.deadline.substr(6,2));
// 		}
//
// 		//상세-초빙과목
// 		//초빙과목 가공
// 		let anntMajorList = ``;
//
// 		$(data.majorList).each((idx, item) => {
// 			if(idx === 0){
// 				anntMajorList += `${item.majorNm}`;
// 			}else{
// 				anntMajorList += `, ${item.majorNm}`;
// 			}
// 		});
// 		$('#invitSubject').html(anntMajorList);
//
// 		//상세-초빙유형
// 		$('#invitCategory').html(`${data.employmentNm} (${data.recruitmentNo}명)`);
// 		//상세-근무지역
// 		//상세-지도보기
// 		$('#workArea').html(data.addr);
// 		//상세-경력
// 		$('#career').html(data.carrerNm);
// 		//상세-급여
// 		$('#pay').html(data.payTypeNm + " " + data.payRangeNm);
// 		//상세-당직
// 		$('#partyPost').html(`야간당직: ${data.dutyNightNm}, 주말당직: ${data.dutyWeeklyNm}`);
// 		//상세-구인사유
// 		$('#reasonJob').html(data.offerReasonNm);
// 		//상세-근무시간
// 		//근무시간 가공
// 		let workhourWd="",workhourStd="",workhourSd="";
// 		if(data.workhourWdS){
// 			workhourWd = data.workhourWdS.substr(0,2) + "시 " + data.workhourWdS.substr(2,2) + "분 ~ " + data.workhourWdE.substr(0,2) + "시 " + data.workhourWdE.substr(2,2) + "분";
// 		}else{
// 			workhourWd = `근무없음`;
// 		}
// 		if(data.workhourStdS){
// 			workhourStd = data.workhourStdS.substr(0,2) + "시 " + data.workhourStdS.substr(2,2) + "분 ~ " + data.workhourStdE.substr(0,2) + "시 " + data.workhourStdE.substr(2,2) + "분";
// 		}else{
// 			workhourStd = `근무없음`;
// 		}
// 		if(data.workhourSdS){
// 			workhourSd = data.workhourSdS.substr(0,2) + "시 " + data.workhourSdS.substr(2,2) + "분 ~ " + data.workhourSdE.substr(0,2) + "시 " + data.workhourSdE.substr(2,2) + "분";
// 		}else{
// 			workhourSd = `근무없음`;
// 		}
// 		$('#workingTime').html(`평일: ${workhourWd}, 토요일: ${workhourStd}, 일요일: ${workhourSd}, 공휴일: ${data.holidayNm}`);
// 		//상세-기타
// 		$('#etc').html(getEtc(data));
// 	/********************초빙공고 상세정보 END********************/
// 	/********************상세요강 START********************/
// 		//상세요강 - 기업소개
// 		$('#companyIntroduction').html(`<div class="tit">상세내용</div><p>${data.recruitmentDetails.replaceAll("\n", "<br>")}</p>`);
// 	/********************상세요강 END********************/
// 	/********************병원 정보 START********************/
// 		//병원정보 - 병원이미지
// 		let profileImgHtml = ``;
// 		if(data.profileImg) profileImgHtml += `<img src="/uploadImg${data.profileImg}">`
// 		else profileImgHtml += `<img src="/static/images/defaul_thum.png" alt="기본이미지">`;
// 		$('#hospitaInfo').html(profileImgHtml);
// 		//병원정보 - 병원명
// 		$('#hospitaInfoName').html(`${data.hospitalNm}`);
// 		//병원정보 - 분류
// 		$('#classification').html(data.clcdNm);
// 		//병원정보 - 설립일자
// 		if(data.estbdd) $('#establishment').html(`${data.estbdd.substr(0,4)}년 ${data.estbdd.substr(4,2)}월 ${data.estbdd.substr(6,2)}일`);
// 		//병원정보 - 주소
// 		$('#address').html(data.addr);
// 		//병원정보 - 홈페이지
// 		if(data.hosUrl) $('#homePage').html(`<a href="#" target="_blank" title="새창열림">${data.hosUrl}</a>`);
// 	/********************병원 정보 END********************/
// 	/********************접수기간 및 방법 START********************/
// 		// 남은기간
// 		if(data.deadline == ""){
// 			$("#timelimitContent").html("채용마감시까지");
// 			$("#endDate").html("채용마감시까지");
// 		}else{
// 			$("#timelimitContent").html(`<strong>${getDday(data.deadline)}</strong>`);
// 			// 종료일
// 			$("#endDate").html(data.deadline.substr(0,4) + "." + data.deadline.substr(4,2) + "." + data.deadline.substr(6,2));
// 		}
// 		// 시작일
// 		$("#startDate").html(data.regDt.substr(0,4) + "." + data.regDt.substr(5,2) + "." + data.regDt.substr(8,2));
// 		// 지원방법
// 		$("#howApply").html(`굿닥터스 온라인 이력서${data.contactEmail ? ", 이메일 지원: " + data.contactEmail: ""}`);
// 		// 초빙담당자
// 		$("#manager").html(data.contactNm);
// 		// 연락처
// 		// 전화번호 가공
// 		$("#ph").html(`${data.contactTel ? validTelNo(data.contactTel) : ""}${data.contactPhoneNo ? ", " + validTelNo(data.contactPhoneNo) : ""}`);
//
// 		$("#"+modalId).find("button, a").not("#closeBtn, .close").css("cursor", "default").on("click", () => {
// 		   return false;
// 		});
// 	});
// }
//
// /**@function : getEtc
//  * @param    : responseData = public dtl data
//  * @return   : html = 기타 문자열
//  * @etc      : 기타 문자열 세팅
//  * */
// function getEtc(data){
// 	let html = ``;
// 	if(data.payAdd === "Y"){
// 		html += `시행 술기(시술,수술)추가에 따른 인센티브`;
// 	}
// 	if(data.payOption1 === "Y"){
// 		if(html) html += `, 퇴직금(퇴직연금) 별도 지급`;
// 		else html += `퇴직금(퇴직연금) 별도 지급`;
// 	}
// 	if(data.payOption2 === "Y"){
// 		if(html) html += `, 본인 연말정산 가능`;
// 		else html += `본인 연말정산 가능`;
// 	}
// 	if(data.payOption3 === "Y"){
// 		if(html) html += `, 중도퇴사 때 원천징수 기준 세금 환급`;
// 		else html += `중도퇴사 때 원천징수 기준 세금 환급`;
// 	}
// 	if(data.annual){
// 		if(html) html += `, 연차: ${data.annual}일`;
// 		else html += `연차: ${data.annual}일`;
// 	}else{
// 		if(html) html += `, 연차`;
// 		else html += `연차`;
// 	}
// 	if(data.incentiveYn === "Y"){
// 		html += `, 인센티브${data.incentiveDesc ? "(" + data.incentiveDesc + ")" : ""}`;
// 	}
// 	if(data.insuranceYn === "Y"){
// 		html += `, 배상책임보험 병원가입${data.insuranceDesc ? "(" + data.insuranceDesc + ")" : ""}`;
// 	}
// 	if(data.accommodationYn === "Y"){
// 		html += `, 숙소제공${data.accommodationDesc ? "(" + data.accommodationDesc + ")" : ""}`;
// 	}
// 	if(data.mealsYn === "Y"){
// 		html += `, 식대제공${data.mealsDesc ? "(" + data.mealsDesc + ")" : ""}`;
// 	}
// 	html += `, 학회${data.conferenceNm}`;
//
// 	return html;
// }
//
// function removePublic(){
// 	if($(".chk:checked").length) {
// 		cmmConfirm('선택된 항목을 삭제하시겠습니까?', () => {
// 			const removeList = [];
//
// 			$(".chk:checked").each((idx, item) => {
// 				removeList.push(item.value);
// 			})
//
// 			const data = {
// 				removeList: removeList
// 			};
//
// 			comAjax(apiUrl + "/api/publicList/removePublic",{data:data}).then(response => {
// 				if(response.rsData.response_code === "901") return;
// 				const option = {
// 					callback:()=>{
// 						publicSearch();
// 					}
// 				};
// 				cmmAlert("삭제가 완료되었습니다.", option);
// 			});
// 		});
// 	}else{
// 		cmmAlert('선택된 항목이 없습니다.',{icon:'warning'});
// 	}
// }
//
// function recemendPublicSet(){
// 	/*etc : 데이터 가져오는 restApi*/
// 	comAjax(apiUrl + "/api/publicList/getRecomendPublicList",{type:"get"}).then( response => {
// 		$(response.rsData.data).each((idx, item) => {
// 			let profileImgHtml = ``;
// 			if(item.profileImg) profileImgHtml += `<div class="thum"><img src="/uploadImg${item.profileImg}"></div>`
// 			else profileImgHtml += `<div class="thum"><img src="/static/images/defaul_thum.png"></div>`;
//
// 			let html = ``;
// 			html += `<div class="badge badge-primary">추천</div>`;
//             html += `<div class="wrap" style="cursor:default;">`;
//             html +=		profileImgHtml;
//             html += `	<ul>`;
//             html += `		<li class="num">${item.anntNo}</li>`;
//             html += `       <li class="name">${item.mbrNm}</li>`;
//             html += `       <li class="subject">${item.title}</li>`;
//             html += `       <li class="between">`;
//             html += `           <div class="district">${item.addr}</div>`;
//             html += `           <div class="dday">${item.deadline ? getDday(item.deadline) : "채용마감시까지"}</div>`;
//             html += `       </li>`;
//             html += `	</ul>`;
//             html += `</div>`;
//             html += `<div class="form-group">`;
//         	html += `	<div class="flex flexwrap">`;
//         	html += `		추천초빙공고번호`;
//         	html += `		<div class="custom-control custom-checkbox check-lg">`;
// 		    html += `            <input type="text" class="annt-input" value="${item.anntNo}" placeholder="초빙공고 번호를 입력하세요." oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">`;
// 		    html += `            <button type="button" class="btn btn-dark" onclick="javascript:this.previousElementSibling.value = '';">삭제</button>`;
// 		    html += `        </div>`;
//         	html += `	</div>`;
//         	html += `</div>`;
//
//         	$("#placement_" + item.placement).html(html);
// 		});
// 	});
// }
//
// function saveRecomend(){
// 	if(!confirm('변경된 추천초빙공고 정보를 저장하시겠습니까?')) return;
//
// 	const recomendPublicList = [];
//
// 	$($(".box")).each((idx, item) => {
// 		recomendPublicList.push({placement:item.id.replace("placement_", ""), anntNo: $(item).find("input")[0].value});
// 	});
//
// 	let data = {
// 		recomendPublicList: recomendPublicList
// 	};
// 	/*etc : 데이터 가져오는 restApi*/
// 	comAjax(apiUrl + "/api/publicList/setRecomendPublicList",{data:data}).then(response => {
// 		if(response.rsData.response_code === "901") return;
// 		modalClose();
// 		const option = {
// 			callback:()=>{
// 				publicSearch();
// 			}
// 		};
// 		cmmAlert("정상적으로 저장되었습니다.", option);
// 	});
// }
//
// function searchSeChange(e){
// 	$("#searchContent").hide();
// 	$("#searchMajor").hide();
//
// 	if(e.value === "05") $("#searchMajor").show();
// 	else $("#searchContent").show();
// }