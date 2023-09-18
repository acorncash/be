// let removeFileList = [];
//
// $(()=>{
// 	sessionStorage.setItem("prev", "boardDtl");
// });
//
// function noticeInit(){
// 	if(pageMoveData.boardNo){
// 		let searchData = {
// 			boardNo: pageMoveData.boardNo
// 			, boardSe: pageMoveData.boardSe
// 		};
// 		comAjax(apiUrl + "/api/boardDtl/getBoard",{type:"get", data:searchData}).then(response => {
// 			const data = response.rsData.data;
// 			$("#updateBtn").show().on("click", () => {
// 				saveButton(data.boardNo, "update", "N");
// 			});
// 			$("#removeBtn").show().on("click", () => {
// 				removeBoard(data.boardNo, "N");
// 			});
//
// 			$("#startDt").val(data.startDt);
// 			$("#endDt").val(data.endDt);
// 			$("#flagYn").prop("checked", data.flagYn === "Y" ? true : false);
// 			$("#title").val(data.title);
// 			$("#contents").val(data.contents.replaceAll("\r", "<br>"));
// 			if(data.fileKey) $("#fileKey").val(data.fileKey);
//
// 			let html = ``;
// 			$(data.fileList).each((idx, item) => {
// 				html += `<li id="${item.fileNo}"><div onclick="fileDownload(\'${item.fileNo}\');">${item.originalName}<span class="byte">[${byteCalculation(item.fileSize)}]</span></div><a href="#" class="del" onclick="javascript:removeFile(this);return false;">삭제</a></li>`;
// 			});
// 			$(".upload-file").html(html);
// 		});
// 	}else{
// 		$("#insertBtn").show().on("click", () => {
// 			saveButton(null, "insert", "N");
// 		});
// 	}
// }
//
// function questionInit(){
// 	let searchData = {
// 		boardNo: pageMoveData.boardNo
// 		, boardSe: pageMoveData.boardSe
// 	};
// 	comAjax(apiUrl + "/api/boardDtl/getBoard",{type:"get", data:searchData}).then(response => {
// 		const data = response.rsData.data;
// 		$("#qRegId").html(data[0].regName);
// 		$("#qRegDt").html(data[0].updDt);
// 		$("#qFlagYn").html(data[0].flagYn === "Y" ? "예" : "아니오");
// 		$("#qTitle").html(data[0].title);
// 		$("#qContent").html(data[0].contents.replaceAll("\r", "<br>"));
//
// 		$("#qRemoveBtn").on("click", () => {
// 			removeBoard(data[0].boardNo, "Q");
// 		});
// 		$("#aRemoveBtn").on("click", () => {
// 			removeBoard(data[0].boardNo, "A");
// 		});
// 		$("#insertBtn").on("click", () => {
// 			saveButton(data[0].boardNo, "insert", "A");
// 		});
// 		$("#updateBtn").on("click", () => {
// 			saveButton(data[0].boardNo, "update", "A");
// 		});
//
// 		let html = ``;
// 		$(data[0].fileList).each((idx, item) => {
// 			html += `<li><a type="button" onclick="fileDownload(\'${item.fileNo}\');">${item.originalName}</a><em>[${byteCalculation(item.fileSize)}]</em></li>`;
// 		});
// 		$("#qFileList").html(html);
//
// 		if(data[1].boardNo){
// 			$("#updateBtn").show();
// 			$("#aRemoveBtn").show();
// 			$("#title").val(data[1].title);
// 			$("#contents").val(data[1].contents);
// 			if(data[1].fileKey) $("#fileKey").val(data[1].fileKey);
// 			html = ``;
// 			$(data[1].fileList).each((idx, item) => {
// 				html += `<li id="${item.fileNo}"><div onclick="fileDownload(\'${item.fileNo}\');">${item.originalName}<span class="byte">[${byteCalculation(item.fileSize)}]</span></div><a href="#" class="del" onclick="javascript:removeFile(this);return false;">삭제</a></li>`;
// 			});
// 			$(".upload-file").html(html);
// 		}else{
// 			$("#insertBtn").show();
// 		}
// 	});
// }
//
// function fileDownload(fileNo){
// 	let tempForm = $('<form></form');
// 	tempForm.append($('<input/>', {name: 'fileNo', value:fileNo }));
//
// 	tempForm.attr("action", apiUrl + "api/common/fileDownload");
// 	tempForm.attr("method", "POST");
// 	tempForm.attr("id", "tempForm");
// 	$(document.body).append(tempForm);
// 	tempForm.submit();
// 	$("#tempForm").remove();
// }
//
// function byteCalculation(bytes) {
// 	var bytes = parseInt(bytes);
// 	var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
// 	var e = Math.floor(Math.log(bytes)/Math.log(1024));
// 	if(e == "-Infinity") return "0 "+s[0];
// 	else return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
// }
//
// function fileSet(file){
// 	$(".tempFile").remove();
//
// 	let html = ``;
// 	$(file.files).each((idx, item) => {
// 		html += `<li id="${idx}" class="tempFile"><div>${item.name}<span class="byte">[${byteCalculation(item.size)}]</span></div><a href="#" class="del" onclick="javascript:removeFile(this);return false;">삭제</a></li>`;
// 	});
// 	$(".upload-file").append(html);
// }
//
// function removeFile(item){
// 	const file = $(item.parentElement);
// 	if(!file.hasClass("tempFile")) removeFileList.push(file[0].id);
//
// 	file.remove();
// }
//
// function removeBoard(boardNo, boardSe){
// 	let alertMsg;
// 	if(boardSe === "Q") alertMsg = "문의글을 삭제하시겠습니까?";
// 	else if(boardSe === "N") alertMsg = "공지글을 삭제하시겠습니까?";
// 	else alertMsg = "답글을 삭제하시겠습니까?";
//
// 	cmmConfirm(alertMsg, () => {
// 		let param = {
// 			boardNo: boardNo
// 			, boardSe: boardSe
// 		};
// 		comAjax(apiUrl + "/api/boardDtl/removeBoard",{data:param}).then(response => {
// 			if(response.rsData.response_code === "901") return;
// 			const option = {
// 				callback:()=>{
// 					if(boardSe === "N") pageMove('/settings/noticeList');
// 					else pageMove('/settings/questionList');
// 				}
// 			};
// 			cmmAlert("삭제가 완료되었습니다.", option);
// 		});
// 	});
// }
//
// function saveButton(boardNo, jobType, boardSe){
// 	const item = $(".required");
// 	for(let i=0, ii=item.length; i<ii; i++){
// 		if(item[i].value === ""){
// 			const option = {
// 				callback:()=>{
// 					item[i].focus();
// 					return;
// 				}
// 				, icon:'warning'
// 			};
// 			cmmAlert(item[i].placeholder, option);
// 			return;
// 		}
// 	}
//
// 	let alertMsg;
// 	if(jobType === "insert") alertMsg = "등록하시겠습니까?";
// 	else alertMsg = "수정하시겠습니까?";
//
// 	cmmConfirm(alertMsg, () => {
// 		let formData = new FormData();
// 		const params = {
// 			jobType: jobType
// 			, boardNo: boardNo
// 			, title: $("#title").val()
// 			, contents: $("#contents").val()
// 			, regId: 1
// 			, boardSe: boardSe
// 			, fileKey: $("#fileKey").val()
// 			, totalFileCount: $(".upload-file > li").length
// 		};
// 		if(removeFileList.length) params.removeFileList = removeFileList;
// 		if(boardSe === "N"){
// 			params.startDt = $("#startDt").val().replaceAll("-", "");
// 			params.endDt = $("#endDt").val().replaceAll("-", "");
// 			params.flagYn = $("#flagYn").prop("checked") ? "Y" : "N";
// 		}
// 		const dt = new DataTransfer()
//
// 		$($(".tempFile")).each((idx, item) => {
// 			dt.items.add(document.getElementById("fileList").files[Math.floor(item.id)]);
// 		});
// 		$(dt.files).each((idx,item) => {
// 		   formData.append("insertFileList", item);
// 		});
//
// 		formData.append('paramList', new Blob([ JSON.stringify(params) ], {type : "application/json"}));
//
// 		$.ajax({
// 			type	: "POST",
// 			enctype: "multipart/form-data",
// 			url		: apiUrl + "api/boardDtl/setBoard",
// 	 		data  : formData,
// 			processData : false,
// 			cache : false,
// 			contentType: false,
// 			dataType	: "json",
// 			success	: function(response, status, xhr) {
// 				if(response.response_code === "901") {
// 					modalClose();
// 					errorAlert();
// 					return;
// 				}
//
// 				const option = {
// 					callback:()=>{
// 						if(boardSe === "N") {
// 							if(pageMoveData.boardNo) pageMove('/settings/noticeDtl', {boardNo:boardNo, boardSe: boardSe});
// 							else pageMove('/settings/noticeList');
// 						}
// 						else pageMove('/settings/questionDtl', {boardNo:boardNo, boardSe: 'Q'});
// 					}
// 				};
// 				cmmAlert("저장이 완료되었습니다.", option);
// 			},
// 			error	: function(request, status, error){
// 				errorAlert();
// 	 		}
// 		});
// 	});
// }