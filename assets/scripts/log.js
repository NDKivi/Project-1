$(document).ready(function(){
   
    $("#log").hide();

$("#logBtn").on("click", function(){
    if ($("#log").attr("data-state") === "hide"){

    $("#log").show();
    //change state
    $("#log").attr("data-state", "show");
    }    else{

        $("#log").hide();
        //change state
        $("#log").attr("data-state", "hide");
    }
})
$("#addMiss").hide();

$("#missed").on("click", function(){
    if ($("#addMiss").attr("data-state") === "hide"){

    $("#addMiss").show();
    //change state
    $("#addMiss").attr("data-state", "show");
    }    else{
        $("#addMiss").hide();
        //change state
        $("#addMiss").attr("data-state", "hide");
    }
});
});
let api = config.logKey

  // Initialize Firebase
  var config = {
    apiKey: api,
    authDomain: "running-log-e72ee.firebaseapp.com",
    databaseURL: "https://running-log-e72ee.firebaseio.com",
    projectId: "running-log-e72ee",
    storageBucket: "running-log-e72ee.appspot.com",
    messagingSenderId: "965231240004"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$(document).ready(function(){
$("#add-Run-btn").on("click", function(event) {
  event.preventDefault();
  console.log("clicked")
  // Grabs user input
  var runDate = $("#Date-input").val().trim();
//   console.log(runDate);
  var temperature = $("#Temperature-input").val().trim();
//   console.log(temperature);
  var time = moment($("#time-input").val().trim(), "HH:mm.ss").format("HH:mm.ss");

  var mins = moment($("#time-input").val().trim(), "mm.ss").format("mm.ss");
  var hrMin = moment(parseInt(time)).hours();
  console.log(hrMin)
  
  var minTot = hrMin*60 + mins
  console.log(time);
  console.log(mins);
  
  var distance = $("#dist-input").val().trim();
  console.log(distance);
  var pace = (parseInt(minTot) / parseInt(distance)*60);
  console.log(pace);
  //need var rate = distance/time


  //var corrected = moment.unix(variable that is unix).format(format desired)

  // Creates local "temporary" object for holding employee data
  var newrun = {
    runDate: runDate,
    runTemp: temperature,
    duration: time,
    dist: distance
    //rate: dist/time
  };

  // Uploads employee data to the database
  database.ref().push(newrun);

  // Logs object properties to console
  // console.log(newrun.runDate);
  // console.log(newrun.runDate);
  // console.log(newrun.duration);
  // console.log(newrun.dist);

  alert("run successfully added");

  // Clears all of the text-boxes
  $("#run-runDate-input").val("");
  $("#temperature-input").val("");
  $("#duration-input").val("");
  $("#dist-input").val("");
  
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  // console.log(childSnapshot.val());

//   // Store everything from response into variables.
  var runDate = childSnapshot.val().runDate;
  var temperature = childSnapshot.val().runTemp;
  var time = childSnapshot.val().duration;
  var distance = childSnapshot.val().dist;


//   Run Info
//   console.log(runDate);
//   console.log(temperature);
//   console.log(time);
//   console.log(distance);

//   // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(runDate),
    $("<td>").text(temperature),
    $("<td>").text(distance),
    $("<td>").text(time),
   
  );

//   // Append the new row to the table
  $("#RunBody").append(newRow);
});
})

