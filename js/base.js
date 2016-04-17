
//grab button element to use to fire ajax request for search
var searchApi = document.getElementById('searchapi');







$("#searchapi").click(function(){

var searchKey = document.getElementById('searchkey').value;
		var api_key = "&api_key=d10ad2667b9ec8a098e6634b92ec9d2a";
		var apiUrl = "https://api.themoviedb.org/3/search/movie?";
		console.log(searchkey);
		
		$.getJSON(apiUrl + "query=" + searchKey + api_key,function(data){
				console.log(data.results[0]);
			
		});


});
