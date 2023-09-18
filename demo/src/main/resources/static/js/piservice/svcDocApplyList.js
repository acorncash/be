// /**
//  * @file : svcApplyList.js
//  */
//
//  $(document).ready(e=>{
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	docApplyInit();
// });
//
//
// function docApplyInit(){
// 	cntListView();
// 	getDocSvcApply();
// };
//
//
// function cntListView(){
// 	comAjax(apiUrl + "/api/docPiSvc/getCntList",{type:"get"}).then(result=>{
// 		$('#totalCnt').text(result.rsData.data.totCnt);
// 		$('#dayCnt').text(result.rsData.data.dayCnt);
// 	});
//
// };
//
// async function getDocSvcApply(pageNo="1"){
// 	let docSvcApplyList  = await searchDocSvcApply(pageNo);
//
// 	let totalCnt = docSvcApplyView(docSvcApplyList );
// 	 pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCnt,getDocSvcApply);
// 	function searchDocSvcApply(pageNo){
// 		let searchData ={};
// 		searchData.pageNo = pageNo;
// 		searchData.pageSize = "10";
// 		/*etc : 데이터 가져오는 restApi*/
// 		return comAjax(apiUrl + "/api/docPiSvc/getDocSvcApply",{data:searchData});
// 	}
//
// 	function docSvcApplyView(docSvcApplyList){
// 		$("#listTable > tbody").children().remove();
// 		const viewList = docSvcApplyList.rsData.data;
// 		$(".count").html(`전체 <em>${viewList.totCnt}</em>건`);
// 		if(viewList.docSvcApplyList.length ==0){
// 			$("#listTable > tbody").html(`<tr><td colspan="13"><div class="none">검색된 서비스가 없습니다.</div></td></tr>`);
// 			return 0;
// 		}
// 		for(let item of viewList.docSvcApplyList){
// 			 const templet = `<tr>
// 	                            <td >${item.MBR_NM}</td>
// 	                            <td >${item.DOC_ANNT_NO}</td>
// 	                            <td >${item.DOC_ANNT_DOCNM}</td>
// 	                            <td >${item.MNG_NM}</td>
// 	                            <td >${item.APPLY_DATE}</td>
//                         	</tr>`
//
//              const $templet = $(templet);
//
//         	$("#listTable > tbody").append($templet);
//
// 		}
//
// 		return viewList.totCnt;
// 	}
// };
//
//
//
