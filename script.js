/*
  Dice Game Script

  This script implements a simple two-player dice game.
*/
'use strict';

// Selecting visual elements
const selectElement = (selector) => document.querySelector(selector);

const player = [selectElement('.player--0'), selectElement('.player--1')];
const totalScoreEl = [selectElement('#score--0'), selectElement('#score--1')];
const currentEl = [selectElement('#current--0'), selectElement('#current--1')];
const diceEl = selectElement('.dice');

// Selecting buttons
const btnNew = selectElement('.btn--new');
const btnRoll = selectElement('.btn--roll');
const btnHold = selectElement('.btn--hold');

// Global variables
let scores;
let currentScore;
let activePlayer; // Holds the information of which player is active
let gameActive; // Game state control (false when the game is over)

// Initialization function
function init() {
  // Reset all the variables and visual elements
  totalScoreEl[0].textContent = 0;
  totalScoreEl[1].textContent = 0;
  currentEl[0].textContent = 0;
  currentEl[1].textContent = 0;
  // Hide the dice
  diceEl.classList.add('hidden');
  // Remove winner class if present
  player[0].classList.remove('player--winner');
  player[1].classList.remove('player--winner');
  // Set player1 (position 0) to active
  player[1].classList.remove('player--active');
  player[0].classList.add('player--active');
  scores = [0, 0];
  currentScore = 0;
  // Reset the active player to 0
  activePlayer = 0;
  // Set gameActive to true
  gameActive = true;
}

// Initializing the game
init();

// Switch players function
function switchPlayer() {
  player[activePlayer].classList.toggle('player--active');
  currentEl[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player[activePlayer].classList.toggle('player--active');
}

// Rolling dice functionality
// As the function will not be reused, I can write it directly
btnRoll.addEventListener('click', () => {
  if (gameActive) {
    // Only executes if the game is not finished
    const dice = Math.trunc(Math.random() * 6) + 1;
    // .trunc removes the decimal part, .random gives a number between 0 and 0.999, *6 sets the range to 0 to 5.999 and +1 makes it from 1 to 6;
    diceEl.classList.remove('hidden');
    // Remove the hidden class if present
    diceEl.src = `dice-${dice}.png`;
    // Set the dice image to match the rolled number
    // If the rolled number is not a one, update the score, else switch players
    if (dice !== 1) {
      // Add the rolled number to the current score
      currentScore += dice;
      // Update the current score
      currentEl[activePlayer].textContent = currentScore;
    } else {
      // Switch the active player
      switchPlayer();
    }
  }
});

// Holding the score functionality
btnHold.addEventListener('click', () => {
  if (gameActive) {
    // Only executes if the game is not finished
    scores[activePlayer] += currentScore;
    // Adds the player current store to his total score
    totalScoreEl[activePlayer].textContent = scores[activePlayer];
    // Displays the new total score
    if (scores[activePlayer] >= 100) {
      // Player wins
      gameActive = false;
      // Game ends
      player[activePlayer].classList.add('player--winner');
      // Adds the "winner" visuals
      player[activePlayer].classList.remove('player--active');
      // Removes active class
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// New game functionality (reset the game at any point)
btnNew.addEventListener('click', init);
