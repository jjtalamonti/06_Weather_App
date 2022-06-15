
var searchBtn = $("#search-btn");
var cityInput = "";
var cityInputValue;
var citiesSearched = $("#search-history");
var cityArray = [];
console.log(cityArray)
var apiKey = "15c083131d79073a04f8824675a24342";

$("#weather-boxes").hide();

// var citySearch = $("#city-search").val().trim();



//diplays the searched city underneath the search button
$("#search-btn").on('click', function () {
    var citySearch = $("#city-search").val().trim();
    var pEl = $("<p>" + citySearch + "</p>");
    pEl.attr("class", "btn btn-primary")
    $("#search-history").prepend(pEl);
    Weather(citySearch);
    $("#weather-boxes").show();

});



// $(content.elementChild).on('click', function () {
//     Weather(content.elementChild.textContent)
// })





//API for city searched
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
// Displays current city name, temp, wind speed, and humidity
function renderCityWeatherInfo(data) {
    $("#city_date").text(data.name + "   ")
    $("#temp").text("Temp: " + data.main.temp + " °F")
    $("#wind").text("Wind Speed: " + data.wind.speed + " mph")
    $("#humidity").text("Humidity: " + data.main.humidity + " %")
    console.log(data);
    uvData(data);
    fiveDayForecast(data);
    var url = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    $(document).ready(function () {
        var image = new Image();
        image.src = url;
        $("#city_date").append(image);
    })
}



//API call to get UV index
function uvData(data) {
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + data.coord.lat + "&lon=" + data.coord.lon;
    $.ajax({
        url: uvUrl,
        method: "GET"
    }).then(function (response) {
        renderUVinfo(response);
        console.log(response)
    }).catch(function (error) {
        console.log(error);
    })
}

//Displays UV index in different colors dependent on number range
function renderUVinfo(uvData) {
    if (uvData.value < 3) {
        $("span").attr("class", "badge badge-success").text("UV: " + uvData.value);
    }
    if (uvData.value >= 3 && uvData.value < 5) {
        $("span").attr("class", "badge badge-warning").text("UV: " + uvData.value);
    }
    if (uvData.value >= 5 && uvData.value < 7) {
        $("span").attr("class", "badge badge-dangerlight").text("UV: " + uvData.value);
    }
    if (uvData.value >= 7) {
        $("span").attr("class", "badge badge-danger").text("UV: " + uvData.value);
    }
    // console.log(uvData)
}

//API for 5-day forecast
function fiveDayForecast(data) {
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&appid=" + apiKey + "&units=imperial&exclude=hourly";
    $.ajax({
        url: fiveDayUrl,
        method: "GET"
    }).then(function (response) {
        renderFiveDayinfo(response);
        console.log(response)
    }).catch(function (error) {
        console.log(error);
    })
}
// Five day forecast with date, temp, wind speed, humidity
function renderFiveDayinfo(fivedaydata) {
    $("#city_date").append("(" + new Date(fivedaydata.list[1].dt_txt).toLocaleDateString() + ")")


    $(".card-title1").text(new Date(fivedaydata.list[4].dt_txt).toLocaleDateString())
    $("#day1temp").text("Temp: " + fivedaydata.list[4].main.temp + " °F")
    $("#day1wind").text("Wind: " + fivedaydata.list[4].wind.speed + " mph")
    $("#day1humidity").text("Humidity: " + fivedaydata.list[4].main.humidity + " %")
    var url1 = 'http://openweathermap.org/img/wn/' + fivedaydata.list[4].weather[0].icon + '@2x.png';
    var image = new Image();
    image.src = url1;
    $(".card-subtitle1").empty().append(image);


    $(".card-title2").text(new Date(fivedaydata.list[12].dt_txt).toLocaleDateString())
    $("#day2temp").text("Temp: " + fivedaydata.list[12].main.temp + " °F")
    $("#day2wind").text("Wind: " + fivedaydata.list[12].wind.speed + " mph")
    $("#day2humidity").text("Humidity: " + fivedaydata.list[12].main.humidity + " %")
    var url2 = 'http://openweathermap.org/img/wn/' + fivedaydata.list[12].weather[0].icon + '@2x.png';
    $("#card-subtle2").ready(function () {
        var image = new Image();
        image.src = url2;
        $(".card-subtitle2").empty().prepend(image);
    })


    $(".card-title3").text(new Date(fivedaydata.list[20].dt_txt).toLocaleDateString())
    $("#day3temp").text("Temp: " + fivedaydata.list[20].main.temp + " °F")
    $("#day3wind").text("Wind: " + fivedaydata.list[20].wind.speed + " mph")
    $("#day3humidity").text("Humidity: " + fivedaydata.list[20].main.humidity + " %")
    var url3 = 'http://openweathermap.org/img/wn/' + fivedaydata.list[20].weather[0].icon + '@2x.png';
    $(document).ready(function () {
        var image = new Image();
        image.src = url3;
        $(".card-subtitle3").empty().append(image);
    })


    $(".card-title4").text(new Date(fivedaydata.list[28].dt_txt).toLocaleDateString())
    $("#day4temp").text("Temp: " + fivedaydata.list[28].main.temp + " °F")
    $("#day4wind").text("Wind: " + fivedaydata.list[28].wind.speed + " mph")
    $("#day4humidity").text("Humidity: " + fivedaydata.list[28].main.humidity + " %")
    var url4 = 'http://openweathermap.org/img/wn/' + fivedaydata.list[28].weather[0].icon + '@2x.png';
    $(document).ready(function () {
        var image = new Image();
        image.src = url4;
        $(".card-subtitle4").empty().append(image);
    })

    $(".card-title5").text(new Date(fivedaydata.list[36].dt_txt).toLocaleDateString())
    $("#day5temp").text("Temp: " + fivedaydata.list[36].main.temp + " °F")
    $("#day5wind").text("Wind: " + fivedaydata.list[36].wind.speed + " mph")
    $("#day5humidity").text("Humidity: " + fivedaydata.list[36].main.humidity + " %")
    var url5 = 'http://openweathermap.org/img/wn/' + fivedaydata.list[36].weather[0].icon + '@2x.png';
    $(document).ready(function () {
        var image = new Image();
        image.src = url5;
        $(".card-subtitle5").empty().append(image);
    })

}


$("#search-history").on("click", (event) => {
    event.preventDefault();
    $("#city-search").val(event.target.textContent);
    cityName = $('#city-search').val();
    Weather(cityName);

})


