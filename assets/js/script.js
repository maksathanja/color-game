let numSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay"); // for variety's sake...
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

// mode button event listener
function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    // eslint-disable-next-line no-loop-func
    modeButtons[i].addEventListener("click", () => {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}

// Squares
function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    // add click listeners to squares
    // eslint-disable-next-line no-loop-func
    squares[i].addEventListener("click", () => {
      // grab color of picked square
      const clickedColor = this.style.backgroundColor;
      // compare color to picked color
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "CORRECT!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

// Reset
function reset() {
  // generate all new colors
  colors = generateRandomColors(numSquares);
  // pick a new random color from array
  pickedColor = pickColor();
  // change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  // change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  // "Play Again" button back to "New Colors"
  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  // console.log(colors);
}

// Reset Button
resetButton.addEventListener("click", () => {
  reset();
});

function changeColors(color) {
  // loop through all colors
  for (let i = 0; i < squares.length; i++) {
    // change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  const arr = [];
  // repeat num times
  for (let i = 0; i < num; i++) {
    // get random color and push into array
    arr.push(randomColor());
  }
  // return that array
  return arr;
}

function randomColor() {
  // pick a "red" from 0 - 255
  const r = Math.floor(Math.random() * 256);
  // pick a "yellow" from 0 - 255
  const g = Math.floor(Math.random() * 256);
  // pick a "blue" from 0 - 255
  const b = Math.floor(Math.random() * 256);
  // rgb(r, g, b)
  return `rgb(${r}, ${g}, ${b})`;
}
