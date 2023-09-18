// let searchList = [];
//
// $(document).ready(e=>{
// 	pagingCompo = new pagingComponent($('.pagination').get(0),5);
//
// 	docPiListViewInit();
// 	docPiListSearch();
// })
//
//
//
// function docPiListViewInit(){
// 	//공통 코드
// 	getComCode('HOS_REGION','2','SR_02');
// 	//공통 코드
// 	getMajorCode('SR_03');
// 	getMajorCode('SR_04');
// 		//담당자 선택
// 	comAjax(apiUrl + "/api/code/getIntraAdminCode",{type:"get"}).then(result=>{
// 		let cdList = result.rsData.data;
// 		for (let cdItem of cdList){
// 			$('#'+'SR_07').append(`<option value = '${cdItem.cd}'>${cdItem.cdNm}</option>`);
// 		}
// 	});
//
// 	//구분 검색-변경 이벤트
// 	$('#searchGroup').on('change',searchGb=>{
// 		let chgValue = searchGb.currentTarget.value;
// 		$('#searchInput .searchCondiction').each((index,item)=>{
// 			if(item.id == chgValue) {
// 				$(`#${item.id}`).show();
// 				$(`#${item.id}`).val('');
// 			}else{
// 				$(`#${item.id}`).hide();
// 				$(`#${item.id}`).val('');
// 			}
// 		})
// 	});
//
//
//
// 	$('#saveBtn').on('click',e=>{
// 		let checkedItem = $('.check').filter((index,item)=>item.checked).get();
// 		let paramItem = [];
//
// 		if(checkedItem.length == 0){
// 			cmmAlert('선택된 항목이 없습니다.',{icon:'warning'});
// 			return;
// 		}
//
// 		for(let saveItem of checkedItem){
// 			let docAnntNo = saveItem.parentElement.parentElement.querySelector('#docAnntNo').textContent;
// 			let useYn = saveItem.parentElement.parentElement.querySelector('#anntProg');
// 			    useYn = useYn.querySelector('a span').getAttribute('value')
// 			paramItem.push({
// 				docAnntNo,
// 				useYn
// 			});
// 		}
//
//
// 		paramItem = paramItem.filter(search =>{
// 			if(searchList.some(somItem=>somItem.docAnntNo==search.docAnntNo && somItem.useYn!=search.useYn )){
// 				return search;
// 			}
// 		})
//
//
//
//
//
// 		cmmConfirm('저장하시겠습니까?',()=>{
// 			comAjax(apiUrl+'api/piList/updateDocPiStat',{data:paramItem}).then(result=>{
// 				if(result.rsData.response_code == '000'){
// 					cmmAlert('저장되었습니다.',{callback:function(){
// 						$('.all-check').prop('checked',false);
// 						docPiListSearch();
// 					}});
// 				}
// 			});
// 		})
// 	})
//
// 	$('#searchBtn').click(e=>docPiListSearch());
//
//
// }
//
//
// const docPiListSearch  =async function(pageNo = 1){
// 	$('.col-table tbody').html('<tr><td colspan="12"><div class="none">검색중.</div></td></tr>');
// 	$('.utility .count em').text('0');
// 	let piList = await docPiListSearchAction(pageNo);
// 	let total  = docPiListSearchView(piList);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/total,docPiListSearch);
// }
//
//
// const docPiListSearchAction  = function(pageNo = 1){
// 	let searchData =getSearchCondiction();
// 	searchData.pageNo = pageNo;
// 	searchData.pageSize = 5;
// //	/*etc : 데이터 가져오는 restApi*/
// 	return comAjax(apiUrl + "/api/piList/getDocPiAnnt",{type:"get", data:searchData});
// }
//
// const docPiListSearchView  = function(piList){
// 	let totalCount = piList.rsData.total_count;
// 	let piListDataList = piList.rsData.data;
// 	$('.col-table tbody').children().remove();
// 	$('.utility .count em').text(totalCount);
//
// 	if(totalCount< 1 || totalCount == undefined ){
// 		$('.col-table tbody').html('<td colspan="12"><div class="none">검색된 결과가 없습니다.</div></td>');
// 		return totalCount;
// 	}
//
// 	searchList = piListDataList;
// 	for(let piItem of piListDataList){
// 		let piListTemplet = `
// 		<tr>
//             <td><input class ="check" type="checkbox"></td>
//             <td id="docAnntNo">${piItem.docAnntNo??''}</td>
//             <td id="intraDocNo">${piItem.intraDocNo??''}</td>
//             <td id="docAnntTitle" class="text-left">
//
//
//             <a style="width:80%; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" class="click-tag" type="button">${piItem.docAnntTitle??''}</a>
//
//             </td>
//             <td id="docAnntDocnm">${piItem.docAnntDocnm??''}</td>
//             <td style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" id="docAnntHopAreaNm" title="${piItem.docAnntHopAreaNm??''}">${piItem.docAnntHopAreaNm??''}</td>
//             <td style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" id="docAnntHopMajorNm" title="${piItem.docAnntHopMajorNm??''}">${piItem.docAnntHopMajorNm??''}</td>
//             <td style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" id="docAnntMajorNm"title="${piItem.docAnntMajorNm??''}">${piItem.docAnntMajorNm??''}</td>
//             <td id="docAnntCareer">${piItem.docAnntCareer??''}</td>
//             <td id="anntRegDt">${piItem.anntRegDt??''}</td>
//             <td id="regNm">${piItem.regNm??''}</td>
//             <td id="anntProg">
//                 <div class="btn-group">
//                     <a type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
//                     <div class="dropdown-menu dropdown-menu-right">
//                         <span value="Y" class="badge badge-soft-info ing">게시중</span>
//                         <span value="N" class="badge badge-soft-secondary end">마감</span>
//                     </div>
//                 </div>
//             </td>
//         </tr>`;
//
//
//
// 		let piListEl = $(piListTemplet)
//
// 		if(piItem.useYn == 'Y'){
// 			$('#anntProg a',piListEl).html(`<span value="Y" class="badge badge-soft-info ing">게시중</span>`);
// 		}else if(piItem.useYn == 'N'){
// 			$('#anntProg a',piListEl).html('<span value="N" class="badge badge-soft-secondary end">마감</span>');
// 		}
// 		$('#docAnntTitle a',piListEl).after(`<span style="width:20%; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" type="button" value="ing" class="badge badge-soft-info ing">미리보기</span>`);
//
// 		$('#docAnntTitle a',piListEl).on('click',e=>{
// 			comAjax(apiUrl+'/api/piList/checkDocAnntAuth',{type:'get',data:{docAnntNo:piItem.docAnntNo}}).then(result=>{
// 				if(result.rsData.response_code == '103'){
// 					cmmAlert('수정 권한이 없습니다.',{icon:'warning'});
// 					return
// 				}else if(result.rsData.response_code == '901'){
// 					return;
// 				}else{
// 					pageMove('/announcement/docPiListWrite',{docAnntNo:piItem.docAnntNo,stat:'U'});
// 				}
// 			})
// 		})
//
//
//
// 		$('#docAnntTitle span',piListEl).on('click',e=>{docPiPreviewPopup(piItem.docAnntNo);})
//
//
// 		$('#anntProg [value="Y"]',piListEl).on('click',e=>{
// 			$('#anntProg a',piListEl).html(`<span value="Y" class="badge badge-soft-info ing">게시중</span>`);
// 		})
// 		$('#anntProg [value="N"]',piListEl).on('click',e=>{
// 			$('#anntProg a',piListEl).html('<span value="N" class="badge badge-soft-secondary end">마감</span>');
// 		})
// 		$('.check',piListEl).data(piItem);
//
// 		$('.col-table tbody').append(piListEl);
// 	}
// 	return totalCount;
// }
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
