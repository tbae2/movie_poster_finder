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


    //reference variable to hold baseUrl for images
    var apiBaseUrl = '';
    //grab the baseUrl for the image and set reference variable
    $.getJSON("https://api.themoviedb.org/3/configuration?" + api_key, function(data) {

        apiBaseUrl = data.images.base_url;
    });
    //get result of the query and pass to function that creates the results to show including amount of results to display
    $.getJSON(apiUrl + "search/movie?query=" + searchKey + "&" + api_key, function(data) {

        var holdID = [];
        var holdResults = [];
        for (var y = 0; y < resultAmount; y++) {
            console.log(data.results[y].id);
            holdID.push(data.results[y].id);
        }
        console.log(holdID);
        //loop through the IDs pulling all of the information instead of just the overview
        for (var idCount = 0; idCount < holdID.length; idCount++) {
            //deferred object 

            holdResults.push($.getJSON(apiUrl + "movie/" + holdID[idCount] + "?" + api_key, function(data2) {
                        return data2.responseJSON;

            }));

        }
        //only apply when all of the getjson looping is completed buy the previous for loop
        $.when.apply($, holdResults).done(function() {
            console.log(holdResults);
        })
        
    });

});





//register enter key  usage to fire the search function
$("#searchkey").keypress(function(e) {
    if (e.which == 13) {
        $("#searchapi").click();
    }
})


var createResults = function(inputData, resultAmount, apiBase) {
    //console.log(inputData);
    //loop through results for specified amount of times 1 or 5 
    //for(var i = 0; i < resultAmount; i++){
    // console.log(apiBase);
    //create movie block for holding individual movie info
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
