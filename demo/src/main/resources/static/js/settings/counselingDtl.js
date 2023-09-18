// const counselingDtl = {
// 	/**
// 	 * 페이징 컴포넌트
// 	 */
// 	pagingCompo: undefined,
// 	/**
// 	 * 리스트 조회 parameter
// 	 */
// 	param: {
// 		counselNo: null,
// 		counselCd: '',
// 		regId: null,
// 		jobType: 'N',
// 		pageNo:1,
// 		pageSize:7,
// 		commentNo: 0,
// 		content: '',
//
// 	},
// 	totalCommentCount:0,
// 	init: () => {
// 		counselingDtl.pagingCompo = new pagingComponent($('.pagination').get(0),7);
// 		counselingDtl.param.counselNo = pageMoveData.counselNo;
// 		counselingDtl.param.regId = pageMoveData.regId;
// 		document.getElementById("cancleBtn").addEventListener("click", () => pageMove("/settings/counselingList"));
// 		document.getElementById("applyBtn").addEventListener("click", () => counselingDtl.insertComment());
// 		counselingDtl.getCounselingDtl();
// 		counselingDtl.getCommentList();
// 	},
//
// 	getCounselingDtl: async () => {
// 		const searchOption = {
// 			type: "get",
// 			data: counselingDtl.param
// 		}
//
// 		const res = await comAjax(apiUrl+'/api/counseling/getCounselingDtl',searchOption);
// 		const data = res.rsData.data;
//
// 		if(data.counselCd === "ADMIN" && data.regId === data.mngNo){
// 			const modiBtn = document.getElementById("modiBtn");
// 			modiBtn.style.display = null;
// 			modiBtn.addEventListener("click", () => pageMove('/settings/counselingWrite',{counselNo: counselingDtl.param.counselNo, jobType:'update'}));
// 		}
//
// 		document.getElementById("regNm").textContent = data.regNm;
// 		document.getElementById("regDt").textContent = data.regDt;
// 		document.getElementById("views").textContent = data.views;
// 		document.getElementById("title").textContent = data.title;
// 		document.getElementById("contents").innerHTML = data.contents.replaceAll("\n","<br>");
//
// 		if(data.fileList){
// 			html = ``;
// 			data.fileList.forEach(item => {
// 				html += `
// 						<li>
// 							<a type="button" onclick="counselingDtl.fileDownload(\'${item.fileNo}\');">${item.originalName}</a>
// 							<em>[${counselingDtl.byteCalculation(item.fileSize)}]</em>
// 						</li>`;
// 			});
//
// 			document.getElementById("fileList").innerHTML = html;
// 		}
// 	},
// 	/**
// 	 * 댓글 가져오는 function
// 	 */
// 	getCommentList: async (pageNo = 1) => {
// 		counselingDtl.param.pageNo = pageNo;
//
// 		const searchOption = {
// 			type: "get",
// 			data: counselingDtl.param
// 		}
//
// 		const res = await comAjax(apiUrl+'/api/counseling/getCommentList',searchOption);
//
// 		let html = ``;
// 		let totalCnt = 0;
// 		if(res.rsData.response_code === "000"){
// 			totalCnt = res.rsData.total_count;
// 			res.rsData.data.forEach((item) => {
// 				html += `<div class="be-comment">
// 							<div class="be-img-comment">
// 								${item.path
// 									? `<img src="/uploadImg${item.path}" class="be-ava-comment">`
// 									: '<img src="/static/images/defaul_profile.png" class="be-ava-comment">'}
// 								${item.commentYn === "Y"
// 									? `<a href="#" class="del" onclick="counselingDtl.removeComment(${item.commentNo});return false;">댓글삭제</a>`
// 									: ``}
// 							</div>
// 							<div class="be-comment-content">
// 								<span class="be-comment-name">
// 									${item.regNm}
// 								</span>
// 								<span class="be-comment-time">
// 									<i class="fa fa-clock-o"></i>
// 									${item.regDt}
// 								</span>
// 								<p class="be-comment-text">
// 									${item.contents.replaceAll("\n","<br>")}
// 								</p>
// 							</div>
// 						</div>`;
// 			});
// 		}else{
// 			html += `<span class="none">등록된 댓글이 없습니다.</span>`;
// 		}
//
// 		counselingDtl.totalCommentCount = totalCnt;
// 		document.getElementById("commentList").innerHTML = html;
// 		document.getElementById("commentCount").textContent = `댓글 (${totalCnt})`;
// 		counselingDtl.pagingCompo.pageNavi(pageNo, totalCnt, counselingDtl.getCommentList);
// 	},
// 	fileDownload: fileNo => {
// 		let tempForm = $('<form></form');
// 		tempForm.append($('<input/>', {name: 'fileNo', value:fileNo }));
//
// 		tempForm.attr("action", apiUrl + "api/common/fileDownload");
// 		tempForm.attr("method", "POST");
// 		tempForm.attr("id", "tempForm");
// 		$(document.body).append(tempForm);
// 		tempForm.submit();
// 		document.getElementById("tempForm").remove();
// 	},
// 	/**
// 	 * 첨부파일 사이즈 구하는 function
// 	 */
// 	byteCalculation: bytes => {
// 		const byte = parseInt(bytes);
// 		const s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
// 		const e = Math.floor(Math.log(byte)/Math.log(1024));
// 		if(e == "-Infinity") return "0 "+s[0];
// 		else return (byte/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
// 	},
// 	/**
// 	 * 댓글 삭제
// 	 */
// 	removeComment: commentNo => {
// 		cmmConfirm('댓글을 삭제하시겠습니까?', () => {
// 			counselingDtl.param.commentNo = commentNo;
//
// 			const searchOption = {
// 				data: counselingDtl.param
// 			}
// 			comAjax(apiUrl+'/api/counseling/removeComment',searchOption).then(()=>{
// 				const totalCount = counselingDtl.totalCommentCount - 1;
// 				const pageNo = counselingDtl.param.pageNo;
// 				const pageSize = counselingDtl.param.pageSize;
//
// 				if(totalCount/pageSize > pageNo-1) counselingDtl.getCommentList(pageNo);
// 				else counselingDtl.getCommentList(pageNo-1);
// 			});
// 		});
// 	},
// 	/**
// 	 * 댓글 추가
// 	 */
// 	insertComment: () => {
// 		const content = document.getElementById("content")
// 		if(content.value){
// 			counselingDtl.param.content = content.value;
//
// 			const searchOption = {
// 				data: counselingDtl.param
// 			}
//
// 			comAjax(apiUrl+'/api/counseling/insertComment',searchOption).then(()=>{
// 				const totalCount = counselingDtl.totalCommentCount + 1;
// 				const pageSize = counselingDtl.param.pageSize;
//
// 				if(totalCount / pageSize > Math.floor(totalCount / pageSize)) counselingDtl.getCommentList(Math.floor(totalCount / pageSize) + 1);
// 				else counselingDtl.getCommentList(Math.floor(totalCount / pageSize));
// 				content.value = '';
// 				content.focus();
// 			});
// 		}else cmmAlert("댓글을 입력하세요.", {icon:"warning"});
// 	}
// }
//
// $(()=>{
// 	counselingDtl.init();
// })