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
 * user, to take part in the next calculation.
 * @type {String}
 * @global
 */
let operator;

/**
 * Stores an operator inputted by the
 * user to take part in a future calculation.
 * @type {String}
 * @global
 */
let bufferedOperator;

/**
 * Signals if an operator button was just clicked.
 * Will be used to ensure that the result of an
 * operation remains on the calculator UI
 * display, instead of being set to
 * {@link DEFAULT_DISPLAY_NUMBER}.
 * @type {Boolean}
 * @global
 */
let operatorWasClicked = false;

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
      // updateDisplayNumber();
      // console.log(displayNumber);
      modifyDisplayNumber();
      break;
    case "-":
      displayNumber = subtract(storedNum1, storedNum2);
      // updateDisplayNumber();
      // console.log(displayNumber);
      modifyDisplayNumber();
      break;
    case "*":
      displayNumber = multiply(storedNum1, storedNum2);
      modifyDisplayNumber();
      break;
    case "/":
      displayNumber = divide(storedNum1, storedNum2);
      modifyDisplayNumber();
      break;
  }
  /* 
    Resetting variables, allowing further
    operations to continue 
  */
  storedNum1 = displayNumber;
  storedNum2 = undefined;
  operator = bufferedOperator;
  bufferedOperator = undefined;
  // displayNumber = "";

  console.log("after operation");
  console.log(storedNum1);
  console.log(storedNum2);
  console.log(operator);
  console.log(bufferedOperator);
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
 * 1. Will either "clear", add a new digit to, or
 * set the value of {@link displayNumber}.
 *
 * 2. Will set the calculator UI display
 * number to the value of {@link displayNumber}.
 *
 * @param {Boolean} toClearDisplayNumber - Signals if {@link displayNumber} should be set to {@link DEFAULT_DISPLAY_NUMBER}.
 * @param {String} digitToAdd - The new digit to add to {@link displayNumber}.
 * @param {String} initialValueToSet - The new value to set {@link displayNumber} to.
 * @returns {void}
 */
/* TODO Attempting to do the above, making a 
single function that will be responsible for
updating the display number in all places. */
function modifyDisplayNumber(
  toClearDisplayNumber = false,
  digitToAdd = "",
  initialValueToSet = displayNumber
) {
  /* 
    Sets displayNumber to a new value. 
    
    It must be the first step performed because the
    default value of initialValueToSet will be 
    the current value of displayNumber upon 
    calling this function. 

    initialValueToSet will not be dynamically 
    updated to the actual value of displayNumber, 
    and will get in the way of other steps in 
    the function. 
  */
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
 * Utilizes {@link modifyDisplayNumber()} to update
 * the UI. Utilizes {@link operatorWasClicked} to
 * avoid appending a digit to the result of a
 * previous operation.
 *
 * @param {String} valueToAdd - the numerical digit to add to {@link displayNumber}.
 * @returns {void}
 */
function addToDisplayNumber(digitToAdd) {
  /* 
    We do not clear the calculator UI display 
    number when we perform an operation. Thus, the 
    result of the previous operation will appear on 
    the UI.

    Thus, to avoid appending a digit to the 
    result, we set the calculator UI display 
    number to DEFAULT_DISPLAY_NUMBER
  */
  if (operatorWasClicked) {
    modifyDisplayNumber(true);
    operatorWasClicked = false;
  }

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
      modifyDisplayNumber(false, digitToAdd, "0");
    } else {
      // displayNumber = "";
      modifyDisplayNumber(false, digitToAdd, "");
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
    modifyDisplayNumber(false, digitToAdd);
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
    // clearDisplayNumber();
    // modifyDisplayNumber(true);
  } else if (!storedNum2) {
    storedNum2 = displayNumber;
    // clearDisplayNumber();
    // modifyDisplayNumber(true);
  }

  if (!operator) {
    operator = operatorInputted;
  } else if (!bufferedOperator) {
    bufferedOperator = operatorInputted;
  }

  /* if (storedNum1 && storedNum2 && operator) {
    operate(storedNum1, operator, storedNum2);
  } */
  console.log("after storage");
  console.log(storedNum1);
  console.log(storedNum2);
  console.log(operator);
  console.log(bufferedOperator);
}

function operatorButtonClickEventHandler(operatorInputted) {
  // We signal that an operator was just clicked
  operatorWasClicked = true;

  // First we store the number that the user inputted
  storeDisplayNumber(operatorInputted);

  // Second, we perform an operation if possible
  if (storedNum1 && storedNum2 && operator) {
    operate(storedNum1, operator, storedNum2);
  }
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
      modifyDisplayNumber(true);
    } else if (target.id === "equals-operator") {
    } else if (target.className === "number") {
      addToDisplayNumber(target.textContent);
    } else if (target.className === "operator") {
      // storeDisplayNumber(target.textContent);
      operatorButtonClickEventHandler(target.textContent);
    }
  });
}
