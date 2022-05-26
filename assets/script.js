// make variable city
//save city to search history
//current weather= city name, date, icon representing weather conditions, temp, humidity, the wind speed and uv input
//when viewing UV index color indicates whether conditons (favorable, moderate, or severe)
//5 day weather forecast that display (date, icon for weather conditions, temp, wind speed, humidity
//clicking on city in search history sets webpage


var searchBtn = $("#search-btn");
var cityInput = "";
var cityInputValue;
var citiesSearched = $("#search-history");
var cityArray = [];
var apiKey = "15c083131d79073a04f8824675a24342";
// var citySearch = $("#city-search").val().trim();



//diplays the searched city underneath the search button
$("#search-btn").on('click', function (event) {
    var citySearch = $("#city-search").val().trim();
    // event.preventDefault()
    // if (citySearch === ""){
    //     return;
    // }
    var pEl = $("<p>" + citySearch + "</p>");
    $(pEl).attr("class", "searched-city-list")
    $(pEl).attr("data-value", event)
    $("#search-history").append(pEl);
    Weather(citySearch)


});

function Weather(cityname) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        renderCityWeatherInfo(response);
    }).catch(function (error) {
        console.log(error);
    })
}

function renderCityWeatherInfo(data) {
    $("#city_date").text(data.name)
    $("#temp").text("Temp: " + data.main.temp + " °F")
    $("#wind").text("Wind Speed: " + data.wind.speed + " mph")
    $("#humidity").text("Humidity: " + data.main.humidity + " %")
    console.log(data);
}

$.when($.ajax("queryURL")).then(function uvIndexinfo() {
    var uvUrl = "https//api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey
    $.ajax({
        url: uvUrl,
        method: "GET"
    }).then(function (event) {
        renderUVinfo(event);
    }).catch(function (error) {
        console.log(error);
    })
})

function renderUVinfo(uvData) {
    $("#uv").text(uvData.value)
    console.log(uvData)
}



