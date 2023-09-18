// const counselingList = {
// 	/**
// 	 * 페이징 컴포넌트
// 	 */
// 	pagingCompo: undefined,
// 	/**
// 	 * 리스트 조회 parameter
// 	 */
// 	param: {
// 		searchContent: '',
// 		searchSe: '',
// 		pageNo: 1,
// 		pageSize: 10
// 	},
//
// 	init: () => {
// 		counselingList.pagingCompo = new pagingComponent($('.pagination').get(0),10);
//
// 		document.getElementById("searchContent").addEventListener("keyup", e=> {
// 			if(e.keyCode === 13)counselingList.getList();
// 		});
// 		document.getElementById("searchBtn").addEventListener("click", ()=> counselingList.getList());
// 		document.getElementById("writeBtn").addEventListener("click", ()=> pageMove("/settings/counselingWrite", {jobType:"insert"}));
//
// 		counselingList.getList();
// 	},
// 	getList: async (pageNo=1) => {
// 		counselingList.param.pageNo = pageNo;
// 		counselingList.param.searchSe = document.getElementById("searchSe").value;
// 		counselingList.param.searchContent = document.getElementById("searchContent").value;
//
// 		let searchOption = {
// 			type: "get"
// 			, data: counselingList.param
// 		}
//
// 		const res = await comAjax(apiUrl + "/api/counseling/getCounselingList",searchOption);
// 		let html = ``;
// 		let totalCnt = 0;
// 		if(res.rsData.response_code === "000"){
// 			totalCnt = res.rsData.total_count;
// 			res.rsData.data.forEach((item) => {
// 				html += `
// 					<tr>
// 						<td>${item.rnum}</td>
// 						<td class="title"><a href="#" onclick="pageMove('/settings/counselingDtl',{counselNo: ${item.counselNo}, regId:${item.regId}})"><strong>${item.title}</strong></a> ${item.fileKey ? '<i class="uil-link"></i>' : ''}</td>
// 						<td>${item.views}</td>
// 						<td>${item.regDt}</td>
// 						<td>${item.regNm}</td>
// 					</tr>`;
// 			});
// 		}else{
// 			html += `
// 				<tr>
// 	        		<td colspan="5"><div class="none">검색된 항목이 없습니다.</div></td>
// 	        	</tr>`;
// 		}
//
// 		document.querySelector(".count").innerHTML = `전체 <em>${totalCnt}</em>건`;
// 		document.getElementById("counselingListTable").innerHTML = html;
// 		counselingList.pagingCompo.pageNavi(pageNo, totalCnt, counselingList.getList);
// 	}
//
// }
//
// $(()=>{
// 	counselingList.init();
// })