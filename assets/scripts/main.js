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
                                             <p>Data point total: ${coordinates.length}</p>
                                             <p>...</p>`);
            started = false;
            $(this).text("Stopped... Press to Start");
        } else {
            if (navigator.geolocation) {
                let counter = 0;
                watchObject = navigator.geolocation.watchPosition(function (position) {
                    started = true;
                    if ((counter % 20) === 0) {
                        coordinates.push({ "latitude": position.coords.latitude, "longitude": position.coords.longitude, "time": moment() });
                    }
                    counter++;
                });
                $(this).text("Running... Press to Stop");
            }
        }
    });
});