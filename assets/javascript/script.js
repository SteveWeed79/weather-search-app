var latEl;
var longEl;
var cityName;
var city;
var apiKey = ('77994328a557e9c9acde8c1f22078d7d');
var cityEl = document.getElementById('citySpan');
var cityStorage = JSON.parse(localStorage.getItem("pastcities")) || [];
var locationEl = [];
var currentWeather = [];
var currentTemp;
var currentWind ;
var currentHumid;
var currentUV;
var cityNameEL;
var currentCloudIcon;


var today = moment().format('l');

var dayOneDate;
var dayTwoDate;
var dayThreeDate;
var dayFourDate;
var dayFiveDate;

var dayOneIcon;
var dayTwoIcon;
var dayThreeIcon;
var dayFourIcon;
var dayFiveIcon;

var dayOneTemp;
var dayTwoTemp;
var dayThreeTemp;
var dayFourTemp;
var dayFiveTemp;

var dayOneWind;
var dayTwoWind;
var dayThreeWind;
var dayFourWind;
var dayFiveWind;

var dayOneHum;
var dayTwoHum;
var dayThreeHum;
var dayFourHum;
var dayFiveHum;


function createButton() {
for (let i = 0; i < cityStorage.length; i++) {
    const city = cityStorage[i];
    var button = $("<button>").text(city)
    $("#listGroup").append(button)
}

}



$(document).ready(function () {



    $("button").on("click", function () {
        var value = $(this)
            .siblings('.form-control')
            .val()

        console.log(value)
        cityName = value
        getCityLocation(cityName)
        cityStorage.push(value)
        localStorage.setItem("pastcities", JSON.stringify(cityStorage));
        var createButton = document.createElement('button')
        createButton.innerHTML = value;
        document.getElementById('listGroup').appendChild(createButton);

    });
    createButton()
});


$("#listGroup").on("click", "button", getCityLocation)


function getCityLocation() {
    if($(this).parent().attr("id") === "listGroup") {
        cityName=$(this).text()
    }
    fetch('https://api.openweathermap.org/geo/1.0/direct?appid=' + apiKey + '&q=' + cityName + ',US')
        .then(response => response.json())
        .then(data => {
            locationEl = data;
            latEl = locationEl[0].lat
            longEl = locationEl[0].lon
            cityNameEL = locationEl[0].name
            document.getElementById('citySpan').innerHTML = cityNameEL + '  ' + today
            getWeather()
        })
}


function getWeather() {

    fetch('https://api.openweathermap.org/data/2.5/onecall?appid=' + apiKey + '&lat=' + latEl + '&lon=' + longEl + '&exclude=hourly,minutely&units=imperial')
        .then(response => response.json())
        .then(data => {
            currentWeather = data;
            console.log(currentWeather)
            currentTemp = currentWeather.current.temp
            currentWind = currentWeather.current.wind_speed
            currentHumid = currentWeather.current.humidity
            currentUV = currentWeather.current.uvi
            currentCloudIcon = currentWeather.current.weather[0].icon

            dayOneIcon = currentWeather.daily[0].weather[0].icon
            dayOneTemp = currentWeather.daily[0].temp.day
            dayOneWind = currentWeather.daily[0].wind_speed
            dayOneHum = currentWeather.daily[0].humidity

            dayTwoIcon = currentWeather.daily[1].weather[0].icon
            dayTwoTemp = currentWeather.daily[1].temp.day
            dayTwoWind = currentWeather.daily[1].wind_speed
            dayTwoHum = currentWeather.daily[1].humidity

            dayThreeIcon = currentWeather.daily[2].weather[0].icon
            dayThreeTemp = currentWeather.daily[2].temp.day
            dayThreeWind = currentWeather.daily[2].wind_speed
            dayThreeHum = currentWeather.daily[2].humidity

            dayFourIcon = currentWeather.daily[3].weather[0].icon
            dayFourTemp = currentWeather.daily[3].temp.day
            dayFourWind = currentWeather.daily[3].wind_speed
            dayFourHum = currentWeather.daily[3].humidity

            dayFiveIcon = currentWeather.daily[4].weather[0].icon
            dayFiveTemp = currentWeather.daily[4].temp.day
            dayFiveWind = currentWeather.daily[4].wind_speed
            dayFiveHum = currentWeather.daily[4].humidity

            printData()
            return
        })


}

function printData() {
    console.log(currentTemp)
    document.getElementById('currTemp').innerHTML = "Temperature: " + currentTemp + "° F";
    document.getElementById('currWind').innerHTML = "Wind Speed: " + currentWind + " mph";
    document.getElementById('currHumidity').innerHTML = "Humidity: " + currentHumid + "%";
    document.getElementById('currUV').innerHTML = "  UV index: " + currentUV + "  ";
    document.getElementById("currentIcon").src = "http://openweathermap.org/img/wn/" + currentCloudIcon + "@2x.png";


    document.getElementById("day1Icon").src = "http://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png";
    document.getElementById('day1Temp').innerHTML = 'Temperature: ' + dayOneTemp + "° F";
    document.getElementById('day1Wind').innerHTML = 'Wind Speed ' + dayOneWind + ' mph';
    document.getElementById('day1Hum').innerHTML = 'Humidity: ' + dayOneHum + '%';


    document.getElementById("day2Icon").src = "http://openweathermap.org/img/wn/" + dayTwoIcon + "@2x.png";
    document.getElementById('day2Temp').innerHTML = 'Temperature: ' + dayTwoTemp + "° F";
    document.getElementById('day2Wind').innerHTML = 'Wind Speed ' + dayTwoWind + ' mph';
    document.getElementById('day2Hum').innerHTML = 'Humidity: ' + dayTwoHum + '%';


    document.getElementById("day3Icon").src = "http://openweathermap.org/img/wn/" + dayThreeIcon + "@2x.png";
    document.getElementById('day3Temp').innerHTML = 'Temperature: ' + dayThreeTemp + "° F";
    document.getElementById('day3Wind').innerHTML = 'Wind Speed ' + dayThreeWind + ' mph';
    document.getElementById('day3Hum').innerHTML = 'Humidity: ' + dayThreeHum + '%';


    document.getElementById("day4Icon").src = "http://openweathermap.org/img/wn/" + dayFourIcon + "@2x.png";
    document.getElementById('day4Temp').innerHTML = 'Temperature: ' + dayFourTemp + "° F";
    document.getElementById('day4Wind').innerHTML = 'Wind Speed ' + dayFourWind + ' mph';
    document.getElementById('day4Hum').innerHTML = 'Humidity: ' + dayFourHum + '%';


    document.getElementById("day5Icon").src = "http://openweathermap.org/img/wn/" + dayFiveIcon + "@2x.png";
    document.getElementById('day5Temp').innerHTML = 'Temperature: ' + dayFiveTemp + "° F";
    document.getElementById('day5Wind').innerHTML = 'Wind Speed ' + dayFiveWind + ' mph';
    document.getElementById('day5Hum').innerHTML = 'Humidity: ' + dayFiveHum + '%';





    var printDay1Date = moment(today, "dd/mm/yyyy").add(1, "days").format("MM/DD/YYYY")
    document.getElementById('day1Date').innerHTML = printDay1Date;

    var printDay2Date = moment(today, "dd/mm/yyyy").add(2, "days").format("MM/DD/YYYY")
    document.getElementById('day2Date').innerHTML = printDay2Date;

    var printDay3Date = moment(today, "dd/mm/yyyy").add(3, "days").format("MM/DD/YYYY")
    document.getElementById('day3Date').innerHTML = printDay3Date;

    var printDay4Date = moment(today, "dd/mm/yyyy").add(4, "days").format("MM/DD/YYYY")
    document.getElementById('day4Date').innerHTML = printDay4Date;

    var printDay5Date = moment(today, "dd/mm/yyyy").add(5, "days").format("MM/DD/YYYY")
    document.getElementById('day5Date').innerHTML = printDay5Date;

    if (currentUV <= 3) {
        document.getElementById('currUV').style.color = 'white';
        document.getElementById('currUV').style.backgroundColor = 'green';
    } else if (currentUV >= 8) {
        document.getElementById('currUV').style.color = 'white';
        document.getElementById('currUV').style.backgroundColor = 'red';
    } else {
        document.getElementById('currUV').style.color = 'white';
        document.getElementById('currUV').style.backgroundColor = 'yellow';
    }




}


