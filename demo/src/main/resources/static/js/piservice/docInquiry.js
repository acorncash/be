// $(document).ready(e=>{
// 	init();
// })
//
//
//
// function init(){
// 	pagingCompo = new pagingComponent($('.pagination').get(0),5);
// 	mngView();
// 	docInquiry();
// }
//
// function mngView(){
// 	comAjax(apiUrl + "/api/docPiSvc/getMngInfo",{type:'get'}).then(result=>{
// 		const mngInfo  = result.rsData.data;
// 		const mngImg = mngInfo.MNG_IMG ?mngInfo.MNG_IMG: '/static/images/defaul_thum.png';
// 		$('.manager-info #mngNm').text(mngInfo.MNG_RANK+" "+mngInfo.MNG_NM);
// 		$('.manager-info #mngPhone').text(mngInfo.MNG_PHONE);
// 		$('.manager-info #mngEmail').text(mngInfo.MNG_EMAIL);
// 		$('.manager-info #mngComment').text(mngInfo.MNG_COMMENT);
// 		$('.manager-info #mngImg').attr('src',mngImg);
// 	});
// };
//
// async function docInquiry(pageNo="1"){
// 	let docInquiryList  = await docInquirySearch(pageNo);
// 	let totalCnt = docInquiryView(docInquiryList );
//     pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCnt,docInquiry);
//
//
//     function docInquirySearch(pageNo){
// 		let searchData ={};
// 		searchData.pageNo = pageNo;
// 		searchData.pageSize = "5";
// 		/*etc : 데이터 가져오는 restApi*/
// 		return comAjax(apiUrl + "/api/docPiSvc/getDocInquiry",{data:searchData});
// 	};
//
//
// 	function docInquiryView(docInquiryList){
// 		$("#listTable > tbody").children().remove();
// 		const resultMap = docInquiryList.rsData.data;
// 		$(".count").html(`전체 <em>${resultMap.totCnt}</em>건`);
// 		if(resultMap.docInquiryList.length ==0){
// 			$("#listTable > tbody").html(`<tr><td colspan="13"><div class="none">검색된 서비스가 없습니다.</div></td></tr>`);
// 			return 0;
// 		}
// 		for(const docInquiry of resultMap.docInquiryList){
// 			const templet= `<tr>
// 	                            <td >${docInquiry.ROWNUM}</td>
// 	                            <td class="text-left"><a type="button" class="open-chat click-tag">${docInquiry.CONTENTS}</a></td>
// 	                            <td >${docInquiry.MBR_NM}</td>
// 	                            <td >${docInquiry.MNG_NM}</td>
// 	                            <td >${docInquiry.REG_DT}</td>
//                         	</tr>`;
// 			const $templet = $(templet);
// 			$('a',$templet).on('click',function(){
// 				docInqueryChat.open(docInquiry.MBR_NO,docInquiry.MNG_NO);
// 			})
//
// 		$("#listTable > tbody").append($templet);
// 		}
//
// 		return resultMap.totCnt;
// 	};
//
//
// }
//
//
//
// const docInqueryChat = {
// 	popupEl : null,
// 	open : function(mbrNo,mngNo){
// 		this.close();
// 		modalPopup('/popup/inquiryPopup').then(result =>{
// 			if(result) this.init(mbrNo,mngNo);
// 			popupEl  = $('.chatbox');
// 		});
// 	},
// 	close : function(){
// 		$('.chatbox').remove();
// 	},
//
// 	init: function(mbrNo,mngNo){
// 		popupEl = null;
//
// 		$("#sendMessage").on('keyup',function(e){
// 			docInqueryChat.keupEvent(e,mngNo,mbrNo)
// 		});
// 		comAjax(apiUrl+'/api/docPiSvc/getChatList',{type:'get',data:{mngNo,mbrNo}}).then(result=>{
// 			this.setChat(result);
// 		})
// 	},
// 	setChat:function(dataList){
// 		$('.chatbox .conversation-list li').remove();
// 		$('.chatbox .complete').remove();
// 		const result = dataList.rsData.data;
// 		let imgSrc = result.memberInfo.IMG_PATH != undefined?result.memberInfo.IMG_PATH:'/static/images/defaul_profile.png';
// 		$('.chatbox #mbrImg').attr('src',imgSrc);
// 		$('.chatbox #mngNm').html(result.memberInfo.MBR_NM);
// 		let curDate ='';
//
//
// 		for(let item of result.chatList ){
// 			let dateArray = item.REG_DT.split("-");
// 			let html='';
// 			let date = dateArray[0]+'년'+dateArray[1]+'월'+dateArray[2]+'일'
// 			if(curDate =='' || curDate != date){
// 				curDate=date;
// 				html = `<li class="chat-date">${date}</li>`;
//
// 			}
//
// 			if(item.SEND_GB=='02'){
// 				html +=`<li class="odd">
// 		             <div class="wrap">
// 		             	<div class="name">${item.MNG_NM}</div>
// 		                 <div class="ctext">
// 		                     <p>${unescapeHtml(item.CONTENTS)}</p>
// 		                 </div>
// 		                 <span class="time">${dateArray[3]}시 ${dateArray[4]}분</span>
// 		             </div>
// 		         </li>`;
// 			}else if(item.SEND_GB=='01'){
// 				html+=`<li>
// 	            	<div class="avatar">
// 	            		<div class="img"><img src="${imgSrc}"></div>
// 	            	</div>
// 	                <div class="wrap">
// 	                	<div class="name">${item.MBR_NM}</div>
// 	                    <div class="ctext">
// 	                        <p>${unescapeHtml(item.CONTENTS)}</p>
// 	                    </div>
// 	                    <span class="time">${dateArray[3]}시 ${dateArray[4]}분</span>
// 	                </div>
// 	            </li>`
// 			}
//
// 			$(".conversation-list").append(html);
//
// 		}
//
// 		$('.chat-close').on('click',function(){
// 			docInqueryChat.close();
// 		})
// 		$(".conversation-list").slimScroll({
// 	    	width: "100%",
// 	        height: "100%",
// 	        railVisible: true,
// 	    	wheelStep: 10,
// 	    	allowPageScroll: false,
// 	    	disableFadeOut: false
// 	    });
//
//
// 		$(".chatbox").css({opacity:"0",display:"block"}).show().animate({opacity:1});
//
// 		$('.conversation-list li').last().focus();
// 		$('.conversation-list').slimscroll({'scrollBy': $(".conversation-list")[0].scrollHeight});
// 	},
// 	keupEvent:function(e,mngNo,mbrNo){
// 		if(e.keyCode === 13)docInqueryChat.sendMsg(e,mngNo,mbrNo);
// 		else if(e.keyCode === 27) $('.chatbox').remove();
// 	},
// 	sendMsg:function(e,mngNo,mbrNo){
// 		const sendMsg = e.currentTarget.value;
// 		if(!sendMsg){return false;}
//
// 		comAjax(apiUrl+'/api/docPiSvc/sendMsg',{data:{sendMsg,mngNo,mbrNo}}).then(result=>{
// 			docInqueryChat.setChat(result);
// 			e.currentTarget.value='';
//
// 		})
// 	}
//
// }
//
//
