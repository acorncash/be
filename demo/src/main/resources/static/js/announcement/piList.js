// /**
//  *
//  */
//
// let loginInfo = {};
// $(document).ready(e=>{
// 	pagingCompo = new pagingComponent($('.pagination').get(0),8);
// 	codeInit();
// 	eventInit();
// 	piListInit();
// })
//
// const piListInit =async function(){
// 	let resultInfo= await  comAjax(apiUrl + "/api/member/getLoginInfo",{type:'get'});
// 	loginInfo = resultInfo.rsData.data;
// 	piListSearch();
// }
//
//
// const piListSearch  =async function(pageNo = 1){
// 	$('.col-table tbody').html('<tr><td colspan="13"><div class="none">검색중.</div></td></tr>');
// 	$('.utility .count em').text('0');
// 	let piList = await piListSearchAction(pageNo);
// 	let total  = piListSearchView(piList);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/total,piListSearch);
// }
//
// const piListSearchAction  = function(pageNo = 1){
// 	let searchData =getSearchCondiction();
// 	searchData.pageNo = pageNo;
// 	searchData.pageSize = 8;
// 	searchData.mngNo = loginInfo.mngNo;
// 	searchData.mngAuth = loginInfo.mngAuth;
//
// //	/*etc : 데이터 가져오는 restApi*/
// 	return comAjax(apiUrl + "/api/piList/getPiAnnt",{type:"get", data:searchData});
// }
//
// const piListSearchView  = function(piList){
//
// 	let totalCount = piList.rsData.total_count;
// 	let piListDataList = piList.rsData.data;
// 	$('.col-table tbody').children().remove();
// 	$('.utility .count em').text(totalCount);
//
// 	if(totalCount< 1 || totalCount == undefined ){
// 		$('.col-table tbody').html('<td colspan="13"><div class="none">검색된 결과가 없습니다.</div></td>');
// 		return totalCount;
// 	}
// 	let piListTemplet = `
// 		<tr>
//             <td><input class ="check" type="checkbox"></td>
//             <td id="anntNo"></td>
//             <td id="intranetAnntNo"></td>
//             <td id="title" class="text-left"><a class="click-tag" type="button"></a></td>
//             <td id="hospitalNm"></td>
//             <td id="sidoNm"></td>
//             <td id="majorNm"></td>
//             <td id="payNm"></td>
//             <td id="mngNm"></td>
//             <td id="regDt"></td>
//             <td id="deadline"></td>
//             <td id="anntProg">
//                 <div class="btn-group">
//                     <a type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
//                     <div class="dropdown-menu dropdown-menu-right">
//                         <span value="ing" class="badge badge-soft-info ing">게시중</span>
//                         <span value="end" class="badge badge-soft-secondary end">마감</span>
//                     </div>
//                 </div>
//             </td>
//         </tr>`;
// 	for(let piItem of piListDataList){
// 		let piListEl = $(piListTemplet)
// 		$(piListEl).data(piItem);
// 		$('#anntNo',piListEl).text(piItem.anntNo);
// 		$('#intranetAnntNo',piListEl).text(piItem.intranetAnntNo);
// 		$('#title a',piListEl).html(piItem.title);
// 		$('#title a',piListEl).after(`<span type="button" value="ing" class="badge badge-soft-info ing">미리보기</span>`);
// 		$('#hospitalNm',piListEl).text(piItem.hospitalNm);
// 		$('#sidoNm',piListEl).text(piItem.sidoNm);
// 		$('#majorNm',piListEl).text(piItem.majorNm);
// 		$('#payNm',piListEl).text(piItem.payNm);
// 		$('#mngNm',piListEl).text(piItem.mngNm);
// 		$('#regDt',piListEl).text(piItem.regDt);
// 		if(piItem.anntProg == 'ing'){
// 			$('#anntProg a',piListEl).html(`<span value="ing" class="badge badge-soft-info ing">게시중</span>`);
// 		}else if(piItem.anntProg == 'end'){
// 			$('#anntProg a',piListEl).html('<span value="end" class="badge badge-soft-secondary end">마감</span>');
// 		}
// 		if(piItem.deadline == ''){
// 			$('#deadline',piListEl).text("채용까지");
// 		}else if(piItem.anntProg =='ing'){
// 			$('#deadline',piListEl).text(yyyMMddView(piItem.deadline));
// 		}else if(piItem.anntProg =='end'){
// 			$('#deadline',piListEl).text("마감");
// 		}
//
// 		$('#title a',piListEl).on('click',e=>{
//
// 			comAjax(apiUrl+'/api/piList/checkAnntAuth',{type:'get',data:{anntNo:piItem.anntNo}}).then(result=>{
// 				if(result.rsData.response_code == '103'){
// 					cmmAlert('수정 권한이 없습니다.',{icon:'warning'});
// 					return
// 				}else if(result.rsData.response_code == '901'){
// 					return;
// 				}else{
// 					pageMove('/announcement/piListUpdate',{anntNo:piItem.anntNo})
// 				}
// 			})
//
//
//
// 		})
// 		$('#title span',piListEl).on('click',e=>{piPreviewPopup(piItem.anntNo);})
//
// 		$('#anntProg [value="ing"]',piListEl).on('click',e=>{
// 			$('#anntProg a',piListEl).html(`<span value="ing" class="badge badge-soft-info ing">게시중</span>`);
// 		})
// 		$('#anntProg [value="end"]',piListEl).on('click',e=>{
// 			$('#anntProg a',piListEl).html('<span value="end" class="badge badge-soft-secondary end">마감</span>');
// 		})
// 		$('.check',piListEl).data(piItem);
//
// 		$('.col-table tbody').append(piListEl);
// 	}
// 	return totalCount;
// }
//
//
// const codeInit =  function(){
// 	getComCode('HOS_REGION','2','SR_02');
// 	getMajorCode('SR_03');
//
// }
//
// const eventInit = function(){
// 	$('#searchGroup').on('change',e=>{
// 		let value = e.target.value ;
// 		$('.searchCondiction').hide();
// 		$('#'+value).show();
// 	})
//
// 	$('#searchBtn').on('click',e=>{
// 		piListSearch();
// 	})
//
// 	$('#searchOrder').on('change',e=>{
// 		piListSearch();
// 	})
//
// 	$('#SR_01').keydown(e=>{
//    	 if(e.keyCode == 13) piListSearch();
// 	})
// 	$('#SR_06').keydown(e=>{
//    	 if(e.keyCode == 13) piListSearch();
// 	})
// 	$('#SR_05').keydown(e=>{
//    	 if(e.keyCode == 13) piListSearch();
// 	})
//
// 	$('#saveBtn').on('click',e=>{
// 		cmmConfirm('사용자 계정으로 저장하시겠습니까?<br>사용자가 등록한 공고만 변경 가능합니다.',function(){
//
// 			let checkedItem = $('.check').filter((index,item)=>item.checked);
//
// 			let updateList = [];
//
// 			checkedItem.each((index,item)=>{
// 				let trItem = item.parentElement.parentElement;
// 				let chagneDeadline = $("#anntProg a span",trItem).attr('value');
// 				let data = $(item).data();
// 				let updateMap = {
// 					  anntNo : data.anntNo
// 					,chagneDeadline : chagneDeadline
// 					,changeValue    :''
// 				}
// 				updateList.push(updateMap);
// 			})
//
// 			if(updateList.length <1 ){
// 				cmmAlert('선택된 공고가 없습니다.');
// 				return;
// 			}
//
// 			comAjax(apiUrl+'/api/piList/updateProgPiAnnt',{data:updateList}).then(result=>{
// 				if(result.rsData.response_code == '103'){
// 					cmmAlert('등록 불가능한 공고가 있습니다.',{icon:'warning'});
// 					return
// 				}
//
//
// 				let activeItem = $('.pcPaging a').filter((index,item)=> $(item).hasClass('active') );
// 				let item = activeItem.attr('value');
// 				piListSearch(item);
//
// 			})
//
//
//
//
// 		})
// 	})
//
//
// }
//
//
//
// const getSearchCondiction = function(){
// 	let searchCondiction = {
// 		 searchGroup : ''
// 		,searchVal  : ''
// 		,searchOrder : ''
// 	}
// 	let searchGroup = $('#searchGroup').val();
// 	let searchVal   = $('#'+searchGroup).val();
//
// 	searchCondiction.searchGroup = searchGroup;
// 	searchCondiction.searchVal   = searchVal;
// 	searchCondiction.searchOrder = $('#searchOrder').val();
// 	return  searchCondiction;
// }
//
