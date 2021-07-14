var cityHolder = [];

$("#search-btn").on("click", function (event) {
  event.preventDefault();

  $("#current-forecast").show();

  var city = $("#search-city").val();
  var apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var currentTemp = response.main.temp;
    var currentHumid = response.main.humidity;
    var currentWind = response.wind.speed;
    // var currentLat = response.coord.lat;
    // var currentLon = response.coord.lon;
    var image = response.weather[0].icon;
    var cityName = response.name;
    var wIcon = "https://openweathermap.org/img/w/" + image + ".png";

    function displayInfo() {
      $("#current-forecast")
        .empty()
        .append(
          $("<h2>").text(cityName).append($("<img>").attr("src", wIcon)),
          $("<div>")
            .text(currentTemp + " °F")
            .css({"margin-top": "20px",
          "font-size": "35px"
          
          }),
          $("<div>")
            .text("Humidity: " + currentHumid + " %")
            .css("margin-top", "20px"),
          $("<div>")
            .text("Wind Speed: " + currentWind + " MPH")
            .css("margin-top", "20px")
        )
        .append(
          $("<div>")
            .text("5-Day Forecast")
            .css("margin-top", "20px")
            .css("font-style", "bold")
        );




        // .append(
        //    $("<div>")
        //         .addClass("row")
        //         .append(
        //           $("<div>")
        //             .addClass("card-deck")).append(fiveCards)
        // )
        

      

     
    }
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
        console.log(forecastQueryURL);
        console.log(responseForecast);

        // $("#forecast").append(
        // $("<h4>").text("5 Day Forecast")),
        // $("#forecast").empty();

        // $("#weatherdetails2").empty();
        // );
        $("#card-deck").empty();
        for (var i = 0; i < 5; i++) {
          var tempFore = responseForecast.list[i].main.temp;
          var humFore = responseForecast.list[i].main.humidity;
          var howOutside = responseForecast.list[i].weather[0].icon;
          var imgHowOutside =
            "https://openweathermap.org/img/w/" + howOutside + ".png";
          console.log(humFore);

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
                        $("<img>").attr("src", imgHowOutside),
                        $("<p>").text("Temp: " + tempFore + " °F"),
                        // $("<br>"),
                        $("<p>").text("Humidity: " + humFore + " %")
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
});

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
            "background-color": "white",
            padding: "10px",
            "padding-left": "15px",
            "border-style": "solid",
            "border-width": "thin",
            "border-color": "lightgrey",
          })
          .text(getCity[i])
          .addClass("grab-city")
          .attr("data-location", getCity[i])
      )
    );
  }
}

$("#city-field").on("click", ".grab-city", function () {
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
          $("<h2>").text(cityName).append($("<img>").attr("src", wIcon)),
          $("<div>")
            .text("Temperature: " + currentTemp + " °F")
            .css("margin-top", "20px"),
          $("<div>")
            .text("Humidity: " + currentHumid + " %")
            .css("margin-top", "20px"),
          $("<div>")
            .text("Wind Speed: " + currentWind + " MPH")
            .css("margin-top", "20px")
        ).append(
          $("<div>")
            .text("5-Day Forecast")
            .css("margin-top", "20px")
            .css("font-style", "bold")
        );
    }
    displayInfo();
  });
});
