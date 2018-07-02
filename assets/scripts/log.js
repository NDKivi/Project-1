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
database.ref().on("child_added", function(childSnapshot) {
// console.log(childSnapshot.val());

//   // Store everything from response into variables.
var runDate = childSnapshot.val().runDate;
var temperature = childSnapshot.val().runTemp;
var time = childSnapshot.val().duration;
var distance = childSnapshot.val().dist;
var pace = childSnapshot.val().pace;
var humid = childSnapshot.val().humid;
var clouds = childSnapshot.val().clouds;

var newRow = $("<tr>").append(
  $("<td>").text(runDate),
  $("<td>").text(temperature),
  $("<td>").text(distance),
  $("<td>").text(time),
  $("<td>").text(pace),
  $("<td>").text(humid),
  $("<td>").text(clouds),
);

//   // Append the new row to the table
$("#RunBody").append(newRow);

})
});
let api = config.logKey

// Initialize Firebase
var firebaseConfig = {
  apiKey: api,
  authDomain: "running-log-e72ee.firebaseapp.com",
  databaseURL: "https://running-log-e72ee.firebaseio.com",
  projectId: "running-log-e72ee",
  storageBucket: "running-log-e72ee.appspot.com",
  messagingSenderId: "965231240004"
};
firebase.initializeApp(firebaseConfig);

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
console.log(time);
var secs = moment(time, "HH:mm.ss").format("ss");
var mins = moment(time, "HH:mm.ss").format("mm");
var secFrac = parseInt(secs)/60;
console.log(secFrac);
var hrs = moment(time, "HH:mm.ss").format("HH");
var hrMin = parseInt(hrs)*60;
var allMin = parseInt(secFrac) + parseInt(mins) + parseInt(hrMin);
console.log(mins);
console.log(hrs);
console.log(allMin);






var distance = $("#dist-input").val().trim();
// console.log(distance);
var pace = (parseInt(distance) / parseInt(allMin)*60).toFixed(2);
console.log(pace);
//need var rate = distance/time


//var corrected = moment.unix(variable that is unix).format(format desired)

// Creates local "temporary" object for holding employee data
var newrun = {
  runDate: runDate,
  runTemp: temperature,
  duration: time,
  dist: distance,
  pace: pace,
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

$("#RunBody").empty();

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
// console.log(childSnapshot.val());

//   // Store everything from response into variables.
var runDate = childSnapshot.val().runDate;
var temperature = childSnapshot.val().runTemp;
var time = childSnapshot.val().duration;
var distance = childSnapshot.val().dist;
var pace = childSnapshot.val().pace;


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
  $("<td>").text(pace),
  $("<td>").text(humid),
  $("<td>").text(clouds),
 
);

//   // Append the new row to the table
$("#RunBody").append(newRow);
});
});
})
$(document).ready(function(){
$("#saveLog").on("click", function(event) {
  event.preventDefault();

  console.log("clicked");
  console.log(currentTime);
  console.log(currentTemp);
  console.log(currentHumidity);
  console.log(currentConditions);
  let distFinal = getDistance();
  // let distFinal = "TBD"
  // console.log(distFinal);
  // console.log(date);
  let pace = "TBD";

  var newrun = {
    runDate: date,
    runTemp: currentTemp,
    duration: currentTime,
    dist: distFinal,
    pace: pace,
    humid: currentHumidity,
    clouds: currentConditions,
  };
  database.ref().push(newrun);
  $("#RunBody").empty();
  database.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());
  
  //   // Store everything from response into variables.
    var runDate = childSnapshot.val().runDate;
    var temperature = childSnapshot.val().runTemp;
    var time = childSnapshot.val().duration;
    var distance = childSnapshot.val().dist;
    var pace = childSnapshot.val().pace;
    var humid = childSnapshot.val().humid;
    var clouds = childSnapshot.val().clouds;

    var newRow = $("<tr>").append(
      $("<td>").text(runDate),
      $("<td>").text(temperature),
      $("<td>").text(distance),
      $("<td>").text(time),
      $("<td>").text(pace),
      $("<td>").text(humid),
      $("<td>").text(clouds),
    );
  
  //   // Append the new row to the table
    $("#RunBody").append(newRow);

  })
})
})
