const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

// --- math ---
const calculate = (n1, operator, n2) => {
  const a = parseFloat(n1);
  const b = parseFloat(n2);
  switch (operator) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return b === 0 ? "Error" : a / b;
    default:
      return b;
  }
};

// tame float tails (e.g., 0.30000000004 -> "0.3")
const round = (val) =>
  val === "Error"
    ? "Error"
    : parseFloat(Number(val).toPrecision(12)).toString();

// Helpers
const clearOperatorDepressed = () => {
  keys
    .querySelectorAll("button")
    .forEach((k) => k.classList.remove("is-depressed"));
};
const setPrevType = (t) => (calculator.dataset.previousKeyType = t);

// Click delegation
keys.addEventListener("click", (e) => {
  const key = e.target.closest("button");
  if (!key) return;

  const action = key.dataset.action; // undefined for number keys
  const keyContent = key.textContent.trim();
  const displayedNum = display.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;

  // clear depressed state first
  clearOperatorDepressed();

  // ---- number keys ----
  if (!action) {
    if (
      displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      display.textContent = keyContent;
    } else {
      display.textContent = displayedNum + keyContent;
    }
    setPrevType("number");
    // any non-clear turns AC into CE
    const clearButton = calculator.querySelector("[data-action=clear]");
    if (clearButton) clearButton.textContent = "CE";
    return;
  }

  // ---- decimal key ----
  if (action === "decimal") {
    if (previousKeyType === "operator" || previousKeyType === "calculate") {
      display.textContent = "0.";
    } else if (!displayedNum.includes(".")) {
      display.textContent = displayedNum + ".";
    }
    setPrevType("decimal");
    const clearButton = calculator.querySelector("[data-action=clear]");
    if (clearButton) clearButton.textContent = "CE";
    return;
  }

  // ---- sign toggle (±) ----
  if (action === "sign") {
    if (displayedNum === "0") {
      // keep 0 as 0 like iPhone
      display.textContent = "0";
    } else if (displayedNum.startsWith("-")) {
      display.textContent = displayedNum.slice(1);
    } else {
      display.textContent = "-" + displayedNum;
    }
    setPrevType("sign");
    const clearButton = calculator.querySelector("[data-action=clear]");
    if (clearButton) clearButton.textContent = "CE";
    return;
  }

  // ---- percent (%) ----
  // iPhone behavior:
  // - If there's a pending operator and a first value:
  //     add/subtract: second = first * (second/100)
  //     multiply/divide: second = second/100
  // - Otherwise: displayed = displayed/100
  if (action === "percent") {
    let current = parseFloat(displayedNum);
    if (!Number.isFinite(current)) return;

    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;

    if (firstValue && operator && previousKeyType !== "operator") {
      const a = parseFloat(firstValue);
      if (operator === "add" || operator === "subtract") {
        current = a * (current / 100);
      } else {
        current = current / 100;
      }
    } else {
      current = current / 100;
    }

    display.textContent = round(current);
    setPrevType("percent");
    const clearButton = calculator.querySelector("[data-action=clear]");
    if (clearButton) clearButton.textContent = "CE";
    return;
  }

  // ---- dice 🎲 ----
if (action === "dice") {
  // roll between 1–6 (integer)
  const roll = Math.floor(Math.random() * 6) + 1;
  display.textContent = roll.toString();

  calculator.dataset.previousKeyType = "dice";

  // switch CE/AC appropriately
  const clearButton = calculator.querySelector("[data-action=clear]");
  if (clearButton) clearButton.textContent = "CE";
  return;
}


  // ---- operator keys ----
  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
    ) {
      const result = round(calculate(firstValue, operator, secondValue));
      display.textContent = result;
      calculator.dataset.firstValue = result === "Error" ? "" : result;
    } else {
      calculator.dataset.firstValue = secondValue;
    }

    key.classList.add("is-depressed");
    calculator.dataset.operator = action;
    setPrevType("operator");

    const clearButton = calculator.querySelector("[data-action=clear]");
    if (clearButton) clearButton.textContent = "CE";
    return;
  }

  // ---- clear key (AC/CE) ----
  if (action === "clear") {
    if (key.textContent === "AC") {
      calculator.dataset.firstValue = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
    } else {
      key.textContent = "AC"; // switching CE -> AC
    }
    display.textContent = "0";
    setPrevType("clear");
    return;
  }

  // ---- equals key ----
  if (action === "calculate") {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;

    if (firstValue && operator) {
      if (previousKeyType === "calculate") {
        // Repeat last operation: "5 + =" adds last modValue again
        firstValue = displayedNum;
        secondValue = calculator.dataset.modValue;
      }
      const result = round(calculate(firstValue, operator, secondValue));
      display.textContent = result;
      calculator.dataset.firstValue = result === "Error" ? "" : result;
      calculator.dataset.modValue = secondValue; // store for repeated '='
    }
    setPrevType("calculate");
    const clearButton = calculator.querySelector("[data-action=clear]");
    if (clearButton) clearButton.textContent = "CE";
    return;
  }
});
