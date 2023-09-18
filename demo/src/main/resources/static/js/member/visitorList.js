// /** @file : visitorList.js
//  *  @see  : 접속자 집계
//  */
//
//
//  /**
//  	@function :
//   */
//
// $(document).ready(e=>{
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	visitorListSearch();
//
// 	$('#searchBtn').on('click',e=>{
// 		visitorListSearch();
// 	})
// })
//
// const visitorListSearch  =async function(pageNo = 1){
// 	$('.col-table tbody').html('<tr><td colspan="13"><div class="none">검색중.</div></td></tr>');
// 	$('.utility .count em').text('0');
// 	let visitorList = await visitorListSearchAction(pageNo);
// 	let total  = visitorListSearchView(visitorList);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/total,visitorListSearch);
// }
//
// const visitorListSearchAction  = function(pageNo = 1){
// 	let searchData =getSearchCondiction();
// 	searchData.pageNo = pageNo;
// 	searchData.pageSize = 10;
// 	return comAjax(apiUrl + "/api/member/getVisitorList",{type:"get", data:searchData});
// }
//
// const visitorListSearchView  = function(visitorList){
//
// 	$('.col-table tbody').children().remove();
//
// 	if(visitorList.rsData.response_code != '000'){
// 		return 0;
// 	}
// 	let totalCount = visitorList.rsData.total_count;
// 	let visitorDataList = visitorList.rsData.data;
// 	$('.utility .count em').text(totalCount);
// 	if(totalCount < 1 ){
// 		$('.col-table tbody').html('<tr><td colspan="6"><div class="none">집계된 내역이 없습니다.</div></td></tr>');
// 		return 0;
// 	}
//
// 	let visitorTemplet = `  <tr>
//                                 <td id="IP_ADDRESS"></td>
//                                 <td id="MBR_CD_NM">사용자 구분</td>
//                                 <td id="MBR_NM">사용자 명</td>
//                                 <td id="ACCESS_PATH">접속 IP</td>
//                                 <td id="DEVICE_NM">접속 기기</td>
//                                 <td id="REG_DT">일시</td>
//                             </tr>`;
//
// 	for(let visitorData of visitorDataList){
// 		let visitorEl = $(visitorTemplet);
// 	    $('#IP_ADDRESS',visitorEl).text(visitorData.IP_ADDRESS);
// 	    $('#MBR_CD_NM',visitorEl).text(visitorData.MBR_CD_NM);
// 	    $('#MBR_NM',visitorEl).text(visitorData.MBR_NM?visitorData.MBR_NM:"(회원탈퇴)");
// 	    $('#ACCESS_PATH',visitorEl).text(visitorData.ACCESS_PATH);
// 	    $('#DEVICE_NM',visitorEl).text(visitorData.DEVICE_NM);
// 	    $('#REG_DT',visitorEl).text(visitorData.REG_DT);
// 	    $('.col-table tbody').append(visitorEl);
//
// 	}
// 	return totalCount;
// }
// const getSearchCondiction =  function (){
// 	let searchCondiction = {
// 		 fromDate:''
// 		,endDate:''
// 	}
// 	searchCondiction.fromDate = $('#fromDate').val().replaceAll('-','');
// 	searchCondiction.endDate  = $('#toDate').val().replaceAll('-','');
// 	return searchCondiction;
// }
