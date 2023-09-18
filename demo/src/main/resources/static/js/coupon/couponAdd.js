//
//
// $(document).ready(e=>{
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	suchCouponList();
//
//
//
// })
//
//
//
// const suchCouponList =async function(pageNo = 1){
// 	$('.col-table tbody').html('<tr><td colspan="20"><div class="none">검색중.</div></td></tr>');
// 	$('.utility .count em').text('검색중');
//
// 	let couponList = await getCouponList(pageNo);
// 	let totalCnt  = couponListView(couponList);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCnt,suchCouponList);
//
// }
//
// const getCouponList = function(pageNo){
// 	let searchData ={};
// 	searchData.pageNo = pageNo;
// 	searchData.pageSize = 10;
//
// 	return comAjax(apiUrl + "/api/coupon/getCouponList",{type:"get", data:searchData});
// }
//
// const couponListView = function(couponList){
// 	let totCnt = 0;
// 	if(couponList.rsData.response_code == '201'){
// 		$('.utility .count em').text(totCnt);
// 		$('.col-table tbody').html('<td colspan="20"><div class="none">검색된 결과가 없습니다.</div></td>');
// 		return totCnt;
// 	}else if(couponList.rsData.response_code == '000'){
// 		totCnt = couponList.rsData.total_count;
// 		$('.col-table tbody').html('');
// 		$('.utility .count em').text(totCnt);
// 	}
//
// 	let couponDataList = couponList.rsData.data;
//
// 	for(let couponData of couponDataList){
// 		let couponViewTemplet = `
// 			<tr>
// 				<td><input class="chkList"type="checkbox" id="${couponData.pushTempletNo}"></td>
// 				<td>${couponData.couponNo}</td>
// 				<td>${couponData.couponTitle}</td>
// 				<td>${couponData.couponDtl}</td>
// 				<td>${couponData.useYnNm}</td>
// 				<td>${couponData.regNm}</td>
// 				<td>${couponData.regDt}</td>
// 				<td><button type="button" class="btn btn-outline-dark btn-sm" >상세보기</button></td>
// 			</tr>`;
//
// 		let $couponView = $(couponViewTemplet);
//
// 		//상세보기 버튼
//
// 		$('.col-table tbody').append($couponView);
// 	}
//
// 	return totCnt;
// }