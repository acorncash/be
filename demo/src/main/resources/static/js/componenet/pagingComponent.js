/**
 * @filename pagingComponent.js
 * @since 2022-07-14
 * @author wgsystem
 */
const pagingComponent = function(targetItem_,pageViewCount_,pageIndexCount_ = 10){
	//target pagination class div
	let $paginationDiv = null; 
	let $pcPageing = null;
	let $mPageing  = null;
	
	//화면에 보여지는 아이템 갯수
	let pageViewCount    = 0;


	
	
	/**
	 * @function pagingInit
	 * @param targetItem 페이지 div영역
	 * @param pageViewCount_ 현재 페이지 화면에 보여지는 아이템 갯수
	 * @target   in
	 * @etc      초기화
	 */
	const pagingInit = function(targetItem,pageViewCount_){
		if(targetItem == null ) console.log('초기화 실패..');
		$paginationDiv = $(targetItem); 
		$pcPageing = $paginationDiv.find('.pc-num');
		$mPageing  = $paginationDiv.find('.m-num');
		pageViewCount  = pageViewCount_;
	
	}
	
	/**
	 * @function activePaging
	 * @param    totalCount_ 전체 아이템 수
	 * @param    fn 클릭 이벤트 시 활성화할 이벤트 
	 * @target   in
	 * @etc      새로운 조회 할시 재구성을 위함 함수 
	 */
	const activePaging = function(fn_){
		fn = fn_;
		fn();
	}
	/**
	 * @function pageNavi 
	 * @param    pageNum page번호
	 * @param    totalCount_ 조회시 들어온 새로운 totalcount
	 * @param    fn_  번호 클릭시 실행할 펑션 
	 * @target   in
	 * @etc      페이지 관련함수 
	 */
	const pageNavi = function(pageNum_,totalCount_,fn_){
		//조회한 페이지 번호; 
		let pageNum    =  Number.parseInt(pageNum_);
		//총 카운트 갯수 
		let totalCount = totalCount_

		//번호 클릭시 실행 시킬 함수
		let fn = fn_;
		
		let allPage =  Math.ceil(totalCount/pageViewCount)==0 ? 1:Math.ceil(totalCount/pageViewCount);
		let allView = Math.ceil(allPage/10);

		$pcPageing.children().remove();
		$mPageing.children().remove();
		
		if(totalCount<1) return;
		
		$pcPageing.append(`<li class="first"><a type="button" title="첫페이지"></a></li>
						   <li class="prev disabled"><a type="button" title="이전페이지"></a></li>`);
		let startPage ;
		let endPage;
		//10,20,30..... 
		if(pageNum <= pageIndexCount_) startPage = 1;
		else if(pageNum % (pageIndexCount_) == 0) startPage = pageNum - pageIndexCount_ + 1;
		else startPage = Math.floor((pageNum)/(pageIndexCount_))*pageIndexCount_+1;
		
		endPage = startPage+pageIndexCount_-1;
		//end페이지가 최고 페이지 갯수보다 많으면 제한
//		debugger;
		if(endPage>allPage)endPage = allPage;
		for(let i = startPage ; i <= endPage; i ++){
			$pcPageing.append(`<li class="pcPaging"><a id="${i}" type="button" value ="${i}"><span>${i}</span></a></li>`);
		}
		$pcPageing.append(`<li class="next"><a type="button" title="다음페이지"></a></li>
						   <li class="last"><a type="button" title="끝페이지"></a></li>`);

		//페이지번호 클릭
		$pcPageing.find('.pcPaging a').on('click',function(e){
			let $target = $(e.currentTarget);
			let value = $target.attr('value');
			$('.pcPaging a') .removeClass('active');
			$target.addClass('active');
			if(value === pageNum.toString()) return; // 같은번호 클릭시 return;
			fn(value);
		})
		
		//처음으로 가기 이동 버튼 evenet
		$pcPageing.find('.first').on('click',function(e){
			fn(1);
		});
		 
		//이전페이지로 이동 클릭버튼
		$pcPageing.find('.prev').on('click',function(e){
			fn(pageNum-1);
		});
		
		//다음 페이지 이동 클릭버튼
		$pcPageing.find('.next').on('click',function(e){
			fn(pageNum+1);
		});
		
		//마지막 페이지 이동
		$pcPageing.find('.last').on('click',function(e){
			fn(allPage);
		});
		
		$mPageing.append(`<li class="prev"><a type="button" title="이전페이지"></a></li>`);
		$mPageing.append(`<li class="page-mark"><em>${pageNum}</em>${allPage}</li>`);
		$mPageing.append(`<li class="next"><a type="button" title="다음페이지"></a></li>`)
		
		$mPageing.find('.prev a').on('click',e=>fn(pageNum-1));
		$mPageing.find('.next a').on('click',e=>fn(pageNum+1));
		
		if(pageNum ==1) $pcPageing.find('.first').off();
		
		if(pageNum ==1) $pcPageing.find('.prev').off();
		
		if(allPage ==pageNum) $pcPageing.find('.next').off();
		
		if(allPage == pageNum) $pcPageing.find('.last').off();
		
		if(pageNum == 1)$mPageing.find('.prev a').off();
		
		if(pageNum==allPage)$mPageing.find('.next a').off();
		
		$pcPageing.find('.pcPaging a').filter(`[value=${pageNum}]`).addClass('active');
	}

	
	pagingInit(targetItem_,pageViewCount_);
	
	
	return{
		pageNavi
	}
	
	
}

