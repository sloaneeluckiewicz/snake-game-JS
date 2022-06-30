// This file includes the code that makes the game work. 

"use strict"; // gives an error when a variable is decalared without specifiying its type

// Declaring all variables needed in the game and set a default value
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

// create the function to initialize game canvas on the screen
function initialize() {
    // querySelector allows you to select an element by its id, class, or tag name && store as variable
    gameStart = document.querySelector("#gameStart");
    gameSpeed = document.querySelector("#gameSpeed");
    gameArea = document.querySelector("#gameArea");
    gameAreaContext = gameArea.getContext("2d");
    gameAreaWidth = 400;
    gameAreaHeight = 600;
    cellWidth = 20;
    gameArea.width = gameAreaWidth;
    gameArea.height = gameAreaHeight;
    
    // set game by clicking on 'start game' button
    gameStart.onclick= function() {
        this.disabled = true;

        startGame();
    };

}

// create the function to start playing the game
function startGame(){
    playerScore= 0; // sets initial score to 0
    snakeDirection="right"; // sets initial snake direction to the right
    speedSize= parseInt(gameSpeed.value); // makes string to number/integer to store game speed inputted by user

    if (speedSize >9) {
        speedSize=9;
    } else if (speedSize<0) {
        speedSize=1;
    }


    // create the snake 
    snake = []; // declared as array
    snake.push({x:0, y:cellWidth}); // initialized with single cell value by pushing cell width
    createFood(); // call createFood()
    clearInterval(timer); // reset timer 
    timer=setInterval(createGameArea, 500 / speedSize); // set timer according to game speed
}

// function to create snake food randomly 
function createFood() {
    snakeFood= {
        x: Math.round((Math.random()*(gameAreaWidth - cellWidth))/ cellWidth),
        y: Math.round((Math.random()*(gameAreaHeight - cellWidth))/ cellWidth),
    };
}

// function to create the game area
function createGameArea() {
    var snakeX = snake[0].x; // set initial x value
    var snakeY = snake[0].y; // set initial y value
    gameAreaContext.fillStyle = '#FFFFFF';
    gameAreaContext.fillRect(0, 0, gameAreaWidth, gameAreaHeight); // fill gameArea rectangle
    gameAreaContext.strokeStyle='#CCCCCC';
    gameAreaContext.strokeRect(0, 0, gameAreaWidth, gameAreaHeight); // fill rectangle border

    // adjust snake x & y position according to direction 
    if (snakeDirection =="right") {
        snakeX++;
    } else if (snakeDirection == "left") {
        snakeX--;
    } else if (snakeDirection == "down") {
        snakeY++;
    } else if (snakeDirection == "up"){
        snakeY--;
    }

    // check for abnormal values of snake's x & y axis
    // if there is an abnormality, call writeScore(), reset timer, stop game, restart
    if (
        snakeX == -1 ||
        snakeX == gameAreaWidth / cellWidth ||
        snakeY == -1 ||
        snakeY == gameAreaHeight / cellWidth ||
        Control(snakeX, snakeY, snake)
    ){
        writeScore();
        clearInterval(timer);
        gameStart.disabled = false;
        return;
    }

    // check if snake encounters food
    // if true add that food to the snake size and create more food
    if (snakeX == snakeFood.x && snakeY == snakeFood.y) {
        var newHead = {x:snakeX, y:snakeY};
        playerScore += speedSize;
        createFood();
    } 
    // if false, we pop a cell from the snake's size when it moves forward and assign it to newHead
    else {
        var newHead = snake.pop();
        newHead.x = snakeX;
        newHead.y = snakeY;
    }

    snake.unshift(newHead);
    for(var i = 0; i<snake.length; i++) {
        createSquare(snake[i].x, snake[i].y);
    }

    createSquare(snakeFood.x, snakeFood.y);
}

// function checks if the snake hits itself and returns true or false respectively
function Control(x,y,array) {
    for(var i =0; i< array.length; i++) {
        if(array[i].x == x && array[i].y == y)
        return true;
    } return false;
}

// prints out the user score on the screen when the game ends
function writeScore() {
    gameAreaContext.font = "50px sans-serif";
    gameAreaContext.fillStyle = "#FF1493";
    gameAreaContext.fillText(
        "Score: " + playerScore,
        gameAreaWidth / 2 - 100,
        gameAreaHeight / 2
    );
}

// define cell dimensions
function createSquare(x,y) {
    gameAreaContext.fillStyle="#000000";
    gameAreaContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
}

// changes direction of snake
function changeDirection(e) {
    // first by taking the keypress event and store the key value in a variable
    // every key on the keyboard is assigned a number
    var keys = e.which;
    // identify which key is pressed by checking its number and then move the snake in that direction
    if(keys == "40" && snakeDirection != "up") snakeDirection= "down";
    else if (keys== "39" && snakeDirection != "left") snakeDirection="right";
    else if (keys =="38" && snakeDirection !="down") snakeDirection="up";
    else if (keys == "37" && snakeDirection !="right") snakeDirection="left";
}

// when a key is pressed, changeDirection() is called
window.onkeydown = changeDirection;
// function runs whenever the window loads
window.onload= initialize;

