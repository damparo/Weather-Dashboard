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

    var currentTemp = Math.round(response.main.temp);
    var currentHumid = response.main.humidity;
    var currentWind = Math.round(response.wind.speed);
    // var currentLat = response.coord.lat;
    // var currentLon = response.coord.lon;
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
          // "color": "#10BA00",
          
          })
          // $("<div>")
          //   .text("Humidity: " + currentHumid + " %")
          //   .css("margin-top", "20px"),
          // $("<div>")
          //   .text("Wind Speed: " + currentWind + " MPH")
          //   .css("margin-top", "20px")
        );
        // .append(
        //   $("<div>")
        //     .text("5-Day Forecast")
        //     .css("margin-top", "20px")
        //     .css("font-style", "bold")
        // );

        $("#humidity").text(currentHumid + "%").css("font-size", "15px");
         $("#wind").text(currentWind + " mph").css("font-size", "15px");
         $(".weatherdetails1").text("Humidity");
         $(".weatherdetails2").text("Wind");




        // .append(
        //    $("<div>")
        //         .addClass("row")
        //         .append(
        //           $("<div>")
        //             .addClass("card-deck")).append(fiveCards)
        // )
        

      

     
    };


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
        // console.log(forecastQueryURL);
        console.log(responseForecast);


        // var fiveDay = responseForecast.list;
        // console.log(fiveDay);

        // $("#forecast").append(
        // $("<h4>").text("5 Day Forecast")),
        // $("#forecast").empty();

        // $("#weatherdetails2").empty();
        // );
        $("#card-deck").empty();

      
        
        var fiveDayForeCast = [];

        fiveDayForeCast.push(responseForecast.list[2], responseForecast.list[10], responseForecast.list[18], responseForecast.list[26], responseForecast.list[34])


        console.log(fiveDayForeCast);

        for (var i = 0; i < fiveDayForeCast.length; i++) {

          // var dayToDay = fiveDayForeCast[i];
          var tempFore = Math.round(fiveDayForeCast[i].main.temp);
          var humFore = fiveDayForeCast[i].main.humidity;
          var howOutside = fiveDayForeCast[i].weather[0].icon;
          var theDate = fiveDayForeCast[i].dt_txt;
          var plainDate = moment(theDate).toDate();
          // var plainDate = new Date(theDate);
          var dayOfTheWeek = plainDate.toString().split(' ')[0];
          // toLocaleString('en-us', {weekday:'long'})
          // var shortHandDay = dayOfTheWeek.toString.splice(0,2);
          console.log(dayOfTheWeek);
          var imgHowOutside =
            "https://openweathermap.org/img/w/" + howOutside + ".png";
          // console.log(humFore);

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
                        $("<p>").text(tempFore + "°F"),
                        $("<p>").text(dayOfTheWeek)
                        // $("<br>"),
                        // $("<p>").text("Humidity: " + humFore + "%")
                      )
                  )
              )
          );
      };
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
            // padding: "10px",
            // "padding-left": "15px",
            // "border-style": "solid",
            // "border-width": "1.8px",
            // "border-color": "#8B008B",
            "margin-bottom": "5px",
            "color": "white",
            "font-size": "25px",
            "border": "none"
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
