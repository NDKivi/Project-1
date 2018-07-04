// Array of objects: coordinates recorded by browser's watch function
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

/* 
Prompts the user to allow geolocation, saves current coordinates in coordinatesOnLoad
and calls getWeather and getForecast to draw the weather info based on the user's coordinates 
@params: none
@returns: none
*/
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


/* 
Starts the watch to record coordinates in the coordinates array 
@returns: none
@params: none
*/
function startGPS() {
    watchObject = navigator.geolocation.watchPosition(function (position) {
        let newCoordinates = { "latitude": position.coords.latitude, "longitude": position.coords.longitude, "time": moment(), "accuracy": position.coords.accuracy };
        console.log(newCoordinates);

        /* Require all data points to have accuracy of less than 15 meters */
        if (newCoordinates.accuracy < 15) {

            /* For the first data point, record it no matter what. */ 
            if (coordinates.length === 0) {
                coordinates.push(newCoordinates);
            }
            /*  For subsequent data points,
            make sure that the new coordinates are more than 3 meters from the previously recorded
            point and the new coordinates are distinct beyond the accuracy level for the previously
            recorded point and the new point.  */
            else {
                let legDistance = geolib.getDistance(coordinates[coordinates.length - 1], newCoordinates);
                let legAccuracy = 0.5 * (coordinates[coordinates.length - 1].accuracy + newCoordinates.accuracy);
                if ((legDistance > 3) && (legDistance >= legAccuracy)) {
                    coordinates.push(newCoordinates);
                }
            }
        }
        displayDistance();
    }, function () { }, { enableHighAccuracy: true });
}

/* 
Clear the watch function to stop recording coordinates 
@params: none
@returns: none
*/
function stopGPS() {
    distanceInMiles += geolib.getPathLength(coordinates) * 0.00062137;
    coordinates = [];
    navigator.geolocation.clearWatch(watchObject);
}

/*  
Reset the accumulated distance (that is incremented when the watch is stopped) to 0
@params: none
@returns none
*/
function resetDistance() {
    distanceInMiles = 0.0;
}

/* 
Returns a string with the current distance of the entire run in Miles with two decimal places 
@params: none
@returns: none
*/
function getDistance() {
    if (watchObject) {
        return (distanceInMiles + (geolib.getPathLength(coordinates) * 0.00062137)).toFixed(2);
    } else {
        return distanceInMiles.toFixed(2);
    }
}

/*
Displays the current distance in the DOM
@params: none
@returns: none
*/
function displayDistance() {
    $("#current-distance").text(getDistance() + " mi");
}