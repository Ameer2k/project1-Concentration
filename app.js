


const home = document.querySelector("#home");
const game = document.querySelector("#game");
const board = document.querySelector("#board");

const timer = document.querySelector("#timer");
const matchText = document.querySelector("#matches");
const message = document.querySelector("#message");

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
let timerId = null;
let flipId = null;


function showGame() {
  home.style.display = "none";
  game.style.display = "block";
  easyBtn.addEventListener('click', makePairs)  

}


function showHome() {
  home.style.display = "block";
  game.style.display = "none";
}

function clearCards() {
  firstCard = null;
  secondCard = null;
}

function resetGame() {
  timerId = null;
  flipId = null;

  firstCard = null;
  secondCard = null;

  matches = 0;
  seconds = 0;
  lock = false;
}

function makePairs() {
    cards = emoji.slice(0, pairs);
    //Cards = [cards, cards].join();
    cards = [...cards, ...cards];
    createCards()
    checkWin()
    console.log(cards);
  
}

function createCards() {
  for (let emoji of cards) {
    let card = document.createElement("div");
    console.log(emoji);
    card.textContent = "?";
    card.dataset.emoji = emoji;

    card.addEventListener("click", function() {
      flipCard(card);
    });
    board.appendChild(card);
  }
}

function flipCard(card) {
  if (card === firstCard) return;
  card.textContent = card.dataset.emoji;
  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
  console.log(card);
  
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    correctMatch();
  } else {
    wrongMatch();
  }
}

function correctMatch() {
    matches++;
    matchText.textContent = matches;
}

function wrongMatch() {
  lock = true;

    flipId = setTimeout(function() {
    firstCard.textContent = "?";
    secondCard.textContent = "?";

    clearCards();
    lock = false;
  }, 1000);
}
function checkWin() {
  if (matches === pairs) {
     message.textContent = " You Win! ";
  }
}
 