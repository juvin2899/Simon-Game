var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var index=0;
$(document).keydown(function(){
    if(gamePattern.length===0)
    {
        nextSequence();
    }
});

function playSound(name)
{
    var aud= new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animatePress(currentColour){
    //console.log($('#'+currentColour));
    $('#'+currentColour).addClass("pressed");
    setTimeout(function(){
        $('#'+currentColour).removeClass("pressed");
    },100);
}


function nextSequence()
{
    level++;
    $("h1").html("Level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function checkAnswer(){
    if(gamePattern[index]===userClickedPattern[index])
    {
        index++;
        if(index===level)
        {
            index=0;
            userClickedPattern.length=0;
            setTimeout(nextSequence,1000);

        }
        //console.log(index);
    }
    else
    {
        gamePattern.length=0;
        userClickedPattern.length=0;
        level=0;
        index=0;
        //console.log(gamePattern);
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");
        },100);
        var loseaud= new Audio('sounds/wrong.mp3');
        loseaud.play();
        $("h1").html("Game Over.");
        setTimeout(function(){
            $('h1').html("Press any key to start");
        },3000);
    }
}

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer();
});
