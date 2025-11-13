const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

//calculating function

const calculate = (n1, operator, n2) => {
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "substract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }
  return result;
};

// listen to all keys pressed and determine the type pf key being pressed

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;

    if (!action) {
      console.log("number key!");

      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }

      calculator.dataset.previousKey = "number";
    }

    if (
      action === "add" ||
      action === "substract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator key!");
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
    }

    key.classList.add("is-depressed");
    calculator.dataset.previousKeyType = "operator";
    calculator.dataset.operator = action;

    //preventing calculations on subsequent clicking
    if (firstValue && operator && previousKeyType !== "operator") {
      display.textContent = calculate(firstValue, operator, secondValue);
    }

    if (action === "decimal") {
      console.log("decimal key!");

      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }

      calculator.dataset.previousKey = "decimal";
    }

    //changed from AC to CE when a button has been pressed
    if (action === "clear") {
      console.log("clear key!");

      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;

      calculator.dataset.previousKeyType = "clear";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    if (action === "calculate") {
      console.log("equal key!");

      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      //this is to save the second value and use it later
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

//Changing the number keys in the display

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    if (!action) {
      if (displayedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (action === "decimal") {
      display.textContent = displayedNum + ".";
    }

    //buttons operators should be shadowed showing they were pressed and in use
    if (
      action === "add" ||
      action === "substract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-depressed");

      calculator.dataset.previousKeyType = "operator";
    }

    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    //button should stop being depressed when use is stopped
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    if (action === "calculate") {
      const secondValue = displayedNum;
    }

    calculator.dataset.firstValue = displayedNum;
    calculator.dataset.operator = action;

    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);
    }
  }
});

if (!displayedNum.includes(".")) {
  display.textContent = displayedNum + ".";
}
