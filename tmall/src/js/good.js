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
	$.ajax({
		type:'get',
		url:'https://c0.3.cn/stock?area=19_1601_3634_0&buyNum=1&choseSuitSkuIds=&cat=11729,11730,6908&extraParam={%22originid%22:%221%22}&fqsp=0&pdpin=&pduid=1582097660830521127046&ch=1',
		dataType:'jsonp',
		data:{
			skuId:getUrlVar('sku'),
			venderId:getUrlVar('vender')
		},
		jsonp:'callback',
		jsonpCallback:'getGoodCallback',
		success:function(json){
			let stock = new RenderStock(json.stock);
			stock.init()
		},
		error:function(err){
			console.log(err)
		}
	})
	$.ajax({
		type:'get',
		url:'../mock/goodslist.json',
		dataType:'json',
		success:function(json){
			let data = new RenderData(json);
			data.init()
		},
		error:function(err){
			console.log(err)
		}
	})
	let isLogin=false;
	if(getUrlVar('userId')){isLogin=true}
	function RenderStock(stock){
		this.stock = stock;
		this.Render = function(){
			$('.deliver').find('dd').children().append(this.stock.serviceInfo,this.stock.pr.promiseResult)
		}
		this.init = function(){
			this.Render();
		}
	}
	function RenderData(data){
		this.data = data;
		this.Render = function(){
			this.data.forEach(function(item){
				let buf = item.img.replace('n7','n1')
				let temp = item.img.replace('n7','n0')
				if (getUrlVar('sku')==item.sku) {
					$('.intro-info')
					.find('.good-title')
					.append(item.name)
					.parent()
					.find('.price')
					.find('span')
					.append(item.price)
					.parent()
					.parent()
					.next()
					.find('span')
					.append(item.commit)
					.parent()
					.parent()
					.parent()
					.parent()
					.prev()
					.find('.spec')
					.prepend(`<img id="thumb" src="${buf}" data-large-img-url="${temp}" data-large-img-wrapper="preview">`)
					item.scroll.forEach(function(item){
						let buf = item[1].replace('n9','n5')
						let buff = item[1].replace('jfs','s40x40_jfs')
						$('.intro-preview')
						.find('ul')
						.append(`<li><img src="${buf}"></li>`)
						$('.choose-color')
						.find('dd')
						.append(`
							<div class="item">
								<a href="javascript:;">
									<img src="${buff}" alt="">
									<i>${item[0]}</i>
								</a>
							</div>
						`)
					})
					$('.nav-bread').find('.cur').children().append(item.name)
					$('head').find('title').append(`京东-${item.name}`)
				}
			})
			$('.intro-preview')
		}
		this.Bind = function(){
			let e = new Event();
			let m = new Magnifier(e);
			m.attach({
				thumb: '#thumb',
				onthumbenter:function(){
					$('#preview').show().css('visibility','visible')
				},
				onthumbleave:function(){
					$('#preview').hide()
				}
			})
			$('.choose-color').find('dd').children().click(function(){
				$(this).addClass('cur').siblings().removeClass('cur')
			})
			$('.spec-list').find('li').hover(
			function(){
				$(this).parent().children().removeAttr('class')
				let buf = $(this).children().attr('src').replace('n5','n1');
				let temp = $(this).children().attr('src').replace('n5','n0');
				$(this).addClass('cur')
				$('#thumb').attr({'src':buf,'data-large-img-url':temp}).next().css('background','url(http:'+buf+')');
				$('#preview').children().attr('src',temp)
			},
			function(){
				$(this).siblings().removeAttr('class')
			})
			$('.choose-amout').find('.btn-reduce').click(function(){
				$(this).siblings('input').val($(this).siblings('input').val()-1)
				$('.choose-amout').find('input').change()
			})
			$('.choose-amout').find('.btn-add').click(function(){
				$(this).siblings('input').val(parseInt($(this).siblings('input').val())+1)
				$('.choose-amout').find('input').change()
			})
			$('.choose-amout').find('input').bind('change',function(){
				if(this.value <= 1){
					$('.choose-amout').find('.btn-reduce').addClass('btn-disabled');
					this.value = 1;
				}else{
					$('.choose-amout').find('.btn-reduce').removeClass('btn-disabled');
				}
				if(this.value >= 200){
					$('.choose-amout').find('.btn-add').addClass('btn-disabled');
					this.value = 200;
				}else{
					$('.choose-amout').find('.btn-add').removeClass('btn-disabled');
				}
			})
			$('.app').find('.to-cart').children().click(function(){
				if(getUrlVar('userid')){
					let form = {};
					form.userid = getUrlVar('userid');
					form.goodid = getUrlVar('sku');
					form.venderid = getUrlVar('vender');
					form.img = $('.choose-color').find('.cur').find('img').attr('src');
					form.name = $('.good-title').text();
					if($('.choose-color').find('.cur').length){
						form.color = $('.choose-color').find('.cur').find('i').text()
					}else{
						alert('还没有选择颜色呢！')
						return false
					}
					form.price = $('.price').find('span').text();
					form.num = $('.choose-amout').find('input').val();
					let raw = localStorage.getItem('cart');
					if(raw){
						let cart = raw.split(';');
						let arr = []
						cart.forEach(function(item){
							arr.push(JSON.parse(item))
						})
						for(let i = 0;i < arr.length;i ++){
							if(arr[i].goodid == form.goodid&&arr[i].color == form.color){
								arr[i].num = parseInt(arr[i].num) + 1;
								break
							}else if(i == arr.length-1){
								arr.push(form)
							}
						}
						console.log(arr)
						let res = JSON.stringify(arr).slice(1,-1).replace(/},{/g,'};{')
						localStorage.setItem('cart',res)
					}else{
						localStorage.setItem('cart',JSON.stringify(form))
					}
					//location.reload()
				}else{
					alert('请先登录后加入购物车')
				}
			})
		}
		this.init = function(){
			this.Render();
			this.Bind();
		}
	}
})