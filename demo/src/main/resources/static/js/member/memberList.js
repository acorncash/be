// /**
//  *
//  */
// let mbrCd = pageMoveData.mbrCd ? pageMoveData.mbrCd : 'MC_01';
// $(()=>{
// 	memberListInit();
// });
//
// /**
//  * @function : publicInvitationSearch
//  * @param    : {int} pageNum page번호 defalut 1
//  * @return   : x
//  * @target   : publicInvitation
//  * @etc      : public 데이터 목록 조회 및 세팅
//  * */
// const memberSearch =async function(pageNo=1){
// 	$("#"+mbrCd+"_selectAll").prop("checked", false);
// 	let memberList  = await memberListSearch(pageNo);
// 	let totalCount = memberListView(memberList);
// 	pagingCompo.pageNavi(/*몇번째 페이지 */pageNo,/*total갯수*/totalCount,memberSearch);
// }
//
// /**
//  * @function : publicListSearch
//  * @param    : {json} data 조회 내용
//  * @return   : x
//  * @target   : publicInvitation
//  * @etc      : public 목록 데이터 조회
//  * */
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
// 		, pageSize: 10
// 		, mbrCd: mbrCd
// 		, searchSe: searchSe
// 		, searchContent: searchContent.replaceAll(" ", "")
// 	};
//
// 	sessionStorage.setItem("searchData", JSON.stringify(searchData));
//
// 	/*etc : 데이터 가져오는 restApi*/
// 	return comAjax(apiUrl + "/api/memberList/getMemberList",{type:"get", data:searchData});
// }
//
// /**
//  * @function : publicListView
//  * @param    : {jsonArray} dataList : 초빙공고 목록 리스트
//  * @return   : x
//  * @target   : publicInvitation
//  * @etc      : 초빙공고 목록 조회 및 화면에 그리기
//  * */
// const memberListView = function(dataList){
// 	if(dataList.rsData.response_code === "201"){
// 		$(".count").html(`전체 <em>0</em>건`);
// 		if(mbrCd === "MC_01") $("#" + mbrCd + "_tbody").html(`<tr><td colspan="10"><div class="none">검색된 회원이 없습니다.</div></td></tr>`);
// 		else $("#" + mbrCd + "_tbody").html(`<tr><td colspan="9"><div class="none">검색된 회원이 없습니다.</div></td></tr>`);
// 		return 0;
// 	}
//
// 	$(".count").html(`전체 <em>${dataList.rsData.total_count}</em>건`);
//
// 	let html = ``;
//
// 	const todate = new Date().toISOString().substr(0,10).replaceAll("-",".");
//
// 	if(mbrCd === "MC_01"){
// 		$(dataList.rsData.data).each((idx,item) => {
// 			let statusHtml = ``;
// 			if(item.useYn === "Y") statusHtml += `<span class="badge badge-soft-primary">정상</span>`;
// 			else statusHtml += `<span class="badge badge-soft-danger">차단</span>`;
//
// 			const today = new Date();
// 			const birth = new Date(item.birth.substr(0,4), item.birth.substr(4,2)-1, item.birth.substr(6,2));
// 			let age = today.getFullYear() - birth.getFullYear();
// 			const m = today.getMonth() - birth.getMonth();
// 			if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
// 			    age--;
// 			}
//
// 			html += `<tr ${todate === item.regDt ? `style="background-color: #f4eeec;"` : ``}>`;
//             html += `    <td><input type="checkbox" class="MC_01_chk"></td>`;
//             html += `    <td class="mbrNo">${item.mbrNo}</td>`;
//             html += `    <td>${item.mbrId}</td>`;
//             html += `    <td><a class="click-tag" href="#" onclick="pageMove('/member/doctorDtl', {mbrNo:${item.mbrNo}})">${item.mbrNm}</a></td>`;
//             html += `    <td>${age}</td>`;
//             html += `    <td>${item.gender === "M" ? "남자" : "여자"}</td>`;
//             html += `    <td>${item.majorNms ? item.majorNms : ""}</td>`;
//             html += `    <td>${validTelNo(item.phoneNum)}</td>`;
//             html += `    <td>${item.dtlInfoYn}</td>`;
//             html += `    <td>${item.regDt}</td>`;
//             html += `    <td>`;
//             html += `        <div class="btn-group">`;
//             html += `            <a href="#" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${statusHtml}`;
//             html += `            </a>`;
//             html += `            <div class="dropdown-menu dropdown-menu-right">`;
//             html += `                <span class="badge badge-soft-primary">정상</span>`;
//             html += `                <span class="badge badge-soft-danger">차단</span>`;
//             html += `            </div>`;
//             html += `        </div>`;
//             html += `    </td>`;
//             html += `</tr>`;
// 		});
// 	}else{
// 		$(dataList.rsData.data).each((idx,item) => {
// 			let statusHtml = ``;
// 			if(item.useYn === "Y") statusHtml += `<span class="badge badge-soft-primary">정상</span>`;
// 			else statusHtml += `<span class="badge badge-soft-danger">차단</span>`;
//
// 			html += `<tr ${todate === item.regDt ? `style="background-color: #f4eeec;"` : ``}>`;
//             html += `    <td><input type="checkbox" class="MC_02_chk"></td>`;
//             html += `    <td class="mbrNo">${item.mbrNo}</td>`;
//             html += `    <td>${item.mbrId}</td>`;
//             html += `    <td><a href="#" class="click-tag" onclick="pageMove('/member/hospDtl', {mbrNo:${item.mbrNo}});">${item.mbrNm}</a></td>`;
//             html += `    <td>${item.addr}</td>`;
//             html += `    <td>${item.clcdNm}</td>`;
//             html += `    <td>${validTelNo(item.phoneNum)}</td>`;
//             html += `    <td>${item.regDt}</td>`;
//             html += `    <td>`;
//             html += `        <div class="btn-group">`;
//             html += `            <a href="#" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${statusHtml}`;
//             html += `            </a>`;
//             html += `            <div class="dropdown-menu dropdown-menu-right">`;
//             html += `                <span class="badge badge-soft-primary">정상</span>`;
//             html += `                <span class="badge badge-soft-danger">차단</span>`;
//             html += `            </div>`;
//             html += `        </div>`;
//             html += `    </td>`;
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
// 	if(e.value === "01" || e.value === "00" || e.value === "04"){
// 		$("#searchContent").show();
// 	}else if(e.value === "02"){
// 		$("#searchUseYn").show();
// 	}else if(e.value === "03"){
// 		if(mbrCd === "MC_01"){
// 			$("#searchMajor").show();
// 		}else if(mbrCd === "MC_02"){
// 			$("#searchContent").show();
// 		}
// 	}
// }
//
// function saveMember(){
// 	if($("." + mbrCd + "_chk:checked").length) {
// 		cmmConfirm('선택된 항목을 저장하시겠습니까?', () => {
// 			const saveList = [];
//
// 			$($("." + mbrCd + "_chk:checked")).each((idx, item) => {
// 				const mbrNo = $(item).parent().parent().find(".mbrNo").text()
// 				const useYn = $(item).parent().parent().find(".btn > span").text() === "정상" ? "Y" : "N"
// 				saveList.push({mbrNo: mbrNo, useYn: useYn});
// 			});
//
// 			const data = {
// 				saveList: saveList
// 			};
//
// 			comAjax(apiUrl + "/api/memberList/saveMember",{data:data}).then(response => {
// 				if(response.rsData.response_code === "901") return;
// 				const option = {
// 					callback:()=>{
// 						comAjax(apiUrl + "/api/memberList/getMemeberListCount",{type:"get"}).then(response => {
// 							$("#totalCnt").html(response.rsData.data.totalCount);
// 							$("#newCnt").html(response.rsData.data.newCount);
// 							$("#blockCnt").html(response.rsData.data.blockCount);
// 						});
//
// 						$("#" + mbrCd + "_selectAll").prop("checked", false)
// 						$("." + mbrCd + "_chk").prop("checked", false)
// 					}
// 				};
// 				cmmAlert("저장이 완료되었습니다.", option);
// 			});
// 		});
// 	}else{
// 		cmmAlert('선택된 항목이 없습니다.',{icon:'warning'});
// 	}
// }
//
// function removeMember(){
// 	if($("." + mbrCd + "_chk:checked").length) {
// 		cmmConfirm('선택된 항목을 삭제하시겠습니까?', () => {
// 			const removeList = [];
//
// 			$($("." + mbrCd + "_chk:checked")).each((idx, item) => {
// 				const mbrNo = $(item).parent().parent().find(".mbrNo").text()
// 				removeList.push(mbrNo);
// 			});
//
// 			const data = {
// 				removeList: removeList
// 			};
//
// 			comAjax(apiUrl + "/api/memberList/removeMember",{data:data}).then(response => {
// 				if(response.rsData.response_code === "901") return;
// 				const option = {
// 					callback:()=>{
// 						comAjax(apiUrl + "/api/memberList/getMemeberListCount",{type:"get"}).then(response => {
// 							$("#totalCnt").html(response.rsData.data.totalCount);
// 							$("#newCnt").html(response.rsData.data.newCount);
// 							$("#blockCnt").html(response.rsData.data.blockCount);
// 						});
//
// 						memberSearch();
// 					}
// 				};
// 				cmmAlert("삭제가 완료되었습니다.", option);
// 			});
// 		});
// 	}else{
// 		cmmAlert('선택된 항목이 없습니다.',{icon:'warning'});
// 	}
// }
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
// 		$("#totalCnt").html(`${response.rsData.data.totalDocCount + response.rsData.data.totalHosCount} (의사 ${response.rsData.data.totalDocCount} / 병원 ${response.rsData.data.totalHosCount})`);
// 		$("#newCnt").html(`${response.rsData.data.newDocCount + response.rsData.data.newHosCount} (의사 ${response.rsData.data.newDocCount} / 병원 ${response.rsData.data.newHosCount})`);
// 		$("#blockCnt").html(`${response.rsData.data.blockDocCount + response.rsData.data.blockHosCount} (의사 ${response.rsData.data.blockDocCount} / 병원 ${response.rsData.data.blockHosCount})`);
// 	});
//
// 	$("#searchContent").on("keyup", e =>{
// 		if(e.keyCode === 13) memberSearch();
// 	});
//
// 	pagingCompo = new pagingComponent($('.pagination').get(0),10);
//
// 	$("a[data-toggle='tab']").on('show.bs.tab', e => {
// 		$("#searchMajor").hide().val("");
// 		$("#searchUseYn").hide().val("");
// 		$("#searchContent").show().val("");
// 		$("#searchSe").val("00");
// 		if(e.target.id === "doctorListTab"){
// 			document.getElementById('registBtn').style.display = "none";
// 			mbrCd = 'MC_01';
// 			memberSearch();
// 			$("#searchSe > option")[3].text = "전공과목"
// 		}else if(e.target.id === "hosListTab"){
// 			document.getElementById('registBtn').style.display = null;
// 			mbrCd = 'MC_02';
// 			$("#searchSe > option")[3].text = "지역"
// 			memberSearch();
// 		}
// 	});
//
// 	const searchData = JSON.parse(sessionStorage.getItem("searchData"));
// 	const prev = sessionStorage.getItem("prev");
//
// 	if(prev && prev == "memberDtl"){
// 		mbrCd = searchData.mbrCd;
// 		$("#searchSe").val(searchData.searchSe);
// 		searchSeChange({value: searchData.searchSe});
// 		if(searchData.searchSe === "01" || searchData.searchSe === "00" || searchData.searchSe === "04"){
// 			$("#searchContent").val(searchData.searchContent);
// 		}else if(searchData.searchSe === "02"){
// 			$("#searchUseYn").val(searchData.searchContent);
// 		}else if(searchData.searchSe === "03"){
// 			if(mbrCd === "MC_01"){
// 				$("#searchMajor").val(searchData.searchContent);
// 			}else if(mbrCd === "MC_02"){
// 				$("#searchContent").val(searchData.searchContent);
// 			}
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
// 		document.getElementById('registBtn').style.display = null;
// 		if(prev && prev == "memberDtl"){
// 			$("#hosListTab").addClass("active");
// 			$("#tab2").addClass("active");
// 			memberSearch(searchData.pageNo);
// 		}else{
// 			$("#hosListTab").trigger("click");
// 		}
// 	}
// }

async function blockUser() {
    if($(".MC_01_chk:checked").length && confirm('선택된 사용자를 차단하시겠습니까?')) {  
        const blockList = [];

        $($(".MC_01_chk:checked")).each((idx, item) => {
            const userSeq = $(item).parent().parent().find(".userSeq").text()
            blockList.push(userSeq);
        });

        const data = {
            blockList: blockList,
            blockStatus: "Y"
        };

        let response = await fetch(`/api/user/block`, {
            method: "put",
            cache: 'no-cache',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          }).then(() => {
            alert("차단되었습니다.")
            location.reload()
          }).catch(() => {
            alert("오류가 발생하였습니다.")
          })
    }
}

async function updateUsers() {
  if($(".MC_01_chk:checked").length && confirm('선택된 사용자를 수정하시겠습니까?')) {
    const data = new Map();

    $($(".MC_01_chk:checked")).each((idx, item) => {
      const row = $(item).parent().parent();
      const value = {}

      row.find('input[type=text]').each((vIdx, vItem) => {
        value[$(vItem).attr('class')] = $(vItem).val()
      })
      
      data.set(row.find('.userSeq').text(), value)
    });

    let response = await fetch(`/api/user/rows`, {
      method: "put",
      cache: 'no-cache',
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(data))
    }).then(() => {
      alert("수정되었습니다.")
      location.reload()
    }).catch(() => {
      alert("오류가 발생하였습니다.")
    })
  }
}