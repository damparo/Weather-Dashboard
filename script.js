//information will be displayed in #weatherdetails
//search icon id = "search"
//#cityfield --display cities beneath seach bar


// var uvlon = response.coord.lon;
// var uvlat = response.coord.lat;
//var uvqueryURL = "http://api.openweathermap.org/data/2.5/uvi?" + "appid=" + "APIKey" + "&lat=" + "uvlon" + "&lon=" + "uvlat";
// $.ajax({
//     url: uvqueryURL,
//     method: "GET"
//     })



$("#search").on("click", function(event) {
    event.preventDefault();

    
    var city = $("#city-input").val();
    var apiKey = "9f3310b38a0b78b3d966eb1da9d1599e";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    $.ajax({
    url: queryURL,
    method: "GET"
    })

    .then(function(response1){
        console.log(queryURL);
        console.log(response1);

    var temp = response1.main.temp;
    var humid = response1.main.humidity;
    var wind = response1.wind.speed;
    var uvlon = response1.coord.lon;
    var uvlat = response1.coord.lat;
    // var uv = $("#weatherdetails");
    console.log(uvlat);

    $("#weatherdetails").append(
        $("<h3>").text(city),
        $("<p>").text("Temperature (F): " + temp),
        $("<p>").text("Humidity: " + humid + " %"),
        $("<p>").text("Wind Speed: " + wind + " MPH"),
    $("#weatherdetails").empty()
    );

    var uvqueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + uvlat + "&lon=" + uvlon;
    console.log(uvqueryURL);

    $.ajax({
    url: uvqueryURL,
    method: "GET"
    }).then(function(response2){
        console.log(response2);
        // uv.text(response2.value);
        console.log(response2.value);
    });

    })


    var forequeryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
        
    $.ajax({
    url: forequeryURL,
    method: "GET"
    }).then(function(response3){
        console.log(forequeryURL);
        console.log(response3);

    for (var i =0; i <5; i++){
    var tempFore = response3.list[0].main.temp;
    var humFore = response3.list[i].main.humidity;
    console.log(humFore);
        
    }

    });
    
    function renderCities() {
        // ("#cityfield").empty();
        var location = $("<li>");
        location.text(city);
        // location.css("outline-color", "red");
        $("#citieshere").append(location);
        // var info = localStorage.getItem("citydata")
        
        var displaycities = [];
        
        $(location).on("click", function(){
        localStorage.setItem("citydata", JSON.stringify(city));
            
        });

        function rendermyCities() {
           var places = JSON.parse(localStorage.getItem("citydata"));
           if (places !== null){
               displaycities = places;
           }

        
        };
        
        rendermyCities();



    }

    renderCities();
});











