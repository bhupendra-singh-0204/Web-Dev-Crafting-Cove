// Selectors
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// Initial values
let password = "";
let passwordLength = 10;
let checkCount = 0;

// Initialize slider and strength indicator
handleSlider();
setIndicator("#ccc"); // Set initial indicator color to grey

// Updates the slider and display
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;

  // Update slider background based on value
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = `${
    ((passwordLength - min) * 100) / (max - min)
  }% 100%`;
}

// Updates the strength indicator color and shadow
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// Generate a random integer between min (inclusive) and max (exclusive)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Generate a random number
function generateRandomNumber() {
  return getRndInteger(0, 10);
}

// Generate a random lowercase letter
function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

// Generate a random uppercase letter
function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

// Generate a random symbol
function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

// Calculate password strength and update indicator
function calcStrength() {
  const hasUpper = uppercaseCheck.checked;
  const hasLower = lowercaseCheck.checked;
  const hasNum = numbersCheck.checked;
  const hasSym = symbolsCheck.checked;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0"); // Strong: Green
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0"); // Moderate: Yellow
  } else {
    setIndicator("#f00"); // Weak: Red
  }
}

// Copy password to clipboard
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied!";
  } catch (e) {
    copyMsg.innerText = "Failed!";
  }

  // Show copy message temporarily
  copyMsg.classList.add("active");
  setTimeout(() => copyMsg.classList.remove("active"), 2000);
}

// Shuffle characters in a string (Fisher-Yates Method)
function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
  return array.join("");
}

// Handle checkbox changes
function handleCheckBoxChange() {
  checkCount = Array.from(allCheckBox).filter(
    (checkbox) => checkbox.checked
  ).length;

  // Ensure password length is at least as long as the number of selected options
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

// Generate a new password
generateBtn.addEventListener("click", () => {
  if (checkCount === 0) return; // Exit if no checkbox is selected

  // Adjust password length if necessary
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = ""; // Reset password
  const funcArr = [];

  // Add functions based on selected options
  if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
  if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
  if (numbersCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolsCheck.checked) funcArr.push(generateSymbol);

  // Add one character from each selected option
  funcArr.forEach((func) => (password += func()));

  // Fill the remaining length with random characters
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    const randIndex = getRndInteger(0, funcArr.length);
    password += funcArr[randIndex]();
  }

  // Shuffle password and display it
  password = shufflePassword(Array.from(password));
  passwordDisplay.value = password;

  // Calculate and display password strength
  calcStrength();
});

// Attach event listeners
allCheckBox.forEach((checkbox) =>
  checkbox.addEventListener("change", handleCheckBoxChange)
);
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});
