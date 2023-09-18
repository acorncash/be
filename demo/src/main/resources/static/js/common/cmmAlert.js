/**
 * 
 */

/**@function : cmmAlert
 * @param    : msg = "내용" option ={'icon' : ['warning','success'] , 'btn': elHtmlArray , callBack :closeCalback  }
 * @return   : X
 * @etc      : 공통 알람   
 * */
function cmmAlert(msg,option_){
	let defalutBtn =null;
	
	alertClose();
	
	let option = {
		icon :'success',
		btn: null,
		callback:()=>{}
	}
	$.extend(option,option_);
	if(option.btn == null){
		defalutBtn = document.createElement('button');
		defalutBtn.id == "defalutBtn"
		defalutBtn.classList.add('btn')
		defalutBtn.classList.add('btn-light')
		defalutBtn.classList.add('btn-lg')
		defalutBtn.setAttribute('target','button');
		defalutBtn.innerText = '확인';
		$(defalutBtn).on('click',e => alertClose(option.callback));
	}
	
	return modalPopup('/popup/alertPopup',function(data){
		$('#'+data+' .alert-ment').attr('class', 'alert-ment '+option.icon);
		$('#'+data+' .alert-ment').html(msg);
		if(option.btn){
			for(let btn of option.btn){
				let btnId = btn.id;
				$('#'+data+' .action-btn-group .center').append(btn);
			}
		}
		
		
		if(option.btn==null ){
			$('#defalutBtn').remove();
			$('#'+data+' .action-btn-group .center').append(defalutBtn);
		}
		
		
		$('#closeBtn').on('click',e=>{
			alertClose(option.callback);
			
		})
	},option);
}

const alertClose=function (callback){
	modalClose(callback,{},'alert-popup');
}

/**@function : errorAlert
 * @param    : x   
 * @return   : x
 * @etc      : 오류 발생 팝업
 * @msg      : 오류 발생
 * */
function errorAlert(){
	cmmAlert('오류가 발생 하였습니다.',{icon:'warning'});
}

/**@function : errorAlert
 * @param    : x   
 * @return   : x
 * @etc      : 오류 발생 팝업
 * @msg      : 오류 발생
 * */
function cmmConfirm(msg,successFn){
	cansleBtn = document.createElement('button');
	cansleBtn.id == "defalutBtn"
	cansleBtn.classList.add('btn')
	cansleBtn.classList.add('btn-light')
	cansleBtn.classList.add('btn-lg')
	cansleBtn.setAttribute('target','button');
	cansleBtn.innerText = '취소';
	$(cansleBtn).on('click',e => alertClose());
	
	successBtn = document.createElement('button');
	successBtn.id == "defalutBtn"
	successBtn.classList.add('btn')
	successBtn.classList.add('btn-info')
	successBtn.classList.add('btn-lg')
	successBtn.setAttribute('target','button');
	successBtn.innerText = '확인';
	$(successBtn).on('click',e => alertClose(successFn));
	
	cmmAlert(msg,{icon:'warning',btn:[successBtn,cansleBtn]});
}
