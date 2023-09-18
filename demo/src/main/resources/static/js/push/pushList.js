// /**
//  *
//  */
//
//  const pushListInit = function(){
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	suchPushTemplet();
// }
//
// const suchPushTemplet =async function(pageNo = 1){
// 	$('.col-table tbody').html('<tr><td colspan="20"><div class="none">검색중.</div></td></tr>');
// 	$('.utility .count em').text('검색중');
//
// 	let searchPushTemplet = await getPushTemplet(pageNo);
//
// 	let totalCnt  = pushListView(searchPushTemplet);
//
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCnt,suchPushTemplet);
// }
//
// const getPushTemplet = function(pageNo){
// 	let searchData ={};
// 	searchData.pageNo = pageNo;
// 	searchData.pageSize = 10;
//
// 	return comAjax(apiUrl + "/api/push/getPushTemplet",{type:"get", data:searchData});
// }
//
// const pushListView = function(pushListView){
// 	let totCnt = 0;
//
// 	if(pushListView.rsData.response_code == '201'){
// 		$('.utility .count em').text(totCnt);
// 		$('.col-table tbody').html('<td colspan="20"><div class="none">검색된 결과가 없습니다.</div></td>');
// 		return totCnt;
// 	}else{
// 		totCnt = pushListView.rsData.total_count;
// 		$('.col-table tbody').html('');
// 		$('.utility .count em').text(totCnt);
// 	}
// 	let pushList = pushListView.rsData.data;
//
// 	for(let pushTempletItem of pushList){
// 		console.log(pushTempletItem);
// 		let pushListViewTemplet = `
// 			<tr>
// 				<td><input class="chkList"type="checkbox" id="${pushTempletItem.pushTempletNo}"></td>
// 				<td>${pushTempletItem.rnum}</td>
// 				<td>${pushTempletItem.title}</td>
// 				<td>${pushTempletItem.sendMsg}</td>
// 				<td>${pushTempletItem.regdt}</td>
// 				<td>${pushTempletItem.mngNm}</td>
// 				<td><button type="button" class="btn btn-outline-dark btn-sm" >상세보기</button></td>
// 			</tr>`;
//
// 		let $pushList = $(pushListViewTemplet);
//
// 		//상세보기 버튼
// 		$('button',$pushList).on('click',e=>{
// 			pageMove('/push/pushWrite',{'pageStat':'U','pushTempletNo':pushTempletItem.pushTempletNo});
// 		})
//
// 		$('.col-table tbody').append($pushList);
// 	}
//
// 	return totCnt;
// }
//
// const delPushTemplet= function(){
// 	let delIdList = [];
// 	let delItem = $('.chkList').filter((index,item)=>{
// 		return item.checked;
// 	});
//
// 	if(delItem.length  == 0){
// 		cmmAlert('선택된 푸쉬 템플릿이 없습니다.');
// 		return;
// 	}
//
// 	cmmConfirm('삭제하시겠습니까?',e=>{
// 		delItem.each((index,item)=>{
// 	    	delIdList.push(item.id);
// 		})
//
// 		comAjax(apiUrl+'/api/push/deletePushTemplet',{
// 			data :{delItem : delIdList}
// 		}).then(e=>{
// 			if(e.rsData.response_code == '000'){
// 				cmmAlert(`${e.rsData.data}건 삭제되었습니다.`);
// 				suchPushTemplet();
// 			}
//
//
// 		})
// 	})
//
//
//
// }