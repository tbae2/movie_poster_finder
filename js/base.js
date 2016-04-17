
//grab button element to use to fire ajax request for search
var searchApi = document.getElementById('searchapi');







$("#searchapi").click(function(){

var searchKey = document.getElementById('searchkey').value;
		var api_key = "&api_key=";
		var apiUrl = "https://api.themoviedb.org/3/search/movie?";
		console.log(searchkey);
		
		$.getJSON(apiUrl + "query=" + searchKey + api_key,function(data){
				console.table(data.results[0]);
				var info = data.results[0];
				
				$('.result-title').append(info.original_title,info.poster_path,info.overview);
				$('result-poster').append('<img src='+ info.poster_path +'>');
				$('result-overview').append(info.overview);
		


			
		});


});
