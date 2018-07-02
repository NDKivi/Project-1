// Array objects: coordinates recorded by browser's watch function
//                 used to calculate the distance traveled
let coordinates = [];

// Floating point: number to keep track of the total distance
//         that is incremented when clicking the stop button
//         While the stopwatch is running, the current distance 
//         is still calculated dynamically by finding the sum 
//         of this number and the length of the current coordinates
//         array.
let distanceInMiles = 0.0;

// Object: Coordinates generated on page load so we can get the weather
let coordinatesOnLoad;

// Object: Needed to stop watching for GPS data once Stop is pressed
let watchObject;

/* Prompts the user to allow geolocation, saves current coordinates in coordinatesOnLoad
and calls getWeather and getForecast to draw the weather info based on the user's coordinates */
function getCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            coordinatesOnLoad = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            };
            getWeather();
            getForecast();
        });
    }
}


/* Starts the watch to record coordinates in the coordinates array */
function startGPS() {
    watchObject = navigator.geolocation.watchPosition(function (position) {
        coordinates.push({ "latitude": position.coords.latitude, "longitude": position.coords.longitude, "time": moment() });
        displayDistance();
    }, function () { }, { enableHighAccuracy: true });
}

/* Clear the watch function to stop recording coordinates */
function stopGPS() {
    distanceInMiles += geolib.getPathLength(coordinates) * 0.00062137;
    coordinates = [];
    navigator.geolocation.clearWatch(watchObject);
}

function resetDistance() {
    distanceInMiles = 0.0;
}

/* Returns a string with the current distance of the entire run in Miles with two decimal places */
function getDistance() {
    if (watchObject) {
        return (distanceInMiles + (geolib.getPathLength(coordinates) * 0.00062137)).toFixed(2);
    } else {
        return distanceInMiles.toFixed(2);
    }
}

function displayDistance() {
    $("#current-distance").text(getDistance() + " mi");
}