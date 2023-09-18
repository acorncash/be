// /**
//  * @file : inquiry.js
//  * @see  : P.I문의 관리
//  */
// let loginInfo = {};
//
// $(document).ready(e=>{
// 	pagingCompo = new pagingComponent($('.pagination').get(0),5);
// 	inquiryInitView();
// })
//
//
//
// const inquiryInitView =async function(){
// 	let resultInfo= await  comAjax(apiUrl + "/api/member/getLoginInfo",{type:'get'});
// 	loginInfo = resultInfo.rsData.data;
// 	mngInfoView(loginInfo);
//
//
// 	$('#searchVal').on('change',e=>{
// 		searchInquiryList();
// 	})
// 	searchInquiryList();
// }
//
// const mngInfoView = function(loginInfo){
// 	let mngPhone      ='';
// 	let mngEmail      ='';
// 	let mngNm         ='';
// 	let mngRank       ='';
// 	let mngComment    ='';
//     let mngImgUrl     ='';
// 	let mngNmRank     ='';
// 	console.log();
// 	if(loginInfo.mngPhone   !='' && loginInfo.mngPhone   != null)    mngPhone      =validTelNo(loginInfo.mngPhone) ;
// 	else mngPhone = '---';
// 	if(loginInfo.mngEmail   !='' && loginInfo.mngEmail   != null)    mngEmail      =loginInfo.mngEmail  ;
// 	else mngEmail = '---';
// 	if(loginInfo.mngNm      !='' && loginInfo.mngNm      != null)    mngNm         =loginInfo.mngNm+" "     ;
// 	else mngNm = '---';
// 	if(loginInfo.mngRank    !='' && loginInfo.mngRank    != null)    mngRank       =loginInfo.mngRank   ;
// 	else mngRank = '-';
// 	if(loginInfo.mngComment !='' && loginInfo.mngComment != null)    mngComment    =loginInfo.mngComment;
// 	else mngComment = '---';
// 	if(loginInfo.mngImgUrl  !='' && loginInfo.mngImgUrl  != null)    mngImgUrl     =loginInfo.mngImgUrl  ;
// 	else mngImgUrl = '';
// 	if(mngImgUrl != '' ) $('.manager-info #mngImg').attr('src',mngImgUrl);
// 	mngNmRank = mngNm+mngRank;
//
// 	$('.manager-info #mngNm').text(mngNmRank);
// 	$('.manager-info #mngPhone').text(mngPhone);
// 	$('.manager-info #mngEmail').text(mngEmail);
// 	$('.manager-info #mngComment').text(mngComment);
// }
//
//
// const searchInquiryList =async function(pageNo=1){
// 	let InquiryList  =await  getInquiryList(pageNo);
// 	let totalCount  = inquiryListView(InquiryList);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCount,searchInquiryList);
// }
//
// const getInquiryList = function(pageNo=1){
// 	/*type : Array*/
// 	let searchData =getSearchCondiction();
// 	searchData.pageNo = pageNo;
// 	searchData.pageSize = 5;
// 	/*etc : 데이터 가져오는 restApi*/
// 	return comAjax(apiUrl + "/api/piservice/getPiInquiryList",{type:"get", data:searchData});
// }
//
// const inquiryListView = function(inquiryList){
// 	$("#listTable > tbody").children().remove();
// 	$(".count").html(`전체 <em>${inquiryList.rsData.total_count}</em>건`);
//
// 	if(inquiryList.rsData.total_count === 0){
// 		$("#listTable > tbody").html(`<tr><td colspan="6"><div class="none">검색된 회원이 없습니다.</div></td></tr> `);
// 		return 0;
// 	}
// 	 let liStr =
// 	 `<li>
// 		<a class="left open-chat" type="button">
// 			<div class="subject"><strong></strong></div>
// 			<ol>
// 				<li><div class="avatar"><img src="/static/images/defaul_thum.png" alt="기본이미지"></div><span></span></li>
// 				<li>22.07.04</li>
// 			</ol>
// 		</a>
// 	</li>`
//
//
// 	inquiryList.rsData.data.forEach(item=>{
// 		let proCdColor = '';
// 		let mngNm = '';
//
// 		if(item.mngNm == undefined) mngNm = '미정';
// 		else mngNm = item.mngNm;
//
// 		if(item.serviceProCd=='PSP_001') proCdColor = 'badge badge-soft-primary';
// 		if(item.serviceProCd=='PSP_002') proCdColor = 'badge badge-soft-secondary';
//
// 		let inquiryTemplet = `
// 						 <tr class="itemList">
//                             <td id="rNum">${item.RNUM}</td>
//                             <td id="contents" class="text-left"><a id="openPopup" type="button" class="open-chat click-tag">${item.contents}</a></td>
//                             <td id="applyNm">${item.applyNm}(${item.mbrNm})</td>
//                             <td id="mngNm">${mngNm}</td>
//                             <td id="recentDay"></td>
//                             <td id="serviceProCd"><span class="${proCdColor}" id="serviceProNm">${item.serviceProNm}</span></td>
//                         </tr>`;
//         let element = $(liStr);
//      	let inquiryEl = $(inquiryTemplet);
//      	let recentDay = '';
//      	let recentDaySplit = item.recentDay.split('-');
//      	recentDay = recentDaySplit[0]+'.' +recentDaySplit[1]+'.'+recentDaySplit[2];
//      	$('#recentDay',inquiryEl).text(recentDay);
//      	$('#openPopup',inquiryEl).on('click',e=>{
// 			piInqueryPopup(item.mbrNo,loginInfo.mngNo,item.serviceApplyNo,inquiryEl,item.serviceProCd);
// 		});
//
//     	$("#listTable > tbody").append(inquiryEl);
// 	})
//
// 	return inquiryList.rsData.total_count;
// }
//
// const getSearchCondiction = function(){
// 	let returnSearch = {
// 		searchVal : ''
// 	};
//
//  	returnSearch.searchVal = $('#searchVal').val();
//  	returnSearch.mngNo     = loginInfo.mngNo;
//  	returnSearch.mngAuth     = loginInfo.mngAuth;
// 	return returnSearch;
// }