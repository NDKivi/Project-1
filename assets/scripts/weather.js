var APIKeyWeather = config.weatherKey;
var lat = 44.95;
var lon = -93.09;

//current conditions
var queryUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKeyWeather;
console.log(queryUrlCurrent);

$.ajax({
    url: queryUrlCurrent,
    method: "GET"
}).then(function(response) {
    console.log(response);
    console.log("Location: "+response.name);
    console.log("Current Time: "+moment().format("LT"));
    let forecastTime = moment.unix(response.dt).format("LT");
    console.log("Weather as of "+forecastTime);
    console.log("Current Temp: "+response.main.temp+"F");
    console.log("Humidity: "+response.main.humidity+"%");
    console.log("Wind Speed: "+response.wind.speed+" mph");
    console.log("General Conditions: "+response.weather[0].main);
    console.log("More Detailed Conditions: "+response.weather[0].description);
});

//future conditions
var queryUrlFuture = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKeyWeather;
console.log(queryUrlFuture);

$.ajax({
    url: queryUrlFuture,
    method: "GET"
}).then(function(response) {
    console.log(response);
    let futureTime = moment.unix(response.list[0].dt).format("LT");
    console.log("Forecast for "+futureTime);
    console.log("Temp: "+response.list[0].main.temp+"F");
    console.log("Humidity: "+response.list[0].main.humidity+"%");
    console.log("Wind Speed: "+response.list[0].wind.speed+" mph");
    console.log("General Conditions: "+response.list[0].weather[0].main);
    console.log("More Detailed Conditions: "+response.list[0].weather[0].description);
});