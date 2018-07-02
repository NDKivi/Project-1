window.onload = function () {



    $("#reset").click(stopwatch.reset);
    $("#pause").click(stopwatch.pause);

};

let currentTime
var intervalId;

var clockRunning = false;

var stopwatch = {
    time: 0,

    reset: function () {
        // reset timer
        stopwatch.time = 0;

        $("#display").text("00:00:00");

    },

    pause: function () {

        // setInterval to start the count and set clock to running
        if (!clockRunning) {
            clockRunning = true;
            intervalId = setInterval(stopwatch.count, 1000);
            startGPS();

        } else {
            clearInterval(intervalId);
            clockRunning = false;
            stopGPS();
        };

    },



    count: function () {

        stopwatch.time++;

        currentTime = stopwatch.timeConverter(stopwatch.time);
        console.log("tick:", currentTime);

        $("#display").html(currentTime)
    },
    timeConverter: function (t) {

        var hours = Math.floor(t / 3600);
        var minutes = Math.floor(t % 3600 / 60);
        var seconds = Math.floor(t % 3600 % 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        if (hours === 0) {
            hours = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return hours + ":" + minutes + ":" + seconds;
    }
};

$(document).ready(function(){
 
    $("#reset").hide();
 
 $("#pause").on("click", function(){
    if ($("#reset").attr("data-state") === "hide"){
 
    $("#reset").hide();
    //change state
    $("#reset").attr("data-state", "show");
    }    else{
 
        $("#reset").show();
        //change state
        $("#reset").attr("data-state", "hide");
    }
    if ($("#saveLog").attr("data-state") === "hide"){
 
        $("#saveLog").hide();
        //change state
        $("#saveLog").attr("data-state", "show");
        }    else{
     
            $("#saveLog").show();
            //change state
            $("#saveLog").attr("data-state", "hide");
        }
})

 });


    
































