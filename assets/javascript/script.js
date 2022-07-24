var latEl;
var longEl;
var cityName = ('');
var apiKey = ('77994328a557e9c9acde8c1f22078d7d');
var cityEl = document.getElementById('citySpan');
var locationEl = [];
var currentWeather = [];
var currentTemp = ('');
var currentWind = ('');
var currentHumid = ('');
var currentUV = ('');



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
    fetch('https://api.openweathermap.org/geo/1.0/direct?appid=' + apiKey + '&q=' + cityName + ',US')
        .then(response => response.json())
        .then(data => {
            locationEl = data;
            latEl = locationEl[0].lat
            longEl = locationEl[0].lon
            console.log(locationEl)
            console.log(latEl)
            console.log(longEl)
            getWeather()
        })
}


function getWeather() {

    fetch('https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&lat=' + latEl + '&lon=' + longEl + '&exclude=hourly,daily&units=imperial')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            currentWeather = data;
            console.log(currentWeather)
            currentTemp = currentWeather.main.temp
            currentWind = currentWeather.wind.speed
            currentHumid = currentWeather.main.humidity
            //currentUV = currentWeather
            console.log(currentTemp)
            printData()
            return
        })


}

function printData() {
    console.log(currentTemp)
    document.getElementById('currTemp').innerHTML = "Temperature: " + currentTemp;
    document.getElementById('currWind').innerHTML = "Wind Speed: " + currentWind + " mph";
    document.getElementById('currHumidity').innerHTML = "Humidity: " + currentHumid + "%";
    //document.getElementById('currUV').innerHTML = "UV index: " + currentUV;
}


