// Array of coordinates
let coordinates = [];
let coordinatesOnLoad;
let watchObject;

// Start testing stuff
// $(document).ready(function () {
//     $("#get-location").on("click", function () {
//         if (started) {
//             navigator.geolocation.clearWatch(watchObject);
//             let pathLength = geolib.getPathLength(coordinates);
//             let currentTime = coordinates[coordinates.length - 1].time.format("hh:mm:ss.S a");
//             $("#geolocation-output").append(`<p>Total distance (meters): ${pathLength}</p>
//                                              <p> Time: ${currentTime}</p>
//                                              <p>Data point total: ${coordinates.length}</p>
//                                              <p>...</p>`);
//             started = false;
//             $(this).text("Stopped... Press to Start");
//         } else {
//             if (navigator.geolocation) {
//                 let counter = 0;
//                 watchObject = navigator.geolocation.watchPosition(function (position) {
//                     started = true;
//                     if ((counter % 20) === 0) {
//                         coordinates.push({ "latitude": position.coords.latitude, "longitude": position.coords.longitude, "time": moment() });
//                     }
//                     counter++;
//                 }, function () {}, {enableHighAccuracy: true});
//                 $(this).text("Running... Press to Stop");
//             }
//         }
//     });
// });
// End testing stuff

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
    }, function () {}, {enableHighAccuracy: true});
}

/* Clear the watch function to stop recording coordinates */
function stopGPS() {
    navigator.geolocation.clearWatch(watchObject);
}

/* Returns current distance of the path in Miles with two decimal places */
function getDistance() {
    return (geolib.getPathLength(coordinates) * 0.00062137).toFixed(2);
}

function displayDistance() {
    $("#current-distance").text(getDistance() + " mi");
}