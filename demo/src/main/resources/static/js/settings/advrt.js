// const advrtList = {
// 	/**
// 	 * 페이징 컴포넌트
// 	 */
// 	pagingCompo: undefined,
// 	/**
// 	 * 리스트 조회 parameter
// 	 */
// 	param: {
// 		pageNo: 1,
// 		pageSize: 10,
// 		removeAdvrtList: []
// 	},
// 	/**
// 	 * initialize
// 	 */
// 	init: () => {
// 		// 버튼 이벤트 바인딩
// 		document.getElementById("previewBtn").addEventListener("click", () => advrtPreviewPopup());
// 		document.getElementById("newBtn").addEventListener("click", () => pageMove('/settings/advrtDtl', {jobType:'insert', advrtNo:0}));
// 		document.getElementById("removeBtn").addEventListener("click", () => advrtList.removeAdvrtList());
//
// 		advrtList.pagingCompo = new pagingComponent(document.querySelector(".pagination"),10);
// 		advrtList.getAdvrtList();
// 	},
// 	/**
// 	 * 광고 목록 조회
// 	 */
// 	getAdvrtList: async (pageNo = 1) => {
// 		advrtList.param.pageNo = pageNo;
//
// 		let searchOption = {
// 			type: "get",
// 			data: advrtList.param
// 		}
// 		const res = await comAjax(apiUrl + "/api/advrt/getAdvrtList",searchOption);
//
// 		let html = ``;
// 		if(res.rsData.response_code === "000"){
// 			for(const item of res.rsData.data) {
// 				html += `<tr>`;
// 				html += 	`<td><input id=${item.advrtNo} type="checkbox" class="chk"></td>`;
// 				html += 	`<td>${item.advrtRank}</td>`;
// 				html += 	`<td><a class="click-tag" href="#" onclick="pageMove('/settings/advrtDtl', {jobType:'update', advrtNo:${item.advrtNo}})">${item.description}</a></td>`;
// 				html += 	`<td>${item.advrtStartDt.substr(0,4) + "-" + item.advrtStartDt.substr(4,2) + "-" + item.advrtStartDt.substr(6,2)}</td>`;
// 				html += 	`<td>${item.advrtEndDt.substr(0,4) + "-" + item.advrtEndDt.substr(4,2) + "-" + item.advrtEndDt.substr(6,2)}</td>`;
// 				html += 	`<td><a class="click-tag" href="${item.linkUrl}" target="_blank">${item.linkUrl}</a></td>`;
// 				html += 	`<td>${item.regDt}</td>`;
// 				html += `</tr>`;
// 			}
// 		}else{
// 			res.rsData.total_count = 0;
// 			html += `<tr>`;
// 	        html += `    <td colspan="7"><div class="none">검색된 광고목록이 없습니다.</div></td>`;
// 	        html += `</tr>`;
// 		}
// 		document.getElementById('advrtListTable').querySelector("tbody").innerHTML = html;
// 		document.querySelector(".count").innerHTML = `전체 <em>${res.rsData.total_count}</em>건`;
//
// 		$(".chk").on("click", () => {
// 			if($(".chk").length === $(".chk:checked").length) $("#selectAll").prop("checked", true);
// 			else $("#selectAll").prop("checked", false);
// 		});
//
// 		advrtList.pagingCompo.pageNavi(pageNo, res.rsData.total_count, advrtList.getAdvrtList);
// 	},
// 	/**
// 	 * 광고 삭제
// 	 */
// 	removeAdvrtList: () => {
// 		if($(".chk:checked").length) {
// 			cmmConfirm('선택된 항목을 삭제하시겠습니까?', () => {
//
// 				document.querySelectorAll(".chk:checked").forEach(item=> advrtList.param.removeAdvrtList.push(item.id));
//
// 				let searchOption = {
// 					data: advrtList.param
// 				}
//
// 				comAjax(apiUrl + "/api/advrt/removeAdvrtList",searchOption).then(response => {
// 					if(response.rsData.response_code === "901") return;
// 					const option = {
// 						callback:()=>{
// 							advrtList.param.removeAdvrtList = [];
// 							document.getElementById("selectAll").checked = false;
// 							advrtList.getAdvrtList();
// 						}
// 					};
// 					cmmAlert("삭제가 완료되었습니다.", option);
// 				});
// 			});
// 		}else{
// 			advrtList.param.removeAdvrtList = [];
// 			cmmAlert('선택된 항목이 없습니다.',{icon:'warning'});
// 		}
// 	}
// }
//
// const advrtDtl = {
// 	/**
// 	 * parameter
// 	 */
// 	param: {
// 		jobType: null,
// 		advrtNo: 0,
// 		advrtRank: null,
// 		advrtStartDt: null,
// 		advrtEndDt: null,
// 		linkUrl: null,
// 		imageChangeYn: "N",
// 		fileKey: null
// 	},
// 	/**
// 	 * initialize
// 	 */
// 	init: () => {
// 		advrtDtl.param.jobType = pageMoveData?.jobType;
// 		advrtDtl.param.advrtNo = pageMoveData?.advrtNo;
//
// 		//버튼 이벤트 바인딩
// 		document.getElementById("cancleBtn").addEventListener("click",()=>pageMove('/settings/advrtList'));
// 		document.getElementById("saveBtn").addEventListener("click",()=>advrtDtl.saveAdvrt());
// 		document.getElementById("imageFile").addEventListener("change",e=>advrtDtl.previewImage(e.target));
//
// 		if(advrtDtl.param.jobType === "update") advrtDtl.getAdvrtDtl();
// 	},
// 	/**
// 	 * 저장 Function
// 	 */
// 	getAdvrtDtl: async () => {
// 		let searchOption = {
// 			type: "get",
// 			data: advrtDtl.param
// 		}
// 		const res = await comAjax(apiUrl + "/api/advrt/getAdvrtDtl",searchOption);
// 		const data = res.rsData.data;
// 		document.getElementById("previewImg").src = `/uploadImg${data.profileImg}`;
// 		document.getElementById("advrtRank").value = data.advrtRank;
// 		document.getElementById("advrtStartDt").value = data.advrtStartDt;
// 		document.getElementById("advrtEndDt").value = data.advrtEndDt;
// 		document.getElementById("description").value = data.description;
// 		if(data.linkUrl) document.getElementById("linkUrl").value = data.linkUrl;
// 		advrtDtl.param.advrtNo = data.advrtNo;
// 		advrtDtl.param.fileKey = data.fileKey;
// 	},
// 	/**
// 	 * 저장 Function
// 	 */
// 	saveAdvrt: () => {
// 		if(!document.getElementById("previewImg").src){
// 			cmmAlert(`이미지 파일은 필수 입력값입니다.`, {icon:"warning"});
// 			return;
// 		}
//
// 		const required = document.querySelectorAll(".required");
//
// 		for(const item of required){
// 			if(item.id !== "linkUrl"){
// 				const option = {
// 					callback:()=>{
// 						item.focus();
// 					},
// 					icon:"warning"
// 				};
// 				if(!item.value){
// 					cmmAlert(`${item.parentElement.previousElementSibling.textContent}은(는) 필수 입력값입니다.`, option);
// 					return;
// 				}
// 			}
//
// 			advrtDtl.param[item.id] = item.value
// 		}
//
// 		cmmConfirm('광고를 저장하시겠습니까?', () => {
// 			const formData = new FormData();
// 			if(advrtDtl.param.imageChangeYn === "Y") {
// 				formData.append("imageFile", document.getElementById("imageFile").files[0]); // 이미지 변경시 프로필이미지 전송
// 			}
//
// 			formData.append('paramList', new Blob([ JSON.stringify(advrtDtl.param) ], {type : "application/json"}));
//
// 			$.ajax({
// 				type	: "POST",
// 				enctype: "multipart/form-data",
// 				url		: apiUrl + "api/advrt/saveAdvrt",
// 		 		data  : formData,
// 				processData : false,
// 				cache : false,
// 				contentType: false,
// 				dataType	: "json",
// 				success	: response =>{
// 					if(response.response_code === "901") {
// 						modalClose();
// 						errorAlert();
// 						return;
// 					}
// 					const option = {
// 						callback:()=>{
// 							pageMove('/settings/advrtList');
// 						}
// 					};
// 					cmmAlert("저장이 완료되었습니다.", option);
// 				},
// 				error	: ()=>errorAlert()
// 			});
// 		});
// 	},
// 	/**
// 	 * 이미지 미리보기 Function
// 	 */
// 	 previewImage: file => {
// 		if (file.files && file.files[0]) {
// 			const reader = new FileReader();
// 			reader.onload = e => {
// 				document.getElementById('previewImg').src = e.target.result;
// 			};
// 			reader.readAsDataURL(file.files[0]);
// 			advrtDtl.param.imageChangeYn = "Y";
// 		}
// 	}
// }