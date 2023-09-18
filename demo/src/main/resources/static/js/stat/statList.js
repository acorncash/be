// /**
//  *
//  */
//  const statList = {
// 	/**
// 	 * 리스트 조회 parameter
// 	 */
// 	param: {
// 		searchYear: '',
// 		searchHalfSe: '',
// 		totGbCd: 'TGC_01'
// 	},
//
// 	init: () => {
// 		document.querySelectorAll(".nav-tabs a").forEach(item =>{
// 			item.addEventListener("click", e =>{
// 				const prevTarget = document.querySelector(".nav-tabs .active");
// 				const currentTarget = e.target;
// 				if(prevTarget.id === currentTarget.id) return;
//
// 				prevTarget.classList.remove("active");
// 				currentTarget.classList.add("active");
//
// 				const statSe = document.getElementById("statSe");
// 				if(currentTarget.id === "TGC_01"){
// 					statSe.textContent = "지역";
// 				}else if(currentTarget.id === "TGC_02"){
// 					statSe.textContent = "병원타입";
// 				}else{
// 					statSe.textContent = "진료과";
// 				}
//
// 				statList.param.totGbCd = currentTarget.id;
// 				statList.getStatList();
// 			})
// 		});
//
// 		const array = new Array("01","02","03","04","05","06");
// 		const searchYear = document.getElementById("searchYear");
// 		const searchHalfSe = document.getElementById("searchHalfSe");
// 		const currentYear = new Date().toISOString().substr(0,4);
// 		const currentMonth = new Date().toISOString().substr(5,2);
//
// 		if(array.includes(currentMonth)) {
// 			searchYear.value = currentYear - 1;
// 			searchHalfSe.value = "02";
// 		}
// 		else {
// 			searchYear.value = currentYear;
// 			searchHalfSe.value = "01";
// 		}
//
// 		document.getElementById("searchBtn").addEventListener("click", () => statList.getStatList());
//
// 		statList.getStatList();
// 	},
// 	getStatList: async () => {
// 		statList.param.searchYear = document.getElementById("searchYear").value;
// 		statList.param.searchHalfSe = document.getElementById("searchHalfSe").value;
//
// 		let searchOption = {
// 			type: "get",
// 			data: statList.param
// 		}
//
// 		const res = await comAjax(apiUrl + "/api/stat/getStatList",searchOption);
//
// 		let html = ``;
// 		if(res.rsData.data.currentList.length){
// 			res.rsData.data.currentList.forEach(item=> {
// 				html += `
// 						<tr id="${item.statGbCd}">
// 							<td>${item.payAvgRank}</td>
// 							<td>${item.statGbNm}</td>
// 							<td id="${item.statGbCd}_pay">${item.avgPay.toLocaleString('ko-KR')} 만원</td>
// 						</tr>
// 				`;
// 			});
// 			document.querySelector("#statListTable tbody").innerHTML = html;
//
// 			if(res.rsData.data.prevList.length){
// 				res.rsData.data.prevList.forEach(item=> {
// 					document.getElementById(item.statGbCd).insertAdjacentHTML("beforeend", `<td>${item.avgPay.toLocaleString('ko-KR')} 만원</td>
// 																						<td>${item.payAvgRank}</td>
// 																						<td>${statList.rateOfChange(item.statGbCd, item.avgPay)}</td>`);
// 				});
// 			}else{
// 				document.querySelectorAll("#statListTable tbody tr").forEach(item => {
// 				   item.insertAdjacentHTML("beforeend", `<td><i class="uil-minus"></i></td><td><i class="uil-minus"></i></td><td><i class="uil-minus"></i></td>`);
// 				});
// 			}
//
// 		}else{
// 			html = `<tr><td colspan="6"><div class="none">검색된 항목이 없습니다.</div></td></tr>`;
// 			document.querySelector("#statListTable tbody").innerHTML = html;
// 		}
// 	},
// 	rateOfChange: (cd,avgPay) => {
// 		const currentPay = Math.floor(document.getElementById(cd+"_pay").textContent.replace(" 만원", "").replace(",","") );
// 		const prevPay = avgPay;
// 		const rocPay = ((prevPay - currentPay) / currentPay * 100).toFixed(2);
//
// 		let returnHtml = ``;
// 		if(rocPay > 0){
// 			returnHtml += `${Math.abs(rocPay)} <i class="uil-arrow-down"></i>`;
// 		}else if(rocPay < 0){
// 			returnHtml += `${Math.abs(rocPay)} <i class="uil-arrow-up"></i>`;
// 		}else{
// 			returnHtml += `<i class="uil-minus"></i>`;
// 		}
//
// 		return returnHtml;
// 	}
// }
//
// $(()=>{
// 	statList.init();
// })