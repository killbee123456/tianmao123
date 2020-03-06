//去所有商品分类选项卡数据
let lis = $('.gl-item');
let arr=[];
lis.each(function(){
	let obj = {};
	let scroll = [];
	let icons = [];
	obj.sku = $(this).children().attr('data-sku');
	obj.vender = $(this).children().attr('venderid');
	obj.img = $(this).find('.p-img').find('img').attr('src');
	$(this).find('.p-scroll').find('li').each(function(){
		let buf = []
		buf.push($(this).find('a').attr('title'))
		buf.push($(this).find('img').attr('src'))
		scroll.push(buf)
	});
	obj.scroll = scroll;
	obj.price = $(this).find('.p-price strong:first-child').children('i').text();
	obj.name = $(this).find('.p-name').find('em').text();
	obj.commit = $(this).find('.p-commit').find('a').text();
	obj.shop = $(this).find('.p-shop').find('a').text();
	$(this).find('.p-icons').find('i').each(function(){
		icons.push($(this).text())
	});
	obj.icons = icons;
	arr.push(obj)
})
//console.log(arr)
console.log(JSON.stringify(arr));