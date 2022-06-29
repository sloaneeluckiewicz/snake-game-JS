// This file includes the code that makes the game work. 

"use strict";

// Declaring all variables
var gameStart= null,
    gameSpeed= null,
    gameArea= null, 
    gameAreaContext= null,
    gameAreaWidth= 0,
    gameAreaHeight= 0,
    cellWidth= 0,
    playerScore= 0,
    snake= null, 
    snakeFood= null, 
    snakeDirection= null, 
    speedSize= 0,
    timer= null;

// create the function to initialize basics of the game 
function initialize() {
    // querySelector allows you to select an element in the DOM by its id, class, or tag name
    gameStart = document.querySelector("#gameStart");
    gameSpeed = document.querySelector("#gameSpeed");
    gameArea = document.querySelector("#gameArea");
    gameAreaContext = gameArea.getContext("2d");
    gameAreaWidth = 400;
    gameAreaHeight = 600;
    cellWidth = 20;
    gameArea.width = gameAreaWidth;
    gameArea.height = gameAreaHeight;
    
    gameStart.onclick= function() {
        this.disabled = true;

        startGame();
    };

}

// create the function to start playing the game
function startGame(){
    playerScore= 0;
    snakeDirection="right";
    speedSize= parseInt(gameSpeed.value); // makes string to number/integer

    if (speedSize >9) {
        speedSize=9;
    } else if (speedSize<0) {
        speedSize=1;
    }


    // create the snake 
    snake = [];
    snake.push({x:0, y:cellWidth});
    createFood();
    clearInterval(timer);
    timer=setInterval(createGameArea, 500 / speedSize);
}

// function to create snake food
function createFood() {
    snakeFood= {
        x: Math.round((Math.random()*(gameAreaWidth - cellWidth))/ cellWidth),
        y: Math.round((Math.random()*(gameAreaHeight - cellWidth))/ cellWidth),
    };
}

// function to create the game area
function createGameArea() {
    
}
