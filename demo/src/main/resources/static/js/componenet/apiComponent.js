/**
 * 
 */

const apiComponent = (function(){
	let publicEncApiKey = 'pSPjnXswWv%2FG9tr%2B9WGHqJ%2BC7OOzcoMD6TJG97T%2FGQqILyZFNDXZBaYtKJzyn2bFurS4ARb9QDJrnKDZorCSQw%3D%3D';
	let publicApiKey = 'pSPjnXswWv/G9tr+9WGHqJ+C7OOzcoMD6TJG97T/GQqILyZFNDXZBaYtKJzyn2bFurS4ARb9QDJrnKDZorCSQw==';
	
	
	const publicBizNumCheckApi =function(bizNo,b_nm,p_nm){
		let url = "//api.odcloud.kr/api/nts-businessman/v1/status?serviceKey="
		var data = {
					"b_no": [] 
		};
		data["b_no"].push(bizNo);
		data.b_nm = b_nm;
		data.p_nm = p_nm;
		
		return publicPostApiAjax(url,data);
	}
	
	const publicHosInfoApi =function(yadmNm,pageNo=1,numOfRows=5){
		let url = "//apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1"
		var data = {
				 pageNo           : ''
				,numOfRows        : '' 
				,yadmNm           : ''  
		};
		data.pageNo=pageNo;
		data.numOfRows=numOfRows;
		data.yadmNm=yadmNm;
		data._type = 'json';
		return publicGetApiAjax(url,data);
	}

	const publicGetApiAjax =function(url,data){
		data.serviceKey = publicApiKey;
		let keys = Object.keys(data);
		return $.ajax(url,{
			type:'GET',
			data:data
		})
		
	}
	
	
	
	const publicPostApiAjax =function(url,data){
		data.serviceKey = publicEncApiKey;
		return $.ajax({
		  url: url+publicEncApiKey,
		  type: "POST",
		  data: JSON.stringify(data), // json 을 string으로 변환하여 전송
		  dataType: "JSON",
		  contentType: "application/json",
		  accept: "application/json",
		  success: function(result,code) {
		     return {result,code};
		  },
		  error: function(result) {
		      return result
		  }
		})
	}
	
	
	return{
		publicBizNumCheckApi: (bizNo,b_nm,p_nm)=>publicBizNumCheckApi(bizNo,b_nm,p_nm),
		publicHosInfoApi : (yadmNm,pageNo,numOfRows)=>publicHosInfoApi(yadmNm,pageNo,numOfRows)
		
	}
	
	
	
})();

