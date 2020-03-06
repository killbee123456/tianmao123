$(document).ready(
	function(){
		$.ajax({
			type:'get',
			url:'https://floor.jd.com/recommend-v20/news/get?source=pc-home&pin=&uuid=1582097660830521127046&jda=76161171.1582097660830521127046.1582097660.1583155142.1583159379.10&callback=jsonpNews&_=1583162335473',
			dataType:'jsonp',
			contentType: "application/json; charset=utf-8",
			jsonp:'callback',
			jsonpCallback:'jsonpNews',
			success:function(json){
				newsRender(json.data)
			},
			error:function(err){
				console.log(err)
			}
		})
		function newsRender(data){
			data.forEach(function(item){
				$('.news-list').append(`
					<li><a href="/${item.id}">${item.title}</a></li>
				`)
			})
		}
})