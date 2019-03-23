
// pointer to submit button
function lookForSubmitClick() {
    // Triggers the zip code submit on pressing enter
    let zipField = document.querySelector('input');
    zipField.addEventListener('keypress', function(event){
        if(event.keyCode === 13) {
        getZipCode();
        }
    })
}


function getZipCode() {
    let zipCode = document.querySelector("[data-zipcodeinput]").value;
    getWeatherData(zipCode);

    const zipCodeDiv = document.querySelector('.zip-code-search');
    zipCodeDiv.classList.add('hidden');

    let main = document.querySelector("[data-main]");
    main.classList.remove('hidden');
}






