/**
 * 
 */
 $(document).ready(e=>{
		if(localStorage.getItem("autoReadYn") === "Y"){
			$("#check1").prop("checked", true);
			$("#username").val(localStorage.getItem("autoReadId"));
		}
	
		$('#login').on('click',()=>{login()});
		if(exception != '') $('#errorMent').show();
		$('#password').keydown(e=>{
			if(e.keyCode == 13){
				login();
			}
		})
		
})
 
 function login(){
	localStorage.setItem("autoReadYn", $("#check1").prop("checked") ? "Y" : "N");
	localStorage.setItem("autoReadId", $("#username").val());
	
	let loginForm = document.querySelector('form');
	loginForm.action = contextPath+"/login/loginAction";
	loginForm.method = "post";
	loginForm.submit();
}
 
 
 
 
 