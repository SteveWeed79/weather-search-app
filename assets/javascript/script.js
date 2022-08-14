var cityEl = document.getElementById('citySpan');
var cityStorage = JSON.parse(localStorage.getItem("pastcities")) || [];
var today = moment().format('l');



//Creates the button based on the input form input
function createButton() {

    for (let i = 0; i < cityStorage.length; i++) {
        const city = cityStorage[i];
        var button = $("<button>").text(city)
        $("#listGroup").append(button)
    }
};

var lat;
var long;
var cityName;
var cityNameAdd;
var city;
var apiKey = ('77994328a557e9c9acde8c1f22078d7d');

$(document).ready(function () {
    //button click event to grab the user input and start the data collection process
    $("button").on("click", function () {
        var value = $(this)
            .siblings('.form-control')
            .val()

        cityName = value
        if (!cityName) {
            return;
        } else {
            getCityLocation(cityName)
            cityStorage.push(value)
            localStorage.setItem("pastcities", JSON.stringify(cityStorage));
            var createButton = document.createElement('button')
            createButton.innerHTML = value;
            document.getElementById('listGroup').appendChild(createButton);
        }
    });

    createButton();
});



//Pulls the data from the button list created from local storage
$("#listGroup").on("click", "button", getCityLocation);



//Pulls the lat and long based on a city name entered into the input
var locationArr = [];
function getCityLocation() {
    if ($(this).parent().attr("id") === "listGroup") {
        cityName = $(this).text();
    }
    fetch('https://api.openweathermap.org/geo/1.0/direct?appid=' + apiKey + '&q=' + cityName + ',US')
        .then(response => response.json())
        .then(data => {
            locationArr = data;
            lat = locationArr[0].lat;
            long = locationArr[0].lon;
            cityNameAdd = locationArr[0].name;
            document.getElementById('citySpan').innerHTML = cityNameAdd + '  ' + today;
            getWeather()
        })
}


//Pulls the weather API and information for the current weather and 5 day forcast
var currentWeather = [];
var currentTemp;
var currentWind;
var currentHumid;
var currentUV;
var currentCloudIcon;

async function getWeather() {
    const weatherSearch = 'https://api.openweathermap.org/data/2.5/onecall?appid=' + apiKey + '&lat=' + lat + '&lon=' + long + '&exclude=hourly,minutely&units=imperial';
    const response = await fetch(weatherSearch);
    const body = await response.json();
    currentWeather = body;
    cardDeck.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        //builds the 5 day forcast.  Need to look into this being user defined.
        cardInfo = (
            `
                <div class="card col-sm-3 col-md-12 cardBoarder">
            <div class="card-body">
                <h5 class="card-title" id="day1Date">${moment.unix(currentWeather.daily[i].dt).format("M/D/YY")}</h5>
                <img src="http://openweathermap.org/img/wn/${currentWeather.daily[i].weather[0].icon}@2x.png" id="day1Icon" alt="">
                <br>
                <span>Temperature: ${currentWeather.daily[i].temp.day}</span>
                <br>
                <span>Wind Speed: ${currentWeather.daily[i].wind_speed}</span>
                <br>
                <span>Humidity: ${currentWeather.daily[i].humidity}</span>
                <br>
            </div> 
            </div>
                    `

        );

        cardDeck.innerHTML += cardInfo;
    };


    //Sets information to build the current weather card.
    currentTemp = currentWeather.current.temp;
    currentWind = currentWeather.current.wind_speed;
    currentHumid = currentWeather.current.humidity;
    currentUV = currentWeather.current.uvi;
    currentCloudIcon = currentWeather.current.weather[0].icon;

    printData()


    // })


};

// This prints all the pulled data to the screen for the user to read.
function printData() {
    document.getElementById('currTemp').innerHTML = "Temperature: " + currentTemp + "° F";
    document.getElementById('currWind').innerHTML = "Wind Speed: " + currentWind + " mph";
    document.getElementById('currHumidity').innerHTML = "Humidity: " + currentHumid + "%";
    document.getElementById('currUV').innerHTML = "  UV index:  " + currentUV + "   ";
    document.getElementById("currentIcon").src = "http://openweathermap.org/img/wn/" + currentCloudIcon + "@2x.png";

    //This changes the color of the font and background on the UV Index
    if (currentUV <= 3) {
        document.getElementById('currUV').style.color = 'white';
        document.getElementById('currUV').style.backgroundColor = 'green';
    } else if (currentUV >= 8) {
        document.getElementById('currUV').style.color = 'white';
        document.getElementById('currUV').style.backgroundColor = 'red';
    } else {
        document.getElementById('currUV').style.color = 'black';
        document.getElementById('currUV').style.backgroundColor = 'yellow';
    }

};


