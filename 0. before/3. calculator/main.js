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
    updateOutput();
    changeOutputs();
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

    if (firstNumber === "") {
      firstNumber = "0";
      updateOutput();
    }
  }
}

function changeOutputs() {
  isSecond = true;
  topOutput.innerText = curOutput.innerText;
  curOutput.innerText = "";
}

function calculateOutput() {
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
  lastNumber = "";
  operator = "";
  isSecond = false;
  topOutput.innerText += " = " + firstNumber;
  curOutput.innerText = result;
}

document.body.addEventListener("click", () => {
  console.log(firstNumber);
  console.log(lastNumber);
  console.log(operator);
  console.log(topOutput.innerText);
  console.log(curOutput.innerText);
});
