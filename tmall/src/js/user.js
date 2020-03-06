$(document).ready(function(){
	function getUrlVar(name){
		let query = window.location.search.substring(1);
		let vars = query.split('&');
		for (var i=0;i<vars.length;i++) {
			var res = vars[i].split("=");
			if(res[0] == name){return res[1];}
		}
		return(false);
	}
	function getPreUrlVar(name){
		if(document.referrer&&!getUrlVar('quit')){
			let query = document.referrer.split('?');
			if(query[1]){
				let vars = query[1].split('&');
				for (var i=0;i<vars.length;i++) {
					var res = vars[i].split("=");
					if(res[0] == name){return res[1];}
				}
			}
			return false
		}else{
			return ''
		}
	}
	function changeStorage(callback,deleteTarget){
		let raw = localStorage.getItem('cart');
		if(raw){
			let cart = raw.split(';');
			let arr = []
			cart.forEach(function(item){
				arr.push(JSON.parse(item))
			})
			for(let i = 0;i < arr.length;i ++){
				callback(arr[i],i)
			}
			if(deleteTarget){
				arr.splice(deleteTarget-1,1)
			}
			console.log(arr)
			let res = JSON.stringify(arr).slice(1,-1).replace(/},{/g,'};{')
			localStorage.setItem('cart',res)
		}
	}
	function getTotalAmount(){
		let total = 0;
		changeStorage(function(item,index){
			total += parseInt(item.num)
		})
		return total
	}
	function getTotalPrice(){
		let total = 0;
		changeStorage(function(item,index){
			total += item.price * item.num
		})
		return total
	}
	let preVar = getPreUrlVar('userid');
	if(preVar&&!getUrlVar('userid')){
		let query = location.href.split('?');
		if(query[1]){
			window.location = query[0] + '?userid=' + preVar + '&' + query[1]
		}else{
			window.location = query[0] + '?userid=' + preVar
		}
	}
	
	let userid = decodeURI(getUrlVar('userid'));
	if(localStorage.getItem(userid)){
		$('body').find('.nologin').hide()
		$('body').find('.login').show()
		let curPage = location.href.replace(/userid=.*?&/,'').replace(/userid=.*/,'');
		$('body').find('.quit').attr('href',curPage+'&quit=true')
		$('body').find('.quit').click(function(){
			if(confirm('确定要退出登录吗')){
				location.assign(this.href);
			}else{
				return false
			}
		})
		
		$('body').find('[text="username"]').append(userid)
		$('.header').find('.myCart').mouseenter(function(){
			$('.header').find('.dropdownLayer').empty()
			let cartData = localStorage.getItem('cart');
			let cart = [];
			if(cartData){
				let raw = cartData.split(';')
				raw.forEach(function(item){
					let obj = JSON.parse(item);
					cart.push(obj)
				})
				$('.header').find('.dropdownLayer').append(`
					<div class="cart">
						<div class="cart-list">
							
						</div>
						<div class="cart-sum clearfix">
							<div class="summary pull-left">
								<span>共<b>${getTotalAmount()}</b>件商品</span>
								<span>小计：¥<b>${getTotalPrice()}</b></span>
							</div>
							<div class="to-cart pull-right">
								<a href="cart.html">去购物车</a>
							</div>
						</div>
					</div>
				`).find('.empty').hide()
				cart.forEach(function(item){
					let img = item.img.replace('n9','n5').replace('s40x40_','')
					$('.header').find('.cart-list').append(`
						<div class="cart-item clearfix">
							<div class="item-img"><img src="${img}"></div>
							<div class="item-name">${item.name}</div>
							<div class="price-action">
								<p class="item-price"><strong>¥${item.price}</strong>x${item.num}</p>
								<p class="item-action"><a class="delete" href="javascript:;">删除</a></p>
							</div>
						</div>
					`)
				})
			}else{
				$('.header').find('.dropdownLayer').html(`<div class="empty">购物车中没有商品</div>`)
			}
		})
		$('.header').find('.dropdownLayer').on('click','.delete',function(e){
			let idx = $(e.target).parent().parent().parent().index();
			changeStorage(function(){},idx+1)
			$('.header').find('.myCart').mouseenter()
		})
	}
})