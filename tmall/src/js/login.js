$(document).ready(function(){
	$('.login-btn').children().click(function(){
		let username = $('#username').val();
		let password = $('#password').val();
		let buf;
		if(localStorage.getItem(username)){
			buf = localStorage.getItem(username).split(',')
			if((username == buf[0]||username == buf[1])&&buf[2]==password){
				alert('登录成功');
				location.assign('index.html?userid='+username)
			}else{
				alert('密码错误');
			}
		}else{
			alert('用户不存在');
		}
	})
})