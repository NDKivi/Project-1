$(document).ready(function () {

    // getCoordinates();
    getWeather();
    getForecast();

})

let APIKeyWeather = config.weatherKey;
let lat = 44.95;//44.95; //coordinatesOnLoad.latitude;
let lon = -93.09;//-93.09; //coordinatesOnLoad.longitude;

//current conditions
let queryUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKeyWeather;

let cityName;
let nowTime;
let currentForecastTime;
let currentTemp;
let currentHumidity;
let currentConditions;
let date;

//future conditions
let queryUrlFuture = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKeyWeather;

let futureTime;
let futureTemp;
let futureHumidity;
let futureConditions;


function getWeather() {
    $.ajax({
        url: queryUrlCurrent,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        // console.log("Location: " + response.name);
        // console.log("Current Time: " + moment().format("LT"));
        date = moment().format("L");
        currentForecastTime = moment.unix(response.dt).format("LT");
        // console.log("Weather as of " + currentForecastTime);
        // console.log("Temp: " + response.main.temp + "F");
        // console.log("Humidity: " + response.main.humidity + "%");
        // console.log("Wind Speed: " + response.wind.speed + " mph");
        // console.log("General Conditions: " + response.weather[0].main);
        // console.log("More Detailed Conditions: " + response.weather[0].description);

        cityName = response.name;
        nowTime = moment().format("LT");
        currentTemp = response.main.temp;
        currentHumidity = response.main.humidity;
        // let windSpeed = response.wind.speed;
        // let genConditions = response.weather[0].main;
        currentConditions = response.weather[0].description;

        //update html
        let locationDiv = $("<h2>");
        locationDiv.attr("class", "text-center");
        locationDiv.text(`Location: ${cityName}`);
        $("#city-time").append(locationDiv);

        let currentWeatherDiv = $("<div>");
        let nowForecastDiv = $("<h5>");
        nowForecastDiv.attr("class", "text-center");
        nowForecastDiv.text(`Weather at: ${currentForecastTime}`);
        currentWeatherDiv.append(nowForecastDiv);

        let currentTempDiv = $("<h3>");
        currentTempDiv.attr("class", "text-center");
        currentTempDiv.text(`${currentTemp} F`);
        currentWeatherDiv.append(currentTempDiv);

        let currentHumidityDiv = $("<h5>");
        currentHumidityDiv.attr("class", "text-center");
        currentHumidityDiv.text(`${currentHumidity}% Humidity`);
        currentWeatherDiv.append(currentHumidityDiv);

        let currentConditionsDiv = $("<h4>");
        currentConditionsDiv.attr("class", "text-center");
        currentConditionsDiv.text(`${currentConditions}`);
        currentWeatherDiv.append(currentConditionsDiv);

        $("#current-forecast").append(currentWeatherDiv);



        //make funcitont o get weather and then callback when want it to run (load: update html, stop clicked: send to firebase)
    });
};

function getForecast() {
    $.ajax({
        url: queryUrlFuture,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        futureTime = moment.unix(response.list[0].dt).format("LT");
        // console.log("Forecast for " + futureTime);
        // console.log("Temp: " + response.list[0].main.temp + "F");
        // console.log("Humidity: " + response.list[0].main.humidity + "%");
        // console.log("Wind Speed: " + response.list[0].wind.speed + " mph");
        // console.log("General Conditions: " + response.list[0].weather[0].main);
        // console.log("More Detailed Conditions: " + response.list[0].weather[0].description);

        futureTemp = response.list[0].main.temp;
        futureHumidity = response.list[0].main.humidity;
        // let futureWindSpeed = response.list[0].wind.speed;
        // let futureGenConditions = response.list[0].weather[0].main;
        futureConditions = response.list[0].weather[0].description;


        let futureWeatherDiv = $("<div>");

        let futureTimeDiv = $("<h5>");
        futureTimeDiv.attr("class", "text-center");
        futureTimeDiv.text(`Weather at: ${futureTime}`);
        futureWeatherDiv.append(futureTimeDiv);

        let futureTempDiv = $("<h3>");
        futureTempDiv.attr("class", "text-center");
        futureTempDiv.text(`${futureTemp} F`);
        futureWeatherDiv.append(futureTempDiv);

        let futureHumidityDiv = $("<h5>");
        futureHumidityDiv.attr("class", "text-center");
        futureHumidityDiv.text(`${futureHumidity}% Humidity`);
        futureWeatherDiv.append(futureHumidityDiv);

        let futureConditionsDiv = $("<h4>");
        futureConditionsDiv.attr("class", "text-center");
        futureConditionsDiv.text(`${futureConditions}`);
        futureWeatherDiv.append(futureConditionsDiv);

        $("#future-forecast").append(futureWeatherDiv);

    });
};