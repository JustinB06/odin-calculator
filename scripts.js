/* An operation will be made up of: num1, 
   operator, then num2. 
   
   Three variables that store the parts of 
   the operation: 
*/
const DEFAULT_DISPLAY_NUMBER = "00000000";
let num1, operator, num2;

let displayNumber = DEFAULT_DISPLAY_NUMBER;
// let displayNumberRef = document.querySelector("#display");

setupEventListeners();

// ============================================================

/* 4 functions to perform the basic operations */
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

/* 
  Function to delegate the calling of
  individual operator functions.
*/
function operate(num1, operator, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    //   break;
    case "-":
      return subtract(num1, num2);
    //   break;
    case "*":
      return multiply(num1, num2);
    //   break;
    case "/":
      return divide(num1, num2);
    //   break;
  }
}

/* 
  Function will add numbers to the display number
  in the calculator UI.  

  We also update a displayNumber variable to track
  the display number internally.
*/
function addToDisplayNumber(valueToAdd) {
  let displayNumberRef = document.querySelector("#display");

  /* 
    If the displayNumber is at its default, we
    have to clear it before we add numbers to it. 
  */
  if (displayNumber === DEFAULT_DISPLAY_NUMBER) {
    displayNumber = "";
    displayNumberRef.textContent = displayNumber;
  }

  displayNumber += valueToAdd;
  displayNumberRef.textContent = displayNumber;
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
  let gridRef = document.querySelector("#grid");

  gridRef.addEventListener("click", (event) => {
    /* 
      Note that event.target is a Node
      type reference. 
        - I thought Element was the type,
        but Node is actually the parent of the 
        Element type.
    */
    let target = event.target;

    if (target.className === "number") {
      console.log(event.target.textContent);
      return addToDisplayNumber(event.target.textContent);
    }
  });
}
