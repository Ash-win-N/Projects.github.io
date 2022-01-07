'use strict';

let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');

const player0El = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');

let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let newGameBtn = document.querySelector('.btn--new');
let rollDiceBtn = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');
let diceEle = document.querySelector('.dice');

let activePlayer, currentScore, scores;
const initialize = function () {
  // Starting Conditions
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEle.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  rollDiceBtn.classList.remove('hidden');
  holdButton.classList.remove('hidden');
};
initialize();

const switchPlayers = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

rollDiceBtn.addEventListener('click', function () {
  const dicenum = Math.trunc(Math.random() * 6) + 1;
  diceEle.classList.remove('hidden');
  diceEle.src = `/PIG-GAME/imgs/dice-${dicenum}.png`;
  if (dicenum !== 1) {
    currentScore += dicenum;
    // Building id dynamically
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayers();
  }
});

holdButton.addEventListener('click', function () {
  //   adding current scr to active player
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  // check if player scr is 100,thn finish the game
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEle.classList.add('hidden');
    rollDiceBtn.classList.add('hidden');
    holdButton.classList.add('hidden');
  } else {
    if (currentScore > 0) switchPlayers();
  }
  //   switch players
});

newGameBtn.addEventListener('click', initialize);
