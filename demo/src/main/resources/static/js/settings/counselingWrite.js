// const counselingWrite = {
// 	/**
// 	 * 리스트 조회 parameter
// 	 */
// 	param: {
// 		counselNo: null,
// 		title: '',
// 		content: '',
// 		fileKey: 'N',
// 		jobType:'',
// 		removeFileList: [],
// 		regId: '',
// 		totalFileCount: 0
// 	},
// 	saveMsg: '',
//
// 	init: () => {
// 		counselingWrite.param.counselNo = pageMoveData.counselNo;
// 		counselingWrite.param.jobType = pageMoveData.jobType;
// 		document.getElementById("fileList").addEventListener("change", e=> counselingWrite.fileSet(e.target));
// 		document.getElementById("saveBtn").addEventListener("click", ()=> counselingWrite.saveCounseling());
//
// 		if(counselingWrite.param.jobType === "insert"){
// 			counselingWrite.saveMsg = '등록하시겠습니까?'
// 			document.getElementById("cancleBtn").addEventListener("click", ()=> pageMove('/settings/counselingList'));
// 		}else if(counselingWrite.param.jobType === "update"){
// 			const removeBtn = document.getElementById("removeBtn");
// 			counselingWrite.saveMsg = '수정하시겠습니까?'
// 			removeBtn.style.display = null;
// 			removeBtn.addEventListener("click", ()=> counselingWrite.removeCounseling());
// 			document.getElementById("cancleBtn").addEventListener("click", ()=> pageMove('/settings/counselingDtl',{counselNo:counselingWrite.param.counselNo, regId:counselingWrite.param.regId}));
// 			counselingWrite.getCounselingDtl();
// 		}
// 	},
// 	getCounselingDtl: async () => {
// 		const searchOption = {
// 			type: "get",
// 			data: counselingWrite.param
// 		}
//
// 		const res = await comAjax(apiUrl+'/api/counseling/getCounselingDtl',searchOption);
// 		const data = res.rsData.data;
// 		document.getElementById("title").value = data.title;
// 		document.getElementById("content").value = data.contents;
// 		if(data.fileKey) counselingWrite.param.fileKey = data.fileKey;
//
// 		if(data.fileList){
// 			html = ``;
// 			data.fileList.forEach(item => {
// 				html += `
// 						<li id="${item.fileNo}">
// 							<div>${item.originalName}
// 								<span class="byte">[${counselingWrite.byteCalculation(item.fileSize)}]</span>
// 							</div>
// 							<a href="#" class="del" onclick="counselingWrite.removeFile(this);return false;">삭제</a>
// 						</li>`;
// 			});
//
// 			document.querySelector(".upload-file").innerHTML = html;
// 		}
// 	},
// 	/**
// 	 * 첨부파일 setting function
// 	 */
// 	fileSet: file => {
// 		document.querySelectorAll(".tempFile").forEach(item=>item.remove());
//
// 		let html = ``;
// 		Array.from(file.files).forEach(item => {
// 			html += `<li class="tempFile">
// 						<div>${item.name}
// 							<span class="byte">[${counselingWrite.byteCalculation(item.size)}]</span>
// 						</div>
// 						<a href="#" class="del" onclick="counselingWrite.removeFile(this);return false;">삭제</a>
// 					</li>`;
// 		});
//
// 		document.getElementsByClassName("upload-file")[0].insertAdjacentHTML("beforeend", html);
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
// 	 * 첨부파일 삭제 function
// 	 */
// 	removeFile: item => {
// 		const li = item.closest("li");
// 		if(li.className !== "tempFile") counselingWrite.param.removeFileList.push(li.id);
// 		li.remove();
// 	},
// 	/**
// 	 * 삭제 function
// 	 */
// 	removeCounseling: () => {
// 		cmmConfirm('해당 글을 삭제하시겠습니까?', () => {
// 			const searchOption = {
// 				data: counselingWrite.param
// 			}
// 			comAjax(apiUrl+'api/counseling/removeCounseling',searchOption).then(()=>{
// 				const option = {
// 					callback:()=>{
// 						pageMove('/settings/counselingList');
// 					}
// 				};
//
// 				cmmAlert("삭제가 완료되었습니다.", option);
// 			});
// 		});
// 	},
// 	/**
// 	 * 저장 function
// 	 */
// 	saveCounseling: () => {
// 		const item = document.querySelectorAll(".required");
// 		for(let i=0,ii=item.length; i<ii; i++){
// 			const option = {
// 				callback:()=>{
// 					item[i].focus();
// 				},
// 				icon:"warning"
// 			};
// 			if(item[i].value === ""){
// 				cmmAlert(item[i].placeholder, option);
// 				return;
// 			}
//
// 			counselingWrite.param[item[i].id] = item[i].value;
// 		}
//
// 		counselingWrite.param.totalFileCount = document.getElementsByClassName("del").length;
//
// 		cmmConfirm(counselingWrite.saveMsg, () => {
// 			const formData = new FormData();
// 			formData.append('paramList', new Blob([ JSON.stringify(counselingWrite.param) ], {type : "application/json"}));
//
// 			const dt = new DataTransfer()
//
// 			document.querySelectorAll(".tempFile").forEach(item => dt.items.add(document.getElementById("fileList").files[Math.floor(item.id)]));
// 			Array.from(dt.files).forEach( item => {
// 			   formData.append("fileList", item);
// 			});
//
// 			$.ajax({
// 				type	: "POST",
// 				enctype: "multipart/form-data",
// 				url		: apiUrl + "api/counseling/setCounseling",
// 		 		data  : formData,
// 				processData : false,
// 				cache : false,
// 				contentType: false,
// 				dataType	: "json",
// 				success	: (response) => {
// 					const option = {
// 						callback:()=>{
// 							pageMove('/settings/counselingDtl',{counselNo: response.data.counselNo, regId:response.data.mngNo});
// 						}
// 					};
// 					cmmAlert("저장이 완료되었습니다.", option);
// 				},
// 				error	: ()=>{
// 					errorAlert();
// 		 		}
// 			});
// 		});
// 	}
// }
//
// $(()=>{
// 	counselingWrite.init();
// });