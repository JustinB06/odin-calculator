/* Set the event listener for the calculator UI */
setupEventListener();

/**
 * Is the default number that will be displayed
 * on the calculator UI display number.
 * @type {String}
 * @global
 */
const DEFAULT_DISPLAY_NUMBER = "0";

/**
 * Stores the first operand inputted by
 * the user, to take part in a calculation.
 * @type {String}
 * @global
 */
let storedNum1;

/**
 * Stores the second operand inputted by
 * the user, to take part in a calculation.
 * @type {String}
 * @global
 */
let storedNum2;

/**
 * Stores the operator inputted by the
 * user, to take part in a calculation.
 * @type {String}
 * @global
 */
let operator;

/**
 * Stores the number that will be displayed as
 * the calculator UI display number.
 * @type {String}
 * @global
 */
let displayNumber = DEFAULT_DISPLAY_NUMBER;

/**
 * Stores a reference to the calculator UI
 * display number div element.
 * @type {Node}
 * @global
 */
let displayNumberRef = document.querySelector("#display");

// ============================================================

/* 4 functions to perform the basic operations */
/**
 * @param {String} storedNum1 - The first operand number.
 * @param {String} storedNum2 - The second operand number.
 * @returns {String} The sum of the two operands.
 */
function add(storedNum1, storedNum2) {
  return String(Number(storedNum1) + Number(storedNum2));
}

/**
 * @param {String} storedNum1 - The first operand number.
 * @param {String} storedNum2 - The second operand number.
 * @returns {String} The difference of the two operands.
 */
function subtract(storedNum1, storedNum2) {
  return String(Number(storedNum1) - Number(storedNum2));
}

/**
 * @param {String} storedNum1 - The first operand number.
 * @param {String} storedNum2 - The second operand number.
 * @returns {String} The product of the two operands.
 */
// TODO
function multiply(storedNum1, storedNum2) {
  return storedNum1 * storedNum2;
}

/**
 * @param {String} storedNum1 - The first operand number.
 * @param {String} storedNum2 - The second operand number.
 * @returns {String} The quotient of the two operands.
 */
// TODO
function divide(storedNum1, storedNum2) {
  return storedNum1 / storedNum2;
}

/**
 * Performs a calculator operation and updates the
 * calculator UI display number.
 *
 * The operation is performed using {@link add},
 * {@link subtract}, {@link multiply},
 * or {@link divide}. Utilizes global variables
 * {@link storedNum1}, {@link storedNum2}, and
 * {@link operator}.
 *
 * The update is performed using
 * {@link updateDisplayNumber()}.
 *
 * @returns {void}
 */
function operate() {
  switch (operator) {
    case "+":
      displayNumber = add(storedNum1, storedNum2);
      updateDisplayNumber();
      // console.log(displayNumber);
      break;
    case "-":
      displayNumber = subtract(storedNum1, storedNum2);
      updateDisplayNumber();
      // console.log(displayNumber);
      break;
    case "*":
      operationResult = multiply(storedNum1, storedNum2);
      break;
    case "/":
      operationResult = divide(storedNum1, storedNum2);
      break;
  }
  /* 
    Resetting variables, allowing further
    operations to continue 
  */
  storedNum1 = displayNumber;
  storedNum2 = undefined;
  operator = undefined;
  displayNumber = "";
}

/**
 * Update the calculator UI display number using
 * the value of {@link displayNumber}.
 *
 * Utilizes {@link displayNumberRef} to perform
 * the update.
 *
 * @returns {void}
 */
/* TODO I wonder if its possible to have this
function to be solely responsible for modifying
the displayNumber. 

This would include 
updateDisplayNumber(DEFAULT_DISPLAY_NUMBER)
becoming possible, to remove clearDisplayNumber().

Could I do it using optional/default parameters?*/
function updateDisplayNumber() {
  displayNumberRef.textContent = displayNumber;
}

/**
 * Will add a new digit to {@link displayNumber}
 * and/or "clear" {@link displayNumber}.
 * @param {Boolean} toClearDisplayNumber - Signals if {@link displayNumber} should be set to {@link DEFAULT_DISPLAY_NUMBER}.
 * @param {String} digitToAdd - The new digit to add to {@link displayNumber}.
 * @param {String} initialValueToSet - The new value to set {@link displayNumber} to.
 */
/* TODO Attempting to do the above, making a 
single function that will be responsible for
updating the display number in all places. */
function attemptMultipleUpdateDisplayNumber(
  toClearDisplayNumber = false,
  digitToAdd = "",
  initialValueToSet = displayNumber
) {
  // Set displayNumber to a new value
  displayNumber = initialValueToSet;

  // Add a new digit to displayNumber
  displayNumber += digitToAdd;

  /* 
    Clear the displayNumber and update the 
    calculator UI display number.
  */
  if (toClearDisplayNumber) {
    displayNumber = DEFAULT_DISPLAY_NUMBER;
    console.log("clear");
  }

  displayNumberRef.textContent = displayNumber;
}

/**
 * Clear the calculator UI display number by
 * setting {@link displayNumber} to the
 * {@link DEFAULT_DISPLAY_NUMBER}, then updating
 * the UI.
 *
 * Utilizes {@link updateDisplayNumber()} to
 * perform the update.
 *
 * @returns {void}
 */
function clearDisplayNumber() {
  displayNumber = DEFAULT_DISPLAY_NUMBER;
  updateDisplayNumber();
}

/**
 * Add a numerical digit to the calculator UI's
 * existing display number value
 * {@link displayNumber}, then update the UI.
 *
 * Utilizes {@link updateDisplayNumber()} to update
 * the UI.
 *
 * @param {String} valueToAdd - the numerical digit to add to {@link displayNumber}.
 * @returns {void}
 */
function addToDisplayNumber(digitToAdd) {
  /* 
    If the displayNumber is at its default, we
    have to make it an empty string before we add 
    numbers to it. Otherwise, we will be appending 
    numbers to "0".
      - For instance, adding "1" to "0" becomes "01".
  */
  if (displayNumber === DEFAULT_DISPLAY_NUMBER) {
    if (digitToAdd === ".") {
      // displayNumber = "0";
      attemptMultipleUpdateDisplayNumber(false, digitToAdd, "0");
    } else {
      // displayNumber = "";
      attemptMultipleUpdateDisplayNumber(false, digitToAdd, "");
    }

    /* displayNumber += digitToAdd;
    updateDisplayNumber(); */
  } else if (!(digitToAdd === "." && displayNumber.includes("."))) {
    /* 
      Ensure that a second decimal in not added
      to the displayed UI number.
    */
    /* displayNumber += digitToAdd;
    updateDisplayNumber(); */
    attemptMultipleUpdateDisplayNumber(false, digitToAdd);
  }
}

/**
 * The function will:
 * 1. Store the value of the calculator's UI display
 * number {@link displayNumber} in either
 * {@link storedNum1} or {@link storedNum2}.
 *
 * 2. Store the type of operator inputted by the
 * user in {@link operatorInputted}.
 *
 * 3. If both {@link storedNum1} and {@link storedNum2}
 * have a stored value, and {@link operatorInputted}
 * also has a stored value, then the relevant
 * operation will be performed using
 * {@link operate()}.
 *
 *
 * @param {String} operatorInputted - The type of operator button pressed by the user in the calculator UI.
 * @returns {void}
 */
function storeDisplayNumber(operatorInputted) {
  if (!storedNum1) {
    storedNum1 = displayNumber;
    clearDisplayNumber();
  } else if (!storedNum2) {
    storedNum2 = displayNumber;
    clearDisplayNumber();
  }

  if (!operator) {
    operator = operatorInputted;
  }

  console.log("before");
  console.log(storedNum1);
  console.log(storedNum2);
  console.log(operator);

  if (storedNum1 && storedNum2 && operator) {
    operate(storedNum1, operator, storedNum2);
  }
  console.log("after");
  console.log(storedNum1);
  console.log(storedNum2);
  console.log(operator);
}

/* 
  Function to setup initial event listeners
  
  - To avoid having to add an event listener to 
  every button, we'll use "Event Bubbling".
    - The click event listener will be added
    to the parent div #grid, which will be able
    to access the target reference of the 
    click event.
  
  - Note that the way we use "Event Bubbling"
  here will catch click events on empty spaces
  and row divs, not just buttons.
    - We'll have to verify that the event target
    is one we care about.

*/

/**
 * Setup an event listener for the calculator UI
 * parent #grid of buttons.
 *
 * Using event bubbling, the listener will catch
 * click events on child buttons. The handler
 * function for each click event varies depending
 * on the button type.
 */
function setupEventListener() {
  let calculatorContainerRef = document.querySelector("#calculator-container");

  calculatorContainerRef.addEventListener("click", (event) => {
    /* 
      Note that event.target is a Node
      type reference. 
        - I thought Element was the type,
        but Node is actually the parent of the 
        Element type.
    */
    let target = event.target;

    /* 
      We decide what function will handle the 
      event based on the event target.
    */
    console.log(target);

    if (target.id === "clear-operator") {
      // clearDisplayNumber();
      attemptMultipleUpdateDisplayNumber(true);
    } else if (target.id === "equals-operator") {
    } else if (target.className === "number") {
      addToDisplayNumber(target.textContent);
    } else if (target.className === "operator") {
      storeDisplayNumber(target.textContent);
    }
  });
}
