
//grab button element to use to fire ajax request for search
var searchApi = document.getElementById("searchapi");
var searchKey = document.getElementById("searchkey");



//build ajax here
var returnResults = function (){
		var api_key = "&api_key=";
		var apiUrl = "https://api.themoviedb.org/3/search/movie";

		return $.getJSON(apiurl + "query%3F" + searchKey + api_key, data, success);

};



		