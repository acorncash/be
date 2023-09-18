/**@file : pistWrite.js
 * @see  : P.I 공고 목록 
 */

let loginInfo = {};
let selectedDoctorInfo = {};
let updateDocAnntNo = '';
$(document).ready(async e=>{
	 
	 await evenetInit();
	  
 	if(pageMoveData.stat=='U'){
		updateDocAnntNo = pageMoveData.docAnntNo;
		updateInit();
	}else{
		pageMoveData.stat='C'
		codeInit();
	}
	
	
	
});

const updateInit =  function(){
	if(pageMoveData.stat != 'U') return;
	$('#intraDocPiSearchPopup').remove();
	getUpdateItem(updateDocAnntNo);
	
	
	
	function getUpdateItem(docAnntNo){
		
		comAjax(apiUrl+'/api/piList/getDocUpdateItem',{type:'get',data:{docAnntNo}}).then(async function(result){
			
			if(result.rsData.response_code == '000'){
				let docPiAnnt = result.rsData.data.docPiAnnt;
				let intraInfo = result.rsData.data.intraInfo;
				//인트라넷 정보  view 				
				intraDocPiSearchPopupCalback(intraInfo);
				
				await codeInit();
				//pi 공고 상세 view 
				
				//docAnntTitle
				$('#docAnntTitle').val(unescapeHtml(docPiAnnt.docAnntTitle));
				//intraDocNo
				$('#intraDocNo').val(docPiAnnt.intraDocNo);
				//docAnntDocnm
				$('#docAnntDocnm').val(docPiAnnt.docAnntDocnm);
				//docAnntGender
				$('#docAnntGender').val(docPiAnnt.docAnntGender);
				$('.pGender').each((index,item)=>{if(item.dataset.value == docPiAnnt.docAnntGender) item.classList.add('active')});
				//docAnntCareer
				$('#docAnntCareer').val(docPiAnnt.docAnntCareer);
				//docAnntBirth
				$('#docAnntBirth').val(docPiAnnt.docAnntBirth);
				//docAnntDtlInfo
				$('#docAnntDtlInfo').html(unescapeHtml(docPiAnnt.docAnntDtlInfo).replaceAll('<br>','\n'));
				$('#docAnntNo').val(docPiAnnt.docAnntNo);
				/*2022-11-23추가*/
				$('#docHopHosTypeCd').val(docPiAnnt.docHopHosTypeCd);
				/*2022-11-23추가*/
				let docAnntMajorList = docPiAnnt.docAnntMajor.split(',');
				let docAnntHopMajorList = docPiAnnt.docAnntHopMajor.split(',');
				let docAnntHopAreaList = docPiAnnt.docAnntHopArea.split(',');
				
				
				
				let text ='';
				$('#docAnntMajor').val(docAnntMajorList);				
				docAnntMajorList.forEach(e=>{
					let filterItem = $('#ms-list-1 .ms-options input').filter((index,item)=>item.value==e)
					filterItem.prop('checked',true);
					text = filterItem.attr('title')??''+" "; 
				})
				
				if(text.trim()!='') $('#ms-list-1>button>span').text(text);
				text='';
				$('#docAnntHopMajor').val(docAnntHopMajorList);
				docAnntHopMajorList.forEach(e=>{
					let filterItem = $('#ms-list-2 .ms-options input').filter((index,item)=>item.value==e)
					filterItem.prop('checked',true);
					text = filterItem.attr('title')??''+" "; 
				})
				if(text.trim()!='') $('#ms-list-2>button>span').text(text);

				text='';
				$('#docAnntHopArea').val(docAnntHopAreaList);
				docAnntHopAreaList.forEach(e=>{
					let filterItem = $('#ms-list-3 .ms-options input').filter((index,item)=>item.value==e)
					filterItem.prop('checked',true);
					text = filterItem.attr('title')??''+" "; 
				})
				if(text.trim()!='') $('#ms-list-3>button>span').text(text);
				
				
			}else if(result.rsData.response_code == '103'){
				cmmAlert('사용 권한이 없습니다.',{icon:'warning',callback:function(){
					pageMove('announcement/docPiList');
				}});
			}
			
			
		});
	}
	
	
	
		
}





const codeInit=async function(){

//	한세트
	await getComCode('CAREER_YY',2,'docAnntCareer');
	await getComCode('PCLCD',2,'docHopHosTypeCd');
	$('#docAnntCareer option').get().forEach(item=>{if(item.value=="CY_01")item.remove()})
	
	
	
	//원 전공
	await getMajorCode('docAnntMajor').then(e=>{
		$('#docAnntMajor').multiselect({
	            columns: 1,
	            placeholder: '원 전공',
	            search: true,
	            searchOptions: {
	                'default': '과목'
	            }
	        });
	     $('#ms-list-1').css('width','150px');
	     $('#ms-list-1').css('border-radius','0.4rem');
	     $('#ms-list-1>button').addClass('form-control');
	});

	//희망전공
	await getMajorCode('docAnntHopMajor').then(e=>{
		$('#docAnntHopMajor').multiselect({
	            columns: 1,
	            placeholder: '희망 전공',
	            search: true,
	            searchOptions: {
	                'default': '과목'
	            }
	        });
	     $('#ms-list-2').css('width','150px');
	     $('#ms-list-2').css('border-radius','0.4rem');
	     $('#ms-list-2>button').addClass('form-control');
	});
	
	
		
	await getComCode('HOS_REGION','2','docAnntHopArea').then(e=>{
		$('#docAnntHopArea').multiselect({
	            columns: 1,
	            placeholder: '희망 지역',
	            search: true,
	            searchOptions: {
	                'default': '지역'
	            }
	        });
	     $('#ms-list-3').css('width','150px');
	     $('#ms-list-3').css('border-radius','0.4rem');
	     $('#ms-list-3>button').addClass('form-control');
	});
	
	return true;
}

const evenetInit = function(){
	//인트라넷 의사번호 불러오기 버튼 event 		
	$('#intraDocPiSearchPopup').click(e=>{
		intraDocPiSearchPopup(returnItem =>{
			comAjax(apiUrl+'/api/piList/getDoctorIntraPiDtl',{type:"get",data:{drNo:returnItem.drNo,drKey:returnItem.drKey}}).then(docInfo=>{
				intraDocPiSearchPopupCalback(docInfo.rsData.data);
			});
		});
	})
	
	$('.pGender').on('click',e=>{
		let item = e.currentTarget;
		$('.pGender').removeClass('active');
		item.classList.add('active');
		$('#docAnntGender').val(item.dataset.value);
	})
	
	$('#saveBtn').on('click',e=>{
		getSaveItem();
	})
	
	$('#docAnntBirth').on('input',e=>{
		inputCheckNumber(e.currentTarget);
	})
	
}





const intraDocPiSearchPopupCalback = function(docInfo){
	
		let intraDoctorInfo = docInfo.intraDoctorInfo;
				let intraInterviewInfo =docInfo.intraInterviewInfo;
				let intraWorkHistory = docInfo.intraWorkHistory;
				$('#drNo').html(intraDoctorInfo.drNo);
				$('#drNm').val(intraDoctorInfo.drNm);
				$('#birthYear').val(intraDoctorInfo.birthYear);
				$('#universityNm').val(intraDoctorInfo.universityNm);
				$('#telNo').val(intraDoctorInfo.telNo1);
				$('#genderNm').val(intraDoctorInfo.genderNm);
				$('#oriMajor').val(intraDoctorInfo.oriMajor);
				$('#hopeMajor').val(intraDoctorInfo.hopeMajor);
				$('#hopeArea').val(intraDoctorInfo.hopeArea);
				$('#regNm').val(intraDoctorInfo.regNm);
				$('#regDt').val(intraDoctorInfo.regDt);
				if(intraDoctorInfo.smsYn =='Y'){
					$('.smsYn').removeClass('active');
					$('.smsYn').get().forEach(item=>{
						if(item.dataset.value=='Y')item.classList.add('active');
					})
				}else if(intraDoctorInfo.smsYn =='N'){
					$('.smsYn').removeClass('active');
					$('.smsYn').get().forEach(item=>{
						if(item.dataset.value=='N')item.classList.add('active');
					})
				}
				$('#hopeArea').val(intraDoctorInfo.hopeArea);
				
				$('#history').html(unescapeHtml(intraDoctorInfo.history).replaceAll('<br>','\n'));
				
				$('#jobInfo').html(unescapeHtml(intraDoctorInfo.jobInfo).replaceAll('<br>','\n'));
								
				$('#successPoint').html(unescapeHtml(intraDoctorInfo.successPoint).replaceAll('<br>','\n'));				
				
				$('#memo').html(unescapeHtml(intraDoctorInfo.memo).replaceAll('<br>','\n'));				
				
				
				intraInterviewInfo.forEach((item,index)=>{
					let beforVal = $('#interviewInfo').val();			
					if(index != 0 )beforVal += '\n';
					beforVal += item.inerviewInfo;
					$('#interviewInfo').val(beforVal);					
				});
				
				intraWorkHistory.forEach((item,index)=>{
					let beforVal = $('#workingHistory').val();			
					if(index != 0 )beforVal += '\n';
					beforVal += item.workHistory;
					$('#workingHistory').val(beforVal);					
				});
				
				let salary = '';
				let salaryMin = (Number(intraDoctorInfo.salaryLevel)/10000).toString(); 
				let salaryMax = (Number(intraDoctorInfo.salaryLevelMax)/10000).toString();
				
				salary = `${salaryMin}${salaryMax!='0'?'-'+salaryMax:''}`;
				$('#salaryLevel').val(salary);
				if(pageMoveData.stat!='U'){
					defaultVal(intraDoctorInfo);	
				} 
				
	
}














const getSaveItem = function(){
	if(dataValidation() == false){
		return;
	};
	
	let paramMap = {
		 intraDocNo     :0
		,docAnntTitle   :''
		,docAnntDocnm   :''
		,docAnntGender  :''
		,docAnntBirth   :''
		,docAnntHopMajor:''
		,docAnntMajor   :''
		,docAnntHopArea :''
		,docAnntCareer  :''
		,docAnntDtlInfo :''
		,docHopHosTypeCd  :''
		,useYn          :'Y'
	}
	
	if(pageMoveData.stat=='U')	paramMap.docAnntNo =  $('#docAnntNo').val();
	
	//희망 병원 종류 
	paramMap.docHopHosTypeCd = $('#docHopHosTypeCd').val();
	
	//타이틀
	paramMap.docAnntTitle = $('#docAnntTitle').val();
	
	//인트라 초빙공고 번호
	paramMap.intraDocNo = $('#intraDocNo').val();
	
	//닥터이름
	paramMap.docAnntDocnm = $('#docAnntDocnm').val();

	//성별
	paramMap.docAnntGender = $('#docAnntGender').val();
	
	//생년월일
	paramMap.docAnntBirth = $('#docAnntBirth').val();
	
	//생년월일
	paramMap.docAnntDtlInfo = $('#docAnntDtlInfo').val();
	
	//커리어
	paramMap.docAnntCareer = $('#docAnntCareer').val();
	
	//원전공
	let docAnntMajor    = $('#docAnntMajor').val();
	
	//희망전공
	let docAnntHopMajor = $('#docAnntHopMajor').val();
	
	//희망지역
	let docAnntHopArea = $('#docAnntHopArea').val();
	
	docAnntMajor = docAnntMajor?$('#docAnntMajor').val().join(','):[];
	paramMap.docAnntMajor = docAnntMajor;
	
	docAnntHopMajor = docAnntHopMajor?$('#docAnntHopMajor').val().join(','):[];
	paramMap.docAnntHopMajor = docAnntHopMajor;
	
	docAnntHopArea = docAnntHopArea?$('#docAnntHopArea').val().join(','):[];
	paramMap.docAnntHopArea = docAnntHopArea;
	paramMap.stat =pageMoveData.stat??''; 
	
	
	cmmConfirm('저장하시겠습니까?',()=>{
		comAjax(apiUrl+'api/piList/saveDoctorPiAnnt',{data:paramMap}).then(result=>{
			if(result.rsData.response_code == '000'){
				cmmAlert('저장되었습니다.',{callback:function(){
					pageMove('/announcement/docPiList');	
				}});
			}
		});	
	})
} 

const defaultVal = function(intraDoctorInfo){
	//성별
	$('.pGender').get().forEach(item=>{if(intraDoctorInfo.gender == item.dataset.value) item.classList.add('active')});
	$('#docAnntGender').val(intraDoctorInfo.gender );
	//성명
	$('#docAnntDocnm').val(intraDoctorInfo.drNm);
	//생년월일
	$('#docAnntBirth').val(intraDoctorInfo.birthYear);
	//의사번호
	$('#intraDocNo').val(intraDoctorInfo.drNo);
}

const dataValidation = function(){
	if($('#docAnntTitle').val() == ''){
		cmmAlert($('#docAnntTitle').data().require,{'icon':'warning',callback:function(){
			$('#docAnntTitle').focus();
		}});
		return false;
	} 
	
	if($('#intraDocNo').val() == ''){
		cmmAlert($('#intraDocNo').data().require,{'icon':'warning'});
		return false;
	} 
	
	if($('#docAnntDocnm').val() == ''){
		cmmAlert($('#docAnntDocnm').data().require,{'icon':'warning'});
		return false;
	} 
	
	if($('#docAnntGender').val() == ''){
		cmmAlert($('#docAnntGender').data().require,{'icon':'warning'});
		return false;
	} 
	
	if($('#docHopHosTypeCd').val() == ''){
		cmmAlert($('#docHopHosTypeCd').data().require,{'icon':'warning'});
		return false;
	}
	
	if($('#docAnntCareer').val() == ''){
		cmmAlert($('#docAnntCareer').data().require,{'icon':'warning',callback:function(){
			$('#docAnntCareer').focus();
		}});
		return false;
	} 
	
	if($('#docAnntBirth').val() == ''){
		cmmAlert($('#docAnntBirth').data().require,{'icon':'warning',callback:function(){
			$('#docAnntBirth').focus();
		}});
		return false;
	}else{
		if($('#docAnntBirth').val().length != 4 ){
			cmmAlert('생년월일은 4자리 이여야 합니다.',{'icon':'warning',callback:function(){
				$('#docAnntBirth').focus();
			}});
			return false;	
		}
		
	}
	//원전공
	let docAnntMajor    = $('#docAnntMajor').val();
	//희망지역
	let docAnntHopArea = $('#docAnntHopArea').val();
	
	if(docAnntMajor.length <1){
		cmmAlert($('#docAnntMajor').data().require,{'icon':'warning',callback:function(){
			$('#docAnntMajor').focus();
		}});
		return false;
	}

	if(docAnntHopArea.length <1){
		cmmAlert($('#docAnntHopArea').data().require,{'icon':'warning',callback:function(){
			$('#docAnntHopArea').focus();
		}});
		return false;
	}
	
	
	
}

