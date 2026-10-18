


const home = document.querySelector("#home");
const game = document.querySelector("#game");
const board = document.querySelector("#board");

const timer = document.querySelector("#timer");
const matchText = document.querySelector("#matches");
const message = document.querySelector("#message");

const solo = document.querySelector("#solo");
const computer = document.querySelector("#computer");


const playerScore = document.querySelector("#playerSc");
const computerScore = document.querySelector("#computerSc");



const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");
const restartBtn = document.querySelector("#restart");
const homeBtn = document.querySelector("#homeBtn");

let emoji  = ['🏴‍☠️', '⚔️', '⚓', '⛵', '🪙', '☠️', '🦜', '🌊', '🧭', '🗺️', '💥', '🦈'];

let cards = [];
let firstCard = null;
let secondCard = null;

let pairs = 4;
let matches = 0;
let seconds = 0;

let lock = false;
let gameWon = false;

let timerId = null;
let flipId = null;

let playerSc = 0;
let computerSc = 0;

let availableCards=[];
let sortedArry = [];


function goHome() {
  restartGame();
  showHome();
}

function restartGame() {
  startGame(pairs);
}

function showGame() {
  home.style.display = "none";
  game.style.display = "block";
}

function showHome() {
  home.style.display = "block";
  game.style.display = "none";
}

function clearCards() {
  firstCard = null;
  secondCard = null;
}

function clearFlip(){
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");
}

function resetGame() {
  clearCards();
  clearInterval(timerId);
  clearTimeout(flipId);

  timerId = null;
  flipId = null;

  matches = 0;
  seconds = 0;
  lock = false;
  gameWon = false;

  timer.textContent = 0;
  matchText.textContent = 0;
  message.textContent = "";
  board.innerHTML = "";
  console.log("rested");
}


function makePairs() {
    sortedArry = emoji.slice(0, pairs);
    sortedArry = [...sortedArry, ...sortedArry];

    //cards = emoji.slice(0, pairs);
    //cards = [...cards, ...cards];
     
    //availableCards = emoji.slice(0, pairs);
    //availableCards = [...cards, ...cards];
    console.log(cards);
    shuffleCards();

}

function shuffleCards() {
  sortedArry.sort(() => Math.random() - 0.5);
  cards = sortedArry;
  availableCards = sortedArry;
  
  console.log(availableCards);
  console.log(cards);
  
  
}

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(function() {
    seconds++;
    timer.textContent = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function createCards() {
  for (let emoji of cards) {
    let card = document.createElement("div");

    card.className = "card";
    card.textContent = "?";
    card.dataset.emoji = emoji;

    card.addEventListener("click", function() {
      flipCard(card);
    });

    board.appendChild(card);
  }
}



function flipCard(card) {
  if (lock || gameWon) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;

  startTimer();

  card.classList.add("flip");
  card.textContent = card.dataset.emoji;

  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}


function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    correctMatch();
  } else {
    wrongMatch();
  }
}

function correctMatch() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matches++;
  matchText.textContent = matches;
  clearCards();
  checkWin();
  clearFlip()
}

function wrongMatch() {
  lock = true;

  flipId = setTimeout(function() {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    firstCard.textContent = "?";
    secondCard.textContent = "?";

    clearCards();
    lock = false;
  }, 1000);
}


function checkWin() {
  if (matches === pairs) {
    gameWon = true;
    stopTimer();

    message.textContent =
      " You Win in " + seconds + " seconds";
  }
}

function startGame(level) {
  pairs = level;
  resetGame();
  makePairs();
  createCards();
  showGame();
}


