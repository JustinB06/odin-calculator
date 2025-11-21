/* An operation will be made up of: num1, 
   operator, then num2. 
   
   Three variables that store the parts of 
   the operation: 
*/
let num1, operator, num2;

let displayNumber = "00000000";
let displayNumberRef = document.querySelector("#display");

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
