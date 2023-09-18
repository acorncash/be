// /**
//  *
//  */
// let updatePushData = {};
// let insertPushData = {};
// let mbrCd = pageMoveData.mbrCd ? pageMoveData.mbrCd : 'MC_01';
//
// $(document).ready(e=>{
// 	if(pageMoveData.pageStat == 'U'){
// 		suchPushTempletDtl(pageMoveData.pushTempletNo);
// 	}else if(pageMoveData.pageStat == 'I'){
// 		comAjax(apiUrl + '/api/member/getLoginInfo',{type:'get'}).then(e=>{
// 			insertPushData = e.rsData.data;
// 			$('#mngNm').text(insertPushData.mngNm);
// 			$('#title').val('굿 닥터스')
// 		})
// 	}else{
// 		cmmAlert('비정상적인 접근입니다.',{
// 			callback:()=>{
// 				navigation.back()
// 			}
// 		});
// 	}
//
//
// 	$('#btnSelectMember').on('click',function(){
// 		memberListInit();
// 	});
//
//
// })
//
// const suchPushTempletDtl =async function(pushTempletNo){
// 	let pushTempDtlData = await comAjax(apiUrl + "/api/push/getPushTempletDtl",{type:"get", data:{pushTempletNo}});
// 	updatePushData = pushTempDtlData.rsData.data;
// 	$('#mngNm').text(updatePushData.mngNm);
// 	$('#title').val(updatePushData.title);
// 	$('#sendMsg').val(updatePushData.sendMsg);
// }
//
// const savePush= function(){
// 	let saveParam =saveDataComp(pageMoveData.pageStat);
// 	cmmConfirm('저장 하시겠습니까?',()=>{
// 		comAjax(apiUrl + '/api/push/addPushTemplet',{type:'post',data: saveParam}).then(result=>{
// 			if(result.rsData.response_code == '000'){
// 				cmmAlert('저장되었습니다.',{
// 					callback:()=>{
// 					pageMove('/push/pushList')
// 				}})
// 			}
//
// 		});
// 	});
//
// }
//
// const saveDataComp = function(flag){
// 	let compData = {
// 		 pushTempletNo :''
// 		,title	       :''
// 		,sendMsg       :''
// 		,regId         :''
// 		,updId         :''
// 		,flag          :''
// 	}
//
// 	compData.flag    = flag;
// 	compData.title = $('#title').val();
// 	compData.sendMsg = $('#sendMsg').val();
//
//
// 	if(flag =='U'){
// 		compData.pushTempletNo = updatePushData.pushTempletNo;
// 		compData.updId         = updatePushData.mngNo;
// 	}
//
// 	if(flag =='I') compData.regId  = insertPushData.mngNo;
//
//
// 	return compData ;
// }
//
//
// const sendPush =async function(){
//
// 	if(typeof receiverArr == 'undefined'){
// 		cmmAlert('선택된 사용자가 없습니다.');
// 		return;
// 	}else if(receiverArr.length == 0){
// 		cmmAlert('선택된 사용자가 없습니다.');
// 		return;
// 	}
//
// 	cmmConfirm('푸쉬를 발송 하시겠습니까?',async ()=>{
// 		event.preventDefault();
// 		let paramCondiction = {
// 			receiverArr : receiverArr
// 			,title : $('#title').val()
// 			,sendMsg : $('#sendMsg').val()
// 			,sendMngNm :''
// 			,sendMngNo :''
// 			,pushAll    :'N'
// 		}
//
// 		if(pageMoveData.pageStat == 'U'){
// 			paramCondiction.sendMngNm = updatePushData.mngNm;
// 			paramCondiction.sendMngNo = updatePushData.mngNo;
//
// 		}else if(pageMoveData.pageStat == 'I'){
// 			paramCondiction.sendMngNm = insertPushData.mngNm;
// 			paramCondiction.sendMngNo = insertPushData.mngNo;
// 		}
// 		paramCondiction.pushAll  = $('#all').prop('checked') == true? 'Y':'N';
//
//
// 		let resultData =await comAjax(apiUrl+'/api/push/sendPush',{data:paramCondiction})
// 		if(resultData.rsData.response_code == '000'){
// 			cmmAlert('발송 완료 되었습니다.');
// 		}
//
// 	});
//
//
// }
//
//
// function memberListInit(){
// 	comAjax(apiUrl + "/api/code/getMajorCodeList",{type:"get"}).then(response => {
// 		let html = `<option value="">선택</option>`;
//
// 		$(response.rsData.data).each((idx, item) => {
// 			html += `<option value="${item.cd}">${item.cdNm}</option>`;
// 		});
// 		$("#searchMajor").html(html);
// 	});
//
// 	comAjax(apiUrl + "/api/memberList/getMemeberListCount",{type:"get"}).then(response => {
// 		$("#totalCnt").html(response.rsData.data.totalCount);
// 		$("#newCnt").html(response.rsData.data.newCount);
// 		$("#blockCnt").html(response.rsData.data.blockCount);
// 	});
//
// 	$("#searchContent").on("keyup", e =>{
// 		if(e.keyCode === 13) memberSearch();
// 	});
//
// 	$("#doctorListTab").on("click", e => {
// 		$("#tab1").show();
// 		$("#tab2").hide();
// 		$("#selTab1").show();
// 		$("#selTab2").hide();
// 		$("#searchMajor").hide().val("");
// 		$("#searchUseYn").hide().val("");
// 		$("#searchContent").show().val("");
// 		$("#searchSe").val("00");
//
// 		mbrCd = 'MC_01';
// 		memberSearch();
// 		$("#searchSe > option")[3].text = "전공과목"
// 	});
//
// 	$("#hosListTab").on("click", e => {
// 		$("#tab1").hide();
// 		$("#tab2").show();
// 		$("#selTab1").hide();
// 		$("#selTab2").show();
// 		$("#searchMajor").hide().val("");
// 		$("#searchUseYn").hide().val("");
// 		$("#searchContent").show().val("");
// 		$("#searchSe").val("00");
//
// 		mbrCd = 'MC_02';
// 		$("#searchSe > option")[3].text = "지역"
// 		memberSearch();
// 	});
//
// 	const searchData = JSON.parse(sessionStorage.getItem("searchData"));
// 	const prev = sessionStorage.getItem("prev");
//
// 	if(prev && prev == "memberDtl"){
// 		$("#searchSe").val(searchData.searchSe);
// 		searchSeChange({value: searchData.searchSe});
// 		if(searchData.searchSe === "01" || searchData.searchSe === "00"){
// 			$("#searchContent").val(searchData.searchContent);
// 		}else if(e.value === "02"){
// 			$("#searchUseYn").val(searchData.searchContent);
// 		}else if(e.value === "03"){
// 			if(mbrCd === "MC_01"){
// 				$("#searchMajor").val(searchData.searchContent);
// 			}else if(mbrCd === "MC_02"){
// 				$("#searchContent").val(searchData.searchContent);
// 			}
// 		}else if(e.value === "04"){
// 			$("#searchContent").val(searchData.searchContent);
// 		}
// 	}
//
// 	if(mbrCd === "MC_01"){
// 		if(prev && prev == "memberDtl"){
// 			$("#doctorListTab").addClass("active");
// 			$("#tab1").addClass("active");
// 			memberSearch(searchData.pageNo);
// 		}else{
// 			$("#doctorListTab").trigger("click");
// 		}
// 	}else{
//
// 		if(prev && prev == "memberDtl"){
// 			$("#hosListTab").addClass("active");
// 			$("#tab2").addClass("active");
// 			memberSearch(searchData.pageNo);
// 		}else{
// 			$("#hosListTab").trigger("click");
// 		}
// 	}
// }
//
//
// const memberSearch =async function(pageNo=1){
// 	$("#"+mbrCd+"_selectAll").prop("checked", false);
// 	let memberList  = await memberListSearch(pageNo);
// 	let totalCount = memberListView(memberList);
// }
//
// const memberListSearch =function(pageNo=1){
// 	/*type : Array*/
// 	let searchContent = ``;
// 	let searchSe = $("#searchSe").val();
// 	if(searchSe === "01"){
// 		searchContent = $("#searchContent").val();
// 	}else if(searchSe === "02"){
// 		searchContent = $("#searchUseYn").val();
// 	}else if(searchSe === "03"){
// 		if(mbrCd === "MC_01"){
// 			searchContent = $("#searchMajor").val();
// 		}else if(mbrCd === "MC_02"){
// 			searchContent = $("#searchContent").val();
// 		}
// 	}else if(searchSe === "04"){
// 		searchContent = $("#searchContent").val();
// 	}
//
// 	let searchData = {
// 		pageNo: pageNo
// 		, pageSize: 99999999
// 		, mbrCd: mbrCd
// 		, searchSe: searchSe
// 		, searchContent: searchContent.replaceAll(" ", "")
// 	};
//
// 	sessionStorage.setItem("searchData", JSON.stringify(searchData));
//
// 	return comAjax(apiUrl + "/api/memberList/getMemberList",{type:"get", data:searchData});
// }
//
// const memberListView = function(dataList){
// 	if(dataList.rsData.response_code === "201"){
// 		//$(".count").html(`전체 <em>0</em>건`);
// 		if(mbrCd === "MC_01") $("#" + mbrCd + "_tbody").html(`<tr><td colspan="10"><div class="none">검색된 회원이 없습니다.</div></td></tr>`);
// 		else $("#" + mbrCd + "_tbody").html(`<tr><td colspan="9"><div class="none">검색된 회원이 없습니다.</div></td></tr>`);
// 		return 0;
// 	}
//
// 	$(".count").html(`전체 <em>${dataList.rsData.total_count}</em>건`);
//
// 	let html = ``;
//
// 	if(mbrCd === "MC_01"){
// 		$(dataList.rsData.data).each((idx,item) => {
// 			const today = new Date();
// 			const birth = new Date(item.birth.substr(0,4), item.birth.substr(4,2)-1, item.birth.substr(6,2));
// 			let age = today.getFullYear() - birth.getFullYear();
// 			const m = today.getMonth() - birth.getMonth();
// 			if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
// 			    age--;
// 			}
//
// 			html += `<tr>`;
//             html += `    <td><input type="checkbox" class="MC_01_chk" name="" value="${item.mbrNo}"><input type="hidden" class="smsAgmYn" value="${item.smsAgmYn}"/></td>`;
//             html += `    <td class="mbrNo">${item.mbrNo}</td>`;
//             html += `    <td class="mbrNm">${item.mbrNm}</td>`;
//             html += `    <td>${item.gender === "M" ? "남자" : "여자"}</td>`;
//             html += `    <td>${age}</td>`;
//             html += `    <td>${item.majorNms ? item.majorNms : ""}</td>`;
//             html += `    <td class="email">${validEmailAddr(nvl(item.email, item.mbrId))}</td>`;
//             html += `</tr>`;
// 		});
// 	}else{
// 		$(dataList.rsData.data).each((idx,item) => {
// 			html += `<tr>`;
//             html += `    <td><input type="checkbox" class="MC_02_chk" value="${item.mbrNo}"><input type="hidden" class="smsAgmYn" value="${item.smsAgmYn}"/></td>`;
//             html += `    <td class="mbrNo">${item.mbrNo}</td>`;
//             html += `    <td>${item.addr}</td>`;
//             html += `    <td>${item.mbrNm}</td>`;
//             html += `    <td>${item.clcdNm}</td>`;
//             html += `    <td class="mngNm">${nvl(item.mngNm)}</td>`;
//             html += `    <td class="email">${validEmailAddr(nvl(item.email, item.mbrId))}</td>`;
//             html += `</tr>`;
// 		});
// 	}
//
// 	$("#" + mbrCd + "_tbody").html(html);
//
// 	$("." + mbrCd + "_chk").on("click", () => {
// 		if($("." + mbrCd + "_chk").length === $("." + mbrCd + "_chk:checked").length) $("#" + mbrCd + "_selectAll").prop("checked", true)
// 		else $("#" + mbrCd + "_selectAll").prop("checked", false)
// 	});
//
// 	$(".dropdown-menu > span").on("click", e => {
// 		$(e.currentTarget).parent().prev().html(e.currentTarget.outerHTML);
// 	});
//
// 	return dataList.rsData.total_count ;
// }
//
// function searchSeChange(e){
// 	$("#searchContent").hide();
// 	$("#searchMajor").hide();
// 	$("#searchUseYn").hide();
//
// 	if(e.value === "01" || e.value === "00"){
// 		$("#searchContent").show();
// 	}else if(e.value === "02"){
// 		$("#searchUseYn").show();
// 	}else if(e.value === "03"){
// 		if(mbrCd === "MC_01"){
// 			$("#searchMajor").show();
// 		}else if(mbrCd === "MC_02"){
// 			$("#searchContent").show();
// 		}
// 	}else if(e.value === "04"){
// 		$("#searchContent").show();
// 	}
// }
//
//
// function setReceivers(){
// 	receiverArr = [];
// 	$("#sel_MC_01_tbody").children().each(function(){
// 		let receiver = new Object();
// 		receiver.receiveMailAddr = $(".email",this).text();
// 		receiver.receiveName = $(".mbrNm",this).text();
// 		receiver.smsAgmYn = $(".smsAgmYn",this).val();
// 		receiver.mbrNo = $(".mbrNo",this).text();
// 		receiver.mbrNm = $(".mbrNm",this).text();
// 		receiverArr.push(receiver);
// 	});
//
// 	$("#sel_MC_02_tbody").children().each(function(){
// 		let receiver = new Object();
// 		receiver.receiveMailAddr = $(".email",this).text();
// 		receiver.receiveName = $(".mbrNm",this).text();
// 		receiver.smsAgmYn = $(".smsAgmYn",this).val();
// 		receiver.mbrNo = $(".mbrNo",this).text();
// 		receiver.mbrNm = $(".mbrNm",this).text();
// 		receiverArr.push(receiver);
// 	});
//
// 	$('#choiceCount').text(receiverArr.length);
// 	$('#choice-member').modal('hide');
// }
//
// function listDown(){
// 	let checkedItem = $("."+mbrCd+"_chk").filter((index,item)=>item.checked);
// 	checkedItem.each((index,item)=>{
// 		let trItem = item.parentElement.parentElement;
//
// 		if($(".email",trItem).text()){
// 			$("."+mbrCd+"_chk",trItem).addClass("sel_"+mbrCd+"_chk").removeClass(mbrCd+"_chk");
// 			$("#sel_"+mbrCd+"_tbody").append(trItem);
// 			$("."+mbrCd+"_chk").prop("checked",false);
// 			$(".sel_"+mbrCd+"_chk").prop("checked",false);
// 			$("#"+mbrCd+"_chkAll").prop("checked",false);
// 		}else if($(".mbrNo",trItem).text()){
// 			$("."+mbrCd+"_chk",trItem).addClass("sel_"+mbrCd+"_chk").removeClass(mbrCd+"_chk");
// 			$("#sel_"+mbrCd+"_tbody").append(trItem);
// 			$("."+mbrCd+"_chk").prop("checked",false);
// 			$(".sel_"+mbrCd+"_chk").prop("checked",false);
// 			$("#"+mbrCd+"_chkAll").prop("checked",false);
// 		}
//
// 	});
// }
//
// function listUp(){
// 	let checkedItem = $(".sel_"+mbrCd+"_chk").filter((index,item)=>item.checked);
// 	checkedItem.each((index,item)=>{
// 		let trItem = item.parentElement.parentElement;
// 		$(".sel_"+mbrCd+"_chk",trItem).addClass(mbrCd+"_chk").removeClass("sel_"+mbrCd+"_chk");
// 		$("#"+mbrCd+"_tbody").append(trItem);
//
// 		$(".sel_"+mbrCd+"_chk").prop("checked",false);
// 		$("."+mbrCd+"_chk").prop("checked",false);
// 		$("#sel_"+mbrCd+"_chkAll").prop("checked",false);
// 	});
// }