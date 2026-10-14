const { startTransition } = require("react");

let getMainPage = document.querySelector('#home-page');
let getEasyMode = document.querySelector('#easy-mode');
let getMediumeMode = document.querySelector('#mediume-mode');
let getHardMode = document.querySelector('#hard-mode');
let getGamePage = document.querySelector('#game');
let timerRuner = document.querySelector('#timer');
let getMuchingCounter = document.querySelector('#mathing-count');
let gameBorderElement = document.querySelector('#bored');
let messageElement = document.querySelector('#message');
let restartGameBtn = document.querySelector('#restart');
let getBackTohome = document.querySelector('#home');

let cards = [1,0, 3, ]

let firstCard
let secondCard
let lock


// 1. Draw out the grid to have an idea on how to start
// 2. Add event listeners to access individual cards
// 3. store the value of the card in seperate variables
