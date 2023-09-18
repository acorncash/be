// let loginInfo = {};
// let receiverArr = new Array();
// const getMailListInit = function(){
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	getMailList();
// }
//
// const getSendMailListInit = function(){
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
// 	getSendMailList();
// }
//
// const getSendMailList =async function(pageNo=1){
// 	let sendMailList  = await sendMailListSearch(pageNo);
// 	let totalCount = sendMailListView(sendMailList);
//
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCount, getSendMailList);
// }
//
// const sendMailListSearch =function(pageNo=1){
// 	let searchData = {
// 		pageNo: pageNo
// 		, pageSize: 10
// 	}
// 	return comAjax(apiUrl + "/api/mail/getSendMailList",{type:"GET", data:searchData});
// }
//
// const sendMailListView = function(dataList){
// 	if(dataList.rsData.response_code === "201"){
// 		$(".count").html(`전체 <em>0</em>건`);
// 		$("#publicListTable > tbody").html(`<tr><td colspan="7"><div class="none"> 목록이 없습니다.</div></td></tr>`);
// 		return 0;
// 	}
// 	$(".count").html(`전체 <em>${dataList.rsData.total_count}</em>건`);
// 	let html = ``;
// 	$(dataList.rsData.data).each((idx, item) => {
// 		html += `<tr>`;
// 		html += `    <td><input type="checkbox" data-toggle="modal" data-target="#alert-notselect"></td>`;
// 		html += `    <td>${item.rnum}</td>`;
// 		html += `    <td class="text-left"><a href="#" onclick="getSendMail()">${item.title}</a></td>`;
// 		html += `    <td>${item.regDt}</td>`;
// 		html += `    <td>${item.senderNm}</td>`;
// 		html += `    <td>${item.requestCnt}</td>`;
// 		html += `    <td><button type="button" class="btn btn-outline-dark btn-sm" data-toggle="modal" data-target="#mail-send-dtl" onclick="sendResultList('${item.requestId}')">상세보기</button></td>`;
// 		html += `</tr>`;
//
// 	});
// 	$("#mail-list").html(html);
// 	return dataList.rsData.total_count;
// }
//
// const getMailList =async function(pageNo=1){
// 	let mailList  = await mailListSearch(pageNo);
// 	let totalCount = mailListView(mailList,pageNo);
//
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCount, getMailList);
// }
//
// const mailListSearch =function(pageNo=1){
// 	let searchData = {
// 		pageNo: pageNo
// 		, pageSize: 10
// 	}
// 	return comAjax(apiUrl + "/api/mail/getMailList",{type:"GET", data:searchData});
// }
//
// const mailListView = function(dataList,pageNo){
// 	if(dataList.rsData.response_code === "201"){
// 		$(".count").html(`전체 <em>0</em>건`);
// 		$("#publicListTable > tbody").html(`<tr><td colspan="6"><div class="none"> 목록이 없습니다.</div></td></tr>`);
// 		return 0;
// 	}
// 	$(".count").html(`전체 <em>${dataList.rsData.total_count}</em>건`);
// 	let html = ``;
//
// 	$(dataList.rsData.data).each((idx, item) => {
// 		html += `<tr>`;
// 		html += `    <td><input type="checkbox" class="chkList" value="${item.mailNo}"></td>`;
// 		html += `    <td>${item.rnum}</td>`;
// 		html += `    <td class="text-left">${item.title}</td>`;
// 		html += `    <td>${item.regDt}</td>`;
// 		html += `    <td>${item.mngNm}</td>`;
// 		html += `    <td><button type="button" class="btn btn-outline-dark btn-sm"  onclick="pageMove('/mail/mailWrite', {mailNo:${item.mailNo},pageNo:`+pageNo+`})">상세보기</button></td>`;
// 		html += `</tr>`;
// 	});
//
// 	$("#mail-list").html(html);
// 	return dataList.rsData.total_count;
// }
//
// function sendResultList(requestId){
// 	comAjax(apiUrl + "/api/mail/getSendResultList",{type:"POST", data:{"requestId":requestId}}).then(dataList=>{
//
// 		let html = ``;
// 		$(dataList.rsData.data).each((idx, item) => {
// 			html += `<tr>`;
// 			html += `    <td>${idx+1}</td>`;
// 			html += `    <td>${item.receiverNm}</td>`;
// 			html += `    <td>${item.receiverEmail}</td>`;
// 			html += `    <td>${item.resultCode==='0'?"정상":"실패"}</td>`;
// 			html += `    <td>${nvl(item.resultMsg)}</td>`;
// 			html += `    <td>${item.regDt}</td>`;
// 			html += `</tr>`;
// 		});
//
// 		$("#send-result-list").html(html);
//
// 	});
// }
//
// function deleteMail(){
// 	if($('.chkList:checked').length == 0){cmmAlert("삭제할 메일을 선택하세요",{'icon' : 'warning'}); return false;}
//
// 	cmmConfirm('삭제 하시겠습니까?',()=>{
// 		let mailNoArr = new Array();
//
// 		$(".chkList:checked").each((idx, item) => {
// 			mailNoArr.push(item.value);
// 		})
//
// 		comAjax(apiUrl + "/api/mail/deleteMail",{type:"POST", data:{mailNoList:mailNoArr}}).then(response => {
// 			if(response.rsData.response_code === '000'){
// 				cmmAlert('메일을 삭제했습니다.');
// 				pageMove('/mail/mailList');
// 			}
// 		});
// 	});
// }
//
