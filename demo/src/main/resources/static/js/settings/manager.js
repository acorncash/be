// /**
//  *
//  */
//  const managerList = {
// 	/**
// 	 * 페이징 컴포넌트
// 	 */
// 	pagingCompo: undefined,
// 	/**
// 	 * 리스트 조회 parameter
// 	 */
// 	param: {
// 		searchSe: '',
// 		searchContent: '',
// 		pageNo: 1,
// 		pageSize: 10,
// 		removeManagerList: []
// 	},
//
// 	init: () => {
// 		document.getElementById("searchContent").addEventListener("keyup", e => {
// 			if(e.keyCode === 13) managerList.getManagerList();
// 		});
// 		document.getElementById("registBtn").addEventListener("click", () => {
// 			pageMove('/settings/managerDtl', {mngNo:'insert'});
// 		});
// 		document.getElementById("removeBtn").addEventListener("click", () => {
// 			managerList.removeManagerList();
// 		});
//
// 		managerList.pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 		managerList.getManagerList();
// 	},
// 	getManagerList: async (pageNo=1) => {
// 		managerList.param.pageNo = pageNo;
// 		managerList.param.searchSe = document.getElementById("searchSe").value;
// 		managerList.param.searchContent = document.getElementById("searchContent").value;
//
// 		let searchOption = {
// 			type: "get",
// 			data: managerList.param
// 		}
//
// 		const res = await comAjax(apiUrl + "/api/manager/getManagerList",searchOption);
// 		let html = ``;
// 		if(res.rsData.response_code === "000"){
// 			res.rsData.data.forEach((item) => {
// 				html += `<tr>`;
// 				html += 	`<td><input id=${item.mngNo} type="checkbox" class="chk"></td>`;
// 				html += 	`<td>${item.mngNo}</td>`;
// 				html += 	`<td>${item.mngId}</td>`;
// 				html += 	`<td>${item.mngAuthNm}</td>`;
// 				html += 	`<td>${item.mngRank}</td>`;
// 				html += 	`<td><a class="click-tag" href="#" onclick="pageMove('/settings/managerDtl', {mngNo:${item.mngNo}})">${item.mngNm}</a></td>`;
// 				html += 	`<td>${item.mngPhone}</td>`;
// 				html += 	`<td>${item.mngEmail}</td>`;
// 				html += `</tr>`;
// 			});
// 		}else{
// 			res.rsData.total_count = 0;
// 			html += `<tr>`;
// 	        html += `    <td colspan="8"><div class="none">검색된 관리자가 없습니다.</div></td>`;
// 	        html += `</tr>`;
// 		}
// 		document.getElementById('managerListTable').innerHTML = html;
// 		document.getElementsByClassName("count")[0].innerHTML = `전체 <em>${res.rsData.total_count}</em>건`;
//
// 		$(".chk").on("click", () => {
// 			if($(".chk").length === $(".chk:checked").length) $("#selectAll").prop("checked", true)
// 			else $("#selectAll").prop("checked", false)
// 		});
//
// 		managerList.pagingCompo.pageNavi(pageNo, res.rsData.total_count, managerList.getManagerList);
// 	},
// 	removeManagerList: () => {
// 		if($(".chk:checked").length) {
// 			cmmConfirm('선택된 항목을 삭제하시겠습니까?', () => {
//
// 				document.querySelectorAll(".chk:checked").forEach(item=> managerList.param.removeManagerList.push(item.id));
//
// 				let searchOption = {
// 					data: managerList.param
// 				}
//
// 				comAjax(apiUrl + "/api/manager/removeManagerList",searchOption).then(response => {
// 					if(response.rsData.response_code === "901") return;
// 					const option = {
// 						callback:()=>{
// 							managerList.param.removeManagerList = [];
// 							document.getElementById("selectAll").checked = false;
// 							managerList.getManagerList();
// 						}
// 					};
// 					cmmAlert("삭제가 완료되었습니다.", option);
// 				});
// 			});
// 		}else{
// 			managerList.param.removeManagerList = [];
// 			cmmAlert('선택된 항목이 없습니다.',{icon:'warning'});
// 		}
// 	}
// }
//
// const managerDtl = {
// 	/**
// 	 * 리스트 조회 parameter
// 	 */
// 	param: {
// 		mngNo: '',
// 		mngId: '',
// 		mngRank: '',
// 		mngNm: '',
// 		mngEmail: '',
// 		mngPhone: '',
// 		mngComment: '',
// 		currentPwd: '',
// 		newPwd: '',
// 		imageChangeYn: 'N',
// 		fileKey: 'N',
// 		jobType:'update',
// 		mngAuth:''
// 	},
//
// 	init: () => {
// 		if(pageMoveData.mngNo) managerDtl.param.jobType = pageMoveData.mngNo;
// 		if(managerDtl.param.jobType === "update"){ // 회원정보 수정 클릭시
// 			document.getElementById("row-tit").style.display = null;
// 			document.getElementById("row-table").style.display = null;
// 			document.getElementById("mngAuth").disabled = true;
//
// 			const removeBtn = document.getElementById("removeBtn");
// 			removeBtn.style.display = null;
// 			removeBtn.addEventListener("click", () => {
// 				managerDtl.removeManager();
// 			})
//
// 		}else if(managerDtl.param.jobType !== "insert"){ // 관리자 관리목록 통해서 접근시
// 			const resetBtn = document.getElementById("resetBtn");
// 			resetBtn.style.display = null;
// 			resetBtn.addEventListener("click", () => {
// 				managerDtl.resetPwd();
// 			})
// 		}
//
// 		const currentPwd = document.getElementById("currentPwd");
//
// 		document.getElementById("chkBtn").addEventListener("click", () => {
// 			if(currentPwd.value) {
// 				managerDtl.param.currentPwd = document.getElementById("currentPwd").value;
// 				managerDtl.checkPwd();
// 			}else {
// 				const option = {
// 					callback:()=>{
// 						currentPwd.focus();
// 					},
// 					icon:"warning"
// 				};
// 				cmmAlert("현재 비밀번호를 입력해주세요", option);
// 			}
// 		});
//
// 		document.getElementById("saveBtn").addEventListener("click", () => {
// 			managerDtl.saveDtlInfo();
// 		});
// 		document.getElementById("cancleBtn").addEventListener("click", () => {
// 			managerDtl.param.jobType === "update" ? pageMove("/member/memberList") : pageMove("/settings/managerList");
// 		});
// 		document.getElementById("imageFile").addEventListener("change", e => {
// 			managerDtl.previewImg(e.target);
// 		})
// 		if(managerDtl.param.jobType === "insert") document.getElementById("mngId").disabled = false;
// 		else managerDtl.getManagerDtl();
// 	},
// 	getManagerDtl: async () => {
// 		const searchOption = {
// 			type: "get",
// 			data: managerDtl.param
// 		}
//
// 		const res = await comAjax(apiUrl + "/api/manager/getManagerDtl",searchOption);
//
// 		if(res.rsData.data.path) document.getElementById("profileImg").src = res.rsData.data.path;
// 		document.getElementById("mngId").value = res.rsData.data.mngId;
// 		document.getElementById("mngRank").value = res.rsData.data.mngRank;
// 		document.getElementById("mngEmail").value = res.rsData.data.mngEmail;
// 		document.getElementById("mngPhone").value = res.rsData.data.mngPhone.replaceAll("-","");
// 		document.getElementById("mngNm").value = res.rsData.data.mngNm;
// 		document.getElementById("mngComment").value = res.rsData.data.mngComment;
// 		document.getElementById("mngAuth").value = res.rsData.data.mngAuth;
// 		managerDtl.param.mngNo = res.rsData.data.mngNo;
// 		if(res.rsData.data.mngProfileFilekey) managerDtl.param.fileKey = res.rsData.data.mngProfileFilekey;
// 	},
// 	checkPwd: () => {
// 		const searchOption = {
// 			type: "get",
// 			data: managerDtl.param
// 		}
//
// 		comAjax(apiUrl + "/api/manager/checkPwd",searchOption).then(res => {
// 			const resCd = res.rsData.response_code;
//
// 			if(resCd === "000") {
// 				const newPwd = document.getElementById("newPwd");
// 				const confirmPwd = document.getElementById("confirmPwd");
// 				const confirmMsg = document.getElementById("confirmMsg");
//
// 				document.getElementById("chkBtn").disabled = true;
// 				document.getElementById("currentPwd").disabled = true;
// 				newPwd.disabled = false;
// 				confirmPwd.disabled = false;
//
// 				confirmPwd.addEventListener("input", () => {
// 					if(newPwd.value === confirmPwd.value){
// 						confirmMsg.style.display = "none";
// 						newPwd.disabled = true;
// 						confirmPwd.disabled = true;
// 						managerDtl.param.newPwd = newPwd.value;
// 					}else confirmMsg.style.display = null;
// 				});
// 			}
// 			else if(resCd === "301") cmmAlert("비밀번호가 일치하지 않습니다.", {icon:"warning"});
// 		});
// 	},
// 	resetPwd: () => {
// 		cmmConfirm('해당회원의 비밀번호를 초기화 하시겠습니까?', () => {
// 			const searchOption = {
// 				data: managerDtl.param
// 			}
//
// 			comAjax(apiUrl + "/api/manager/resetPwd",searchOption).then(() => {
// 				cmmAlert("비밀번호 초기화가 완료되었습니다.");
// 			});
// 		});
// 	},
// 	saveDtlInfo:  () => {
// 		const item = document.querySelectorAll(".required");
// 		for(let i=0,ii=item.length; i<ii; i++){
// 			const option = {
// 				callback:()=>{
// 					item[i].focus();
// 				},
// 				icon:"warning"
// 			};
// 			if(item[i].id == "mngPhone"){
// 				if(item[i].value == "" || item[i].value.length !== 11){
// 					cmmAlert(item[i].placeholder, option);
// 					return;
// 				}else{
// 					managerDtl.param[item[i].id] = item[i].value.substr(0,3) + "-" + item[i].value.substr(3,4) + "-" + item[i].value.substr(7,4);
// 					continue;
// 				}
// 			}else if(item[i].value === ""){
// 				cmmAlert(item[i].placeholder, option);
// 				return;
// 			}
//
// 			managerDtl.param[item[i].id] = item[i].value;
// 		}
//
// 		if(managerDtl.param.jobType === "update"){
// 			const newPwd = document.getElementById("newPwd");
// 			const confirmPwd = document.getElementById("confirmPwd");
//
// 			if(document.getElementById("currentPwd").disabled && (newPwd.value === "" || newPwd.value !== confirmPwd.value)){
// 				cmmAlert("변경하실 비밀번호를 정확히 입력해주세요.", {icon:"warning"});
// 				return;
// 			}
// 		}
//
// 		cmmConfirm('회원정보를 저장하시겠습니까?', () => {
// 			const formData = new FormData();
// 			if(managerDtl.param.imageChangeYn === "Y") {
// 				formData.append("imageFile", document.getElementById("imageFile").files[0]); // 이미지 변경시 프로필이미지 전송
// 			}
//
// 			formData.append('paramList', new Blob([ JSON.stringify(managerDtl.param) ], {type : "application/json"}));
//
// 			$.ajax({
// 				type	: "POST",
// 				enctype: "multipart/form-data",
// 				url		: apiUrl + "api/manager/saveDtlInfo",
// 		 		data  : formData,
// 				processData : false,
// 				cache : false,
// 				contentType: false,
// 				dataType	: "json",
// 				success	: function(response, status, xhr) {
// 					if(response.response_code === "901") {
// 						modalClose();
// 						errorAlert();
// 						return;
// 					}
// 					const option = {
// 						callback:()=>{
// 							history.back();
// 						}
// 					};
// 					cmmAlert("저장이 완료되었습니다.", option);
// 				},
// 				error	: function(request, status, error){
// 					errorAlert();
// 		 		}
// 			});
// 		});
// 	},
// 	previewImg: (file) => {
// 		if (file.files && file.files[0]) {
// 			const reader = new FileReader();
// 			reader.onload = function(e) {
// 				document.getElementById('profileImg').src = e.target.result;
// 			};
// 			reader.readAsDataURL(file.files[0]);
// 			managerDtl.param.imageChangeYn = "Y"
// 		}
// 	},
// 	removeManager: () => {
// 		cmmConfirm('회원탈퇴 하시겠습니까?', () => {
// 			let searchOption = {
// 				data: managerDtl.param
// 			}
//
// 			comAjax(apiUrl + "/api/manager/removeManagerList",searchOption).then(response => {
// 				if(response.rsData.response_code === "901") return;
// 				const option = {
// 					callback:()=>{
// 						window.location = "/logout";
// 					}
// 				};
// 				cmmAlert("회원탈퇴가 완료되었습니다.", option);
// 			});
// 		});
// 	}
//
// }