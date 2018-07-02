var APIKeyWeather = config.weatherKey;
var lat = 44.95;
var lon = -93.09;

//current conditions
var queryUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKeyWeather;

let cityName;
let nowTime;
let currentForecastTime;
let currentTemp;
let currentHumidity;
let currentConditions;

function getWeather() {
    $.ajax({
        url: queryUrlCurrent,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log("Location: " + response.name);
        console.log("Current Time: " + moment().format("LT"));
        currentForecastTime = moment.unix(response.dt).format("LT");
        console.log("Weather as of " + forecastTime);
        console.log("Temp: " + response.main.temp + "F");
        console.log("Humidity: " + response.main.humidity + "%");
        console.log("Wind Speed: " + response.wind.speed + " mph");
        console.log("General Conditions: " + response.weather[0].main);
        console.log("More Detailed Conditions: " + response.weather[0].description);

        cityName = response.name;
        nowTime = moment().format("LT");
        currentTemp = response.main.temp;
        currentHumidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        let genConditions = response.weather[0].main;
        currentConditions = response.weather[0].description;

        //update html
        //make funcitont o get weather and then callback when want it to run (load: update html, stop clicked: send to firebase)
    });
};
getWeather();


//future conditions
var queryUrlFuture = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKeyWeather;

function getForecast() {
    $.ajax({
        url: queryUrlFuture,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let futureTime = moment.unix(response.list[0].dt).format("LT");
        console.log("Forecast for " + futureTime);
        console.log("Temp: " + response.list[0].main.temp + "F");
        console.log("Humidity: " + response.list[0].main.humidity + "%");
        console.log("Wind Speed: " + response.list[0].wind.speed + " mph");
        console.log("General Conditions: " + response.list[0].weather[0].main);
        console.log("More Detailed Conditions: " + response.list[0].weather[0].description);

        let futureTemp = response.list[0].main.temp;
        let futureHumidity = response.list[0].main.humidity;
        let futureWindSpeed = response.list[0].wind.speed;
        let futureGenConditions = response.list[0].weather[0].main;
        let futureDetConditions = response.list[0].weather[0].description;
    });
};
getForecast();