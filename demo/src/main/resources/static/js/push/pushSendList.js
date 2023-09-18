// /**
//  *
//  */
//  const pushSendListInit = function(){
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	suchPushSendList();
// }
//
// const suchPushSendList =async function(pageNo = 1){
// 	$('.col-table tbody').html('<tr><td colspan="20"><div class="none">검색중.</div></td></tr>');
// 	$('.utility .count em').text('검색중');
//
// 	let searchPushTemplet = await getPushLog(pageNo);
//
// 	let totalCnt  = pushLogView(searchPushTemplet);
//
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCnt,suchPushSendList);
// }
//
// const getPushLog = function(pageNo){
// 	let searchData ={};
// 	searchData.pageNo = pageNo;
// 	searchData.pageSize = 10;
//
// 	return comAjax(apiUrl + "/api/push/getPushLog",{type:"get", data:searchData});
// }
//
// const pushLogView = function(pushLogList){
// 	let totCnt = 0;
//
// 	if(pushLogList.rsData.response_code == '201' ||pushLogList.rsData.response_code == '901'  ){
// 		$('.utility .count em').text(totCnt);
// 		$('.col-table tbody').html('<td colspan="20"><div class="none">검색된 결과가 없습니다.</div></td>');
// 		return totCnt;
// 	}else{
// 		totCnt = pushLogList.rsData.total_count;
// 		$('.col-table tbody').html('');
// 		$('.utility .count em').text(totCnt);
// 	}
// 	let pushLogListItem = pushLogList.rsData.data;
//
// 	for(let pushLogItem of pushLogListItem){
// 		console.log(pushLogItem)
// 		let pushLogViewTemplet = `
// 			<tr>
// 				<td>${pushLogItem.rnum}</td>
// 				<td>${pushLogItem.sendTitle}</td>
// 				<td style=" white-space: nowrap; ">${pushLogItem.sendMsg}</td>
// 				<td>${pushLogItem.sendMngNm}</td>
// 				<td style=" white-space: nowrap; ">${pushLogItem.receiverMbrNm}</td>
// 				<td >${pushLogItem.sendResultCode}</td>
// 				<td style=" white-space: nowrap; overflow : hidden; text-overflow : ellipsis ;">${pushLogItem.sendResultMsg}</td>
// 				<td>${pushLogItem.regDt}</td>
// 			</tr>`;
//
// 		let $pushLog = $(pushLogViewTemplet);
//
// 		$('.col-table tbody').append($pushLog);
// 	}
//
// 	return totCnt;
// }