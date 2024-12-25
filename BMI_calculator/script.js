const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const heightInput = document.querySelector("#height");
  const weightInput = document.querySelector("#weight");
  const results = document.querySelector("#results");

  const height = parseInt(heightInput.value, 10);
  const weight = parseInt(weightInput.value, 10);

  if (!height || height <= 0) {
    results.innerHTML = `Please enter a valid height.`;
    heightInput.focus();
    return;
  }

  if (!weight || weight <= 0) {
    results.innerHTML = `Please enter a valid weight.`;
    weightInput.focus();
    return;
  }

  const bmi = (weight / (height / 100) ** 2).toFixed(2);
  results.innerHTML = `<span>Your BMI is: ${bmi}</span>`;
});
