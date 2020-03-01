// use city input to redo call when city is clickd in city field
var justDoit = [];
$("#search").on("click", function(event) {
  event.preventDefault();
  var city = $("#city-input").val();
  var apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response1) {
    console.log(queryURL);
    console.log(response1);

    var temp = response1.main.temp;
    var humid = response1.main.humidity;
    var wind = response1.wind.speed;
    var uvlon = response1.coord.lon;
    var uvlat = response1.coord.lat;
    var image = response1.weather[0].icon;
    var wIcon = "https://openweathermap.org/img/w/" + image + ".png";
    // var uv = $("#weatherdetails");
    console.log(uvlat);


    $("#weatherdetails0").append(
      $("<h3>").text(city),
      // $("<p>").moment().subtract(10, 'days').calendar(),
      $("<img>").attr("src", wIcon),
      $("#weatherdetails0").empty(),
    );


    $("#weatherdetails1").append(
      $("<p>").text("Temperature (F): " + temp),
      $("<p>").text("Humidity: " + humid + " %"),
      $("<p>").text("Wind Speed: " + wind + " MPH"),
      $("#weatherdetails1").empty()
    );

    var uvqueryURL =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      apiKey +
      "&lat=" +
      uvlat +
      "&lon=" +
      uvlon;
    console.log(uvqueryURL);

    $.ajax({
      url: uvqueryURL,
      method: "GET"
    }).then(function(response2) {
      console.log(response2.value);

      $("#weatherdetails1").append(
        $("<p>").text("UV Index: " + response2.value)
      );
    });
  });

  var forequeryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  $.ajax({
    url: forequeryURL,
    method: "GET"
  }).then(function(response3) {
    console.log(forequeryURL);
    console.log(response3);

    // $("#forecast").append(
    // $("<h4>").text("5 Day Forecast")),
    // $("#forecast").empty();

    $("#weatherdetails2").empty();
    // );

    for (var i = 0; i < 5; i++) {
      var tempFore = response3.list[i].main.temp;
      var humFore = response3.list[i].main.humidity;
      var howOutside = response3.list[i].weather[0].icon;
      var imgHowOutside =
        "https://openweathermap.org/img/w/" + howOutside + ".png";
      console.log(humFore);

      $("#weatherdetails2").append(
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
                    $("<p>").text("Temperature: " + tempFore),
                    $("<br>"),
                    $("<p>").text("Humidity: " + humFore)
                  )
              )
          )
      );
    }
  });


  justDoit.push(city);
  localStorage.setItem("citydata", JSON.stringify(justDoit));

  renderCities();
});

function renderCities() {
  $("#citieshere").empty();
  var places = JSON.parse(localStorage.getItem("citydata")) || [];
  for (var i = 0; i < places.length; i++) {
    var location = $("<li>");
    var cityButton = $("<button>");
    cityButton.addClass("chicago");
    cityButton.addClass("btn-block");
    cityButton.text(places[i]);
    cityButton.attr("data-location", places[i]);
    location.append(cityButton);
    $("#citieshere").append(location);
  }

  // //the onclick is on the entire field instead of the individual city - use event delegation
}

$(document).on("click", ".chicago", function() {
    event.preventDefault();
    var cityGuys = $(this).attr("data-location");
    console.log(cityGuys);


    event.preventDefault();
    var apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityGuys +
      "&units=imperial&appid=" +
      apiKey;
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response1) {
      console.log(queryURL);
      console.log(response1);
  
      var temp = response1.main.temp;
      var humid = response1.main.humidity;
      var wind = response1.wind.speed;
      var uvlon = response1.coord.lon;
      var uvlat = response1.coord.lat;
      var image = response1.weather[0].icon;
      var wIcon = "https://openweathermap.org/img/w/" + image + ".png";
      // var uv = $("#weatherdetails");
      console.log(uvlat);
  
      $("#weatherdetails1").append(
        $("<h3>").text(cityGuys),
        $("<p>").text("Temperature (F): " + temp),
        $("<p>").text("Humidity: " + humid + " %"),
        $("<p>").text("Wind Speed: " + wind + " MPH"),
        $("<img>").attr("src", wIcon),
  
        // "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"
  
        $("#weatherdetails1").empty()
      );
  
      var uvqueryURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        apiKey +
        "&lat=" +
        uvlat +
        "&lon=" +
        uvlon;
      console.log(uvqueryURL);
  
      $.ajax({
        url: uvqueryURL,
        method: "GET"
      }).then(function(response2) {
        console.log(response2.value);
  
        $("#weatherdetails1").append(
          $("<p>").text("UV Index: " + response2.value),
        );
      });
    });
  
      $("#5day").append(
      $("<p>").text("5 Day Forecast"),
      
      $("#5day").empty());

    var forequeryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityGuys +
      "&units=imperial&appid=" +
      apiKey;
  
    $.ajax({
      url: forequeryURL,
      method: "GET"
    }).then(function(response3) {
      console.log(forequeryURL);
      console.log(response3);
  
      // $("#forecast").append(
      // $("<h4>").text("5 Day Forecast")),
      // $("#forecast").empty();
  
      $("#weatherdetails2").empty();
      // );
  
      for (var i = 0; i < 5; i++) {
        var tempFore = response3.list[i].main.temp;
        var humFore = response3.list[i].main.humidity;
        var howOutside = response3.list[i].weather[0].icon;
        var imgHowOutside =
          "https://openweathermap.org/img/w/" + howOutside + ".png";
        console.log(humFore);
  
        $("#weatherdetails2").append(
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
                      $("<p>").text("Temp: " + tempFore),
                      $("<br>"),
                      $("<p>").text("Humidity: " + humFore + "%")
                    )
                )
            )
        );
      }
    });

    
});
