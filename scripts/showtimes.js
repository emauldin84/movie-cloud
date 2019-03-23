// fetches showtimes data given the date it is raining
function fetchShowtimeData(date) {
    let dateArray = date.split(' ');
    const dateOnly = dateArray[0];
    
    let key1 = 'xguxvke7xybd3fsscb7h446v';
    let key2 = '36zekhh8ta2kuj2cujbj55rd';
    let key3 = '4g7bvs4v2vy929mbgrqynbkv';

    let showtimeURL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${dateOnly}&zip=${zip}&api_key=${key2}`;
    // showtime URL is going to give us all the movies that are playing in the zip code radius
    // returns a promise

    const showtimeJson = '../json/atlMovies.json'

    fetch(showtimeURL)
        .then(function(response) {
            return response.json()
        })
        // if no movies playing within 5 miles of zipcode, reload page.
        .catch(function () {
            location.reload();
        })
        .then(function(showtimeData) {
            // this is an array!

            // puts all the showtimeData info in local storage for later use
            storeShowTimeData(showtimeData)
            // create array of movie titles in user's area
            let movieTitles = [];
            // loop through each movie in user's area, push title to the movie titles array
            showtimeData.forEach(function(movie) {
                movieTitles.push(movie.title)
            })

            // loop through each movie title to get the OMDB data for each movie
            movieTitles.forEach(function(title) {
                fetchOmdbData(title);
            })
        })
}

// stores showtime data in local storage
function storeShowTimeData(showtimeDatas) {
    const jsonStringShowTimeData = JSON.stringify(showtimeDatas)
    console.log(`Saving ${Object.keys(showtimeDatas).length} movies to local storage`)

    localStorage.setItem('ST-movie-data', jsonStringShowTimeData)


}

// fetches OMDB data for each movie
function fetchOmdbData(movieTitle) {
    const omdbUrl = `http://www.omdbapi.com/?apikey=48ba5f31&t=${movieTitle}`
    let title = movieTitle;
    fetch(omdbUrl)
    .then (function(response) {
        return response.json();
    })
    .then (function(omdbMovieData) {
        let omdbFilmData = omdbMovieData;
        // store ombd data for that movie in localStorage
        const jsonStringOmbdData = JSON.stringify(omdbMovieData);
        localStorage.setItem(title, jsonStringOmbdData);


        let imageUrl = omdbMovieData.Poster
        drawMoviePoster(title, imageUrl, omdbMovieData)
    })
}

// draws posters to the screen
function drawMoviePoster(STmovieTitle, imageUrl, omdbMovieData) {

    let movieSearchDiv = document.querySelector('[data-movie-search-div]');
    movieSearchDiv.classList.remove('hidden');

    let posterContainer = document.querySelector('[data-postercontainer]');
    let posterFrame = document.createElement('div');
    // gives each poster frame a class so we can style it
    posterFrame.classList.add('poster-frame');
    // replace spaces in movie title with dashes
    let underscoreMovieTitle = STmovieTitle.replace(/ /g, "_");
    
    // if there is no poster on OMDB database or if the OMDB database can't find the movie at all
    if (imageUrl === 'N/A' || STmovieTitle !== omdbMovieData.Title) {
        // replace poster art with movie title text
        let backupPosterText = document.createElement('h2');
        backupPosterText.textContent = STmovieTitle;
        posterFrame.classList.add(underscoreMovieTitle);
        posterFrame.append(backupPosterText);
        posterContainer.append(posterFrame);

        backupPosterText.classList.add(underscoreMovieTitle);

        posterFrame.addEventListener('click', function(event) {
            getMovieClassName(event);
        })

    } else {
        // put the actual poster art in the poster container
        // make an image with the poster URL
        let img = document.createElement('img');
        
        img.setAttribute('src', imageUrl);
        
        img.classList.add(underscoreMovieTitle);
        
        // add event listener to each poster frame that calls a function
        img.addEventListener('click', function(event) {
            getMovieClassName(event);
        })
        posterContainer.classList.remove('hidden');
        posterContainer.append(posterFrame);
        posterFrame.append(img);
    }

}

// associate poster with movie name
function getMovieClassName(event) {

    let popUpDiv = document.querySelector('[data-info-pop]');
    let underscoreMovieTitle;
    // if user clicks on movie that has no poster
    if (event.target.classList[1]) {
        // pull movie title from second class
        underscoreMovieTitle = event.target.classList[1]
    } else if (event.target.localName === 'h2') {
        
        underscoreMovieTitle = event.target.classList[0];
    } else {
        // pull movie title from class on image
        underscoreMovieTitle = event.target.classList[0];
        // add mini poster image
        // save image URL
        const posterURL = event.target.src;
        let miniPosterImage = document.createElement('img');
        let miniContainer = document.createElement('div');
        miniContainer.classList.add('mini-poster-container');
        miniPosterImage.setAttribute('src', posterURL);
        miniContainer.append(miniPosterImage);
        popUpDiv.append(miniContainer);
    }
    console.log(underscoreMovieTitle);
    // convert dashes movie title back to spaces
    let STmovieTitle = underscoreMovieTitle.replace(/_/g, " ");
    
    let storedSTMovieData = localStorage.getItem('ST-movie-data');
    let parsedSTMovieData = JSON.parse(storedSTMovieData);
    parsedSTMovieData.forEach(function (STMovieObject) {
        // if the title stored in local storage matches the user entered title
        if (STMovieObject.title === STmovieTitle) {
            let popUpDiv = document.querySelector('[data-info-pop]');
            let titleh2 = document.createElement('h2');
            titleh2.textContent = STMovieObject.title;
            popUpDiv.append(titleh2);
            

            // this array has duplicate theaters in it that are all sorted together
            let movieTheaterArray = [];
            STMovieObject.showtimes.forEach(function (theatre) {
                movieTheaterArray.push(theatre.theatre.name);


            })

            // unique theaters is an array with just the unique theater names
            let uniqueTheaters = buildUniqueTheaterArray(movieTheaterArray);
            appendMovieDetails(STMovieObject);
            appendTheaterDetails(STMovieObject, uniqueTheaters);
        }
    })
}
// Filters sorted array of theaters and returns array of unique theater names
function buildUniqueTheaterArray(showtimes) {
    let uniqueTheaterArray = [];
    let prevTheater;

    showtimes.forEach(function (showtime) {
        if (showtime !== prevTheater) {
            uniqueTheaterArray.push(showtime);
        }
        prevTheater = showtime;
    })
    return uniqueTheaterArray;

}

// shows theater name in larger text, with showtimes at that theater following it
function appendTheaterDetails(STMovieObject, uniqueTheatersArray) {

    
    uniqueTheatersArray.forEach(function(theaterName) {
        let movieDetailsDiv = document.querySelector('[data-info-pop]')
        let mainDiv = document.querySelector('[data-main]');
        let body = document.querySelector('body');
        let nav = document.querySelector('.nav-bar');
        let h2 = document.querySelectorAll('h2');
        let logo = document.querySelector('.site-logo')

        let posterContainer = document.querySelector('[data-postercontainer]');

        // unhide movie details div

        movieDetailsDiv.classList.remove('hidden');
        mainDiv.classList.add('blurry');
        logo.classList.add('blurry');
        body.classList.add('only-info-popup')

        body.addEventListener('click', function(event) {
            if (event.target === body || event.target === posterContainer || event.target === nav || event.target === logo || event.target === h2) {
                movieDetailsDiv.classList.add('hidden');
                mainDiv.classList.remove('blurry');
                logo.classList.remove('blurry');
                body.classList.remove('only-info-popup');
                movieDetailsDiv.textContent = '';
            }
        })

        let theaterNameH2 = document.createElement('h2');
        const link = document.createElement('a');

        let mapsURL = `https://maps.google.com/?q=${theaterName}`;


        // set href attribute of link to the google maps url of the theater's location
        link.setAttribute('href', mapsURL);
        link.setAttribute('target', '_blank');
        // set text content of h2 to the unique theater name
        link.textContent = theaterName;

        // add link to H2 element
        theaterNameH2.append(link);
        movieDetailsDiv.append(theaterNameH2);

        // loop through the showtimes for that movie
        STMovieObject.showtimes.forEach(function(showtime) {
            // only want to append the showtimes that correspond to the matching theater names
            if (showtime.theatre.name === theaterName) {
                // create paragraph element for the showtime
                let showtimePara = document.createElement('p');
                showtimePara.classList.add('showtime');

                // converts show times to AM/PM
                let timeNoDate = (showtime.dateTime).split('T');
                // console.log (timeNoDate[1])
                let armyTime = timeNoDate[1];
                let armyTimeString = armyTime.toString();
                // console.log(armyTimeString)
                let splitTimeArray = armyTimeString.split(':');
                let hours = Number(splitTimeArray[0]);
                let minutes = Number(splitTimeArray[1]);
                let convertedTime;

                if (hours > 0 && hours <= 12) {
                    convertedTime= "" + hours;
                } else if (hours > 12) {
                    convertedTime= "" + (hours - 12);
                } else if (hours == 0) {
                    convertedTime= "12";
                }
                
                convertedTime += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
                convertedTime += (hours >= 12) ? "pm" : "am";  // get AM/PM

                // puts actual show time as text content
                showtimePara.textContent = convertedTime
                // append para to popup div
                movieDetailsDiv.append(showtimePara);
            }
        })
    
    })
}

// uses OMDB database API to draw certain movie details to the pop-up div
function appendMovieDetails(STMovieObject) {
    // gets movie info for clicked on movie from local storage
    let storedOmbdMovieInfo = localStorage.getItem(STMovieObject.title);
    let parsedOmdbMovieInfo = JSON.parse(storedOmbdMovieInfo);

    
    let movieDetailsDiv = document.querySelector('[data-info-pop]');
    
    // draws summary into pop up div
    let movieSummaryH2 = document.createElement('h2');
    movieSummaryH2.textContent = parsedOmdbMovieInfo.Plot;

    movieDetailsDiv.append(movieSummaryH2);

    // draws movie MCAA rating into pop up div
    let MCAARatingH2 = document.createElement('h2')
    MCAARatingH2.textContent = parsedOmdbMovieInfo.Rated

    movieDetailsDiv.append(MCAARatingH2);


    // draws IMDB review into pop up div
    let ratingsH2 = document.createElement('h2');
    ratingsH2.textContent = `IMDB Rating: ${parsedOmdbMovieInfo.imdbRating} / 10`;

    if (parsedOmdbMovieInfo.imdbRating === "N/A") {
        ratingsH2.textContent = "";
    }
    movieDetailsDiv.append(ratingsH2);

}

// movie search functionality
function searchMovies() {

    let movieSearchDiv = document.querySelector('[data-movie-search-div]');

    // grabs user entered text in the search bar
    let searchedMovie = document.querySelector('[data-movie-search]').value.toLowerCase();
    let underscoreSearchedMovie = searchedMovie.replace(/ /g, "_");
    let posters = document.querySelectorAll('.poster-frame');
    let matchedPosters = [];
    let matchedPoster;
    let noMatchH2 = document.querySelector('[data-no-match-h2]');

    // loop through all posters on the page
    posters.forEach(function(poster) {
        noMatchH2.textContent = '';
        // grab movie name associated with that poster
        let posterMovieName = poster.childNodes[0].className.toLowerCase();
        // if any part of that name matches the user entered search
        if (posterMovieName.includes(underscoreSearchedMovie)) {
            poster.style.display = 'flex';
            matchedPoster = poster;
            // give poster a new class for resizing
            matchedPoster.classList.add('matched-poster');
            matchedPosters.push(matchedPoster);
        } else if (underscoreSearchedMovie !== posterMovieName) {
            // if the poster name doesn't match the search, hide the poster
            poster.style.display = 'none';
        }
    })
    // if there are no matched posters (no movies match search)
    if (!matchedPoster) {
        noMatchH2.textContent = 'This movie is not playing in your area. Try another?'
    }

    // if user backspaces enough where all posters are showing again, remove any special styling to go back to default view
    if (matchedPosters.length === posters.length) {
        console.log('all are showing');
        posters.forEach(function(poster) {
            poster.classList.remove('matched-poster');
        })
    }

}

// if movie cloud logo is clicked, go back to search bar
function resetSearch() {
    const searchAgain = document.querySelector('[data-search-again]');
    searchAgain.addEventListener('click', function() {
        // reloads page
        location.reload();
    });
}

