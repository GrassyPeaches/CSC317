const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

// --- MATHING ---
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

// TAMING THE FLOATS
const round = (val) =>
  val === "Error"
    ? "Error"
    : parseFloat(Number(val).toPrecision(12)).toString();

// CLEARING THE GRAYS FOR PRESSING BUTTONS
const clearOperatorDepressed = () => {
  keys
    .querySelectorAll("button")
    .forEach((k) => k.classList.remove("is-depressed"));
};
const setPrevType = (t) => (calculator.dataset.previousKeyType = t);

// CLICKING THE KEYS
keys.addEventListener("click", (e) => {
  const key = e.target.closest("button");
  if (!key) return;

  const action = key.dataset.action; // NUMBER KEYS ARE UNDEFINED
  const keyContent = key.textContent.trim();
  const displayedNum = display.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;

  // NEED TO CLEAR DEPRESSED FORM
  clearOperatorDepressed();

  // ---- NUMBER KEYS ----
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

  // ---- DECIMAL KEY ----
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

  // ---- NEGATIVE KEY ----
  if (action === "sign") {
    if (displayedNum === "0") {
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

  // ---- PERCENT KEY ----
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

  // ---- MY DICE 🎲 ----
  if (action === "dice") {
    // roll between 1–9
    const roll = Math.floor(Math.random() * 9) + 1;
    display.textContent = roll.toString();

    calculator.dataset.previousKeyType = "dice";

    // SWITCH CE/AC
    const clearButton = calculator.querySelector("[data-action=clear]");
    if (clearButton) clearButton.textContent = "CE";
    return;
  }

  // ---- OPERATOR KEYS ----
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

  // ---- CLEAR KEY (AC/CE) ----
  if (action === "clear") {
    if (key.textContent === "AC") {
      calculator.dataset.firstValue = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
    } else {
      key.textContent = "AC"; // switching from CE -> AC
    }
    display.textContent = "0";
    setPrevType("clear");
    return;
  }

  // ---- EQUAL KEY ----
  if (action === "calculate") {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;

    if (firstValue && operator) {
      if (previousKeyType === "calculate") {
        firstValue = displayedNum;
        secondValue = calculator.dataset.modValue;
      }
      const result = round(calculate(firstValue, operator, secondValue));
      display.textContent = result;
      calculator.dataset.firstValue = result === "Error" ? "" : result;
      //NEED TO STORE FOR DOUBLE =
      calculator.dataset.modValue = secondValue;
    }
    setPrevType("calculate");
    const clearButton = calculator.querySelector("[data-action=clear]");
    if (clearButton) clearButton.textContent = "CE";
    return;
  }
});

//added keyboard functionality

(() => {
  const keyMap = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    Enter: "calculate",
    "=": "calculate",
    ".": "decimal",
    "%": "percent",
    n: "sign",
    F9: "sign",
    d: "dice",
    Escape: "clear",
    Backspace: "clear",
  };

  const findButtonForKey = (key) => {
    if (/^\d$/.test(key)) {
      return [...keys.querySelectorAll("button")].find(
        (b) => !b.dataset.action && b.textContent.trim() === key
      );
    }
    const action = keyMap[key];
    if (!action) return null;
    return keys.querySelector(`[data-action="${action}"]`);
  };
  const isTypingInField = (el) =>
    !!el &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable);

  document.addEventListener("keydown", (e) => {
    if (isTypingInField(e.target)) return;
    const btn = findButtonForKey(e.key);
    if (!btn) return;
    e.preventDefault();
    if (e.key === "Backspace") btn.textContent = "CE";
    btn.focus();
    btn.click();
  });
})();
