window.onload = function () {



    $("#reset").click(stopwatch.reset);
    $("#pause").click(stopwatch.pause);

};


var intervalId;

var clockRunning = false;

var stopwatch = {
    time: 0,

    reset: function () {
        // reset timer
        stopwatch.time = 0;

        $("#display").text("00:00");

    },

    pause: function () {

        // setInterval to start the count and set clock to running
        if (!clockRunning) {
            clockRunning = true;
            intervalId = setInterval(stopwatch.count, 1000);

        } else {
            clearInterval(intervalId);
            clockRunning = false
        };

    },



    count: function () {

        stopwatch.time++;

        let currentTime = stopwatch.timeConverter(stopwatch.time);
        console.log("tick:", currentTime);

        $("#display").html(currentTime)
    },
    timeConverter: function (t) {


        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
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
})
 });


    
































