// takes zip code from zip code input field and shows user their city and next rainy day

// function is passed zip code from the user, fetches weather data object
function getWeatherData(zipcode) {
    // Below is for when we are actually calling the OpenWeatherMap API to get real-time forecast
    const weatherApiKey = 'b3ae9b9b7528d4c58ecc15e0c9a37d68';

    // first global variable
    zip = zipcode;

    const weatherForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&appid=${weatherApiKey}`;
    
    // fetch the data from the weather forecast URL, returns a promise
    fetch(weatherForecastUrl)
        // take that promise and convert to JSON
        .then(function(response) {
            return response.json()
        })
        // take the second promise and call function that appends the city info, and function that will find rainy days
        .then(function(weatherObject) {
            allRainyDays(weatherObject);
            
        })
        .catch(function () {
            location.reload();
        });
}

// this function takes the weather object from the fetch chain, and starts displaying info to the user
function createCityInfo(weatherObject) {
    // creates pointer to weather div
    weatherDiv = document.querySelector('[data-weather]');
    
    // creates a h2 element for city info
    let cityH2 = document.createElement('h2');
    
    // assigns text content
    cityH2.textContent = `Rain is expected in ${weatherObject.city.name} this `;
   
    // puts the city h2 info into the weatherDiv
    weatherDiv.append(cityH2);

}

// this will find the first instance of rain in the 5 day forecast
function allRainyDays(weatherObject) {
    // array of data for each 3 hour period for 5 days
    let daysArray = weatherObject.list
    // initialize empty array of rainy days
    let rainyDays = [];

    // loop through daysArray
    daysArray.forEach(function(day) {
        // if we find a instance where it is raining
        if (day.weather[0].main === 'Rain') {
            // add the rainy instance to the array
            rainyDays.push(day.dt_txt);
            
        }
        
        
    })
    //this if statement filters rediects code for 'no rain' events
    //if rainyDays array has value then city will have rain so call next functions
    if (rainyDays.length !== 0) {
        createCityInfo(weatherObject);
        firstRainyDay(rainyDays);
    } else {
        //grab target to print 'no rain statement/link' creates pointer to weather div
        mainDiv = document.querySelector('[data-main]');
        let noRainDiv = document.createElement('div');
        let movieSearchDiv = document.querySelector('[data-movie-search-div]');        
        noRainDiv.setAttribute('data-no-rain', '')
        noRainDiv.classList.add('no-rain-container')
        mainDiv.append(noRainDiv)
        noRainContainer = document.querySelector('[data-no-rain]')

        // creates a h2 element for city info and a clickable a element for netflix link
        let cityH2 = document.createElement('h2');
        cityH2.classList.add('no-rain');
        let netflixA = document.createElement('a');

        // sets the attributes of the text 'great outdoors' to have a href link that opens in a new tab
        netflixA.setAttribute('href', 'https://netflix.com');
        netflixA.setAttribute('target', '_blank');
        netflixA.classList.add('netflix-link');
        netflixA.textContent = 'Great Outdoors';
        
        // assigns text content
        cityH2.textContent = `Awesome!\nNo rain forecast for ${weatherObject.city.name}!\nWhy not enjoy the`;
        movieSearchDiv.classList.add('hidden');

    
        // puts the city h2 info into the weatherDiv
        noRainDiv.append(cityH2);
        noRainDiv.append(netflixA);
        
    }
    

}

// this function will be passed the array of rainy days as an argument, it will take the first element in the array, and print it to the page

function firstRainyDay(rainyDaysArray) {
    // save first rainy instance in array
    // 2019-03-15 00:00:00
    let firstRainDay = rainyDaysArray[0];
    console.log(firstRainDay)
    let fullDate = firstRainDay.split(' ');
    let justDate = fullDate[0];
    console.log(justDate)

    const daysOfTheWeekArray =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',]
    let dt = new Date(justDate);
    let dayOfWeekIndex = dt.getDay()
    console.log(dayOfWeekIndex)
    let dayOfWeek = daysOfTheWeekArray[dayOfWeekIndex + 1]
    let rainyH2 = document.createElement('h2');
    rainyH2.textContent = dayOfWeek;

    let moviePresentationH2 = document.createElement('h2');
    moviePresentationH2.textContent = 'See below for a list of movies playing in your area';

    weatherDiv.append(rainyH2);
    weatherDiv.append(moviePresentationH2);
    fetchShowtimeData(firstRainDay);
    
}
