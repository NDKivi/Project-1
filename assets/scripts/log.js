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
window.setInterval(function(){
    console.log("enter")
    var secs = moment(currentTime, "HH:mm.ss").format("ss");
  var mins = parseInt(moment(currentTime, "HH:mm.ss").format("mm"));
  var distCurrent = 10;
  console.log(mins);
  var secFrac = parseInt(secs)/60;
  console.log("secFrac", secFrac);
  var hrs = moment(currentTime, "HH:mm.ss").format("HH");
  var hrMin = parseInt(hrs)*60;
  console.log("hrmin", hrMin);
  var allMin = ((secFrac) +(mins) + (hrMin)).toFixed(2);
  console.log("allmin", allMin)



  var pace = ((distCurrent) / ((allMin)/60)).toFixed(2);
  console.log("pace to Display", pace);
  $("#current-pace").text(pace + "mph");

  }, 1000);
//Sets up the initial table of previous runs from Firebase
database.ref().on("child_added", function(childSnapshot) {


// Store everything from response into variables.
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

// Append the new row to the table
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

// 2. Button for adding runs
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
console.log("time from manual log", time);
//below is the pace variables.  We have to
//take time and convert hrs and seconds to minutes
//then we can divide distance my minutes and multiply by 60 for Mi/HR
var secs = moment(time, "HH:mm.ss").format("ss");
var mins = moment(time, "HH:mm.ss").format("mm");
var secFrac = parseInt(secs)/60;
console.log("secFrac manual", secFrac);
var hrs = moment(time, "HH:mm.ss").format("HH");
var hrMin = parseInt(hrs)*60;
var allMin = parseInt(secFrac) + parseInt(mins) + parseInt(hrMin);
console.log("manual mins", mins);
console.log("manual hrs", hrs);
console.log("manual allmins",allMin);

var distance = $("#dist-input").val().trim();
// console.log(distance);
var pace = (parseInt(distance) / parseInt(allMin)/60).toFixed(2);
console.log(pace);
//this is the object to be pushed to firebase
var newrun = {
  runDate: runDate,
  runTemp: temperature,
  duration: time,
  dist: distance,
  pace: pace,
};
// Uploads run data to the database
database.ref().push(newrun);

alert("run successfully added");

// Clears all of the text-boxes
$("#run-runDate-input").val("");
$("#temperature-input").val("");
$("#duration-input").val("");
$("#dist-input").val("");
//Hilariously, we need to empty the body of the table before we re-render
//or the entries will duplicate.
$("#RunBody").empty();

// 3. Create Firebase event for adding run to the database 
// and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot) {
// console.log(childSnapshot.val());

// Store everything from response into variables.
var runDate = childSnapshot.val().runDate;
var temperature = childSnapshot.val().runTemp;
var time = childSnapshot.val().duration;
var distance = childSnapshot.val().dist;
var pace = childSnapshot.val().pace;

// Create the new row with each returned value
var newRow = $("<tr>").append(
  $("<td>").text(runDate),
  $("<td>").text(temperature),
  $("<td>").text(distance),
  $("<td>").text(time),
  $("<td>").text(pace),
  $("<td>").text(humid),
  $("<td>").text(clouds),
 
);
// Append the new row to the table
$("#RunBody").append(newRow);
});
});
})
//This formula will control all data from the Save button
$(document).ready(function(){
$("#saveLog").on("click", function(event) {
  event.preventDefault();
//all of these variables exist in the global scope elsewhere in the script files
//for the timer, the temp and the distance
  console.log("clicked");
  console.log(currentTime);
  console.log(currentTemp);
  console.log(currentHumidity);
  console.log(currentConditions);
  let distFinal = parseInt(getDistance());
  // let distFinal = "TBD"
  console.log("dist", distFinal);
  // console.log(date);
  // let pace = "TBD";
  // The pace formula is finicky with zeros in the minute column. likes to NaN.
  var secs = moment(currentTime, "HH:mm.ss").format("ss");
  var mins = parseInt(moment(currentTime, "HH:mm.ss").format("mm"));

  console.log(mins);
  var secFrac = parseInt(secs)/60;
  console.log("secFrac", secFrac);
  var hrs = moment(currentTime, "HH:mm.ss").format("HH");
  var hrMin = parseInt(hrs)*60;
  console.log("hrmin", hrMin);
  var allMin = ((secFrac) +(mins) + (hrMin)).toFixed(2);
  var dubMin = parseInt(allMin).toFixed(2)

  console.log("dubMin", dubMin);


  var pace = (parseInt(distFinal) / (parseInt(allMin))/60).toFixed(2);
  console.log("pace", pace);

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
  
  // Store everything from response into variables.
    var runDate = childSnapshot.val().runDate;
    var temperature = childSnapshot.val().runTemp;
    var time = childSnapshot.val().duration;
    var distance = childSnapshot.val().dist;
    var pace = childSnapshot.val().pace;
    var humid = childSnapshot.val().humid;
    var clouds = childSnapshot.val().clouds;
    console.log("pace", pace)
    var newRow = $("<tr>").append(
      $("<td>").text(runDate),
      $("<td>").text(temperature),
      $("<td>").text(distance),
      $("<td>").text(time),
      $("<td>").text(pace),
      $("<td>").text(humid),
      $("<td>").text(clouds),
    );
  
  // Append the new row to the table
    $("#RunBody").append(newRow);

  })
})
})
