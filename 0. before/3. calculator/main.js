const numBtns = document.querySelectorAll("#num-btn");
const operatorBtn = document.querySelectorAll("#operator-btn");
const dotBtn = document.querySelector("#dot-btn");
const equalBtn = document.querySelector("#equal-btn");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const topOutput = document.querySelector("#top-output");
const curOutput = document.querySelector("#cur-output");

let firstNumber = "";
let lastNumber = "";
let operator = "";
let isOperator = false;
let isSecond = false;
let isDotted = false;

numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!isSecond) {
      if (firstNumber === "0") {
        firstNumber = "";
        firstNumber += btn.innerText;
      } else {
        firstNumber += btn.innerText;
      }
    } else {
      if (lastNumber === "0") {
        lastNumber = "";
        lastNumber += btn.innerText;
      } else {
        lastNumber += btn.innerText;
      }
    }
    updateOutput();
  });
});

operatorBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (firstNumber === "") {
      firstNumber = "0";
    }
    switch (i) {
      // multiply
      case 0:
        operator = "*";
        break;
      // divide
      case 1:
        operator = "/";
        break;
      // minus
      case 2:
        operator = "-";
        break;
      // plus
      case 3:
        operator = "+";
        break;
    }

    if (!isOperator) {
      updateOutput();
      changeOutputs();
    }
    isOperator = true;
  });
});

equalBtn.addEventListener("click", () => {
  updateOutput();
  calculateOutput();
});

clearBtn.addEventListener("click", () => {
  firstNumber = "";
  lastNumber = "";
  operator = "";
  updateOutput();
});

deleteBtn.addEventListener("click", () => {
  if (!isSecond) {
    firstNumber = firstNumber.slice(0, -1);
  } else {
    lastNumber = lastNumber.slice(0, -1);
  }
  updateOutput();
});

dotBtn.addEventListener("click", () => {
  if (!isDotted) {
    if (!isSecond) {
      if (firstNumber == "") {
        firstNumber += "0.";
      } else {
        firstNumber += ".";
      }
    } else {
      if (lastNumber == "") {
        lastNumber += "0.";
      } else {
        lastNumber += ".";
      }
    }
    isDotted = true;
    updateOutput();
  }
});

function updateOutput() {
  if (!isSecond) {
    curOutput.innerText = firstNumber;
  } else {
    curOutput.innerText = lastNumber;
  }

  if (operator) {
    if (!isSecond) {
      curOutput.innerText += " " + operator;
    }
  }
}

function changeOutputs() {
  isSecond = true;
  topOutput.innerText = curOutput.innerText;
  curOutput.innerText = "";
}

function calculateOutput() {
  isOperator = false;
  let result = 0;
  topOutput.innerText += " " + curOutput.innerText;
  switch (operator) {
    case "*":
      result = +firstNumber * +lastNumber;
      break;
    case "/":
      result = +firstNumber / +lastNumber;
      break;
    case "-":
      result = +firstNumber - +lastNumber;
      break;
    case "+":
      result = +firstNumber + +lastNumber;
      break;
  }
  firstNumber = result.toString();
  curOutput.innerText = result;
  resetSecond();
}

function resetSecond() {
  lastNumber = "";
  operator = "";
  isSecond = false;
  topOutput.innerText += " = " + firstNumber;

  if (firstNumber.includes(".")) {
    isDotted = true;
  }
}

// Debugging:
// document.body.addEventListener("click", () => {
// });

const btns = document.querySelectorAll(".btn");

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Digit0":
    case "Digit1":
    case "Digit2":
    case "Digit3":
    case "Digit4":
    case "Digit5":
    case "Digit6":
    case "Digit7":
    case "Digit8":
    case "Digit9":
      btns.forEach((btn) => {
        if (btn.innerText === e.code.toString().slice(-1)) {
          btn.click();
        }
      });
      break;
    case "NumpadMultiply":
      operatorBtn[0].click();
      break;
    case "Slash":
    case "NumpadDivide":
      operatorBtn[1].click();
      break;
    case "Minus":
      operatorBtn[2].click();
      break;
    case "NumpadAdd":
      operatorBtn[3].click();
      break;
    case "Period":
      dotBtn.click();
      break;
    case "Equal":
      equalBtn.click();
      break;
    case "Backspace":
      deleteBtn.click();
      break;
    case "Escape":
      clearBtn.click();
      break;
    default:
      break;
  }
});
