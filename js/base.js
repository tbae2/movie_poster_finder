// var emptyResults = function() {
//     $('.results').empty();
// };

//pure JS removal of elements under parent Node of results DIV
var emptyResults = function() {
    var resultsDiv = document.getElementById('results');
    while(resultsDiv.firstChild){
        resultsDiv.removeChild(resultsDiv.firstChild);
    }


};
//starting the refactor for pure JS work 



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
        //this evaluates the length of the results array return, if 0 then no results. sends index count of 0 to creat results which then informs the user
        if (data.results.length === 0) {
            createResults(false);
            return;
        }
        $.each(data.results, function(i, movie) {
            //call the API again to get more complete information utilizing the ID field from the "movie" item of the data returned
            $.getJSON(apiUrl + "movie/" + movie.id + "?" + api_key, function(data2) {
                    //send the resulting data to the create results function
                    createResults(i, data2, apiBaseUrl);

                })
                //stop the running if the desired result is matched by the iterations.
            if (resultAmount - 1 === i) {
                return false;
            }

        })
    })

});

//function to create results from input provided via search api Jquery function. 
//function accepts the index count, inputData each call (provided by each jquery function) and apiBaseURL 
var createResults = function(indexCount, inputData, apiBaseUrl) {
    //var to make easier calls back to source data
    var mv = inputData;
    //vars to hold json properties that are arrays for easier addition to output
    var prodCompanies = '';
    var genreTypes = '';
    var pageResults = document.getElementById('results');
    //code to report that nothing is found for the desired search and stops the createResult function from executing further
    if (indexCount === false) {
        // $('#results').append($('<div></div>', {
        //     'class': 'movie-not-found',
        //     'html': "<h1>Nothing found for that search please try again :(</h1>"
        // }));
        console.log(pageResults);
        pageResults.innerHTML = "<h1>Nothing found for that search please try again :(</h1>"
        return;
    }

    //loop to produce list of production companies for the film
    for (var x = 0; x < mv.production_companies.length; x++) {
        prodCompanies += '<li>' + mv.production_companies[x].name + '</li>';
        if(x === 3){
            break;
        }
    }
    //loop to produce the list of genres that apply to the movie
    for (var x = 0; x < mv.genres.length; x++) {
        genreTypes += '<li>' + mv.genres[x].name + '</li>';
    }

    // $('#results').append($('<div></div>', {
    //     'class': 'movie-result ' + indexCount
    // }));

    //first create the elements , first one goes as parent div under the result div
    var resultNode = document.createElement('div');
    var movieTitle = document.createElement('div');
    var resultPoster = document.createElement('div');
    var resultOverview = document.createElement('div');
    var resultHover = document.createElement('div');
    //give the elements classes
    resultNode.className = 'movie-result ' + indexCount;
    movieTitle.className = 'result-title';
    resultPoster.className = 'result-poster';
    resultOverview.className = 'result-overview';
    resultHover.className = 'result-hover';

    pageResults.appendChild(resultNode);
    resultNode.appendChild(movieTitle);
      resultNode.appendChild(resultHover);
    resultNode.appendChild(resultPoster);

    resultNode.appendChild(resultOverview);
    





    //create movie title

    // $('.movie-result.' + indexCount).append($('<div></div>', {
    //     'class': 'result-title',
    //     'html': mv.title
    // }));

    movieTitle.textContent = mv.title;
    resultPoster.innerHTML = mv.poster_path === null ? '<img src="./img/no_poster.png">' : '<img src=' + apiBaseUrl + "w300" + mv.poster_path + '>';
    resultOverview.innerHTML = mv.overview;
    resultHover.innerHTML = "Release Date: " + mv.release_date + '<br><span class="sectionTitle">Average Vote: </span>' +
            mv.vote_average + '<br><span class="sectionTitle">Production Companies: </span>' + '<ul>' + prodCompanies + '</ul>' + '<br><span class="sectionTitle">Genres: </span>' + '<ul>' + genreTypes + '</ul>';


    //create movie poster element
    // $('.movie-result.' + indexCount).append($('<div></div>', {
    //         'class': 'result-poster',
    //         'html': mv.poster_path === null ? '<img src="./img/no_poster.png">' : '<img src=' + apiBaseUrl + "w300" + mv.poster_path + '>'
    //     }))
    //resultNode.innerHTML = '<div class="result-poster">' + mv.poster_path === null ? '<img src="./img/no_poster.png">' : '<img src=' + apiBaseUrl + "w300" + mv.poster_path + '>' + '</div>';
    //     //create movie summary element
    // $('.movie-result.' + indexCount).append($('<div></div>', {
    //     'class': 'result-overview',
    //     'html': '<p>' + mv.overview
    // }));
    // //create hover div that shows more information when poster is moused over
    // $('.movie-result.' + indexCount + ' .result-poster').append($('<div></div>', {
    //     'class': 'result-hover',
    //     'html': "Release Date: " + mv.release_date + '<br><span class="sectionTitle">Average Vote: </span>' +
    //         mv.vote_average + '<br><span class="sectionTitle">Production Companies: </span>' + '<ul>' + prodCompanies + '</ul>' + '<br><span class="sectionTitle">Genres: </span>' + '<ul>' + genreTypes + '</ul>'

    // }));
    //}

}


//register enter key  usage to fire the search function
var enterKey = function(e) {
    
        if (e.keyCode == 13) {
            $('#searchapi').click();
        }
    
}


//jquery to display hover div over posters.
//need selector in the "on" portion in order to target dynamically created content
$('#results').on('mouseenter', '.result-poster', function() {
    //target result hover div , while referencing only the parent div the mouse is over
    $('.result-hover', this).fadeIn("slow");
    //mouse leave fade the hover div out to show the poster again.
}).on('mouseleave', '.result-poster', function() {
    $('.result-hover', this).fadeOut('slow')
});


$('#searchkey').click(function() {
    $(this).val('');
})
