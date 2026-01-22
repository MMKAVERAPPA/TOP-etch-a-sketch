const container = document.querySelector(".container");
const generateButton = document.querySelector("#generate-button");
const changeColor = document.querySelector("#change-color");
const stopColor = document.querySelector("#stop-coloring");
const stopIncreaseOpacity = document.querySelector("#stop-changing-opacity");
const customColorButton = document.querySelector("#custom-color-button");
const disableCustom = document.querySelector("#disable-custom-color");
const decreaseOpacity = document.querySelector("#decrease-opacity");
const erase = document.querySelector("#erase");
const removeBorders = document.querySelector("#remove-borders");
const reset = document.querySelector("#reset");
const originalContainer = container.innerHTML;

let isBlack = true;
let isColorable = true;
let changeOpacity = false;
let background = "black";
let enableCustomColor = false;
let reverseChangeOpacity = false;
let eraseMode = false;

function generateGrid(pixel) {
  for (let j = 0; j < pixel; j++) {
    const row = document.createElement("div");
    row.classList = "grid-row";

    for (let i = 0; i < pixel; i++) {
      const cell = document.createElement("div");
      cell.classList = "grid-cell";
      cell.style.height = `${650 / pixel}px`;
      cell.style.width = `${650 / pixel}px`;
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

generateButton.addEventListener("click", (event) => {
  let pixel;
  while (true) {
    pixel = prompt("Enter the number of pixels");
    if (pixel == null) {
      break;
    }
    if (pixel > 0 && pixel <= 100) {
      break;
    }
  }
  container.innerHTML = originalContainer;
  generateGrid(pixel);
});

changeColor.addEventListener("click", (event) => {
  isBlack = !isBlack;
  changeColor.classList.toggle("active");
});

stopColor.addEventListener("click", (event) => {
  isColorable = !isColorable;
  const isOn = stopColor.classList.toggle("off");
  stopColor.textContent = isOn ? "Coloring: OFF" : "Coloring: ON";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    //Press Escape key to stop coloring
    isColorable = !isColorable;
    const isOn = stopColor.classList.toggle("off");
    stopColor.textContent = isOn ? "Coloring: OFF" : "Coloring: ON";
  }
});

stopIncreaseOpacity.addEventListener("click", (event) => {
  changeOpacity = !changeOpacity;
  const isOn = stopIncreaseOpacity.classList.toggle("on");
  stopIncreaseOpacity.textContent = isOn
    ? "Opacity Increase: ON"
    : "Opacity Increase: OFF";
});

decreaseOpacity.addEventListener("click", (event) => {
  reverseChangeOpacity = !reverseChangeOpacity;
  const isOn = decreaseOpacity.classList.toggle("on");
  decreaseOpacity.textContent = isOn
    ? "Opacity Manual Decrease: ON"
    : "Opacity Manual Decrease: OFF";
});

customColorButton.addEventListener("click", (event) => {
  const value = document.querySelector("#color-picker");
  background = value.value;
});

disableCustom.addEventListener("click", (event) => {
  customColorButton.disabled = !customColorButton.disabled;
  changeColor.disabled = !changeColor.disabled;
  enableCustomColor = !enableCustomColor;
  changeColor.classList.toggle("inactive");
  const isOn = disableCustom.classList.toggle("on");
  disableCustom.textContent = isOn ? "Custom Color: On" : "Custom Color: OFF";
});

erase.addEventListener("click", (event) => {
  eraseMode = !eraseMode;
  const isOn = erase.classList.toggle("on");
  erase.textContent = isOn ? "Erase: ON" : "Erase: OFF";
});

removeBorders.addEventListener("click", (event) => {
  container.classList.toggle("no-borders");
  const isOn = removeBorders.classList.toggle("off");
  removeBorders.textContent = isOn ? "Internal Grid: OFF" : "Internal Grid: ON";
});

reset.addEventListener("click", (event) => {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "";
    cell.style.opacity = "";
  });
});

container.addEventListener("mouseover", (event) => {
  const cell = event.target;

  if (!cell.classList.contains("grid-cell")) return;
  if (!isColorable) return;
  if (eraseMode) {
    cell.style.backgroundColor = "";
    cell.style.opacity = "";
    return;
  }

  if (!cell.style.backgroundColor) {
    if (enableCustomColor) {
      cell.style.backgroundColor = background;
    } else if (isBlack) {
      cell.style.backgroundColor = "black";
    } else {
      cell.style.backgroundColor = getColor();
    }
  }
  if (changeOpacity) {
    const opacity = parseFloat(cell.style.opacity) || 0;
    cell.style.opacity = Math.min(opacity + 0.1, 1);
  } else {
    cell.style.opacity = parseFloat(cell.style.opacity) || 1;
  }
});

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    if (event.ctrlKey && !reverseChangeOpacity) {
      const opacity = parseFloat(event.target.style.opacity) || 0;
      event.target.style.opacity = Math.min(opacity + 0.1, 1);
    } else if (event.ctrlKey && reverseChangeOpacity) {
      const opacity = parseFloat(event.target.style.opacity) || 0;
      event.target.style.opacity = Math.min(opacity - 0.1, 1);
    } else {
      event.target.style.backgroundColor = "";
      event.target.style.opacity = "";
    }
  }
});

function getColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}
