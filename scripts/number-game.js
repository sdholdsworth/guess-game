//Utilize Strict Mode
'use strict';

/*
NUMBER GAME GENERAL FUNCTIONALITY:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Get Random Number (for winning number)

var getRandomNum = function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Game Values
var min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
var numberGame = document.querySelector('#number-game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
numberGame.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function () {
  var guess = parseInt(guessInput.value);

  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage('Please enter a number between ' + min + ' and ' + max, 'red');
  }

  //Check if won
  if (guess === winningNum) {
    //Game over - won
    gameOver(true, winningNum + ' is correct, YOU WIN!');

    //Change border color
    guessInput.style.border = '3px solid green';
  } else {
    //Wrong number chosen, decrement amount of guesses allowed
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //Game over - lost
      gameOver(false, 'Game Over, you lost. The correct number was ' + winningNum);
    } else {
      //Game continues - answer wrong

      //Change border color
      guessInput.style.border = '3px solid red';

      //Clear Input
      guessInput.value = '';

      //Tell user its the wrong number
      setMessage(guess + ' is not correct, ' + guessesLeft + ' guesses left', 'red');
    }
  }
});

//Game over
var gameOver = function gameOver(won, msg) {
  var color = void 0;
  won === true ? color = 'green' : color = 'red';

  //Disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set text color
  message.style.color = color;
  //Set message
  setMessage(msg);

  //Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
};

//Set message
var setMessage = function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
};
