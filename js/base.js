//grab button element to use to fire ajax request for search
var searchApi = document.getElementById('searchapi');




var emptyResults = function(){
	$('.result-title').empty();
	$('.result-poster').empty();
	$('.result-overview').empty();


};


$("#searchapi").click(function() {
	 emptyResults();
    var searchKey = document.getElementById('searchkey').value;
    var api_key = "api_key=d10ad2667b9ec8a098e6634b92ec9d2a";
    var apiUrl = "https://api.themoviedb.org/3/search/movie?";
    //reference variable to hold baseUrl for images
    var apiBaseUrl = '';
    //grab the baseUrl for the image and set reference variable
    $.getJSON("https://api.themoviedb.org/3/configuration?" + api_key, function(data) {

        apiBaseUrl = data.images.base_url;
    });

    console.log(apiBaseUrl);


    $.getJSON(apiUrl + "query=" + searchKey + "&" + api_key, function(data) {
        console.log(data.results[0]);
        var info = data.results[0];

        $('.result-title').append(info.original_title);
        $('.result-poster').append('<img src=' + apiBaseUrl+ "w500" + info.poster_path + '>');
        $('.result-overview').append(info.overview);




    });


});
