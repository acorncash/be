// //document 시작
//
// let  couponUserList = [];
// $(document).ready(e=>{
// 	sessionStorage.setItem('couponIssuedItem','');
//
// 	if(!pageMoveData.couponNo){
// 		cmmAlert('정상적인 경로로 접근해주세요.',{icon:'warning',callback:()=>{pageMove('/coupon/couponList')}});
// 		return;
// 	}
//
// 	$('#mbrAddBtn').on('click',	()=>{
// 		couponIssuedAddMbrPopup(pageMoveData.couponNo)
// 	});
//
// 	$('#saveBtn').on('click',()=>{
// 		let returnValue=saveVaildation()
// 		if(returnValue.isTrue){
// 			cmmAlert(returnValue.chkVali,{icon:"warning"});
// 			return;
// 		}
//
//
//
//
// 		comAjax(apiUrl + "/api/coupon/saveCouponIssuedList",{type:"post", data:{
// 			userList:couponUserList,
// 			couponNo: pageMoveData.couponNo
// 			}
// 		}).then(e=>{
// 			pageMove('/coupon/couponIssuedList',{couponNo:pageMoveData.couponNo});
// 		})
//
// 		;
//
// 	})
//
// 	suchIssuedList();
// })
//
//
// const suchIssuedList =async function(pageNo = 1){
// 	$('.col-table tbody').html('<tr><td colspan="20"><div class="none">검색중.</div></td></tr>');
// 	$('.utility .count em').text('검색중');
// 	let couponIssuedList = await getCouponIssuedList();
// 	couponIssuedListView(couponIssuedList);
// }
//
// const getCouponIssuedList = function(){
// 	let searchData ={};
// 	searchData.couponNo= pageMoveData.couponNo;
//
// 	return comAjax(apiUrl + "/api/coupon/getCouponIssuedList",{type:"get", data:searchData});
// }
//
// const couponIssuedListView = function(couponIssuedList){
// 	let totCnt = 0;
//
// 	if(couponIssuedList.rsData.response_code == '000'){
// 		let couponDtl = couponIssuedList.rsData.data.couponDtl;
// 		let title = couponDtl.couponTitle;
// 		$('#couponTitle').text(title);
//
// 	}
//
//
// 	if(couponIssuedList.rsData.response_code == '201'){
// 		$('.utility .count em').text(totCnt);
// 		return totCnt;
// 	}else if(couponIssuedList.rsData.response_code == '000'){
// 		totCnt = couponIssuedList.rsData.data.totalCnt;
// 		$('.col-table tbody').html('');
// 		$('.utility .count em').text(totCnt);
// 	}
//
// 	let  couponIssuedDataList = couponIssuedList.rsData.data.couponIssuedList;
// 	//전역 변수에 담기
// 	couponUserList = [...couponIssuedDataList];
//
// 	for(let couponIssuedData of couponIssuedDataList){
// 		let etc = couponIssuedData.etc?couponIssuedData.etc:'';
// 		let couponIssueDate = yyyMMddView(couponIssuedData.couponIssueDate);
// 		let couponViewTemplet = `
// 			<tr>
// 				<td id="couponReceiveMbrNo">${couponIssuedData.couponReceiveMbrNo}</td>
// 				<td id="couponReceiveMbrNm">${couponIssuedData.couponReceiveMbrNm}</td>
// 				<td id="couponIssueDate"><input maxLength="10" class="form-control" type="text" value="${couponIssueDate}"></td>
// 				<td id="etc"><input maxLength="100" class="form-control" type="text" value="${etc}"></td>
// 				<td id="regNm">${couponIssuedData.regNm}</td>
// 				<td id="regDt">${couponIssuedData.regDt}</td>
// 			</tr>`;
//
// 		let $couponView = $(couponViewTemplet);
//
//
// 		$('#couponIssueDate input',$couponView).on('input',function(e){
// 			e.currentTarget.value = yyyMMddView(e.currentTarget.value);
// 			couponUserList.forEach(item=>{
// 				if(item.couponReceiveMbrNo==couponIssuedData.couponReceiveMbrNo){
// 					item.couponIssueDate = e.currentTarget.value;
// 				}
// 			});
// 		})
//
//
// 		$('#etc input',$couponView).on('input',function(e){
// 			couponUserList.forEach(item=>{
// 				if(item.couponReceiveMbrNo==couponIssuedData.couponReceiveMbrNo){
// 					item.etc = e.currentTarget.value;
// 				}
// 			});
// 		})
//
// 		//상세보기 버튼
//
// 		$('.col-table tbody').append($couponView);
// 	}
// 	return totCnt;
// }
//
// const saveVaildation  = function(){
// 	let returnValue = {
// 		isTrue: false
// 		,chkVali :''
// 	}
// 	var dateCheckReg = RegExp(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/);
// 	var dateCheckReg2 = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
//
//
// 	for(let item of couponUserList){
// 		if(!dateCheckReg.test(item.couponIssueDate) && !dateCheckReg2.test(item.couponIssueDate)){
// 			returnValue.isTrue=true;
// 			returnValue.chkVali=`${item.couponReceiveMbrNm}의 날짜 형식이 맞지 않습니다.`;
// 			return returnValue;
// 		}
// 	}
//
// 	return returnValue;
// }
//
