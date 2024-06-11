var gamePattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level = 0;
var started = false;

$(".startButton").click(function(){
    if (!started){
        $("h1").text("level " + level);
        newSequence();
        started=true;
    }
    
    
})

function newSequence(){
    level += 1;
    $("h1").text("level " + level);
    userClickedPattern=[]

    var randomNumber = Math.floor(Math.random() * 4);


    var randomChosenColour  = buttonColours[randomNumber];

  
    gamePattern.push(randomChosenColour);
  

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

    
}

$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1);
    
    
})

function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            newSequence();
          }, 1000);
        }
      }
      else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press start to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }



