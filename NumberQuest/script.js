let randomNumber = Math.floor(Math.random() * 100) + 1;

const submitButton = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remainingGuesses = document.querySelector(".lastResult");
const feedbackMessage = document.querySelector(".lowOrHi");
const resultContainer = document.querySelector(".resultParas");

const newGameButtonElement = document.createElement("p");

let previousGuesses = [];
let guessCount = 1;
let isGameActive = true;

if (isGameActive) {
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const userGuess = parseInt(userInput.value);
    validateGuess(userGuess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than or equal to 1");
  } else if (guess > 100) {
    alert("Please enter a number less than or equal to 100");
  } else {
    previousGuesses.push(guess);
    if (guessCount === 5) {
      displayGuess(guess);
      displayMessage(`Game Over. The correct number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage("You guessed it right!");
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("Too low! Try again.");
  } else if (guess > randomNumber) {
    displayMessage("Too high! Try again.");
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  guessCount++;
  remainingGuesses.innerHTML = `${5 - guessCount}`;
}

function displayMessage(message) {
  feedbackMessage.innerHTML = `<h2 style="color:rgb(6, 241, 6)">${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  newGameButtonElement.classList.add("button");
  //   newGameButtonElement.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  newGameButtonElement.innerHTML = `<button id="newGame" style = "margin-top:25px">Start New Game</button>`;
  resultContainer.appendChild(newGameButtonElement);
  isGameActive = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function () {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    previousGuesses = [];
    guessCount = 1;
    guessSlot.innerHTML = "";
    remainingGuesses.innerHTML = `${5 - guessCount}`;
    userInput.removeAttribute("disabled");
    resultContainer.removeChild(newGameButtonElement);

    isGameActive = true;
  });
}
