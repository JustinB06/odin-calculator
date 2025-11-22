/* An operation will be made up of: storedNum1, 
   operator, then storedNum2. 
   
   Three variables that store the parts of 
   the operation: 
*/
const DEFAULT_DISPLAY_NUMBER = "0";
let storedNum1, operator, storedNum2;

let displayNumber = DEFAULT_DISPLAY_NUMBER;
let displayNumberRef = document.querySelector("#display");

setupEventListeners();

// ============================================================

/* 4 functions to perform the basic operations */
function add(storedNum1, storedNum2) {
  return String(Number(storedNum1) + Number(storedNum2));
}

function subtract(storedNum1, storedNum2) {
  return String(Number(storedNum1) - Number(storedNum2));
}

function multiply(storedNum1, storedNum2) {
  return storedNum1 * storedNum2;
}

function divide(storedNum1, storedNum2) {
  return storedNum1 / storedNum2;
}

/* 
  Function to delegate the calling of
  individual operator functions.
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

// ============================================================

/* 
  Update the UI display number using the value of
  the internal display number tracker.
*/
function updateDisplayNumber() {
  displayNumberRef.textContent = displayNumber;
}

/* 
  Clear the UI display number by making the 
  internal display number tracker an empty string.
*/
function clearDisplayNumber() {
  displayNumber = "0";
  updateDisplayNumber();
}

/* 
  Function will add numbers to the display number
  in the calculator's UI.  

  We also update a displayNumber variable to track
  the display number internally.
*/
function addToDisplayNumber(valueToAdd) {
  /* 
    If the displayNumber is at its default, we
    have to make it an empty string before we add 
    numbers to it. Otherwise, we will be appending 
    numbers to "0".
      - For instance, adding "1" to "0" becomes "01".
  */
  if (displayNumber === DEFAULT_DISPLAY_NUMBER) {
    if (valueToAdd === ".") {
      displayNumber = "0";
    } else {
      displayNumber = "";
    }

    displayNumber += valueToAdd;
    updateDisplayNumber();
  } else if (!(valueToAdd === "." && displayNumber.includes("."))) {
    /* 
      Ensure that a second decimal in not added
      to the displayed UI number.
    */
    displayNumber += valueToAdd;
    updateDisplayNumber();
  }
}

/* 
  Function will store the current display number 
  in the calculator's UI, as well as the operator
  if one was pressed.

  If 2 numbers are stored and an operator is 
  stored, the operation will be performed using
  operate().
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
function setupEventListeners(event) {
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
      clearDisplayNumber();
    } else if (target.id === "equals-operator") {
    } else if (target.className === "number") {
      addToDisplayNumber(target.textContent);
    } else if (target.className === "operator") {
      storeDisplayNumber(target.textContent);
    }
  });
}
