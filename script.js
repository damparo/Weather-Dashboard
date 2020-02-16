//information will be displayed in #weatherdetails
//search icon id = "search"




// var APIKey = "9f3310b38a0b78b3d966eb1da9d1599e";

// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Austin,Texas&units=imperial&appid=" + APIKey

// $.ajax({
//     url: queryURL,
//     method: "GET"
// })

$("#search").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-input").val();

    var APIKey = "9f3310b38a0b78b3d966eb1da9d1599e";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&units=imperial&appid=" + APIKey;

    $.ajax({
    url: queryURL,
    method: "GET"
    })

    .then(function(_response){
        console.log(queryURL);
        console.log(_response);
    })







});