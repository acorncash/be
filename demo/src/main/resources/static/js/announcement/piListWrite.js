// /**@file : pistWrite.js
//  * @see  : P.I 공고 목록
//  */
//
// let loginInfo = {};
// let selectedInfo = {};
// let selectedHosInfo = {};
// $(document).ready(e=>{
//
//    comAjax(apiUrl + "/api/member/getLoginInfo",{type:'get'}).then(userInfo=>{
// 		loginInfo = userInfo.rsData.data;
// 		$('#regMngNm').val(loginInfo.mngNm);
// 	});
//
//       codeInit();
// 	  evenetInit();
//
//
//
//
//
//
//
//
// });
//
// const codeInit=async function(){
//
// 	await getMajorCode('pMajor').then(e=>{
// 		$('#pMajor').multiselect({
// 	            columns: 1,
// 	            placeholder: '초빙과목',
// 	            search: true,
// 	            searchOptions: {
// 	                'default': '과목'
// 	            }
// 	        });
// 	     $('#ms-list-1').css('width','150px');
// 	     $('#ms-list-1').css('border-radius','0.4rem');
// 	     $('#ms-list-1>button').addClass('form-control');
// 	});
// 	getComCode('HASH_TAG','2','hashTageList').then(e=>{
// 		$('#hashTageList').multiselect({
// 	            columns: 1,
// 	            placeholder: '해쉬태그',
// 	            search: true,
// 	            searchOptions: {
// 	                'default': '해쉬태그'
// 	            }
// 	            ,onOptionClick: function( element, option ) {
// 				        var maxSelect = 3;
//
// 				        // too many selected, deselect this option
// 				        if( $(element).val().length > maxSelect ) {
// 				            if( $(option).is(':checked') ) {
// 				                var thisVals = $(element).val();
//
// 				                thisVals.splice(
// 				                    thisVals.indexOf( $(option).val() ), 1
// 				                );
//
// 				                $(element).val( thisVals );
//
// 				                $(option).prop( 'checked', false ).closest('li')
// 				                    .toggleClass('selected');
// 				            }
// 				        }
// 				        // max select reached, disable non-checked checkboxes
// 				        else if( $(element).val().length == maxSelect ) {
// 				            $(element).next('.ms-options-wrap')
// 				                .find('li:not(.selected)').addClass('disabled')
// 				                .find('input[type="checkbox"]')
// 				                    .attr( 'disabled', 'disabled' );
// 				        }
// 				        // max select not reached, make sure any disabled
// 				        // checkboxes are available
// 				        else {
// 				            $(element).next('.ms-options-wrap')
// 				                .find('li.disabled').removeClass('disabled')
// 				                .find('input[type="checkbox"]')
// 				                    .removeAttr( 'disabled' );
// 				        }
// 				    }
// 	        });
// 	     $('#ms-list-2').css('border-radius','0.4rem');
// 	     $('#ms-list-2>button').addClass('form-control');
//
// 	})
//
//
//
//
//
// 	await getComCode('TREAT_SUBJ','2','pMedicalField');
// 	await getComCode('SALARY_MM','2','pNetPayRange')
// 	await getComCode('SALARY_YY','2','pGrossPayRange')
// 	await getComCode('OFFER_REASON','2','pOfferReason')
// 	await getComCode('WORK_HOLIDAY','2','pWorkHoliday')
// 	await getComCode('WORK_TYPE','2','pEmploymentType')
//
//
//
// 	hourSelectView('pWorkhourWdsH');
// 	hourSelectView('pWorkhourWdeH');
// 	hourSelectView('pWorkhourStdsH');
// 	hourSelectView('pWorkhourStdeH');
// 	hourSelectView('pWorkhourSdsH');
// 	hourSelectView('pWorkhourSdeH');
//
// 	minitSelectView('pWorkhourWdsM');
// 	minitSelectView('pWorkhourWdeM');
// 	minitSelectView('pWorkhourStdsM');
// 	minitSelectView('pWorkhourStdeM');
// 	minitSelectView('pWorkhourSdsM');
// 	minitSelectView('pWorkhourSdeM');
//
// 	defaultVal();
//
// }
//
// const evenetInit = function(){
//
// 	//채용 마감일 - 근무없음 체크박스
// 	$('#pDeadlineNo').on('change',e=>{
// 		if(e.target.checked){
// 			$('#pDeadline').val('');
// 			$('#pDeadline').prop('disabled',true);
// 		}else{
// 			$('#pDeadline').prop('disabled',false);
// 		}
// 	});
//
// 	//09-08-근로기준법 체크
// 	$('#pAnnualLegalYn').on('change',e=>{
// 		if(e.target.checked){
// 			$('#pAnnual').val('');
// 			$('#pAnnual').prop('disabled',true);
// 		}else{
// 			$('#pAnnual').prop('disabled',false);
// 		}
// 	});
//
// 		//연령
// 	$('#pLimitAgeCheck').on('change',e=>{
// 		if(e.target.checked){
// 			$('#pLimitAge').val('');
// 			$('#pLimitAge').prop('disabled',true);
// 		}else{
// 			$('#pLimitAge').prop('disabled',false);
// 		}
// 	});
//
// 	//근무시기
// 	$('#pworkingdtCheck').on('change',e=>{
// 		if(e.target.checked){
// 			$('#pworkingdt').val('');
// 			$('#pworkingdt').prop('disabled',true);
// 		}else{
// 			$('#pworkingdt').prop('disabled',false);
// 		}
// 	});
//
// 	//학회참석 버튼 이벤트
// 	$('.conference').on('click',e=>{
// 		let value = $(e.target).attr('value');
// 		$('#pConference').val(value);
// 		$('.conference').removeClass('active');
// 		$(e.target).addClass('active');
// 	});
//
//
// 	//당직(주간)
// 	$('.dutyWeekly').on('click',e=>{
// 		let value = $(e.target).attr('value');
// 		$('#pDutyWeekly').val(value);
// 		$('.dutyWeekly').removeClass('active');
// 		$(e.target).addClass('active');
// 	});
//
// 	//당직(야간)
// 	$('.dutyNight').on('click',e=>{
// 		let value = $(e.target).attr('value');
// 		$('#pDutyNight').val(value);
// 		$('.dutyNight').removeClass('active');
// 		$(e.target).addClass('active');
// 	});
//
//
// 	//급여
// 	$('.pPayType').on('click',e=>{
// 		let value = $(e.target).attr('value');
// 		$('#pPayGb').val(value);
// 		$('.pPayType').removeClass('active');
// 		$(e.target).addClass('active');
// 		if(value == 'N'){$('#pNetPayRange').show(); $('#pGrossPayRange').hide();$('#pGrossPayRange').val('');}
// 		if(value == 'G'){$('#pNetPayRange').hide(); $('#pGrossPayRange').show();$('#pNetPayRange').val('');}
// 	});
//
//
// 	$('#pWorkhourWdNo').on('change',e=>{
// 		if(e.target.checked){
// 			$('#pWorkhourWdsH').val('');
// 			$('#pWorkhourWdsM').val('');
// 			$('#pWorkhourWdeH').val('');
// 			$('#pWorkhourWdeM').val('');
// 			$('#pWorkhourWdsH').prop('disabled',true);
// 			$('#pWorkhourWdsM').prop('disabled',true);
// 			$('#pWorkhourWdeH').prop('disabled',true);
// 			$('#pWorkhourWdeM').prop('disabled',true);
// 			$('#pWorkhourWdHafOff')[0].checked = false;
// 			$('#pWorkhourWdHafOff').prop('disabled',true);
// 		}else{
// 			$('#pWorkhourWdsH').prop('disabled',false);
// 			$('#pWorkhourWdsM').prop('disabled',false);
// 			$('#pWorkhourWdeH').prop('disabled',false);
// 			$('#pWorkhourWdeM').prop('disabled',false);
// 			$('#pWorkhourWdHafOff').prop('disabled',false);
// 		}
// 	})
//
// 	$('#pWorkhourStdNo').on('change',e=>{
// 		if(e.target.checked){
// 			$('#pWorkhourStdsH').val('');
// 			$('#pWorkhourStdsM').val('');
// 			$('#pWorkhourStdeH').val('');
// 			$('#pWorkhourStdeM').val('');
// 			$('#pWorkhourStdsH').prop('disabled',true);
// 			$('#pWorkhourStdsM').prop('disabled',true);
// 			$('#pWorkhourStdeH').prop('disabled',true);
// 			$('#pWorkhourStdeM').prop('disabled',true);
// 			$('#pWorkhourStdBiweekly')[0].checked = false;
// 			$('#pWorkhourStdBiweekly').prop('disabled',true);
// 		}else{
// 			$('#pWorkhourStdsH').prop('disabled',false);
// 			$('#pWorkhourStdsM').prop('disabled',false);
// 			$('#pWorkhourStdeH').prop('disabled',false);
// 			$('#pWorkhourStdeM').prop('disabled',false);
// 			$('#pWorkhourStdBiweekly').prop('disabled',false);
// 		}
// 	})
//
// 		$('#pWorkhourSdNo').on('change',e=>{
// 		if(e.target.checked){
// 			$('#pWorkhourSdsH').val('');
// 			$('#pWorkhourSdsM').val('');
// 			$('#pWorkhourSdeH').val('');
// 			$('#pWorkhourSdeM').val('');
// 			$('#pWorkhourSdsH').prop('disabled',true);
// 			$('#pWorkhourSdsM').prop('disabled',true);
// 			$('#pWorkhourSdeH').prop('disabled',true);
// 			$('#pWorkhourSdeM').prop('disabled',true);
// 		}else{
// 			$('#pWorkhourSdsH').prop('disabled',false);
// 			$('#pWorkhourSdsM').prop('disabled',false);
// 			$('#pWorkhourSdeH').prop('disabled',false);
// 			$('#pWorkhourSdeM').prop('disabled',false);
// 		}
// 	})
//
//
//
//
//
// 	$('#intraPiSearchPopup').click(e=>{
// 		intraPiSearchPopup(returnItem =>{
// 			selectedInfo =returnItem;
// 			let rcmPeriod =  returnItem.rcmPeriod !='' ? yyyMMddView(returnItem.rcmPeriod) : "미정";
// 			if(returnItem.invNo != undefined)$('#invNo').text(returnItem.invNo);//인트라초빙번호
// 			if(returnItem.invNo != undefined)$('#pIntranetAnntNo').val(returnItem.invNo)
// 			if(returnItem.yadmnm != undefined)$('#yadmnm').val(`${returnItem.yadmnm}`);//병원이름
// 			if(returnItem.invstatnm != undefined)$('#invstatnm').val(`${returnItem.invstatnm}`);//상태
// 			if(returnItem.rcmPeriod != undefined)$('#rcmPeriod').val(rcmPeriod);//모집기간
// 			if(returnItem.pay != undefined)$('#pay').val(`${returnItem.pay}`);//급여수준
// 			if(returnItem.mngNm != undefined)$('#mngNm').val(`${returnItem.mngNm}`);//담당자
// 			if(returnItem.telNo1 != undefined)$('#telNo1').val(`${returnItem.telNo1}`);//핸드폰
// 			if(returnItem.regNm != undefined)$('#regNm').val(`${returnItem.regNm}`);//핸드폰2
// 			if(returnItem.faxNo != undefined)$('#faxNo').val(`${returnItem.faxNo}`);//팩스
// 			if(returnItem.email != undefined)$('#email').val(`${returnItem.email}`);//이메일
// 			if(returnItem.majorNm != undefined)$('#majorNm').val(`${returnItem.majorNm}`);//초빙과목
//
// 			if(returnItem.invInfo != undefined)
// 			$('#invInfo').val(returnItem.invInfo.replaceAll("&lt;br&gt;","\n"));//초빙정보
// 			if(returnItem.successPoint != undefined)
// 			$('#successPoint').html(returnItem.successPoint.replaceAll("&lt;br&gt;","\n"));//성공포인트
// 			if(returnItem.memo != undefined)
// 			$('#memo').val(returnItem.memo.replaceAll("&lt;br&gt;","\n"));//메모
//
// 			if(returnItem.invInfo != undefined)$('#sidocdnm').val(returnItem.sidocdnm);
//
//
// 			comAjax(apiUrl+'/api/code/getHosInfo',{type:"get",data:{hosNo:returnItem.hosNo}}).then(hosinfo=>{
// 				selectedHosInfo= hosinfo.rsData.data;
// 			});
//
//
// 		});
// 	})
//
//
//
// 	$('#saveBtn').on('click',e=>{
// 		getSaveItem();
// 	})
// }
//
//
// const hourSelectView  = function(id){
// 	let hour = [
// 		'00','01','02','03','04','05','06','07','08','09','10','11','12'
// 		,'13','14','15','16','17','18','19','20','21','22','23'	];
// 	for(let item of hour){
// 		$('#'+id).append(`<option value = '${item}'>${item}</option>`);
// 	}
// }
// const minitSelectView  = function(id){
// 	let hour = [
// '00','01','02','03','04','05','06','07','08','09','10','11','12'
// ,'13','14','15','16','17','18','19','20','21','22','23','24','25','26'
// ,'27','28','29','30','31','32','33','34','35','36','37','38','39','40'
// ,'41','42','43','44','45','46','47','48','49','50','51','52','53','54'
// ,'55','56','57','58','59'];
// 	for(let item of hour){
// 		$('#'+id).append(`<option value = '${item}'>${item}</option>`);
// 	}
// }
//
//
//
//
// const getSaveItem = function(){
// 	if(dataValidation() == false){
// 		return;
// 	};
//
// 	let announcementMap = {
// 		  'anntNo':''								//초빙공고 고유번호
// 		,'anntCd':''                            //초빙공고 구분
// 		,'title':''                             //제목
// 		,'recruitmentNo':''                     //모집인원
// 		,'employmentType':''                    //고용형태
// 		,'offerReason':''                       //구인 사유
// 		,'workhourWdS':''                       //근무시간 - 평일 - 시작
// 		,'workhourWdE':''                       //근무시간 - 평일 - 끝
// 		,'workhourStdS':''                      //근무시간 - 토요일 - 시작
// 		,'workhourStdE':''                      //근무시간 - 토요일 - 끝
// 		,'workhourSdS':''                       //근무시간 - 일요일 - 시작
// 		,'workhourSdE':''                       //근무시간 - 일요일 - 끝
// 		,'dutyNight':''                         //당직 ( 야간 : 있음 / 없음 )
// 		,'dutyWeekly':''                        //당직 ( 주간 : 있음 / 없음 )
// 		,'holiday':''                           //공휴일
// 		,'conference':''                        //학회 출석
// 		,'annual':''                            //연차
// 		,'payType':''                           //급여 구분
// 		,'payAdd':''                            //급여 추가 옵션 여부 ( 시행 술기 ( 시술 / 수술 ) 추가에 따라 인상 가능 )
// 		,'payRange':''                          //급여 범위
// 		,'payOption1':''                        //급여 옵션1(퇴직금(퇴직연금) 별도지급)
// 		,'payOption2':''                        //급여 옵션2(본인 연말정산 가능)
// 		,'payOption3':''                        //급여 옵션3(중도퇴사때 원천징수 기준 세금 환급)
// 		,'incentiveYn':''                       //인센티브 있음
// 		,'incentiveDesc':''                     //인센티브 있음 설명
// 		,'insuranceYn':''                       //배상책임보험 병원가입
// 		,'insuranceDesc':''                     //배상책임보험 병원가입 설명
// 		,'accommodationYn':''                   //숙소 제공
// 		,'accommodationDesc':''                 //숙소 제공 설명
// 		,'mealsYn':''                           //식대 별도
// 		,'mealsDesc':''                         //식대 별도 설명
// 		,'deadline':''                          //채용 마감일
// 		,'recruitmentDetails':''                //상세모집 내용
// 		,'useYn':''                             //사용여부
// 		,'regId':''                             //등록자
// 		,'regDt':''                             //등록일
// 		,'mngMsg':''                            //매니저 한마디 (PI서비스 용)
// 		,'intranetAnntNo':''                    //인트라넷 글번호
// 		,'medicalField':''                      //진료분야
// 		,'loading':''                           //  로딩
// 		,'workingdt':''                         //  근무시기
// 		,'limitAge':''                          //  나이 제한
// 		,'placement':''				            //  공고노출위치
// 		,'etc'     :''                           //기타
// 		,'workhourWdHafOff'    :''               //평일 반 오프
// 		,'workhourStdBiweekly' :''               //토요일 격주 근무
// 		,'annualLegalYn'       :''               //연차 근로기준법
// 		};
// 	   announcementMap.anntCd = 'AT_02';
// 	   announcementMap.recruitmentNo = numValidation($('#pRecruitmentNo').val());
//
// 	   announcementMap.title = $('#pTitle').val();
//
//
// 	   announcementMap.employmentType = $('#pEmploymentType').val();
// 	   announcementMap.offerReason = $('#pOfferReason').val();
//
//
// 	   announcementMap.workhourWdHafOff = $('#pWorkhourWdHafOff')[0].checked ==false ? "N" : "Y";
//
// 	   if($('#pWorkhourWdNo')[0].checked){
// 			announcementMap.workhourWdS ='';
// 			announcementMap.workhourWdE ='';
// 		}else{
// 			announcementMap.workhourWdS =$('#pWorkhourWdsH').val()+$('#pWorkhourWdsM').val();
// 			announcementMap.workhourWdE = $('#pWorkhourWdeH').val()+$('#pWorkhourWdeM').val();
// 		}
//
// 		announcementMap.workhourStdBiweekly = $('#pWorkhourStdBiweekly')[0].checked ==false ? "N" : "Y";
//
// 	   if($('#pWorkhourStdNo')[0].checked){
// 			announcementMap.workhourStdS ='';
// 			announcementMap.workhourStdE ='';
// 		}else{
// 			announcementMap.workhourStdS = $('#pWorkhourStdsH').val()+$('#pWorkhourStdsM').val();
// 			announcementMap.workhourStdE = $('#pWorkhourStdeH').val()+$('#pWorkhourStdeM').val();
// 		}
//
// 	   if($('#pWorkhourSdNo')[0].checked){
// 			announcementMap.workhourSdS ='';
// 			announcementMap.workhourSdE ='';
// 		}else{
// 			announcementMap.workhourSdS = $('#pWorkhourSdsH').val()+$('#pWorkhourSdsM').val();
// 			announcementMap.workhourSdE = $('#pWorkhourSdeH').val()+$('#pWorkhourSdeM').val();
// 		}
//
//
// 		announcementMap.dutyWeekly = $('#pDutyWeekly').val();
// 		announcementMap.dutyNight = $('#pDutyNight').val();
//
// 	   announcementMap.holiday  = $('#pWorkHoliday').val();
//
// 	   announcementMap.conference = $('#pConference').val();
//
// 	   announcementMap.annual   =numValidation($('#pAnnual').val());
//
// 	   announcementMap.annualLegalYn   =$('#pAnnualLegalYn')[0].checked ==false ? "N" : "Y";
//
//    	   let activPayType = $('.pPayType').filter((index,item)=>$(item).hasClass('active'));
// 	   announcementMap.payType = activPayType.attr('value');
//
// 	   let payRange = activPayType.attr('value') == 'N' ? $('#pNetPayRange').val() : $('#pGrossPayRange').val()
// 	   announcementMap.payRange = payRange;
//
// 	   announcementMap.payAdd = $('#pPayAdd').val();
//
//
// 	   announcementMap.payOption1 = $('#pPayOption1').val();
// 	   announcementMap.payOption2 = $('#pPayOption2').val();
// 	   announcementMap.payOption3 = $('#pPayOption3').val();
//
// 	   announcementMap.incentiveYn =$('#pIncentiveYn').val();
// 	   announcementMap.incentiveDesc = $('#pIncentiveDesc').val();
//
// 	   announcementMap.insuranceYn    =$('#pInsuranceYn').val();
// 	   announcementMap.insuranceDesc  =$('#pInsuranceDesc').val();
//
// 	   announcementMap.accommodationYn    =$('#pAccommodationYn').val();
// 	   announcementMap.accommodationDesc  =$('#pAccommodationDesc').val();
//
// 	   announcementMap.mealsYn    =$('#pMealsYn').val();
// 	   announcementMap.mealsDesc  =$('#pMealsdesc').val();
//
// 	   if($('#pDeadlineNo')[0].checked){
// 			announcementMap.deadline = '';
// 		}else{
// 			announcementMap.deadline = $('#pDeadline').val().replaceAll('-','');
// 		}
//
// 	   announcementMap.recruitmentDetails = $('#pRecruitmentDetails').val();
// 	   announcementMap.useYn = 'Y';
// 	   announcementMap.regId = loginInfo.mngNo;
// 	   announcementMap.mngMsg =  $('#pMngMsg').val();
// 	   announcementMap.intranetAnntNo = $('#pIntranetAnntNo').val();
// 	   announcementMap.medicalField   = $('#pMedicalField').val();
// 	   announcementMap.loading    = $('#pLoading').val();
//
// 	    if(!$('#pworkingdtCheck')[0].checked){
// 			announcementMap.workingdt   = $('#pworkingdt').val().replaceAll('-','');
// 		}
//
// 	   if(!$('#pLimitAgeCheck')[0].checked){
// 		announcementMap.limitAge   = $('#pLimitAge').val();
// 		}
//
//      	if(!$('#pLimitAgeCheck')[0].checked){
// 			announcementMap.limitAge   = $('#pLimitAge').val();
// 		}
// 		announcementMap.etc = $('#pEtc').val();
//
// 		/*----------------------진료과---------------------- */
// 		let hashTageList =[];
// 		let hashTageTarget = $('#hashTageList').val();
// 		if(hashTageTarget.length >0){
// 			for(let item of hashTageTarget){
// 				let hashTage = {
// 				anntNo    :''
// 				,hashtagNm :''
// 				,useYn     :''
// 				,regId     :''
// 				,regDt     :''
// 				}
// 				hashTage.hashtagNm = item;
// 				hashTage.useYn= 'Y'
// 				hashTage.regId=loginInfo.mngNo;
// 				hashTageList.push(hashTage);
// 			}
// 		}
//
// 		/*----------------------해쉬태그---------------------- */
//
// 		/*----------------------진료과목---------------------- */
// 		let majorList =[];
// 		let majorListTarget = $('#pMajor').val();
// 		if(majorListTarget.length >0){
// 			for(let item of majorListTarget){
// 				let major = {
// 				 anntNo:''
// 				,majorCd:''
// 				,regId:''
// 				,regDt :''
// 				}
// 				major.majorCd = item;
// 				major.regId=loginInfo.mngNo;
// 				majorList.push(major);
// 			}
// 		}
//
//
// 		/*----------------------진료과목---------------------- */
//
// 		/*----------------------초빙정보 병원---------------------- */
// 		let anntHospital = {
// 			 anntNo       :''
// 			,anntCd       :'AT_02'
// 			,hospitalNm   :selectedHosInfo.yadmnm
// 			,clcd         :selectedHosInfo.clcd
// 			,sidocd       :selectedHosInfo.sidocd
// 			,sggucd       :selectedHosInfo.sggucd
// 			,addr         :selectedHosInfo.addr
// 			,telno        :selectedHosInfo.telno
// 			,hospurl      :selectedHosInfo.hospurl
// 			,estbdd       :selectedHosInfo.estbdd
// 			,xpos         :selectedHosInfo.xpos
// 			,ypos         :selectedHosInfo.ypos
// 			,workerCnt    :''
// 			,useYn        :'Y'
// 			,regId        :loginInfo.mngNo
// 			,regDt        :''
// 			,updId        :''
// 			,updDt        :''
// 			,hosNo        :selectedHosInfo.hosNo
// 		}
//
//
// 		/*----------------------초빙정보 병원---------------------- */
//
// 		let paramMap = {
// 			 announcementMap:announcementMap
// 			,hashTageList:hashTageList
// 			,majorList:majorList
// 			,anntHospital:anntHospital
// 		}
//
// 		cmmConfirm('저장하시겠습니까?',()=>{
// 			comAjax(apiUrl+'api/piList/addPiAnnt',{data:paramMap}).then(result=>{
//
// 			if(result.rsData.response_code == '000'){
// 				cmmAlert('저장되었습니다.',{callback:function(){
// 					pageMove('/announcement/piList');
// 				}});
//
// 			}
//
// 		});
// 		})
//
//
// }
//
//  const dataValidation = function(){
// 	let isTrue = false;
//
// 	//초빙공고번호
// 	let pIntranetAnntNo = $('#pIntranetAnntNo').val();
// 	if(pIntranetAnntNo == ''){cmmAlert($('#pIntranetAnntNo').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 	//초빙과목
// 	let pTitle = $('#pTitle').val();
// 	if(pTitle == ''){cmmAlert($('#pTitle').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 	//초빙과목
// 	let pEmploymentType = $('#pEmploymentType').val();
// 	if(pEmploymentType == ''){cmmAlert($('#pEmploymentType').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 	//채용마감
// 	if(!$('#pDeadlineNo')[0].checked){
// 		let pDeadline = $('#pDeadline').val();
// 		if(pDeadline == ''){cmmAlert($('#pDeadline').data().require,{'icon' : 'warning'}); return isTrue;}
// 	}
//
// 	//진료분야
// //	let pMedicalField = $('#pMedicalField').val();
// //	if(pMedicalField == ''){cmmAlert($('#pMedicalField').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 	//진료분야
// 	let pOfferReason = $('#pOfferReason').val();
// 	if(pOfferReason == ''){cmmAlert($('#pOfferReason').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 	//채용마감
// 	if(!$('#pLimitAgeCheck')[0].checked){
// 		let pLimitAge = $('#pLimitAge').val();
// 		if(pLimitAge == ''){cmmAlert($('#pLimitAge').data().require,{'icon' : 'warning'}); return isTrue;}
// 	}
//
// 	//채용마감
// 	if(!$('#pworkingdtCheck')[0].checked){
// 		let pworkingdt = $('#pworkingdt').val();
// 		if(pworkingdt == ''){cmmAlert($('#pworkingdt').data().require,{'icon' : 'warning'}); return isTrue;}
// 	}
//
// 	if($('#pPayNet').hasClass('active')){
// 		let pNetPayRange = $('#pNetPayRange').val();
// 		if(pNetPayRange == ''){cmmAlert($('#pNetPayRange').data().require,{'icon' : 'warning'}); return isTrue;}
// 	}
//
// 	if($('#pPayGross').hasClass('active')){
// 		let pGrossPayRange = $('#pGrossPayRange').val();
// 		if(pGrossPayRange == ''){cmmAlert($('#pGrossPayRange').data().require,{'icon' : 'warning'}); return isTrue;}
// 	}
//
// 	let pWorkHoliday = $('#pWorkHoliday').val();
// 	if(pWorkHoliday == ''){cmmAlert($('#pWorkHoliday').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 	if(!$('#pWorkhourWdNo')[0].checked){
// 		let pWorkhourWdsH = $('#pWorkhourWdsH').val();
// 		if(pWorkhourWdsH == ''){cmmAlert($('#pWorkhourWdsH').data().require,{'icon' : 'warning'}); return isTrue;}
// 		let pWorkhourWdsM = $('#pWorkhourWdsM').val();
// 		if(pWorkhourWdsM == ''){cmmAlert($('#pWorkhourWdsM').data().require,{'icon' : 'warning'}); return isTrue;}
// 		let pWorkhourWdeH = $('#pWorkhourWdeH').val();
// 		if(pWorkhourWdeH == ''){cmmAlert($('#pWorkhourWdeH').data().require,{'icon' : 'warning'}); return isTrue;}
// 		let pWorkhourWdeM = $('#pWorkhourWdeM').val();
// 		if(pWorkhourWdeM == ''){cmmAlert($('#pWorkhourWdeM').data().require,{'icon' : 'warning'}); return isTrue;}
// 	}
//
//
//
// 	if(!$('#pWorkhourStdNo')[0].checked){
// 		let pWorkhourStdsH = $('#pWorkhourStdsH').val();
// 		if(pWorkhourStdsH == ''){cmmAlert($('#pWorkhourStdsH').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 		let pWorkhourStdsM = $('#pWorkhourStdsM').val();
// 		if(pWorkhourStdsM == ''){cmmAlert($('#pWorkhourStdsM').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 		let pWorkhourStdeH = $('#pWorkhourStdeH').val();
// 		if(pWorkhourStdeH == ''){cmmAlert($('#pWorkhourStdeH').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 		let pWorkhourStdeM = $('#pWorkhourStdeM').val();
// 		if(pWorkhourStdeM == ''){cmmAlert($('#pWorkhourStdeM').data().require,{'icon' : 'warning'}); return isTrue;}
// 	}
//
// 		if(!$('#pWorkhourSdNo')[0].checked){
// 		let pWorkhourSdsH = $('#pWorkhourSdsH').val();
// 		if(pWorkhourSdsH == ''){cmmAlert($('#pWorkhourSdsH').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 		let pWorkhourSdsM = $('#pWorkhourSdsM').val();
// 		if(pWorkhourSdsM == ''){cmmAlert($('#pWorkhourSdsM').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 		let pWorkhourSdeH = $('#pWorkhourSdeH').val();
// 		if(pWorkhourSdeH == ''){cmmAlert($('#pWorkhourSdeH').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 		let pWorkhourSdeM = $('#pWorkhourSdeM').val();
// 		if(pWorkhourSdeM == ''){cmmAlert($('#pWorkhourSdeM').data().require,{'icon' : 'warning'}); return isTrue;}
//
//
// 		let pMajor = $('#pMajor').val();
// 		if(pMajor.length <1){cmmAlert($('#pMajor').data().require,{'icon' : 'warning'}); return isTrue;}
//
// 		return true;
// 	}
// }
//
// const numValidation = function(val){
// 	let item = val.toString();
// 	if(item==''){
// 		return 0;
// 	}else {
// 		return val;
// 	}
// }
//
// const defaultVal = function(){
//
// 	$('#pDeadlineNo').prop('checked',true);
// 	$('#pDeadline').prop('disabled',true);
//
// 	$('#pworkingdtCheck').prop('checked',true);
// 	$('#pworkingdt').val('');
// 	$('#pworkingdt').prop('disabled',true);
//
// 	$('#pLimitAgeCheck').prop('checked',true);
// 	$('#pLimitAge').val('');
// 	$('#pLimitAge').prop('disabled',true);
//
// 	$('#pEmploymentType').val('WT_002');
//
// 	$('#pWorkhourWdsH').val('09')
// 	$('#pWorkhourWdsM').val('00')
// 	$('#pWorkhourWdeH').val('18')
// 	$('#pWorkhourWdeM').val('00')
//
// 	$('#pWorkhourStdsH').val('09')
// 	$('#pWorkhourStdsM').val('00')
// 	$('#pWorkhourStdeH').val('13')
// 	$('#pWorkhourStdeM').val('00')
//
//
//
//
//
//
//
// 	$('#pWorkhourSdNo').prop('checked',true);
// 	$('#pWorkhourSdsH').prop('disabled',true);
// 	$('#pWorkhourSdsM').prop('disabled',true);
// 	$('#pWorkhourSdeH').prop('disabled',true);
// 	$('#pWorkhourSdeM').prop('disabled',true);
//
//
// }
