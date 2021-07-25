var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started = false;
    $(".btn").click(function (){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour)
        checkAnswer(userClickedPattern.length);
    });

    $(document).keypress(function () { 
        if (!started) {
            nextSequence();
            started = true;
    }});
function nextSequence(){
        userClickedPattern=[];
        level++;
        $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);   
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    }
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]) {
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () { 
                nextSequence();
             },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").html("Game Over, Press Any Key to Restart")
      startOver();
    }
}
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
  