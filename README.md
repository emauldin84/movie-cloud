# front-end-movie-project: Tony, Eric W., Eric M.

## MovieCloud

### Table of contents
* Description
* Features
* Technologies
* Challenges
* MVP
* Reach Goals
* Authors


#### Description
MovieCloud is a simple web application that allows a user to input their zipcode and is returned a list of movies showing
in theatres on the next rainy day (within five days).

#### Features
* Zip Code search to fetch local weather from [Open Weather Map](https://openweathermap.org)
* Returns the zip codes weather over the next five days
* The first day of rain is captured and used to fetch a movie showtime api from
[GraceNote Developer](http://developer.tmsapi.com/) using the supplied zip code and returned rain date
* Movie poster artwork and IMDB ratings are fetched from [http://www.omdbapi.com/](OMDB Movie API) using the returned 
data from GraceNote Developer
* Each poster art is displayed and to represent each movie showing in the area. Once a poster is clicked a pop up will
display showing title, plot, MMCA Rating, IMDB Score and theaters and showtimes miniature poster

* Filter return movie results with a dynamic search feature that returns results live as you type

* If no rain within the next five days an alternative message will display suggesting the user explore the "great outdoors"
i.e. NetFlix
* MovieCloud is mobile first and compatible on multiple browsers (Chrome, Safari, Firefox)

#### Screenshots

## Home Page with zip code search field
![alt-text](https://raw.githubusercontent.com/ebwittenberg/front-end-movie-project/master/images/zip%20code.png)

## Results page
![alt-text](https://raw.githubusercontent.com/ebwittenberg/front-end-movie-project/master/images/main%20page.png)

## Pop up with movie details
![alt-text](https://raw.githubusercontent.com/ebwittenberg/front-end-movie-project/master/images/Screen%20Shot%202019-03-19%20at%2012.32.07%20PM.png)

## Movie search functionality
![alt-text](https://raw.githubusercontent.com/ebwittenberg/front-end-movie-project/master/images/search-functionality.png)

## Mobile views
![alt-text](https://raw.githubusercontent.com/ebwittenberg/front-end-movie-project/master/images/iPhone%20view.png)
![alt-text](https://raw.githubusercontent.com/ebwittenberg/front-end-movie-project/master/images/iPad%20view.png)

#### Technologies
- JavaScript
- HTML
- CSS
- Ajax
- Agile
- Git
- [Open Weather Map](https://openweathermap.org)
- [GraceNote Developer](http://developer.tmsapi.com/)
- [OMDB Movie API](http://www.omdbapi.com/)

#### Challenges
- Challenge: How to translate large and broad amounts of data between three separate APIs in a format that each API
understands
    - Solution: Filter the data down into usable chunks that is translatable and can be processed by the other APIs

- Challenge: Displaying the API data in a user friendly, accessible, aesthetically pleasing way
    - Solution: Format each poster art to keep the creators intended display aspect ratio while also providing the user
    with a reactionary experience (allowing the to change the size of their screen/device without degredation)
    
- Challenge: Provide a fluid and responsive search tool to filter through returned movies
    -Solution: Utilize the keyUp event listener in JavaScript to match dynamically entered user input with the database of
    movie titles associated with each displayed poster
    
- Challenge: Display API data quickly and efficiently without constantly query the API and burning through keys
    Soluntion: Fully utilize local storage within browser to show movie details without having to query the API repeatedly
    
#### MVP
A zip code search that returns the city name and the next rainy day. Use this data to show the movies and showtimes
for that city and date

#### Reach Goals
- Movie search functionality √
- Pop up, collapsable movie details √
- Theater Name is clickable that opens google map location for that theater √
- User friendly date/day display √
- Page load spinner (in progress)

#### Authors
- [Anthony DiRusso](https://github.com/A-DiRusso)
- [Eric Wittenberg](https://github.com/ebwittenberg)
- [Eric Mauldin](https://github.com/emauldin84)
