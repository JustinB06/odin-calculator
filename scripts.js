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
 *
 * It will be used to set the text on that
 * div element.
 * @type {Node}
 * @global
 */
let displayNumberRef = document.querySelector("#display");

/**
 * Stores a reference to a calculator UI
 * operator button element.
 *
 * It will be used to add CSS style to the
 * operator button that the user clicks.
 * @type {Node}
 * @global
 */
let operatorButtonRef;

/**
 * Stores a buffered reference to a calculator UI
 * operator button element.
 *
 * When an operator button reference is already
 * stored in {@link operatorButtonRef}, this
 * variable will store a second operator
 * button reference for a button that was
 * clicked by the user.
 *
 * It will be used to remove CSS styling
 * from {@link operatorButtonRef}, and add
 * CSS styling to {@link bufferedOperatorRef}.
 *
 * @type {Node}
 * @global
 */
let bufferedOperatorButtonRef;

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
function multiply(storedNum1, storedNum2) {
  return String(Number(storedNum1) * Number(storedNum2));
}

/**
 * @param {String} storedNum1 - The first operand number.
 * @param {String} storedNum2 - The second operand number.
 * @returns {String} The quotient of the two operands.
 */
function divide(storedNum1, storedNum2) {
  return String(Number(storedNum1) / Number(storedNum2));
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
      break;
    case "-":
      displayNumber = subtract(storedNum1, storedNum2);
      break;
    case "*":
      displayNumber = multiply(storedNum1, storedNum2);
      break;
    case "/":
      displayNumber = divide(storedNum1, storedNum2);
      break;
  }
  modifyDisplayNumber();
  clearData();
}

/**
 * Either resets global variables to undefined, or
 * stores previous variable values to be used in
 * future calculations.
 *
 * This is usually performed
 * after {@link operate()} executes, or
 * the calculator UI's "CLEAR" button is clicked.
 *
 * @returns {void}
 */
function clearData() {
  /* 
    If the user clicks the "=" button, we don't
    automatically use the result of the 
    calculation in the next calculation.

    If the user doesn't click the "=" button,
    then they clicked "+", "-", "*", or "/". So
    we must use the result in the calculation. 
  */
  if (bufferedOperator === "=") {
    storedNum1 = undefined;
    operator = undefined;
  } else {
    storedNum1 = displayNumber;
    operator = bufferedOperator;
  }

  storedNum2 = undefined;
  bufferedOperator = undefined;

  console.log("after clearData() executes");
  console.log(storedNum1);
  console.log(storedNum2);
  console.log(operator);
  console.log(bufferedOperator);
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
 * user in {@link operatorClicked}.
 *
 * 3. If both {@link storedNum1} and {@link storedNum2}
 * have a stored value, and {@link operatorClicked}
 * also has a stored value, then the relevant
 * operation will be performed using
 * {@link operate()}.
 *
 *
 * @param {String} operatorClicked - The type of operator button pressed by the user in the calculator UI.
 * @returns {void}
 */
function storeDisplayNumber(operatorClicked) {
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
    operator = operatorClicked;
  } else if (!bufferedOperator) {
    bufferedOperator = operatorClicked;
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

// TODO complete
function setOperatorButtonStyle(operatorClickedRef) {
  /* 
    Second, we store a reference to the operator 
    button that was clicked.

    If we have not yet stored a reference, then 
    we store it in operatorButtonRef. Otherwise,
    we use bufferedOperatorButtonRef.
  */
  if (!operatorButtonRef) {
    operatorButtonRef = operatorClickedRef;
  } else {
    bufferedOperatorButtonRef = operatorClickedRef;
  }

  /* 
    If we are not yet tracking two operator buttons,
    then we must be tracking only one. Thus, we 
    style that button.
    
    If we are tracking two operator buttons, then
    we must remove the style from the previously 
    clicked button. 
      - So we add style to recently clicked button. 

      - Lastly, we start tracking the buffered 
      operator reference only, as it's the recently 
      clicked button.
  */
  if (!bufferedOperatorButtonRef) {
    operatorButtonRef.classList.add("selected-operator");
  } else {
    operatorButtonRef.classList.remove("selected-operator");
    bufferedOperatorButtonRef.classList.add("selected-operator");

    operatorButtonRef = bufferedOperatorButtonRef;
    bufferedOperatorButtonRef = undefined;
  }
}

// TODO Add jsdoc
function operatorButtonClickEventHandler(operatorClicked, operatorClickedRef) {
  // We signal that an operator was just clicked
  operatorWasClicked = true;

  /* 
    If the "CLEAR" button operator was clicked, we
    do not store any data, we just clear data 
    and the display number.

    Otherwise, we do store data.
  */
  if (operatorClicked === "CLEAR") {
    modifyDisplayNumber(true);
    clearData();
  } else {
    storeDisplayNumber(operatorClicked);
  }

  /* // First we store the number that the user inputted
  storeDisplayNumber(operatorClicked); */

  // Second, we delegate the setting of the button's style.
  setOperatorButtonStyle(operatorClickedRef);

  // Third, we perform an operation if possible
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

    /* if (target.id === "clear-operator") {
      // clearDisplayNumber();
      modifyDisplayNumber(true);
      clearData(); 
    }*/ /* else if (target.id === "equals-operator") {
    } else */ if (target.classList.contains("number")) {
      addToDisplayNumber(target.textContent);
    } else if (target.classList.contains("operator")) {
      // storeDisplayNumber(target.textContent);
      operatorButtonClickEventHandler(target.textContent, target);
    }
  });
}
