// array in global scope to hold and access cities and temperature

let cityHolder = [];
let tempHolder = [];

// displays current temp
displayInfo = (cityName, currentTemp, currentHumid, currentWind, wIcon) => {
  $("#current-forecast")
    .empty()
    .append(
      $("<h3>").text(cityName).append($("<img>").attr("src", wIcon)),
      $("<div>")
        .text(currentTemp + "°F")
        .css({
          "font-size": "50px",
        })
    );
  $("#humidity")
    .text(currentHumid + "%")
    .css("font-size", "15px");
  $("#wind")
    .text(currentWind + " mph")
    .css("font-size", "15px");
  $(".weatherdetails1").text("Humidity");
  $(".weatherdetails2").text("Wind");
}

// creates five day forecast
fiveCards = (cityName) => {
  const apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";
  const forecastQueryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;

  $.ajax({
    url: forecastQueryURL,
    method: "GET",
  }).then(function (responseForecast) {
    console.log(responseForecast);
    $("#card-deck").empty();
    let fiveDayForeCast = [];
    fiveDayForeCast.push(
      responseForecast.list[2],
      responseForecast.list[10],
      responseForecast.list[18],
      responseForecast.list[26],
      responseForecast.list[34]
    );
    console.log(fiveDayForeCast);

    for (let i = 0; i < fiveDayForeCast.length; i++) {
      const tempFore = Math.round(fiveDayForeCast[i].main.temp);
     
      const howOutside = fiveDayForeCast[i].weather[0].icon;
      const theDate = fiveDayForeCast[i].dt_txt;
      const plainDate = moment(theDate).format("ddd");

      console.log(plainDate);

      const imgHowOutside =
        "https://openweathermap.org/img/w/" + howOutside + ".png";

      $("#card-deck").append(
        $("<div>")
          .addClass("card")
          .append(
            $("<div>")
              .addClass("card-body")
              .append(
                $("<p>")
                  .addClass("card-text")
                  .append(
                    $("<img>")
                      .attr("src", imgHowOutside)
                      .css("font-size", "12px"),
                    $("<p>")
                      .text(tempFore + "°F")
                      .css("font-size", "14px"),
                    $("<p>").text(plainDate).css("font-size", "12px")
                  )
              )
          )
      );
    }
  });
}

// function creates city list
retrieveCity = () => {
  $("#city-field").empty();
  let getCity = JSON.parse(localStorage.getItem("city")) || [];
  for (let i = 0; i < getCity.length; i++) {
    $("#city-field").append(
      $("<li>").append(
        $("<button>")
          .css({
            width: "341px",
            "text-align": "center",
            "background-color": "white",
            "margin-bottom": "5px",
            color: "darkmagenta",
            "font-size": "25px",
            // border: "darkmagenta",
            // "border-style": "solid",
            // "border-width": "0.5px"
            border: "none"
          })
          .text(getCity[i])
          .addClass("grab-city")
          .attr("data-location", getCity[i])
      )
    );
  }

  // This feature would all the temperature to the city list
  // let getTemp = JSON.parse(localStorage.getItem("temp")) || [];
  // for (let i = 0; i < getTemp.length; i++) {

  //     $(".grab-city").append($("<p>").text(getTemp[i]))

  // }

}
// search bar 
$("#search-btn").on("click", function (event) {
  event.preventDefault();

  // this line will display day forecast
  $("#current-forecast").show();

  // set up API call
  let city = $("#search-city").val();
  const apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  //call openweather api and retrieve day forecast data
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    const currentTemp = Math.round(response.main.temp);
    const currentHumid = response.main.humidity;
    const currentWind = Math.round(response.wind.speed);
    const image = response.weather[0].icon;
    const cityName = response.name;
    const wIcon = "https://openweathermap.org/img/w/" + image + ".png";
    

    // run the displayInfo function where the weather api data will be arranged on the page
    displayInfo(cityName, currentTemp, currentHumid, currentWind, wIcon);

    // run fiveCards which arranges and displays the five day forecast
    fiveCards(cityName);
    
    // push city name and temp to global arrays
    cityHolder.push(cityName);
    tempHolder.push(currentTemp);

    // save the city and temp arrays to localstorage for access later
    localStorage.setItem("city", JSON.stringify(cityHolder));
    localStorage.setItem("temp", JSON.stringify(tempHolder));

    // this function creates city list of all cities that have been searched for
    retrieveCity();

  });

  $(".weatherdetails1").show();
  $(".weatherdetails2").show();
});



// allows user to click on a city from the list and retrieve forecast data again, sends another API call

$("#city-field").on("click", ".grab-city", function (event) {
  event.preventDefault();
  let cityName = $(this).attr("data-location");
  console.log(cityName);

  event.preventDefault();
  const apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
  
      let currentTemp = Math.round(response.main.temp);
      let currentHumid = response.main.humidity;
      let currentWind = Math.round(response.wind.speed);
      let image = response.weather[0].icon;
      let cityName = response.name;
      let wIcon = "https://openweathermap.org/img/w/" + image + ".png";

      // call the function again to arrange and display data
      displayInfo(cityName, currentTemp, currentHumid, currentWind, wIcon);
      fiveCards(cityName, currentTemp, currentHumid, currentWind, wIcon);
      
  });
});
