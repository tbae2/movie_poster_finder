
var emptyResults = function(){
	$('.result-title').empty();
	$('.result-poster').empty();
	$('.result-overview').empty();

};


//grab button element to use to fire ajax request for search
$("#searchapi").click(function() {
	 emptyResults();
    var searchKey = document.getElementById('searchkey').value;
    var api_key = config.tmdb_api_key;
    var apiUrl = "https://api.themoviedb.org/3/search/movie?";
    var resultAmount = document.getElementById('result-amount').value;
    console.log(resultAmount);
    //reference variable to hold baseUrl for images
    var apiBaseUrl = '';
    //grab the baseUrl for the image and set reference variable
    $.getJSON("https://api.themoviedb.org/3/configuration?" + api_key, function(data) {

        apiBaseUrl = data.images.base_url;
    });
    //get result of the query and pass to function that creates the results to show including amount of results to display
 $.getJSON(apiUrl + "query=" + searchKey + "&" + api_key, function(data) {

                    createResults(data,resultAmount,apiBaseUrl);
        });

});

var createResults = function(inputData,resultAmount,apiBase){

           console.log(inputData.results);
            var info = inputData.results[0];
 
    //create movie block for holding individual movie info
    $('.results').append($('<div></div>',{
        'class': 'movie-result'
    }));
    //create movie title
    $('.movie-result').append($('<div></div>',{
        'class': 'result-title',
        'html' : inputData.results[0].original_title
    }));
    //create movie poster element
    $('.movie-result').append($('<div></div>',{
        'class' : 'result-poster',
        'html': '<img src=' + apiBase + "w500" + inputData.results[0].poster_path + '>'
    }));
    //create movie summary element
    $('.movie-result').append($('<div></div>',{
        'class' : 'result-overview',
        'html' : inputData.results[0].overview
    }));
/*  
        $('.result-title').append(data.results[i].original_title).hide().fadeIn("slow");
        $('.result-poster').append('<img src=' + apiBaseUrl+ "w500" + data.results[i].poster_path + '>').hide().fadeIn("slow");
        $('.result-overview').append(data.results[i].overview).hide().fadeIn("slow");*/



}