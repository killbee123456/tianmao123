$(document).ready(function(){
	let step = {
		cur:0,
		phonenum:false,
		username:false,
		password:false,
		passwordconfirm:false
	};
	Object.defineProperties(step,{
		value:{
			set:function(value){
				this.cur += value
				$('.form')
				.children()
				.each(function(){
					$(this).hide()
				})
				.eq(this.cur)
				.show()
				$('.step')
				.eq(this.cur)
				.addClass('on')
				.prevAll()
				.removeClass('on')
				.addClass('finish')
				.find('span')
				.empty()
			}
		},
		_phonenum:{
			set:function(value){
				this.phonenum = value
				if(value){
					$('.phonenum')
					.find('.next-btn')
					.children()
					.addClass('on')
				}else{
					$('.phonenum')
					.find('.next-btn')
					.children()
					.removeClass('on')
				}
			},
			get:function(){
				return this.phonenum;
			}
		},
		_username:{
			set:function(value){
				this.username = value
				if(this.username&&this.password&&this.passwordconfirm){
					$('.phonenum')
					.find('.next-btn')
					.children()
					.addClass('on')
				}else{
					$('.phonenum')
					.find('.next-btn')
					.children()
					.removeClass('on')
				}
			},
			get:function(){
				return this.username
			}
		},
		_password:{
			set:function(value){
				this.password = value
				if(this.username&&this.password&&this.passwordconfirm){
					$('.phonenum')
					.find('.next-btn')
					.children()
					.addClass('on')
				}else{
					$('.phonenum')
					.find('.next-btn')
					.children()
					.removeClass('on')
				}
			},
			get:function(){
				return this.password
			}
		},
		_passwordconfirm:{
			set:function(value){
				this.passwordconfirm = value
				if(this.username&&this.password&&this.passwordconfirm){
					$('.account')
					.find('.next-btn')
					.children()
					.addClass('on')
				}else{
					$('.account')
					.find('.next-btn')
					.children()
					.removeClass('on')
				}
			},
			get:function(){
				return this.passwordconfirm
			}
		}
	})
	function isValid(reg,str){
		return reg.test(str)
	}
	
	$('.phonenum')
	.find('input')
	.on('input',function(){
		let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
		if(this.value&&isValid(reg,this.value)){
			step._phonenum = true
			$(this)
			.parent()
			.next('.tips')
			.children()
			.hide()
			.empty()
			.removeClass('error')
		}else if(this.value&&!isValid(reg,this.value)){
			step._phonenum = false
			$(this)
			.parent()
			.next('.tips')
			.children()
			.show()
			.html('<i></i>手机号码不正确，请检查是否输入有误')
			.addClass('error')
		}else if(!this.value){
			step._phonenum = false
			$(this)
			.parent()
			.next('.tips')
			.children()
			.hide()
			.empty()
			.removeClass('error')
		}
	})
	.focus(function(){
		if(!this.value){
			$(this)
			.parent()
			.next('.tips')
			.children()
			.show()
			.html('<i></i>请输入手机号码')
		}
	})
	.blur(function(){
		if(!this.value){
			$(this)
			.parent()
			.next('.tips')
			.children()
			.show()
			.empty()
		}
	})
	
	$('.account')
	.find('.input')
	.each(function(index){
		$(this)
		.find('input')
		.on('input',function(){
			switch (index){
				case 0:{
					let reg = /^[A-Za-z0-9_-]{4,20}$/gi;
					let value = this.value.replace(/[\u4E00-\u9FA5/]/g,'aa');
					if(this.value&&isValid(reg,value)){
						step._username = true
						$(this)
						.parent()
						.next('.tips')
						.children()
						.hide()
						.empty()
						.removeClass('error')
					}else if(this.value&&!isValid(reg,this.value)){
						step._username = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.html('<i></i>用户名不正确，仅支持中文、英文、数字、“-”、“_”的组合，4-20字符')
						.addClass('error')
					}else if(!this.value){
						step._username = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.hide()
						.empty()
						.removeClass('error')
					}
					break
				}
				case 1:{
					let reg = /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{8,16}$/;
					if(this.value&&isValid(reg,this.value)){
						step._password = true
						$(this)
						.parent()
						.next('.tips')
						.children()
						.hide()
						.empty()
						.removeClass('error')
					}else if(this.value&&!isValid(reg,this.value)){
						step._password = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.html('<i></i>密码不正确，仅支持字母、数字和字符两种及以上的组合，8-20字符')
						.addClass('error')
					}else if(!this.value){
						step._password = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.hide()
						.empty()
						.removeClass('error')
					}
					break
				}
				case 2:{
					let pw = document.querySelector('#password').value
					if(this.value&&this.value==pw){
						step._passwordconfirm = true
						$(this)
						.parent()
						.next('.tips')
						.children()
						.hide()
						.empty()
						.removeClass('error')
					}else if(this.value&&!(this.value == pw)){
						step._passwordconfirm = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.html('<i></i>密码不一致，请重新输入')
						.addClass('error')
					}else if(!this.value){
						step._passwordconfirm = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.hide()
						.empty()
						.removeClass('error')
					}
					break
				}
			}
		})
		.focus(function(){
			if(!this.value){
				switch(index){
					case 0:{
						this._username = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.html('<i></i>支持中文、英文、数字、“-”、“_”的组合，4-20字符')
						break
					}
					case 1:{
						this._password = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.html('<i></i>建议使用字母、数字和字符两种及以上的组合，8-20字符')
						break
					}
					case 2:{
						this._passwordconfirm = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.html('<i></i>请再次输入密码')
					}
				}
			}
		})
		.blur(function(){
			if(!this.value){
				switch(index){
					case 0:{
						this._username = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.empty()
						break
					}
					case 1:{
						this._password = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.empty()
						break
					}
					case 2:{
						this._passwordconfirm = false
						$(this)
						.parent()
						.next('.tips')
						.children()
						.show()
						.empty()
					}
				}
			}
		})
	})
	
	$('.form')
	.find('.next-btn')
	.children()
	.click(function(){
		if(step.cur == 0&&step.phonenum == true||step.cur == 1&&step.username == true&&step.password == true&&step.passwordconfirm == true){
			step.value = 1
		}
	})
	
	$('.post').click(function(){
		let phonenum = $('#phonenum').val();
		let username = $('#username').val();
		let password = $('#password').val();
		let arr = [phonenum,username,password];
		localStorage.setItem(username,arr)
	})
})