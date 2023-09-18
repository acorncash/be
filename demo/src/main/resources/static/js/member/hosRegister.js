const hosRegister = {
	init: () => {
		sessionStorage.setItem("prev", "memberDtl");
		
		const searchBtn = document.getElementById('searchBtn'); //병원검색btn
		const cancleBtn = document.getElementById('cancleBtn'); //취소btn
		const fileList = document.querySelectorAll('input[type=file]');
		const genderM = document.getElementById('genderM');
		const genderF = document.getElementById('genderF');
		const regBtn = document.getElementById('regBtn');
		
		//병원검색btn
		searchBtn.addEventListener('click', () => {
			findHospitalInfoPopup((data)=>{
				if(data.XPos) document.getElementById('xpos').value = data.XPos;
				if(data.YPos) document.getElementById('ypos').value = data.YPos;
				if(data.clCd) document.getElementById('clCd').value = data.clCd;
				if(data.sgguCd) document.getElementById('sgguCd').value = data.sgguCd;
				if(data.sgguCdNm) document.getElementById('sgguCdNm').value = data.sgguCdNm;
				if(data.sidoCd) document.getElementById('sidoCd').value = data.sidoCd;
				if(data.sidoCdNm) document.getElementById('sidoCdNm').value = data.sidoCdNm;
				if(data.yadmNm) document.getElementById('mbrNm').textContent = data.yadmNm;
				if(data.telno) document.getElementById('phoneNum').textContent = data.telno;
				if(data.clCdNm) document.getElementById('pclcd').textContent = data.clCdNm;
				if(data.drTotCnt) document.getElementById('workerDoc').textContent = data.drTotCnt;
				if(data.hospUrl) document.getElementById('hosUrl').textContent = data.hospUrl;
				if(data.estbDd) document.getElementById('foundingDt').textContent = data.estbDd;
				if(data.addr) document.getElementById('addr').textContent = data.addr;
			});
		});
		
		//병원검색btn
		cancleBtn.addEventListener('click', () => {
			pageMove('/member/memberList', {mbrCd: 'MC_02'});
		});
		
		fileList.forEach((item, idx) => {
		    item.addEventListener("change", e => {
				hosRegister.prevImg(e.target);
			});
		});
		
		genderM.addEventListener('click', e => {
			e.target.classList.add("active");
			e.target.nextElementSibling.classList.remove("active");
		});
		
		genderF.addEventListener('click', e => {
			e.target.classList.add("active");
			e.target.previousElementSibling.classList.remove("active");
		});
		
		regBtn.addEventListener('click', () => {
			hosRegister.regist();
		});
	},
	regist: () => {
		if(!document.getElementById('mbrNm').textContent) {
			cmmAlert('병원을 검색해주세요.',{icon:'warning'}); 
			return;
		}
		if(!document.getElementById('mngEmail').value) {
			const option = {
				callback:()=>{
					document.getElementById('mngEmail').focus()
				},
				icon:'warning'
			};		
			cmmAlert("이메일은 필수 입력값입니다.", option);
			return;
		}
		
		cmmConfirm('신규 병원을 등록하시겠습니까?', () => {
			const formData = new FormData();
			const params = {
				xpos: document.getElementById('xpos').value,
				ypos: document.getElementById('ypos').value,
				clCd: document.getElementById('clCd').value,
				sgguCd: document.getElementById('sgguCd').value,
				sgguCdNm: document.getElementById('sgguCdNm').value,
				sidoCd: document.getElementById('sidoCd').value,
				sidoCdNm: document.getElementById('sidoCdNm').value,
				mbrNm: document.getElementById('mbrNm').textContent,
				phoneNum: document.getElementById('phoneNum').textContent.replaceAll("-",""),
				workerDoc: document.getElementById('workerDoc').textContent,
				hosUrl: document.getElementById('hosUrl').textContent,
				foundingDt: document.getElementById('foundingDt').textContent,
				addr: document.getElementById('addr').textContent,
				mngGender: document.getElementById('mngGender').querySelector(".active").id.replace("gender",""),
				mngEmail: document.getElementById('mngEmail').value,
				regId: 1
			};
			if(document.getElementById('mngNm').value) params.mngNm = document.getElementById('mngNm').value;
			if(document.getElementById('mngBirth').value) params.mngBirth = document.getElementById('mngBirth').value;
			if(document.getElementById('mngPhoneNum').value) params.mngPhoneNum = document.getElementById('mngPhoneNum').value;
			if(document.getElementById('worker').value) params.worker = document.getElementById('worker').value;
			if(document.getElementById('beds').value) params.beds = document.getElementById('beds').value;
			if(document.getElementById('bossNm').value) params.bossNm = document.getElementById('bossNm').value;
			
			if(document.getElementById('profileFile').files[0]) formData.append("profileFile", document.getElementById('profileFile').files[0]);
			
			const hosFileList = document.getElementsByClassName("photo-upload")[0].querySelectorAll("input[type=file]");
			hosFileList.forEach((item,idx) => {
				if(item.files[0]) formData.append("hosFile", item.files[0]);
			});
			
			formData.append('paramList', new Blob([ JSON.stringify(params) ], {type : "application/json"}));
			
			$.ajax({
				type	: "POST",
				enctype: "multipart/form-data",
				url		: apiUrl + "api/memberDtl/hosRegist",
		 		data  : formData,
				processData : false,
				cache : false,
				contentType: false,
				dataType	: "json",
				success	: function(response, status, xhr) {
					if(response.response_code === "901") {
						modalClose();
						errorAlert();
						return;
					}
					const option = {
						callback:()=>{
							pageMove('/member/hospDtl', {mbrNo:response.data.mbrNo});
						}
					};	
					
					cmmAlert(`신규등록이 완료되었습니다.<br>신규 생성 ID: ${response.data.mbrId}`, option);
				},
				error	: function(request, status, error){
					errorAlert();
		 		}
			});
		});
	},
	prevImg: el => {
		if (el.files && el.files[0]) {
			const reader = new FileReader();
			const id = el.id;
			
			reader.readAsDataURL(el.files[0]);
			
			switch(id){
				case "profileFile":
					reader.onload = e => {	
						document.getElementById('profileImg').src = e.target.result;
					};
				break;
				case "hosImgFile_1":
					reader.onload = e => {	
						document.getElementById('hosImgFile_1').previousElementSibling.outerHTML = `<img src='${e.target.result}'/>`;
					};
				break;
				case "hosImgFile_2":
					reader.onload = e => {	
						document.getElementById('hosImgFile_2').previousElementSibling.outerHTML = `<img src='${e.target.result}'/>`;
					};
				break;
				case "hosImgFile_3":
					reader.onload = e => {	
						document.getElementById('hosImgFile_3').previousElementSibling.outerHTML = `<img src='${e.target.result}'/>`;
					};
				break;
			}
		}
	}
	
};