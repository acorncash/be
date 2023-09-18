// /**
//  *
//  */
//
// $(()=>{
// 	$("#searchContent").on("keyup", e =>{
// 		if(e.keyCode === 13) boardSearch();
// 	});
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
//
// 	const searchData = JSON.parse(sessionStorage.getItem("searchData"));
// 	const prev = sessionStorage.getItem("prev");
//
// 	let pageNo = 1;
// 	if(prev && prev == "boardDtl"){
// 		pageNo = searchData.pageNo;
// 		$("#searchSe").val(searchData.searchSe);
// 		$("#searchContent").val(searchData.searchContent);
// 	}
//
// 	boardSearch(pageNo);
// });
//
// const boardSearch =async function(pageNo=1){
// 	let list  = await boardListSearch(pageNo);
// 	let totalCount = boardListView(list);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCount,boardSearch);
// }
//
// /**
//  * @function : publicListSearch
//  * @param    : {json} data 조회 내용
//  * @return   : x
//  * @target   : publicInvitation
//  * @etc      : public 목록 데이터 조회
//  * */
// const boardListSearch =function(pageNo=1){
// 	/*type : Array*/
// 	let searchData = {
// 		pageNo: pageNo
// 		, pageSize: 10
// 		, searchSe: $("#searchSe").val()
// 		, searchContent: $("#searchContent").val().replaceAll(" ", "")
// 		, boardSe: boardSe
// 	};
//
// 	sessionStorage.setItem("searchData", JSON.stringify(searchData));
//
// 	/*etc : 데이터 가져오는 restApi*/
// 	return comAjax(apiUrl + "/api/boardList/getBoardList",{type:"get", data:searchData});
// }
//
// /**
//  * @function : publicListView
//  * @param    : {jsonArray} dataList : 초빙공고 목록 리스트
//  * @return   : x
//  * @target   : publicInvitation
//  * @etc      : 초빙공고 목록 조회 및 화면에 그리기
//  * */
// const boardListView = function(dataList){
//
// 	if(dataList.rsData.response_code === "201"){
// 		$(".count").html(`전체 <em>0</em>건`);
// 		$("#boardListTable > tbody").html(`<tr><td colspan="${boardSe === "N" ? 8 : 6}"><div class="none">목록이 없습니다.</div></td></tr>`);
// 		return 0;
// 	}
//
// 	let html = ``;
//
// 	if(boardSe === "N"){
// 		$(dataList.rsData.data).each((idx, item) => {
// 			html += `<tr>`;
// 		    html += `    <td>${item.rnum}</td>`;
// 		    html += `    <td class="text-left"><a class="click-tag" href="#" onclick="pageMove('/settings/noticeDtl', {boardNo:${item.boardNo}, boardSe: \'${boardSe}\'})">${item.title}</a>${item.fileKey ? ' <i class="uil-link"></i>' : ''}</td>`;
// 		    html += `    <td>${item.startDt}</td>`;
// 		    html += `    <td>${item.endDt}</td>`;
// 		    if(item.showYn == 'Y'){
// 		    	html += `    <td><span class="badge badge-soft-primary">게시중</span></td>`;
// 		    } else {
// 				html += `    <td><span class="badge badge-soft-danger">종료</span></td>`;
// 			}
// 			if(item.flagYn == 'Y'){
// 		    	html += `    <td><span class="badge badge-soft-info">예</span></td>`;
// 		    } else {
// 				html += `    <td><span class="badge badge-soft-danger">아니오</span></td>`;
// 			}
// 			html += `    <td>${item.updDt}</td>`;
// 		    html += `    <td>${item.regName}</td>`;
// 		    html += `</tr>`;
// 		});
// 	}else{
// 		$(dataList.rsData.data).each((idx, item) => {
// 			html += `<tr>`;
// 		    html += `    <td>${item.rnum}</td>`;
// 		    html += `    <td class="text-left"><a class="click-tag" href="#" onclick="pageMove('/settings/questionDtl', {boardNo:${item.boardNo}, boardSe: \'${boardSe}\'})">${item.title}</a>${item.fileKey ? ' <i class="uil-link"></i>' : ''}</td>`;
// 		    if(item.flagYn == 'Y'){
// 		    	html += `    <td><span class="badge badge-soft-success">예</span></td>`;
// 		    } else {
// 				html += `    <td><span class="badge badge-soft-primary">아니오</span></td>`;
// 			}
// 			if(item.answerYn == 'Y'){
// 		    	html += `    <td><span class="badge badge-soft-info">예</span></td>`;
// 		    } else {
// 				html += `    <td><span class="badge badge-soft-danger">아니오</span></td>`;
// 			}
// 			html += `    <td>${item.updDt}</td>`;
// 		    html += `    <td>${item.regName}</td>`;
// 		    html += `</tr>`;
// 		});
// 	}
//
// 	$(".count").html(`전체 <em>${dataList.rsData.total_count}</em>건`);
// 	$("#boardListTable > tbody").html(html);
//
// 	return dataList.rsData.total_count ;
// }