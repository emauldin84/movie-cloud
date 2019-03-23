function main() {
    // zip code function goes here
    lookForSubmitClick();

    let movieSearchField = document.querySelector('.movie-input');
    movieSearchField.addEventListener('change', function() {
        searchMovies();
    })
    movieSearchField.addEventListener('keyup', function(){
        searchMovies();
    })
    resetSearch();
    
}

main();