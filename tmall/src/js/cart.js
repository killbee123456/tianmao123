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
	let cart = [];
	function getCate(){
		let cartData = localStorage.getItem('cart');
		if(cartData){
			let raw = cartData.split(';')
			raw.forEach(function(item){
				let obj = JSON.parse(item);
				cart.push(obj)
			})
		}
	}
	getCate()
	let render = new cartRender();
	render.init();
	function cartRender(){
		this.userid = getUrlVar('userId');
		this.cart = cart
		this.Render = function(){
			if(cart.toString()){
				cart.forEach(function(item){
					let img = item.img.replace('n9','cms').replace('s40x40','s80x80');
					let sum = parseFloat(item.price*item.num).toFixed(2)
					$('.cart-main').children().append(`
						<div class="item selected" data-item-id="${item.goodid}" data-item-color="${item.color}">
							<div class="item-select col-1">
								<input type="checkbox" checked="checked">
							</div>
							<div class="item-img col-2"><a href="good.html?sku=${item.goodid}&vender=${item.venderid}"><img src="${img}" ></a></div>
							<div class="item-name col-3"><a href="good.html?sku=${item.goodid}&vender=${item.venderid}">${item.name}</a></div>
							<div class="item-prop col-4">${item.color}</div>
							<div class="item-price col-5"><b>¥</b><span>${item.price}</span></div>
							<div class="item-amount col-6">
								<a href="javascript:;" class="btn-reduce btn-disabled">-</a>
								<input type="text" value="${item.num}">
								<a href="javascript:;" class="btn-add">+</a>
							</div>
							<div class="item-sum col-7"><b>¥</b><span>${sum}</span></div>
							<div class="item-action col-8"><a href="javascript:void(0);">删除</a></div>
						</div>
					`)
				})
				function totalprice(){
					let total = 0;
					$('.item-list').children('.selected').each(function(index,item){
						total += parseFloat($(item).find('.item-sum').find('span').text())
					})
					$('.price-sum').find('.sum').find('span').text(total.toFixed(2))
				}
				function totalamount(){
					let total = 0;
					$('.item-list').children('.selected').each(function(index,item){
						total += parseFloat($(item).find('.item-amount').find('input').val())
					})
					$('.amount-sum').find('b').text(total)
				}
				totalprice()
				totalamount()
			}else{
				$('.cart').hide()
				$('.empty').show()
			}
		}
		this.Bind = function(){
			function changeStorage(callback){
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
					let res = JSON.stringify(arr).slice(1,-1).replace(/},{/g,'};{')
					localStorage.setItem('cart',res)
				}
			}
			function remove(item){
				item.remove()
				let id = $(item).attr('data-item-id');
				let color = $(item).attr('data-item-color');
				let idx;
				cart.forEach(function(item){
					if(item.goodid == id&&item.color == color){
						idx = cart.indexOf(item);
					}
				})
				cart.splice(idx,1)
				let form = JSON.stringify(cart,idx).replace(/},{/g,'};{').slice(1,-1);
				localStorage.setItem('cart',form)
				if(!$('.item').length){
					$('.cart').hide() 
					$('.empty').show()
				}
				$('.amount-sum').find('b').text($('.item.selected').length)
			}
			function totalprice(){
				let total = 0;
				$('.item-list').children('.selected').each(function(index,item){
					total += parseFloat($(item).find('.item-sum').find('span').text())
				})
				$('.price-sum').find('.sum').find('span').text(total.toFixed(2))
			}
			function totalamount(){
				let total = 0;
				$('.item-list').children('.selected').each(function(index,item){
					total += parseFloat($(item).find('.item-amount').find('input').val())
				})
				$('.amount-sum').find('b').text(total)
			}
			$('.item-amount').find('.btn-reduce').click(function(){
				$(this).siblings('input').val($(this).siblings('input').val()-1)
				$('.item-amount').find('input').change()
			})
			$('.item-amount').find('.btn-add').click(function(){
				$(this).siblings('input').val(parseInt($(this).siblings('input').val())+1)
				$('.item-amount').find('input').change()
			})
			$('.item-amount').find('input').bind('change',function(){
				if(this.value <= 1){
					$('.item-amount').find('.btn-reduce').addClass('btn-disabled');
					this.value = 1;
				}else{
					$('.item-amount').find('.btn-reduce').removeClass('btn-disabled');
				}
				if(this.value >= 200){
					$('.item-amount').find('.btn-add').addClass('btn-disabled');
					this.value = 200;
				}else{
					$('.item-amount').find('.btn-add').removeClass('btn-disabled');
				}
				let idx = $(this).parent().parent().index()
				let num = $(this).val()
				let _this = this
				changeStorage(function(item,index){
					if(idx == index){
						item.num = num
					}
				})
				$(this)
				.parent().parent()
				.find('.item-sum')
				.find('span')
				.text(parseFloat(
				$(this)
				.parent().parent()
				.find('.item-price')
				.find('span')
				.text()
				*
				$(this).val()
				).toFixed(2))
				totalamount()
				totalprice()
			})
			$('.item-action').find('a').click(function(){
				remove($(this).parent().parent())
				totalamount()
				totalprice()
			})
			$('.select-all').find('[type="checkbox"]').on('click',function(){
				if(this.checked){
					$('[type="checkbox"]').each(function(index,item){
						item.checked = true
					})
					$('.item-list').children().addClass('selected')
				}else{
					$('[type="checkbox"]').each(function(index,item){
						item.checked = false
					})
					$('.item-list').children().removeClass('selected')
				}
				totalamount()
				totalprice()
			})
			$('.item-list').find('[type="checkbox"]').click(function(){
				let length = $('.item-list').find('[type="checkbox"]').length;
				$(this).parent().parent().toggleClass('selected')
				$('.item-list').find('[type="checkbox"]').each(function(index,item){
					if(this.checked){
						if(index+1==length){
							$('.select-all').find('[type="checkbox"]').each(function(index,item){
								item.checked = true
							})
						}
					}else{
						$('.select-all').find('[type="checkbox"]').each(function(index,item){
							item.checked = false
						})
						return false
					}
				})
				totalamount()
				totalprice()
			})
			$('.remove-checked').click(function(){
				$('.item-list').find('.selected').each(function(index,item){
					remove(item)
				})
			})
			$('.remove-all').click(function(){
				$('.item-list').children().each(function(index,item){
					remove(item)
				})
			})
		}
		this.init = function(){
			this.Render();
			this.Bind();
		}
	}
})