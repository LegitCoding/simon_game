var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

$(document).keypress(function(){
    if(!isGameStarted){
      $("#level-title").text("Level "+ level);
      nextSequence();
      isGameStarted = true;
    }
});


$(".btn").click(function(event){
var userChosenColour = $(this).attr("id");

userClickedPattern.push(userChosenColour);
console.log(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
 var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
        nextSequence();
        }, 1000);

    }
  } else{
    console.log("wrong");
    wrongAnswerSound();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
 console.log(currentLevel);
}

function startOver(){
level = 0;
gamePattern = [];
isGameStarted = false;
}



function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function wrongAnswerSound(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

function animatePress(currentColor) {
$("#" + currentColor).addClass("pressed");
setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
}, 100);
}
