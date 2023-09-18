// /**
//  * @filename popupComponent.js
//  * @since 2022-07-19
//  * @author wgsystem
//  */
//
// /**
//  * @function
//  * @param
//  * @param
//  * @etc      문의 하기 팝업.
//  */
//
// /**
//  * @function publicDtlPopup
//  * @param    data
//  * @etc      public공고 상세 팝업
//  */
// const publicDtlPopup = async function(data){
// 	await modalPopup('/popup/publicDtlPopup', publicDtlSet, data);
// };
//
// /**
//  * @function recomendPublicListPopup
//  * @param    data
//  * @etc      추천초빙공고 팝업
//  */
// const recomendPublicListPopup = async function(data){
// 	await modalPopup('/popup/recomendPublicListPopup', recemendPublicSet);
// };
//
// /**
//  * @function piInqueryPopup
//  * @param    data
//  * @etc      병원 검색 팝업 호출
//  */
// const piInqueryPopup =async function(mbrNo,mngNo,serviceApplyNo,target,serviceProCd){
// 	$('#piInqueiryPopup').remove();
//
// 	await modalPopup('/popup/inquiryPopup');
// 	let mngMessageStr = `<li>
// 					    	<div class="avatar">
// 							<div class="img"><img src="/static/images/defaul_profile.png" alt="프로필사진"></div>
// 							</div>
// 							<div class="wrap">
// 								<div class="name"></div>
// 						        <div class="ctext">
// 						            <p></p>
// 						        </div>
// 						    	<span class="time"></span>
// 						    </div>
// 						</li>`;
// 	let mbrMessageStr =  `
// 			<li class="odd">
//                 <div class="wrap">
//                 	<div class="name"></div>
//                     <div class="ctext">
//                         <p>서울 지역쪽 병원으로 알아봐 주세요~</p>
//                     </div>
//                     <span class="time">오후 10:00</span>
//                 </div>
//             </li>`;
//
// 	let messageDayGb = `<li class="chat-date"></li>`;
//
// 	$(".conversation-list").slimScroll({
//     	width: "100%",
//         height: "100%",
//         railVisible: true,
//     	wheelStep: 10,
//     	allowPageScroll: false,
//     	disableFadeOut: false
//     });
// 	$(".chatbox").css({opacity:"0",display:"block"}).show().animate({opacity:1});
//
//
//
// 	const readInquery =async function(mbrNo,mngNo,target,readType){
// 		if(readType !='add'){
// 			$('.conversation-list li').remove();
// 		}
//
// 		let inqueryData = await comAjax(apiUrl+ '/api/piservice/getPISvcInquery',{type:'get',data:{mbrNo:mbrNo,mngNo:mngNo}});
// 		let piInquiryList =  inqueryData.rsData.data.piInquiryList;
// 		let memberData    =  inqueryData.rsData.data.memberData;
//
// 		let mbrImg='';
// 		if(memberData.profileUrl != undefined) mbrImg =memberData.profileUrl;
//
// 		let thisPopup = $('#piInqueiryPopup');
// 		//heaer 매니저 정보
// 		if(mbrImg != '') $('#mbrImg',thisPopup).attr('src',mbrImg);
//
// 		$('#mngNm',thisPopup).text(memberData.mbrNm);
// 		//heaer 매니저 정보
//
// 		//대화 내용 구성 01 MBR  02MNG
// 		for(let piInquiry of piInquiryList){
// 			let splitRegDt = piInquiry.regDt.split('-');
// 			let dayGb = splitRegDt[0]+'년 '+splitRegDt[1]+'월 '+splitRegDt[2]+'일'
// 			let sendTime = splitRegDt[3]+':'+splitRegDt[4];
// 			let appendItem  = null;
// 			let appendTarget = $('.conversation-list',thisPopup);
// 			if(splitRegDt[3] < 13 ){
// 				sendTime ='오전 '+sendTime;
// 			}else{
// 				sendTime ='오후 '+sendTime;
// 			}
// 			if(!$('.chat-date',thisPopup).get().some(e=>e.innerHTML == dayGb)){
// 				appendTarget.append($(messageDayGb).text(dayGb));
// 			};
//
// 			if(piInquiry.sendGb == '02'){
// 				appendItem =$(mbrMessageStr);
// 				$('.name',appendItem).text(piInquiry.mngNm);
// 			}else if(piInquiry.sendGb == '01'){
// 				appendItem =$(mngMessageStr);
// 				if(mbrImg != '')$('img',appendItem).attr('src',mbrImg);
// 				$('.name',appendItem).text(memberData.mbrNm);
// 			}
//
//
//
// 			$('.ctext',appendItem).text(unescapeHtml(piInquiry.contents));
// 			$('.time',appendItem).text(sendTime);
// 			appendItem.data(piInquiry);
//
// 			let isItem = $('.conversation-list li').get().some(e=>{
// 				let targetData  = $(e).data();
// 				return piInquiry.mbrNo    ==  targetData.mbrNo
// 				&& piInquiry.mngNo    ==  targetData.mngNo
// 				&& piInquiry.orderNo  ==  targetData.orderNo
// 			}
// 			);
// 			if(!isItem) appendTarget.append(appendItem );
// 		}
// 		let lastItem = $('.conversation-list li').not('.chat-date').last();
// 		let lastItemData = lastItem.data();
// 		let lastItemDtSplit =lastItemData.regDt.split('-');
// 		let lastItemDt =  lastItemDtSplit[0]+'.' +lastItemDtSplit[1]+'.'+lastItemDtSplit[2];
//
// 		$('#contents a',target).text(lastItemData.contents);
// 		$('#recentDay',target).last().text(lastItemDt);
// 		$('.conversation-list li',thisPopup).last().focus();
// 		$('.conversation-list').slimscroll({'scrollBy': $(".conversation-list")[0].scrollHeight});
// 		return true;
// 	}
//
// 	const addInquery  =async function (mbrNo,mngNo,serviceApplyNo,target,mngAuth){
// 		let piInquiryDomain = {
// 			 serviceApplyNo : serviceApplyNo
// 			,mbrNo :mbrNo
// 			,mngNo : mngNo
// 			,sendGb : '02'
// 			,regId  :mngNo
// 			,contents :''
// 		}
//
// 		piInquiryDomain.contents = $('#sendMessage').val();
//
// 		let insertItem = await comAjax(apiUrl+'/api/piservice/addPISvcInquery',{data:piInquiryDomain});
// 		$('#sendMessage').val('');
// 		readInquery(mbrNo,mngNo,target,'add');
// 	}
//
// 	const closePopup = function(){
// 		let thisPopup = $('#piInqueiryPopup');
// 		thisPopup.remove();
// 	}
//
// 	await readInquery(mbrNo,mngNo,target);
// 	$('.chat-close').on('click',e=>{closePopup()});
// 	$('#chatLink').on('click',e=>{addInquery(mbrNo,loginInfo.mngNo,serviceApplyNo,target,loginInfo.mngAuth)});
//
// 	$('#sendMessage').keydown(e=>{if(e.keyCode === 13) addInquery(mbrNo,loginInfo.mngNo,serviceApplyNo,target,loginInfo.mngAuth);
// 									else if(e.keyCode == 27) $(".chatbox").remove();});
//
//
//
// 	$('.complete').on('click',e=>{
// 		if(mngNo<2){
// 			cmmAlert('관리자는 완료 처리를 할수 없습니다.',{icon:'warning'});
// 			return;
// 		}
// 		if(serviceProCd == 'PSP_002'){
// 			cmmAlert('이미 완료된 회원입니다.',{icon:'warning'});
// 			return;
// 		};
// 		cmmConfirm('완료 하시겠습니까?',e=>{
// 			comAjax(apiUrl+'/api/piservice/updateServiceComplete',{data:{serviceApplyNo:serviceApplyNo,mbrNo:mbrNo,mngNo:mngNo}}).then(e=>{
// 				$('#serviceProNm',target).text('완료');
// 				$('#serviceProNm',target).removeClass('badge-soft-primary');
// 				$('#serviceProNm',target).addClass('badge-soft-secondary');
// 				$('#piInqueiryPopup').remove();
// 			});
// 		})
// 	})
//
// 	$('#mngNm').on('click',e=>{})
//
// 	$(".chat-input #sendMessage")[0].focus();
// }
//
//
// /**
//  * @function intraPiSearchPopup
//  * @param    calback 클릭 이벤트
//  * @etc      인트라넷 공고 선택 이벤트
//  */
// const intraPiSearchPopup =async function(callback){
// 	await modalPopup('/popup/intraPiSearchPopup');
//
// 	getComCode('HOS_REGION','2','searchRegion');
// 	getComCode('MEDICAL_SUBJ','2','searchMajor');
// 	comAjax(apiUrl + "/api/code/getIntraAdminCode",{type:"get"}).then(result=>{
// 		let cdList = result.rsData.data;
// 		for (let cdItem of cdList){
// 			$('#'+'searchManager').append(`<option value = '${cdItem.cd}'>${cdItem.cdNm}</option>`);
// 		}
// 	});
//
// 	pagingCompo = new pagingComponent($('.pagination').get(0),6);
//
// 	const intraPiSearch  =async function(pageNo = 1){
// 		$('#find-notice tbody').html(' <tr><td colspan="8"><div class="none">검색중</div></td></tr>');
// 		$('#find-notice .count em').text('0');
// 		let intraPiList = await intraPiSearchAction(pageNo);
// 		let total       = intraPiSearchView(intraPiList);
// 		pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/total,intraPiSearch);
// 	}
//
// 	const intraPiSearchAction  = function(pageNo = 1){
// 		let searchData =getSearchCondiction();
// 		searchData.pageNo = pageNo;
// 		searchData.pageSize = 6;
// 		/*etc : 데이터 가져오는 restApi*/
// 		return comAjax(apiUrl + "/api/piList/getIntraPiList",{type:"get", data:searchData});
// 	}
//
// 	const intraPiSearchView  = function(intraPiList){
// 		 $('#find-notice tbody tr').remove();
// 		 $('#find-notice .count em').html(intraPiList.rsData.total_count);
//
// 		if(intraPiList.rsData.total_count < 1){
// 			 let noItemTemplet = `<tr><td colspan="8"><div class="none">검색된 공고가 없습니다.</div></td></tr>`
// 			 $('#find-notice tbody').html(noItemTemplet);
// 			 return;
// 		}
//
// 		let templet = `<tr style="cursor: pointer" class="trItem">
// 	                        <td id="state"></td>
//                             <td id="no"></td>
//                             <td id="area"></td>
//                             <td id="hosName" class="text-left"></td>
//                             <td id="major"></td>
//                             <td id="pay"></td>
//                             <td id="hasUser"></td>
//                             <td id="regDt"></td>
// 	                    </tr>`;
//         for(let item of intraPiList.rsData.data){
// 			let temlpletEl = $(templet);
// 			$('#state',temlpletEl).text(item.invstatnm);
// 			$('#no',temlpletEl).text(item.invNo);
// 			$('#area',temlpletEl).text(item.sidocdnm);
// 			$('#hosName',temlpletEl).text(item.yadmnm);
// 			$('#major',temlpletEl).text(item.majorNm);
// 			$('#pay',temlpletEl).text(item.pay);
// 			$('#hasUser',temlpletEl).text(item.regNm);
// 			$('#regDt',temlpletEl).text(item.regDt);
// 			$('#find-notice tbody').append(temlpletEl);
// 			$(temlpletEl).on('click',e=>{
// 				if(typeof callback == 'function'){
// 						callback(item);
// 					}
// 					modalClose();
// 			});
// 		}
// 		return intraPiList.rsData.total_count ;
// 	}
//
// 	const getSearchCondiction = function(){
// 		let searchCondiction = {
// 			 sidoCd   : ''
// 			,majorCd : ''
// 			,regId   : ''
// 			,yadmNm  : ''
// 		};
// 		searchCondiction.sidoCd  =  $('#searchRegion').val();
// 		searchCondiction.majorCd =  $('#searchMajor').val();
// 		searchCondiction.regId   =  $('#searchManager').val();
// 		searchCondiction.yadmNm  =  $('#searchYadmNm').val();
// 		return searchCondiction;
// 	}
//
//
// 	$('#searchBtn').click(e=>{intraPiSearch(1)});
//
// 	intraPiSearch(1);
// }
//
//
// /**
//  * @function intraPiSearchPopup
//  * @param    calback 클릭 이벤트
//  * @etc      인트라넷 공고 선택 이벤트
//  */
// const intraDocPiSearchPopup =async function(callback){
// 	await modalPopup('/popup/intraDocPiSearchPopup');
//
// 	getComCode('REGION','2','searchRegion');
// 	getComCode('MEDICAL_SUBJ','2','searchMajor');
// 	//담당자 선택
// 	comAjax(apiUrl + "/api/code/getIntraAdminCode",{type:"get"}).then(result=>{
// 		let cdList = result.rsData.data;
// 		for (let cdItem of cdList){
// 			$('#'+'searchManager').append(`<option value = '${cdItem.cd}'>${cdItem.cdNm}</option>`);
// 		}
// 	});
//
//
// 	pagingCompo = new pagingComponent($('.pagination').get(0),6);
//
// 	const intraPiSearch  =async function(pageNo = 1){
// 		$('#find-notice tbody').html(' <tr><td colspan="8"><div class="none">검색중</div></td></tr>');
// 		$('#find-notice .count em').text('0');
// 		let intraPiList = await intraPiSearchAction(pageNo);
// 		let total       = intraPiSearchView(intraPiList);
// 		pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/total,intraPiSearch);
// 	}
//
// 	const intraPiSearchAction  = function(pageNo = 1){
// 		let searchData =getSearchCondiction();
// 		searchData.pageNo = pageNo;
// 		searchData.pageSize = 6;
// 		/*etc : 데이터 가져오는 restApi*/
// 		return comAjax(apiUrl + "/api/piList/getDoctorIntraPiList",{type:"get", data:searchData});
// 	}
//
// 	const intraPiSearchView  = function(intraPiList){
// 		 $('#find-notice tbody tr').remove();
// 		 $('#find-notice .count em').html(intraPiList.rsData.total_count);
//
// 		if(intraPiList.rsData.total_count < 1){
// 			 let noItemTemplet = `<tr><td colspan="8"><div class="none">검색된 공고가 없습니다.</div></td></tr>`
// 			 $('#find-notice tbody').html(noItemTemplet);
// 			 return 0;
// 		}
// 		let templet = `<tr style="cursor: pointer" class="trItem">
// 	                        <td id="drNo"></td>
//                             <td id="drNm"></td>
//                             <td id="regionNm"></td>
//                             <td id="realAge" ></td>
//                             <td id="genderNm"></td>
//                             <td id="regNm"></td>
//                             <td id="regDt"></td>
// 	                    </tr>`;
//         for(let item of intraPiList.rsData.data){
// 			let temlpletEl = $(templet);
// 			Object.keys(item).forEach(function(key){
// 				let keyValue = '';
// 				if(!item[key]) keyValue = '';
// 				else keyValue = item[key];
// 				$(`#${key}`,temlpletEl).text(keyValue);
// 			})
//
//
// 			$('#find-notice tbody').append(temlpletEl);
// 			$(temlpletEl).on('click',e=>{
// 				if(typeof callback == 'function'){
// 						callback(item);
// 					}
// 					modalClose();
// 			});
// 		}
// 		return intraPiList.rsData.total_count ;
// 	}
//
// 	const getSearchCondiction = function(){
// 		let searchCondiction = {
// 			 sidoCd   : ''
// 			,majorCd : ''
// 			,regId   : ''
// 			,docNm  : ''
// 			,docNo  : ''
// 		};
// 		searchCondiction.sidoCd  =  $('#searchRegion').val();
// 		searchCondiction.regId   =  $('#searchManager').val();
// 		searchCondiction.docNm  =  $('#searchDocNm').val();
// 		searchCondiction.docNo  =  Number($('#searchDocNo').val());
// 		return searchCondiction;
// 	}
//
// 	$('#searchDocNo').on('input',e=>{inputCheckNumber(e.currentTarget)});
//
// 	$('#searchBtn').click(e=>{intraPiSearch(1)});
//
// 	intraPiSearch(1);
// }
//
//
//
// const piPreviewPopup =async function(anntNo){
// 	const deadlineStr = function(useYn,deadline){
// 		deadline = deadline.replaceAll('-','');
// 		if(useYn == 'N'){
// 			return "마감";
// 		}
// 		if(deadline == ''){
// 			return '채용시 까지';
// 		}
// 		let date =curDate();
// 		const date1 = new Date(date.substr(0,4),date.substr(4,2),date.substr(6,2));
// 		const date2 = new Date(deadline.substr(0,4),deadline.substr(4,2),deadline.substr(6,2));
// 		if(date1 > date2){
// 			return '마감';
// 		}else if(date1 < date2){
// 			const diffDate = date1.getTime() - date2.getTime();
// 			let diffDayStr = Math.abs(diffDate / (1000 * 60 * 60 * 24)).toString();
// 			return 'D-'+diffDayStr.padStart(2,0);
// 		}else{
// 			return '오늘까지';
// 		}
// 	}
//
//
// 	await modalPopup('/popup/piPreviewPopup');
// 	let resultAjax = await comAjax(apiUrl+'/api/piList/getAnntPiDtl',{type:'get',data:{anntNo:anntNo}})
// 	let piDtlItem = resultAjax.rsData.data;
// 	//info-detail - 타이틀명
// 	$('#recruitment .info-detail .sbj').text(piDtlItem.title);
// 	//info-detail - d day
// 	$('#recruitment .info-detail .deadline>li').first().text(deadlineStr(piDtlItem.useYn,piDtlItem.deadline));
// 	//info-detail - d day 일자
// 	if(piDtlItem.deadline != ''){
// 		/**년월도*/
// 		let deadLineMd = piDtlItem.deadline.substr(4);
// 		let deadLineDate = new Date(piDtlItem.deadline.substr(0,4),piDtlItem.deadline.substr(4,2)-1,piDtlItem.deadline.substr(6,2));
// 		let week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
// 		let weekDay =  week[deadLineDate.getDay()]
// 		deadLineMd = '~'+deadLineMd.substr(0,2)+'/'+deadLineMd.substr(2)+'('+weekDay+')'
// 		$('#recruitment .info-detail .deadline>li').last().text(deadLineMd);
// 	}
// 	$('#recruitment .num').text(piDtlItem.anntNo);
//
// 	$('#recruitment .summary #invitMajor').text(piDtlItem.majorNm);
// 	//진료분야
// 	if(piDtlItem.medicalFieldNm){
// 	$('#recruitment .summary #invitCategory').text(piDtlItem.medicalFieldNm);
// 	}else{
// 		$('#recruitment .summary #invitCategory').parent().remove();
// 	}
//
//
// 	//근무지역 sidoNm sgguNm
// 	$('#recruitment .summary #workArea').text(`${piDtlItem.sidoNm} ${piDtlItem.sgguNm ?piDtlItem.sgguNm:'' }`);
// 	//당직
// 	$('#recruitment .summary #partyPost').text(`${piDtlItem.dutyWeeklyNm} `);
// 	//급여
// 	$('#recruitment .summary #pay').text(`${piDtlItem.payTypeNm} ${piDtlItem.payRangeNm}`);
// 	//로딩
// 	$('#recruitment .summary #loding').text(`${piDtlItem.loading}`==undefined ? '내용없음':`${piDtlItem.loading}`)
// 	//사택제공
// 	$('#recruitment .summary #houseOffer').text(piDtlItem.accommodationYn =='Y'?'제공':'미제공');
//
// 	let workingdt = piDtlItem.workingdt;
// 	if(workingdt ==''){workingdt = '협의'}
// 	else{workingdt = yyyMMddView(piDtlItem.workingdt)}
// 	//근무시기
// 	$('#recruitment .summary #workingdt').text(workingdt);
//
// 	let limitAge = piDtlItem.limitAge;
// 	if(limitAge==''){
// 		$('#recruitment .summary #age').text("무관");
// 	}else{
// 		$('#recruitment .summary #age').text(limitAge+"세 미만");
// 	}
//
//
//
// 	let workhourWd="",workhourStd="",workhourSd="";
// 	if(piDtlItem.workhourWdS !=undefined && piDtlItem.workhourWdS !=''){
// 		workhourWd = piDtlItem.workhourWdS.substr(0,2) + "시 " + piDtlItem.workhourWdS.substr(2,2) + "분 ~ " + piDtlItem.workhourWdE.substr(0,2) + "시 " + piDtlItem.workhourWdE.substr(2,2) + "분";
// 		if(piDtlItem.workhourWdHafOff == 'Y'){
// 			workhourWd += '(반 OFF)'
// 		}
// 	}else{
// 		workhourWd = `근무없음`;
// 	}
// 	if(piDtlItem.workhourStdS !=undefined &&piDtlItem.workhourStdS !=''){
// 		workhourStd = piDtlItem.workhourStdS.substr(0,2) + "시 " + piDtlItem.workhourStdS.substr(2,2) + "분 ~ " + piDtlItem.workhourStdE.substr(0,2) + "시 " + piDtlItem.workhourStdE.substr(2,2) + "분";
// 		if(piDtlItem.workhourStdBiweekly == 'Y'){
// 			workhourStd += '(격주 근무)'
// 		}
// 	}else{
// 		workhourStd = `근무없음`;
// 	}
// 	if(piDtlItem.workhourSdS !=undefined &&piDtlItem.workhourSdS !='' &&piDtlItem.workhourSdS !='0000'){
// 		workhourSd = piDtlItem.workhourSdS.substr(0,2) + "시 " + piDtlItem.workhourSdS.substr(2,2) + "분 ~ " + piDtlItem.workhourSdE.substr(0,2) + "시 " + piDtlItem.workhourSdE.substr(2,2) + "분";
// 	}else{
// 		workhourSd = `근무없음`;
// 	}
// 	//모집인원
// 	$('#recruitmentNo').text(piDtlItem.recruitmentNo);
//
// 	let conference =piDtlItem.conference;
// 	//학회참석
// 	if( conference== 'Y') conference  ='참석가능';
// 	else if(conference== 'N')				  conference  ='참석불가';
// 	else if(conference== 'U')  	  conference  ='협의';
// 	$('#conference').text(conference);
//
// 	$('#offerReason').text(piDtlItem.offerReasonNm);
// 	//근무시간
// 	$('#recruitment .summary #workingTime').html(`평일   : ${workhourWd} <br> 토요일 : ${workhourStd}<br> 일요일 : ${workhourSd}<br> 공휴일 : ${piDtlItem.holidayNm}`);
//
//
// 	if(piDtlItem.annualLegalYn =='Y'){
// 		$('#annual').text(`근로기준법 적용`);
// 	}else{
// 		$('#annual').text(`${piDtlItem.annual} 일`);
// 	}
//
// 	console.log(piDtlItem.etc);
// 	//기타
// 	let etc = piDtlItem.etc;
// 	if(etc=='' || etc == undefined) etc= '내용 없음';
// 	$('#recruitment .summary #etc').text(etc);
//
//
// 	if(piDtlItem.mngMsg != undefined && piDtlItem.mngMsg != ''){
// 		//컨설턴트 한마디
// 		$('#recruitment .consultant .headline').text(piDtlItem.mngMsg);
// 	}else{
// 		$('#recruitment .consultant').remove();
// 		$('#consultantTit').remove();
// 	}
// 	//상세요강
// 	if(piDtlItem.recruitmentDetails != undefined && piDtlItem.recruitmentDetails != ''){
// 		$('#recruitment .content').html(piDtlItem.recruitmentDetails.replaceAll('\n','<br/>').replaceAll('\t','    '));
// 	}
//
//
// 	if(piDtlItem.mngProfileImg){
// 		$('.manager-info .avatar img').attr('src','/uploadImg'+piDtlItem.mngProfileImg);
// 	}
//
// 	//헤드헌터이미지
// 	//헤드헌터  이름
// 	$('.manager-info .wrap .name').text(piDtlItem.mngNm);
// 	//헤드헌터 연락처
// 	$('.manager-info .wrap ul>li span').first().text(piDtlItem.mngPhone);
// 	//헤드헌터 이메일
// 	$('.manager-info .wrap ul>li span').last().text(piDtlItem.mngEmail);
// 	//헤드헌터 코멘트
// 	$('.manager-info .wrap .comment').html(piDtlItem.mngComment);
// }
//
//
// /**
//  * @function findHospitalInfoPopup
//  * @param    data
//  * @etc      병원 검색 팝업 호출
//  */
// const findHospitalInfoPopup = async function(callback=()=>{}){
// 	await modalPopup('/popup/findHospitalInfoPopup');
//
// 	let pagingCompo  = new pagingComponent($('.pagination')[0],6,8);
//
//
// 	const searchEnter  = function(){
// 		$('.custom-search button').click();
//
// 	}
//
// 	$('#yadmnm').keydown(function(e) {
// 		if(e.keyCode == 13)searchEnter()
// 	})
//
//
// 	const hospitalSerch=async function(pageNum=1){
// 		let hospitalItemStr =
// 			`<li>
// 				<div class="custom-control custom-radio radio-lg">
// 			        <input type="radio" class="custom-control-input">
// 			        <label class="custom-control-label" ></label>
// 		        </div>
// 		    </li>`;
//
// 		let yadmnm = $('#yadmnm').val();
//
// 		//let hospitalItem = await comAjax(apiUrl+'code/hospitalList.do',{type:'get',data:{yadmnm,pageNo:pageNum,pageSize:'6'}});
//
// 		let hospitalItem  = await apiComponent.publicHosInfoApi(yadmnm,pageNum,5);
//
// 		$('#find-hospital .radio-list ul li').remove();
// 		let totalCnt = 0;
// 		let resultHospitalItem = hospitalItem.response.body;
//
// 		if(resultHospitalItem.totalCount > 1){
// 			totalCnt = resultHospitalItem.totalCount;
// 			for(let item of resultHospitalItem.items.item){
// 				let $hospitalItem=$(hospitalItemStr);
// 				$('input',$hospitalItem).data(item);
// 				$('input',$hospitalItem).attr('id',item.ykiho);
// 				$('label',$hospitalItem).attr('for',item.ykiho);
// 				$('label',$hospitalItem).append(item.yadmNm);
// 				$('label',$hospitalItem).append(`<span>${item.addr}</span>`);
//
// 				$('#find-hospital .radio-list ul').append($hospitalItem);
//
// 				$('input[type="radio"]',$hospitalItem).on('change',(e)=>{
// 					if($(e.target).prop('checked')){
// 						$('#find-hospital input[type="radio"]').not(e.target).prop('checked',false);
// 					}
//
// 				})
// 			}
// 		}else if(resultHospitalItem.totalCount == 1){
// 			totalCnt = resultHospitalItem.totalCount;
// 			let item =resultHospitalItem.items.item;
//
// 			let $hospitalItem=$(hospitalItemStr);
// 				$('input',$hospitalItem).data(item);
// 				$('input',$hospitalItem).attr('id',item.ykiho);
// 				$('label',$hospitalItem).attr('for',item.ykiho);
// 				$('label',$hospitalItem).append(item.yadmNm);
// 				$('label',$hospitalItem).append(`<span>${item.addr}</span>`);
//
// 				$('#find-hospital .radio-list ul').append($hospitalItem);
//
// 				$('input[type="radio"]',$hospitalItem).on('change',(e)=>{
// 					if($(e.target).prop('checked')){
// 						$('#find-hospital input[type="radio"]').not(e.target).prop('checked',false);
// 					}
//
// 				})
// 		}else {
// 			$('#find-hospital .radio-list ul').append(`<li><div class="none">검색된 결과가 없습니다.</div></li>`);
// 		}
// 		pagingCompo.pageNavi(/*몇번째 페이지 */pageNum,/*total갯수*/totalCnt,hospitalSerch);
//
// 	}
// 	hospitalSerch(1);
// 	$('#find-hospital .custom-search .btn').on('click',()=>{hospitalSerch();});
// 	$('#find-hospital #selectBtn').on('click',()=>{
// 		let item = $('#find-hospital ul input');
// 		let targetData = item.filter((e,item)=>{return $(item).prop('checked')}).data();
// 		modalClose(()=>{
// 			if(targetData){
// 				callback(targetData);
// 			}
// 		},{},'find-hospital');
//
//
// 	})
//
// };
//
// /**
//  * @function recomendPublicListPopup
//  * @param    data
//  * @etc      추천초빙공고 팝업
//  */
// const couponAddPopup = async function(suchFn ){
// 	await modalPopup('/popup/couponAddPopup');
// 		let thisPopup = $('#couponAddPopup');
// 		$('#saveItem',thisPopup).on('click',e=>{
// 			let couponTitle = $("#couponTitle",thisPopup).val();
// 			let couponDtl = $("#couponDtl",thisPopup).val();
// 			if(!couponTitle){
// 				$("#vali",thisPopup).show();
// 				$("#vali",thisPopup).text('쿠폰 타이틀 입력이 필요합니다.');
// 				return;
// 			}
// 			if(!couponDtl){
// 				$("#vali",thisPopup).show();
// 				$("#vali",thisPopup).text('쿠폰 상세 입력이 필요합니다.');
// 				return;
// 			}
//
// 			comAjax(apiUrl+'/api/coupon/insertCouponList',{data:{couponTitle,couponDtl }}).then(e=>{
// 				suchFn();
// 				modalClose();
// 			});
//
//
// 		})
//
// };
//
// const couponIssuedAddMbrPopup =async function(couponNo){
// 	let userItem = [];
//
//
// 	await modalPopup('/popup/couponIssuedAddMbrPopup');
//
// 	//조회된 정보 팝업에 등록
// 	const searchInit = function(){
// 		$('#sel_MC_01_tbody tr').remove();
// 		//조회된 유저 정보 couponUserList;
// 		for(let couponUser of couponUserList){
// 			let couponIssueDate = yyyMMddView(couponUser.couponIssueDate);
// 			let etc = couponUser.etc?couponUser.etc:'';
// 			let popupUserTemplet = `
// 				<tr>
// 					<td><input type="checkbox" class="user_chk"></td>
// 					<td id="couponReceiveMbrNo">${couponUser.couponReceiveMbrNo}</td>
// 					<td id="couponReceiveMbrNm">${couponUser.couponReceiveMbrNm}</td>
// 					<td id="couponIssueDate">${couponIssueDate}</td>
// 					<td id="etc">${etc}</td>
// 					<td id="regNm">${couponUser.regNm}</td>
// 					<td id="regDt">${couponUser.regDt}</td>
// 				</tr>
// 			`;
// 			let $popupView = $(popupUserTemplet);
// 			$('#sel_MC_01_tbody').append($popupView);
// 		}
// 	}
//
// 	const searchMember =async function(couponNo){
// 		let  couponMemberList =await comAjax(apiUrl+'/api/coupon/getCouponMemberList',{type:'get',data:{couponNo}});
// 		let  memberTable = $('#memberTbody');
// 		if(couponMemberList.rsData.response_code != '000')return;
// 		let userList = couponMemberList.rsData.data;
//
// 		userItem = [...userList];
//
// 			for(let userInfo of userList){
//
//
// 			let majorNm =userInfo.majorNm == undefined? '':userInfo.majorNm;
// 			let universityNm =userInfo.universityNm == undefined? '':userInfo.universityNm;
// 			let licenseNo    =userInfo.licenseNo == undefined? '':userInfo.licenseNo;
// 			let phoneNum     = validTelNo(userInfo.phoneNum);
// 			let userTemplet = `
// 				<tr>
// 				<td><input type="checkbox" class="MC_01_chk"></td>
// 			    <td name="mbrNo">${userInfo.mbrNo}</td>
// 			    <td name="mbrNm">${userInfo.mbrNm}</td>
// 			    <td name="genderNm" >${userInfo.genderNm}</td>
// 			    <td name="phoneNum">${phoneNum}</td>
// 			    <td name="majorNm">${majorNm}</td>
// 			    <td name="universityNm">${universityNm}</td>
// 			    <td name="licenseNo">${licenseNo}</td>
// 			    <td>${userInfo.dtlInfoYn}</td>
// 			    </tr>`;
// 			    let templetEl = $(userTemplet)
// 			 memberTable.append(templetEl);
// 			 if(couponUserList.some(item=>item.couponReceiveMbrNo == userInfo.mbrNo)){
// 				userItem.forEach(item=>{
// 					if(userInfo.mbrNo ==item.mbrNo ){
// 						return item.stat = 'D';
// 					}
// 				})
// 				templetEl.hide();
//
// 			}
//
// 		}
// 	}
//
// 	const listDown = function(){
// 		//couponUserList;
// 		let userTable = $('#userTable');
// 		let inputTable = $('#inputTable');
//
//
// 		//유저 테이블 추가
// 		let checkUserTable = $('.MC_01_chk',userTable).filter((index,item)=>item.checked).get();
// 		console.log(checkUserTable);
// 		for(let item of checkUserTable){
// 			let targetTr = $(item.parentElement.parentElement);
// 			let targetMbrNo = $('[name="mbrNo"]',targetTr ).text();
// 			if(userItem.some(item=>item.mbrNo==targetMbrNo &&item.stat=='D')){
// 				continue;
// 			}
// 			userItem.forEach(item=>{if(item.mbrNo ==targetMbrNo )item.stat ='D' });
// 			$('.MC_01_chk',targetTr).prop('checked',false);
// 			targetTr.hide();
//
// 			//등록 목록에 추가
// 			let couponUser = {
// 				'couponNo' : 0
// 				,'couponReceiveMbrNo' : 0
// 				,'couponReceiveMbrNm' : ''
// 				,'couponIssueDate' : ''
// 				,'etc': ''
// 				,'regId' : 0
// 				,'regNm' : ''
// 				,'regDt' : ''
// 			}
//
// 			var date = new Date();
//     		var year = date.getFullYear();
//     		var month = ("0" + (1 + date.getMonth())).slice(-2);
//     		var day = ("0" + date.getDate()).slice(-2);
//
//     		couponUser.regDt = year + "-" + month + "-" + day;
// 			couponUser.regNm = $('.header .username').text().split(' ')[0];
// 			couponUser.couponReceiveMbrNo = Number(targetTr.find('[name="mbrNo"]').text());
// 			couponUser.couponReceiveMbrNm = targetTr.find('[name="mbrNm"]').text();
// 			couponUserList.push(couponUser);
//
//
//
// 			let downTemplet =  `
// 				<tr>
// 					<td><input type="checkbox" class="user_chk"></td>
// 					<td id="couponReceiveMbrNo">${couponUser.couponReceiveMbrNo}</td>
// 					<td id="couponReceiveMbrNm">${couponUser.couponReceiveMbrNm}</td>
// 					<td id="couponIssueDate">${couponUser.couponIssueDate}</td>
// 					<td id="etc">${couponUser.etc}</td>
// 					<td id="regNm">${couponUser.regNm}</td>
// 					<td id="regDt">${couponUser.regDt}</td>
// 				</tr>
// 			`;
// 			let $downTemplet = $(downTemplet);
// 			$('#sel_MC_01_tbody').append($downTemplet);
//
//
//
//
// 			let couponIssuedTableTemplet = `
// 			<tr>
// 				<td id="couponReceiveMbrNo">${couponUser.couponReceiveMbrNo}</td>
// 				<td id="couponReceiveMbrNm">${couponUser.couponReceiveMbrNm}</td>
// 				<td id="couponIssueDate"><input maxLength="10"  class="form-control" type="text" value="${couponUser.couponIssueDate}"></td>
// 				<td id="etc"><input maxLength="100" class="form-control" type="text" value="${couponUser.etc}"></td>
// 				<td id="regNm">${couponUser.regNm}</td>
// 				<td id="regDt">${couponUser.regDt}</td>
// 			</tr>`;
// 			let $couponIssuedTableTemplet = $(couponIssuedTableTemplet);
//
//
// 			$('#couponIssueDate input',$couponIssuedTableTemplet).on('input',function(e){
// 				e.currentTarget.value = yyyMMddView(e.currentTarget.value);
// 				couponUserList.forEach(item=>{
// 					if(item.couponReceiveMbrNo==couponUser.couponReceiveMbrNo){
// 						item.couponIssueDate = e.currentTarget.value;
// 					}
// 				});
// 			})
//
// 			$('#etc input',$couponIssuedTableTemplet).on('input',function(e){
// 				couponUserList.forEach(item=>{
// 					if(item.couponReceiveMbrNo==couponUser.couponReceiveMbrNo){
// 						item.etc = e.currentTarget.value;
// 					}
// 				});
// 			})
//
// 			$('#couponIssuedTable').append($couponIssuedTableTemplet);
// 		}
// 	}
//
// 	const listUp = function(){
// 			let checkList= $('#sel_MC_01_tbody .user_chk').filter((index,item)=>item.checked).get();
// 			console.log(checkList);
// 			for(let check of checkList){
// 				let trItem = check .parentElement.parentElement;
// 				let targetMbrNo = $('#couponReceiveMbrNo',trItem).text();
// 				couponUserList = couponUserList.filter(item=>item.couponReceiveMbrNo != targetMbrNo);
//
// 				$('#memberTbody [name="mbrNo"]').parent().show();
// 				trItem.remove();
//
// 				let outItem  = $('#couponIssuedTable tr #couponReceiveMbrNo').filter((index,item)=>item.textContent==targetMbrNo);
// 				outItem.parent().remove();
//
// 			}
//
//
//
// 	}
//
//
//
// 	const popupInit = (function(){
// 		$(".statistics-list .usr_list").slimScroll({
// 	    	width: "100%",
// 	        height: "100%",
// 	        railVisible: true,
// 	    	wheelStep: 10,
// 	    	allowPageScroll: false,
// 	    	disableFadeOut: false
//     	});
//     	//시작
//     	searchMember();
//     	searchInit();
//     	$('#choice-member #listDown').on('click',()=>{
// 			listDown();
// 		});
//
// 		$('#choice-member #listUp').on('click',()=>{
// 			listUp();
// 		});
//
// 	})();
// }
//
//
//
//
// const docPiPreviewPopup =async function(docAnntNo){
// 	await modalPopup('/popup/docPiPreviewPopup');
// 	previewPopupView(docAnntNo);
//
//
// 	async function previewPopupView(docAnntNo){
//
// 		let returnDocItem  = await comAjax(apiUrl+'/api/piList/getDocUpdateItem',{type:'get',data:{docAnntNo:docAnntNo,secret:'Y'}});
// 		let docPiAnnt = returnDocItem.rsData.data.docPiAnnt;
// 		let memberInfo = returnDocItem.rsData.data.memberInfo;
//
// 		let popup = $('#view-doc-piservice');
//
// 		//공고번호
// 		$('#docAnntNo',popup).text(docPiAnnt.docAnntNo);
// 		//타이틀명
// 		$('.title .sbj',popup).text(unescapeHtml(docPiAnnt.docAnntTitle));
// 		//이름
// 		$('#docAnntDocnm',popup).text(docPiAnnt.docAnntDocnm);
//
// 		//연령대
// 		$('#docAgeRange',popup).text(`${docPiAnnt.docAgeRange?docPiAnnt.docAgeRange+' 대':''}`)
// 		//년차
// 		$('#docAnntCareer',popup).text(docPiAnnt.docAnntCareerNm);
//
// 		//성별
// 		$('#docAnntGender',popup).text(docPiAnnt.docAnntGenderNm);
//
// 		//전공 이름
// 		$('#docAnntMajorNm',popup).text(docPiAnnt.docAnntMajorNm);
//
// 		//희망 지역
// 		$('#docAnntHopAreaNm',popup).text(docPiAnnt.docAnntHopAreaNm);
// 		//희망 병원 타입
// 		$('#docHopHosTypeCdNm',popup).text(docPiAnnt.docHopHosTypeCdNm);
// 		//희망 전공
// 		$('#docAnntHopMajorNm',popup).text(docPiAnnt.docAnntHopMajorNm);
// 		//내용
// 		$('.content',popup).html(unescapeHtml(docPiAnnt.docAnntDtlInfo).replaceAll('\n','<br>') );
//
// 		if(memberInfo.mngProfileImg){
// 			$('.manager-info .avatar img').attr('src','/uploadImg'+piDtlItem.mngProfileImg);
// 		}
//
// 		//헤드헌터이미지
// 		//헤드헌터  이름
// 		$('.manager-info .wrap .name').text(memberInfo.mngNm??'');
// 		//헤드헌터 연락처
// 		$('.manager-info .wrap ul>li span').first().text(memberInfo.mngPhone??'');
// 		//헤드헌터 이메일
// 		$('.manager-info .wrap ul>li span').last().text(memberInfo.mngEmail??'');
// 		//헤드헌터 코멘트
// 		$('.manager-info .wrap .comment').html(memberInfo.mngComment??'');
//
//
// 	}
//
//
// }
//
// /**
//  * @function advrtPreviewPopup
//  * @param    data
//  * @etc      광고미리보기 팝업
//  */
// const advrtPreviewPopup = async function(data){
// 	await modalPopup('/popup/advrtPreviewPopup');
//
// 	let searchOption = {
// 		type: "get"
// 	}
// 	const res = await comAjax(apiUrl + "/api/advrt/getAdvrtPreview",searchOption);
//
// 	if(res.rsData.response_code === "000"){
// 		let html = ``;
// 		for(const item of res.rsData.data) {
// 			html += `<div>${item.linkUrl ? `<a target=_blank" href="${item.linkUrl}"><img src="/uploadImg${item.profileImg}"></a>` : `<img src="/uploadImg${item.profileImg}">`}</div>`;
// 		}
//
// 		$(".slider").html(html);
// 		$(".side-advrt > .slider").slick({
// 			slide: "div",
// 			infinite : true,
// 			slidesToShow : 1,
// 			slidesToScroll : 1,
// 			speed : 1000,
// 			arrows : false,
// 			dots : true,
// 			autoplay : true,
// 			autoplaySpeed : 4000,
// 			pauseOnHover : true,
// 			dotsClass : "container slick-dots",
// 			vertical : false,
// 			draggable : true,
// 			responsive: [
//
// 				{
// 					breakpoint: 1024,
// 					settings: {
// 						slidesToShow: 3
// 					}
// 				},
// 				{
// 					breakpoint: 768,
// 					settings: {
// 						slidesToShow: 1
// 					}
// 				}
// 			]
// 		});
// 	}
// };
