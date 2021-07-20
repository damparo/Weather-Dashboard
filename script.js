// array in global scope to hold and access cities

var cityHolder = [];

// search bar value - city look up
$("#search-btn").on("click", function (event) {
  event.preventDefault();
  // this line will display day forecast
  $("#current-forecast").show();
  var city = $("#search-city").val();
  var apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";
  var queryURL =
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

    var currentTemp = Math.round(response.main.temp);
    var currentHumid = response.main.humidity;
    var currentWind = Math.round(response.wind.speed);
    var image = response.weather[0].icon;
    var cityName = response.name;
    var wIcon = "https://openweathermap.org/img/w/" + image + ".png";

    function displayInfo() {
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

    // function to call openweather api and retrieve five day forecast data
    function fiveCards() {
      var forecastQueryURL =
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
        var fiveDayForeCast = [];
        fiveDayForeCast.push(
          responseForecast.list[2],
          responseForecast.list[10],
          responseForecast.list[18],
          responseForecast.list[26],
          responseForecast.list[34]
        );
        console.log(fiveDayForeCast);

        for (var i = 0; i < fiveDayForeCast.length; i++) {
          var tempFore = Math.round(fiveDayForeCast[i].main.temp);
          var humFore = fiveDayForeCast[i].main.humidity;
          var howOutside = fiveDayForeCast[i].weather[0].icon;
          var theDate = fiveDayForeCast[i].dt_txt;
          var plainDate = moment(theDate).format("ddd");

          console.log(plainDate);

          var imgHowOutside =
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

    fiveCards();
    displayInfo();
    cityHolder.push(cityName);
    localStorage.setItem("city", JSON.stringify(cityHolder));
    retrieveCity();
  });

  $(".weatherdetails1").show();
  $(".weatherdetails2").show();
});

// function creates city list
function retrieveCity() {
  $("#city-field").empty();
  var getCity = JSON.parse(localStorage.getItem("city")) || [];
  for (var i = 0; i < getCity.length; i++) {
    $("#city-field").append(
      $("<li>").append(
        $("<button>")
          .css({
            width: "341px",
            "text-align": "left",
            "background-color": "#CA88E0",
            "margin-bottom": "5px",
            color: "white",
            "font-size": "25px",
            border: "none",
          })
          .text(getCity[i])
          .addClass("grab-city")
          .attr("data-location", getCity[i])
      )
    );
  }
}

// allows user to click on a city from the list and retrieve forecast data again

$("#city-field").on("click", ".grab-city", function (event) {
  event.preventDefault();
  var cityAgain = $(this).attr("data-location");
  console.log(cityAgain);

  event.preventDefault();
  var apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityAgain +
    "&units=imperial&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response2) {
    console.log(response2);

    var currentTemp = response2.main.temp;
    var currentHumid = response2.main.humidity;
    var currentWind = response2.wind.speed;
    //   // var currentLat = response.coord.lat;
    //   // var currentLon = response.coord.lon;
    var image = response2.weather[0].icon;
    var cityName = response2.name;
    var wIcon = "https://openweathermap.org/img/w/" + image + ".png";

    function displayInfo() {
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
    displayInfo();
  });
});
