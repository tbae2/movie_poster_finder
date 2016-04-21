
var emptyResults = function(){
	$('.results').empty();

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

    //loop through results for specified amount of times 1 or 5 
    for(var i = 0; i < resultAmount; i++){
        console.log(apiBase);
    //create movie block for holding individual movie info
    $('.results').append($('<div></div>',{
        'class': 'movie-result ' + i
    }));
    //create movie title
    $('.movie-result.' + i).append($('<div></div>',{
        'class': 'result-title',
        'html' : inputData.results[i].original_title
    }));
    //create movie poster element
    $('.movie-result.' + i).append($('<div></div>',{
        'class' : 'result-poster',
        'html': '<img src=' + apiBase + "w500" + inputData.results[i].poster_path + '>'
    }));
    //create movie summary element
    $('.movie-result.' + i).append($('<div></div>',{
        'class' : 'result-overview',
        'html' : inputData.results[i].overview
    }));
    //create hover div that shows more information when poster is moused over
        $('.movie-result.' + i).append($('<div></div>',{
            'class' : 'result-hover',
            'html': "Release Date: " + inputData.results[i].release_date + "<br> Average Vote: " + inputData.results[i].vote_average
        }));
    }

}