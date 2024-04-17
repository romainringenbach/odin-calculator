const buttons = document.querySelectorAll("button");
const inputField = document.querySelector("input");

let currentInput = "";
let lastResult = 0;

// The operator functions

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b === 0){
        return "ERR"
    } else {
        return a/b;
    }
}

// The evaluation functions

function isValid(operation){
    let standartInputMatch = operation.match(/^\s*[0-9]+[\.[0-9]*]?\s*[\+|\-|x|\/]\s*[0-9]+[\.[0-9]*]?\s*$/);
    let leftValueStartWithPointMatch = operation.match(/^\s*\.[0-9]*\s*[\+|\-|x|\/]\s*[0-9]+[\.[0-9]*]?\s*$/);
    let rightValueStartWithPointMatch = operation.match(/^\s*[0-9]+[\.[0-9]*]?\s*[\+|\-|x|\/]\s*\.[0-9]*\s*$/);
    let bothValuesStartWithPointMatch = operation.match(/^\s*\.[0-9]*\s*[\+|\-|x|\/]\s*\.[0-9]*\s*$/);

    return (standartInputMatch || leftValueStartWithPointMatch || rightValueStartWithPointMatch || bothValuesStartWithPointMatch);
}

function getOperator(operation){
    let operator = null;
    if(operation.search(/\+/) >= 0){
        operator = "+";
    }
    if(operation.search(/\-/) >= 0){
        operator = "-";
    }
    if(operation.search(/x/) >= 0){
        operator = "x";
    }
    if(operation.search(/\//) >= 0){
        operator = "/";
    }
    return operator;
}

function getNumbers(operation,operator){
    operator = operator || getOperator(operation);
    const numbers = operation.split(operator);
    let a = numbers[0].trim();
    let b = numbers[1].trim();
    return {"left":+a,"right":+b};
}

function applyOperator(left,right,operator){
    let result = "ERR";
    switch (operator) {
        case "+":
            result = add(left,right);
            break;
        case "-":
            result = subtract(left,right);
            break;
        case "x":
            result = multiply(left,right);
            break;
        case "/":
            result = divide(left,right);
            break;
    
        default:
            break;
    }
    return result;
}

function evaluate(operation){
    let result = "ERR";
    if(isValid(operation)){
        let operator = getOperator(operation);
        if(operator){
            let numbers = getNumbers(operation,operator);
            if(typeof numbers.left === "number" && typeof numbers.right === "number"){
                result = applyOperator(numbers.left,numbers.right,operator);
            }
        }
    }
    return result;
}

// The available actions

function operate(){
    let equalIndex = inputField.value.search(/=/);
    if(equalIndex < 0){
        lastResult = evaluate(currentInput);
        currentInput +="="+lastResult;
        inputField.value = currentInput;
    }
}

function removeLast(){
    let equalIndex = inputField.value.search(/=/);
    if(equalIndex >= 0){
        currentInputAsArray = currentInput.split('=');
        currentInput = currentInputAsArray[0];
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    inputField.value = currentInput;
}

function clear(){
    currentInput = "";
    inputField.value = currentInput;
}

function appendNumberOrOperator(value,isOperator){
    if((currentInput.search(/=/) >= 0 || currentInput==="") && isOperator){
        currentInput=""+lastResult+value;
    } else if(currentInput.search(/=/) >= 0) {
        currentInput=value;
    } else if(isOperator && getOperator(currentInput)){

    } else {
        currentInput+=value;
    }
    inputField.value = currentInput;
}

// Handle click on a button

function actionButtonOnClick(event){
    switch (event.target.id) {
        case "clear-button":
            clear();
            break;
        case "erase-button":
            removeLast();
            break;
        case "equal-button":
            operate();
            break;
        default:
            console.warn("This button id is not recognized");
            break;
    }
}

function numberOrOperatorButtonOnClick(event){
    appendNumberOrOperator(event.target.textContent,event.target.className.search(/operator/) >= 0);
}

// Add event listeners

buttons.forEach((button) => {
    if(button.id){
        button.addEventListener("click",actionButtonOnClick);
    } else {
        button.addEventListener("click",numberOrOperatorButtonOnClick);
    }
});

inputField.addEventListener("input", () => {
    currentInput = inputField.value;
    let equalIndex = inputField.value.search(/=/);
    if(equalIndex === (currentInput.length-1)){
        currentInput = currentInput.replace(/=/, '');
        operate();
    }
});


const allowedKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","x","/",".","=","Enter","Backspace"]
inputField.addEventListener("keydown", function (event) {
    if(allowedKeys.find((element) => element === event.key)){
        if (event.key === "Enter") {
            operate();
        } else if (event.key === "Backspace") {
            event.preventDefault();
            removeLast();
        } else {
            event.preventDefault();
            appendNumberOrOperator(event.key,
                event.key === "+" ||
                event.key === "-" ||
                event.key === "x" ||
                event.key === "/"
            );
        }
    } else {
        event.preventDefault();
    }
});