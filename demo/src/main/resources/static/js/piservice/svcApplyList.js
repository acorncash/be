// /**
//  * @file : svcApplyList.js
//  */
//
//  let loginInfo = {};
//  $(document).ready(async e=>{
// 	let resultInfo= await  comAjax(apiUrl + "/api/member/getLoginInfo",{type:'get'});
// 	loginInfo = resultInfo.rsData.data;
// 	if(loginInfo.mngAuth != 'AG_01' && loginInfo.mngAuth != 'AG_03'){
// 		$('#saveBtn').remove();
// 	}
//
// 	getComCode('PI_SEARCH_CON','2','piSearchCondiction') ;
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	svcApplyCountView();
// 	svcApplyList();
// 	svcApplyEventInit();
//
// 	//지역 코드 검색
// 	getComCode('HOS_REGION','2','searchSido');
// 	getComCode('PI_SERVICE_PRO','2','searchProgress');
// 	//진료과 코드 검색
// 	getMajorCode('searchMajor');
// })
//
//
// //pi누적신청자,pi신규신청자,담당자 미배정 pi목록
// const svcApplyCountView =async function(){
// 	let resultCount = await comAjax(apiUrl + "/api/piservice/svcApplyCount",{type:'get'});
// 	let countItem = resultCount.rsData.data;
//
// 	$('#totalCnt').text(countItem.totalCnt);
// 	$('#todayCnt').text(countItem.todayCnt);
// 	$('#mngNoneCnt').text(countItem.mngNoneCnt);
// }
//
// //신청 목록 view
// const svcApplyList =async function(pageNo=1){
// 	let svcApplyListItem  = await searchSvcApplyList(pageNo);
// 	let totalCount = await svcApplyListView(svcApplyListItem);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCount,svcApplyList);
// }
//
//
// const searchSvcApplyList = function(pageNo=1){
// 	/*type : Array*/
// 	let searchData =getSearchCondiction();
// 	searchData.pageNo = pageNo;
// 	searchData.pageSize = 10;
// 	/*etc : 데이터 가져오는 restApi*/
// 	return comAjax(apiUrl + "/api/piservice/getSvcApplyList",{type:"get", data:searchData});
// }
//
// /**
//  * @function : svcApplyListView
//  * */
// const svcApplyListView =async function(dataList){
// 	$("#listTable > tbody").children().remove();
// 	$(".count").html(`전체 <em>${dataList.rsData.total_count}</em>건`);
// 	if(dataList.rsData.total_count === 0){
// 		$("#listTable > tbody").html(`<tr><td colspan="13"><div class="none">검색된 서비스가 없습니다.</div></td></tr>`);
// 		return 0;
// 	}
//
//
//
// 	let managerItem =await comAjax(apiUrl+'/api/member/getSvcApplyList',{type:'get'});
// 	let managerTemplet = `
// 		<div class="btn-group">
//             <a id="choiseMng" value="" class="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">헤드헌터1</a>
//             <div class="dropdown-menu dropdown-menu-right">
//             </div>
//         </div>
// 	` ;
//
// 	let managerList = managerItem.rsData.data.filter(e=>e.mngNo != 1);
//
//
// 	$(dataList.rsData.data).each((idx, item) => {
// 		let serviceGbColer = item.serviceGbNm == '구인' ?'badge-soft-warning':'badge-soft-primary';
// 		let serviceProNmColer = '';
// 		if(item.mngNo==0)serviceProNmColer='badge-soft-warning';
// 		else             serviceProNmColer='badge-soft-info';
// 		let anntNoNm    = item.anntNo == 0 ? '없음' : item.anntNo;
// 		let templet = `	<tr id="${item.serviceApplyNo}" >
//                             <td class="tableCheck"><input class="tbCheck" type="checkbox" ></td>
//                             <td class="${serviceProNmColer}" id="serviceProNm">${item.assignStat}</td>
//                             <td id="serviceGbNm" ><span class="badge ${serviceGbColer}">${item.serviceGbNm}</span></td>
//                             <td id="anntNo">${anntNoNm}</td>
//                             <td>${item.mbrGbNm}</td>
//                             <td>${item.mbrNm}</td>
//                             <td>${item.majorNm}</td>
//                             <td>${item.phoneNo}</td>
//                             <td>${item.email}</td>
//                             <td>${item.contactTime}</td>
//                             <td class="text-left">${item.consultation}</td>
//                             <td>${item.regDt}</td>
//                             <td style="display:none;">${item.mbrNo}</td>
//                             <td id="btn-group">
//                             </td>
//                         </tr>`
// 		let managerTempletEl = $(managerTemplet);
// 		managerList.forEach(e=>{
// 			$('.dropdown-menu',managerTempletEl).append(`<span id="${e.mngNo}" class="dropdown-item">${e.mngNm}</span>`);
// 		})
// 		//div 아이템 클릭
// 		$('.dropdown-item',managerTempletEl).on('click',e=>{
// 			let mngId = e.target.id;
// 			let mngNm = e.target.outerText;
// 			$('#choiseMng',managerTempletEl).val(mngId);
// 			$('#choiseMng',managerTempletEl).text(mngNm);
// 		})
//
// 		if(loginInfo.mngAuth != 'AG_01' && loginInfo.mngAuth != 'AG_03'){
// 			$('a',managerTempletEl).prop('disabled','true');
// 		}
//         let templetEl = $(templet);
//         $('.tbCheck',templetEl).data(item);
//
//         let choiseItem = $('.dropdown-item',managerTempletEl).filter((index,dropItem)=>dropItem.id == item.mngNo)
//         if(choiseItem.length >0)   {
// 			$('#choiseMng',managerTempletEl).val(choiseItem.attr('id'));
// 			$('#choiseMng',managerTempletEl).text(choiseItem.text());
// 		}else {
// 			$('#choiseMng',managerTempletEl).val('0');
// 			$('#choiseMng',managerTempletEl).text('미정');
// 		}
// 		$('#btn-group',templetEl).append(managerTempletEl);
//         $("#listTable > tbody").append(templetEl);
// 	});
//
// 	return dataList.rsData.total_count ;
// }
//
//
//
// //신청 목록 view
// const getSearchCondiction = function(){
// 	let searchData = {
// 		serchOption :''
// 		,serchVal :''
// 	}
// 	searchData.serchOption = $('#piSearchCondiction').val();
//
// 	if(searchData.serchOption == 'PSC_001') searchData.serchVal    = $('#searchText').val();
// 	if(searchData.serchOption == 'PSC_002') searchData.serchVal    = $('#searchText').val();
// 	if(searchData.serchOption == 'PSC_003') searchData.serchVal    = $('#searchSido').val();
// 	if(searchData.serchOption == 'PSC_004') searchData.serchVal    = $('#searchMajor').val();
// 	if(searchData.serchOption == 'PSC_005') searchData.serchVal    = $('#searchProgress').val();
// 	if(searchData.serchOption == '')        searchData.serchVal    = '';
// 	return searchData;
// }
//
// const svcApplyEventInit  = function(){
//
// 	//검색 조건 구분 onchange 이벤트
// 	$('#piSearchCondiction').on('change',e=>{
// 		$('.searchValue').hide();
// 		if(e.target.value == '') $('#searchText').show();
// 		if(e.target.value == 'PSC_001')  $('#searchText').show();
// 		if(e.target.value == 'PSC_002')  $('#searchText').show();
// 		if(e.target.value == 'PSC_003'){ $('#searchSido').show(); $('#searchSigungu').show(); $('#searchSidoMent').show();}
// 		if(e.target.value == 'PSC_004')  $('#searchMajor').show();
// 		if(e.target.value == 'PSC_005')  $('#searchProgress').show();
// 	});
//
// 	//chekbox all 선택 이벤트
// 	$('#allCheck').on('change',e=>{
// 		if(e.currentTarget.checked){
// 			$('.tbCheck').prop('checked',true)
// 		}else{
// 			$('.tbCheck').prop('checked',false)
// 		}
// 	});
//
// 	//검색 버튼
// 	$('#searchBtn').on('click',e=>{
// 		svcApplyList();
// 	})
//
// 	$('#searchText').keydown(e=>{
// 		if(e.keyCode==13)$('#searchBtn').click();
// 	})
//
// 	//저장 버튼
// 	$('#saveBtn').on('click',e=>{
// 		let checkedItem = $('.tbCheck').filter((i,e)=>e.checked);
// 		if(checkedItem.length <1){
// 			cmmAlert('선택목록이 없습니다.');
// 			return;
// 		}
// 		cmmConfirm('저장 하시겠습니까?',e=>{
// 			let saveArray = []
// 			checkedItem.each((i,item)=>{
// 				let saveItem={};
// 				let trEl = $(item).parent().parent();
// 				saveItem.serviceApplyNo = trEl.attr('id');
// 				saveItem.mngNo          = trEl.find('#choiseMng').val();
// 				saveItem.mbrNo          = $(item).data().mbrNo
// 			saveArray.push(saveItem);
// 			})
// 			comAjax(apiUrl + "/api/piservice/updateSvcApply",{data:{
// 				saveArray :saveArray
// 			}}).then(e=>{
// 				if(e.rsData.response_code=='000'){
// 					cmmAlert('저장되었습니다.',{
// 					callback : ()=>{
// 						let pageNum = $('#pcPaging a.active').val();
// 						svcApplyList(pageNum);
// 					}
// 				});
// 				}
//
// 			});
//
//
//
// 		});
//
// 	});
// }