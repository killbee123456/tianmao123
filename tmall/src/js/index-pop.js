$(document).ready(
	function(){
		/* $.ajax({
			type:'get',
			url:'https://dc.3.cn/category/get?&callback=getCategoryCallback',
			dataType:'jsonp',
			contentType: "application/json; charset=utf-8",
			jsonp:'callback',
			jsonpCallback:'getCategoryCallback',
			success:function(json){
				popRender(json.data)
			},
			error:function(err){
				console.log(err)
			}
		}) */
		$.ajax({
			type:'get',
			url:'../mock/pop.json',
			dataType:'jsonp',
			contentType: "application/json; charset=utf-8",
			jsonp:'callback',
			jsonpCallback:'getCategoryCallback',
			success:function(json){
				popRender(json.data)
			},
			error:function(err){
				console.log(err)
			}
		})
		function popRender(data){
			$(data).each(function(index,item){
				$('.menu-pop').append(`
				<div class="pop-item clearfix">
					<div class="item-col1">
						<div class="item-t clearfix">
						</div>
						<div class="item-s clearfix">
						</div>
					</div>
					<div class="item-col2">
						<div class="item-b"></div>
						<div class="item-p"></div>
					</div>
				</div>`);
				$('.pop-item').ready(function(){
					item.t.forEach(function(item){
						let buf = item.split('|');
						$('.pop-item')
						.eq(index)
						.children('.item-col1')
						.children('.item-t')
						.append(`
							<a href="${buf[0]}">${buf[1]}</a>
						`);
					})
					item.s[0].s.forEach(function(item,_index){
						let buf = item.n.split('|');
						$('.pop-item')
						.eq(index)
						.children('.item-col1')
						.children('.item-s')
						.append(`
							<div class="item-s-row">
								<div class="item-s-title"><a href="${buf[0]}">${buf[1]}</a></div>
								<div class="item-s-content"></div>
							</div>
						`)
						item.s.forEach(function(item){
							let buf = item.n.split('|');
							$('.pop-item')
							.eq(index)
							.children('.item-col1')
							.children('.item-s')
							.children('.item-s-row')
							.eq(_index)
							.children('.item-s-content')
							.append(`
								<a href="${buf[0]}">${buf[1]}</a>
							`)
						})
					})
				})
			})
		}
		$('.goods-menu').children().each(function(index,item){
			$(item).on({
				'mouseenter':function(){
					$('.menu-pop').show().children().eq(index).show().siblings().hide()
				}
			})
		})
		$('.menu.guide').on('mouseleave',function(){
			$('.menu-pop').hide().children().hide()
		})
	}
)