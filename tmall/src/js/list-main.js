$(document).ready(function(){
	$.ajax({
		type:'get',
		url:'../mock/goodslist.json',
		success:function(json){
			console.log('1',json.responseText)
			let list = new mainListRender(json);
			list.init();
		},
		error:function(err){
			console.log(err)
		}
	})
	function getUrlVar(name){
		let query = window.location.search.substring(1);
		let vars = query.split('&');
		for (var i=0;i<vars.length;i++) {
			var res = vars[i].split("=");
			if(res[0] == name){return res[1];}
		}
		return(false);
	}
	function mainListRender(data){
		this.data = data;
		this.curPage = 1;
		this.pageSize = 12;
		let _this = this;
		this.compare = function(key,gt=true){
			if(gt){
				return function(value1,value2){
					let val1 = value1[key];
					let val2 = value2[key];
					return val2 - val1;
				}
			}else{
				return function(value1,value2){
					let val1 = value1[key];
					let val2 = value2[key];
					return val1 - val2;
				}
			}
		}
		this.listRender = function(data){
			console.log('rendering')
			let prevRender = (this.curPage-1)*this.pageSize;
			let curRender = this.curPage*this.pageSize;
			if(getUrlVar('sort')&&getUrlVar('sort') == 'price'){
				this. data = data.sort(_this.compare('price'))
			}else if(!getUrlVar('sort')){
				this.data = data
			}
			$('.main-content').children('ul').empty()
			this.data.forEach(function(item,index){
				if(index<=curRender&&index>prevRender){
					$('.main-content').children('ul').append(`
						<li class="main-item">
							<div class="img-box">
								<a href="good.html?sku=${item.sku}&vender=${item.vender}">
									<img src="${item.img}" >
								</a>
							</div>
							<div class="scroll">
								<ul class="clearfix"></ul>
							</div>
							<div class="price">
								<strong>
									<em>￥</em>
									<i>${item.price}</i>
								</strong>
							</div>
							<div class="title">
								<a href="good.html?sku=${item.sku}&vender=${item.vender}">${item.name}</a>
							</div>
							<div class="commit">
								<strong>
									<em>${item.commit}</em>
									条评价
								</strong>
							</div>
							<div class="shop">
								<span>
									<a href="#">${item.shop}</a>
								</span>
							</div>
							<div class="icons"></div>
						</li>
					`)
					item.scroll.forEach(function(item,num){
						$('.main-content').children('ul').children('li:last-of-type').find('.scroll').children().append(`
							<li>
								<a href="javascript:void(0);">
									<img title="${item[0]}" src="${item[1]}">
								</a>
							</li>
						`)
					})
					item.icons.forEach(function(item,num){
						let icon;
						if(item == '自营'||item == '厂商配送')
						{icon = 'icon1'}else if(item == '新品')
						{icon = 'icon2'}else if(item == '险')
						{icon = 'icon3'}else if(item == '放心购')
						{icon = 'icon4'}
						$('.main-content').children('ul').children('li:last-of-type').find('.icons').append(`
							<i class="${icon}">${item}</i>
						`)
					})
				}
			})
			$('.main-content').children('ul').children().each(function(index,item){
				$(item).find('.scroll').children().children('li:nth-of-type(1)').addClass('cur').parent().children().mouseenter(function(){
					let img = $(this).find('img').attr('src').replace('n9','n7');
					$(this).addClass('cur').siblings().removeClass('cur').parent().parent().siblings('.img-box').find('img').prop('src',img)
				})
			})
		}
		this.pagesRender = function(data){
			$('.main').find('.pages').children('ul').empty()
			this.pageNum = Math.ceil(data.length / this.pageSize);
			for(let i = 0;i < this.pageNum;i ++){
				if(i + 1 == this.curPage){
					$('.main').find('.pages').children('ul').append(`
						<li><a class="cur" href="javascript:;" data-page-target="${i+1}">${i+1}</a></li>
					`)
				}else{
					$('.main').find('.pages').children('ul').append(`
						<li><a href="javascript:;" data-page-target="${i+1}">${i+1}</a></li>
					`)
				}
			}
			if(this.curPage != 1){
				$('.main').find('.pages').children('ul')
				.prepend(`<li><a href="javascript:;" class="prev-page">上一页</a></li>`)
			}
			if(this.curPage != this.pageNum){
				$('.main').find('.pages').children('ul')
				.append(`<li><a href="javascript:;" class="next-page">下一页</a></li>`)
			}
		}
		this.listBind = function(){
			document.querySelector('.sort').addEventListener('click',function(e){
				if($(e.target).hasClass('byPrice')){
					let data = _this.data
					$(e.target).toggleClass('gt').siblings().removeClass('cur');
					if($(e.target).hasClass('gt')){
						_this.listRender(data.sort(_this.compare('price')))
					}else{
						_this.listRender(data.sort(_this.compare('price',false)))
					}
				}
				if($(e.target).hasClass('normal')&&!$(e.target).hasClass('cur')){
					$(e.target).toggleClass('cur')
					console.log(data)
					_this.listRender(data.sort(_this.compare('sku')))
				}
			})
			document.querySelector('.pages').addEventListener('click',function(e){
				if($(e.target).attr('data-page-target')){
					_this.curPage = $(e.target).attr('data-page-target')
					_this.listRender(_this.data)
				}
				if($(e.target).hasClass('prev-page')){
					_this.curPage = _this.curPage - 1
					_this.listRender(_this.data)
				}
				if($(e.target).hasClass('next-page')){
					_this.curPage = parseInt(_this.curPage) + 1
					_this.listRender(_this.data)
				}
				_this.pagesRender(_this.data)
			})
		}
		this.init = function(){
			this.listRender(this.data)
			this.pagesRender(this.data)
			this.listBind()
		}
	}
})