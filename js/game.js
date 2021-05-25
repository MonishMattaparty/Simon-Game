/* Initial Variables */

var gameStarted = false;
var levelCount = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

/* Keyboard Key Press Detection */

$(document).on("keydown", function () {

    if (!gameStarted) {
        level(levelCount);
        setTimeout(function () {
            toggleNextSequence();
        }, 1000);
        gameStarted = true;
    }

});

/* Touch Detection */

$("#level-title").on("touchend", function () {

    if (!gameStarted) {
        level(levelCount);
        setTimeout(function () {
            toggleNextSequence();
        }, 1000);
        gameStarted = true;
    }

});

/* Button Click Detection */

$(".btn-ext-css").on("click", function () {

    if (gameStarted) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
        playSound(userChosenColor);
        animatePress(userChosenColor);
    }

});

/* Current Level Detection */

function level (currentLevel) {
    $("#level-title").text("Level : " + currentLevel);
}

/* Next Sequence Operation */

function toggleNextSequence () {
    userClickedPattern = [];
    levelCount ++;
    level(levelCount);
    var nextSequenceIndex = nextSequence();
    var randomChosenColor = buttonColors[nextSequenceIndex];
    gamePattern.push(randomChosenColor);
    animateRandomButtonChosen(randomChosenColor);
    playSound(randomChosenColor);
}

/* Next Sequence Detection */

function nextSequence () {
    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);
    return randomNumber;
}

/* Random Chosen Button Flash Animation */

function animateRandomButtonChosen (currentRandomColor) {
    $("#" + currentRandomColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

/* User Pattern Matching With Game Pattern */

function checkAnswer (userCurrentLevel) {

    if (userClickedPattern[userCurrentLevel] === gamePattern[userCurrentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                toggleNextSequence();
            }, 1000);
        }

    }

    else {
        gameOver();
    }

}

/* Game Over Operation */

function gameOver () {
    gameOverSound();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
}

/* Game Over Sound */

function gameOverSound () {
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
}

/* Restarting Game Operation */

function startOver () {
    $("#level-title").text("Game Over, Press Any Key/Touch Here To Restart!");
    gameStarted = false;
    levelCount = 0;
    gamePattern = [];
}

/* Game Sounds */

function playSound (colorName) {
    var gameSounds = new Audio("sounds/" + colorName + ".mp3");
    gameSounds.play();
}

/* User Button Pressed Animation */

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

/* User Curiosity About Simon Game */

$("#about-history-section").slideUp();
$("#about-section").on("click", function () {
    $("#about-section").fadeOut().slideUp();
    setTimeout(function () {
        $("#about-history-section").removeClass("user-action").fadeIn().slideDown();
    }, 3000);
});
