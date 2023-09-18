// /**
//  *
//  */
//
// $(()=>{
//
// });
//
// function bannerListInit(){
// 	/*etc : 데이터 가져오는 restApi*/
// 	comAjax(apiUrl + "/api/banner/getBannerList",{type:"get"}).then(response => {
// 		$(response.rsData.data).each((idx, item) => {
// 			let html = ``;
// 			html += `<img src="/uploadImg${item.profileImg}">`;
//             html += `<div class="copy">`;
//             html += `    <div class="sm">${item.title}</div>`;
//             html += `    <div class="lg">`;
//             html += `        <div>${item.body}</div>`;
//             html += `        <div>${item.footer}</div>`;
//             html += `    </div>`;
//             html += `</div>`;
//
//             $("#banner_" + item.sortSn).html(html);
//             $("#modiBtn_" + item.sortSn).on("click", () => {
// 				pageMove("/settings/bannerDtl", {bannerNo: item.bannerNo});
// 			});
// 			$("#downBtn_" + item.sortSn).on("click", () => {
// 				fileDownload(`${item.fileNo}`);
// 			});
// 		});
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
// function bannerDtlInit(){
// 	let searchData = {
// 		bannerNo: pageMoveData.bannerNo
// 	}
// 	/*etc : 데이터 가져오는 restApi*/
// 	comAjax(apiUrl + "/api/banner/getBannerDtl",{type:"get",data:searchData}).then(response => {
// 		const data = response.rsData.data;
// 		$("#bannerImg")[0].src = `/uploadImg${data.profileImg}`;
// 		$("#banner-title-div").html(data.title);
// 		$("#banner-body-div").html(data.body);
// 		$("#banner-footer-div").html(data.footer);
// 		$("#banner-title").val(data.title);
// 		$("#banner-body").val(data.body);
// 		$("#banner-footer").val(data.footer);
// 		$("#banner-btn").val(data.btn);
// 		$("#bannerBtn").text(data.btn);
// 		$("#fileKey").val(data.fileKey);
// 		$("#sortSn").val(data.sortSn);
// 		$("#linkUrl").val(data.linkUrl);
// 	});
// }
//
// /**@function : previewImage
//  * @param    : file = 입력파일
//  * @return   : x
//  * @etc      : 사진 미리보기 저장
//  * */
// function previewImage(file){
// 	if (file.files && file.files[0]) {
// 		const reader = new FileReader();
// 		reader.onload = function(e) {
// 			document.getElementById('bannerImg').src = e.target.result;
// 		};
// 		reader.readAsDataURL(file.files[0]);
// 		$("#imageChangeYn").val("Y");
// 	}
// }
//
// function saveButton(){
// 	cmmConfirm("저장하시겠습니까?", () => {
// 		let formData = new FormData();
// 		const params = {
// 			bannerNo: pageMoveData.bannerNo
// 			, sortSn: $("#sortSn").val()
// 			, fileKey: $("#fileKey").val()
// 			, imageChangeYn: $("#imageChangeYn").val()
// 			, regId: 1
// 			, title: $("#banner-title").val()
// 			, body: $("#banner-body").val()
// 			, footer: $("#banner-footer").val()
// 			, linkUrl: $("#linkUrl").val()
// 			, btn: $("#banner-btn").val()
// 		};
//
// 		if($("#imageChangeYn").val() === "Y") {
// 			formData.append("imageFile", $("#imageFile")[0].files[0]); // 이미지 변경시 프로필이미지 전송
// 		}
//
// 		formData.append('paramList', new Blob([ JSON.stringify(params) ], {type : "application/json"}));
//
// 		$.ajax({
// 			type	: "POST",
// 			enctype: "multipart/form-data",
// 			url		: apiUrl + "api/banner/updateBanner",
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
// 						pageMove('/settings/bannerDtl', {bannerNo:pageMoveData.bannerNo});
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