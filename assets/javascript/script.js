var lat = ('');
var long = ('');
var cityName = ('');
var apiKey = ('77994328a557e9c9acde8c1f22078d7d');
var cityEl = document.getElementById('citySpan');
var locationEl = {}



$(document).ready(function () {
    $("button").on("click", function () {
        var value = $(this)
            .siblings('.form-control')
            .val()

        console.log(value)
        cityName = value
        getCityLocation(cityName)
    });
});


function getCityLocation() {
    fetch('https://api.openweathermap.org/geo/1.0/direct?appid=77994328a557e9c9acde8c1f22078d7d&q=' + cityName + ',US')
        .then(response => response.json())
        .then(data => console.log(data))
    locationEl = data;
    lat = locationEl.lat
    long = locationEl.lon
    getWeather()
}


function getWeather() {

    fetch('https://api.openweathermap.org/data/2.5/weather?appid=77994328a557e9c9acde8c1f22078d7d&lat=' + lat + '&lon=' + long + '&exclude=hourly,daily')
        .then(response => response.json())
        .then(data => console.log(data));
}




