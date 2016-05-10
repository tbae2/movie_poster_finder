var emptyResults = function() {
    $('.results').empty();

};


//grab button element to use to fire ajax request for search
$("#searchapi").click(function() {
    emptyResults();
    //grab the search term from the input box
    var searchKey = document.getElementById('searchkey').value;
    //load api key from external config js
    var api_key = config.tmdb_api_key;
    //base api url
    var apiUrl = "https://api.themoviedb.org/3/";
    var resultAmount = document.getElementById('result-amount').value;
    var holdOverView;
    var holdResults = [];

    //reference variable to hold baseUrl for images
    var apiBaseUrl = '';
    //grab the baseUrl for the image and set reference variable
    $.getJSON("https://api.themoviedb.org/3/configuration?" + api_key, function(data) {

        apiBaseUrl = data.images.base_url;
    });
 
    //search for the movie keyword
    $.getJSON(apiUrl + "search/movie?query=" + searchKey + "&" + api_key, function(data) {
        //deferred running until done calling
    }).done(function(data) {
        //iterate each item in the data returned under the "results" 
        $.each(data.results, function(i, movie) {
            //call the API again to get more complete information utilizing the ID field from the "movie" item of the data returned
            $.getJSON(apiUrl + "movie/" + movie.id + "?" + api_key, function(data2) {
                createResults(data2);

            })
            //stop the running if the desired result is matched by the iterations.
            if (resultAmount - 1 === i) {
                return false;
            }

        })
    })

});

//quick function to test proof of concept. 
var testResult = function(data) {
    console.log(data);
}


//register enter key  usage to fire the search function
$("#searchkey").keypress(function(e) {
    if (e.which == 13) {
        $("#searchapi").click();
    }
})

//function to create results from input provided via search api Jquery function. 
var createResults = function(inputData) {



    $('.results').append($('<div></div>', {
        'class': 'movie-result ' + i
    }));
    //create movie title
    $('.movie-result.' + i).append($('<div></div>', {
        'class': 'result-title',
        'html': inputData.results[i].original_title
    }));
    //create movie poster element
    $('.movie-result.' + i).append($('<div></div>', {
        'class': 'result-poster',
        'html': '<img src=' + apiBase + "w300" + inputData.results[i].poster_path + '>'
    }));
    //create movie summary element
    $('.movie-result.' + i).append($('<div></div>', {
        'class': 'result-overview',
        'html': '<p>' + inputData.results[i].overview
    }));
    //create hover div that shows more information when poster is moused over
    $('.movie-result.' + i).append($('<div></div>', {
        'class': 'result-hover',
        'html': "Release Date: " + inputData.results[i].release_date + "<br> Average Vote: " + inputData.results[i].vote_average
    }));
    //}

}
