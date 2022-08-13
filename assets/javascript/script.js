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
var currentWind;
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

//Creates the button based on the input form input
function createButton() {
    for (let i = 0; i < cityStorage.length; i++) {
        const city = cityStorage[i];
        var button = $("<button>").text(city)
        $("#listGroup").append(button)
    }

}




$(document).ready(function () {
    //button click event to grab the user input and start the data collection process
    $("button").on("click", function () {
        var value = $(this)
            .siblings('.form-control')
            .val()


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

//Pulls the data from the button list created from local storage
$("#listGroup").on("click", "button", getCityLocation)

//Pulls the lat and long based on a city name entered into the input
function getCityLocation() {
    if ($(this).parent().attr("id") === "listGroup") {
        cityName = $(this).text()
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


//Pulls the weather API and information for the current weather and 5 day forcast
async function getWeather() {
    const weatherSearch = 'https://api.openweathermap.org/data/2.5/onecall?appid=' + apiKey + '&lat=' + latEl + '&lon=' + longEl + '&exclude=hourly,minutely&units=imperial';
    const response = await fetch(weatherSearch);
    const body = await response.json();
    currentWeather = body;
    console.log(currentWeather)
    body.daily.map(async (body) => {


        let cardInfo = (`
        
            <div class="card-body">
                <h5 class="card-title" id="day1Date">Day 1</h5>
                <img src="${currentWeather.daily[0].weather[0].icon}" id="day1Icon" alt="">
                <br>
                <span>Temperature: ${currentWeather.daily[0].temp.day}</span>
                <br>
                <span>Wind Speed: ${currentWeather.daily[0].wind_speed}</span>
                <br>
                <span>Humidity: ${currentWeather.daily[0].humidity}</span>
                <br>
            </div>
        

        `);

        document.getElementById('cardDeck').innerHTML = cardInfo;

        console.log(body)

        currentTemp = currentWeather.current.temp
        console.log(currentTemp)
        currentWind = currentWeather.current.wind_speed
        currentHumid = currentWeather.current.humidity
        currentUV = currentWeather.current.uvi
        currentCloudIcon = currentWeather.current.weather[0].icon




        printData()


    })


};


// This prints all the pulled data to the screen for the user to read.
function printData() {
    console.log(currentTemp)
    document.getElementById('currTemp').innerHTML = "Temperature: " + currentTemp + "° F";
    document.getElementById('currWind').innerHTML = "Wind Speed: " + currentWind + " mph";
    document.getElementById('currHumidity').innerHTML = "Humidity: " + currentHumid + "%";
    document.getElementById('currUV').innerHTML = "  UV index: " + currentUV + "  ";
    document.getElementById("currentIcon").src = "http://openweathermap.org/img/wn/" + currentCloudIcon + "@2x.png";




    // document.getElementById("day1Icon").src = "http://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png";
    // document.getElementById('day1Temp').innerHTML = 'Temperature: ' + dayOneTemp + "° F";
    // document.getElementById('day1Wind').innerHTML = 'Wind Speed ' + dayOneWind + ' mph';
    // document.getElementById('day1Hum').innerHTML = 'Humidity: ' + dayOneHum + '%';


    // document.getElementById("day2Icon").src = "http://openweathermap.org/img/wn/" + dayTwoIcon + "@2x.png";
    // document.getElementById('day2Temp').innerHTML = 'Temperature: ' + dayTwoTemp + "° F";
    // document.getElementById('day2Wind').innerHTML = 'Wind Speed ' + dayTwoWind + ' mph';
    // document.getElementById('day2Hum').innerHTML = 'Humidity: ' + dayTwoHum + '%';


    // document.getElementById("day3Icon").src = "http://openweathermap.org/img/wn/" + dayThreeIcon + "@2x.png";
    // document.getElementById('day3Temp').innerHTML = 'Temperature: ' + dayThreeTemp + "° F";
    // document.getElementById('day3Wind').innerHTML = 'Wind Speed ' + dayThreeWind + ' mph';
    // document.getElementById('day3Hum').innerHTML = 'Humidity: ' + dayThreeHum + '%';


    // document.getElementById("day4Icon").src = "http://openweathermap.org/img/wn/" + dayFourIcon + "@2x.png";
    // document.getElementById('day4Temp').innerHTML = 'Temperature: ' + dayFourTemp + "° F";
    // document.getElementById('day4Wind').innerHTML = 'Wind Speed ' + dayFourWind + ' mph';
    // document.getElementById('day4Hum').innerHTML = 'Humidity: ' + dayFourHum + '%';


    // document.getElementById("day5Icon").src = "http://openweathermap.org/img/wn/" + dayFiveIcon + "@2x.png";
    // document.getElementById('day5Temp').innerHTML = 'Temperature: ' + dayFiveTemp + "° F";
    // document.getElementById('day5Wind').innerHTML = 'Wind Speed ' + dayFiveWind + ' mph';
    // document.getElementById('day5Hum').innerHTML = 'Humidity: ' + dayFiveHum + '%';




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


