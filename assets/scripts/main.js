// Array of coordinates
let coordinates = [];
let started = false;
let watchObject;

$(document).ready(function () {
    $("#get-location").on("click", function () {
        if (started) {
            navigator.geolocation.clearWatch(watchObject);
            let pathLength = geolib.getPathLength(coordinates);
            let currentTime = coordinates[coordinates.length - 1].time.format("hh:mm:ss.S a");
            $("#geolocation-output").append(`<p>Total distance (meters): ${pathLength}</p>
                                             <p> Time: ${currentTime}</p>
                                             <p>...</p>`);
            started = false;
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function () {
                    watchObject = navigator.geolocation.watchPosition(function (position) {
                        coordinates.push({ "latitude": position.coords.latitude, "longitude": position.coords.longitude, "time": moment()});
                        started = true;
                    });
                });
            } 
        }
    });
});