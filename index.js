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

function evaluate(operation){
    let match = operation.match(/^\s*[0-9]+[\.[0-9]*]?\s*[\+|\-|x|\/]\s*[0-9]+[\.[0-9]*]?\s*$/);

    let result = "ERR";
    let a = null;
    let b = null;
    let operator = null;

    if(match){
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

        console.log(operator)

        if(operator){
            const numbers = operation.split(operator);
            a = numbers[0].trim();
            b = numbers[1].trim();
            
            switch (operator) {
                case "+":
                    result = add(+a,+b);
                    break;
                case "-":
                    result = subtract(+a,+b);
                    break;
                case "x":
                    result = multiply(+a,+b);
                    break;
                case "/":
                    result = divide(+a,+b);
                    break;
            
                default:
                    break;
            }
        }
    }
    return result;
}

const buttons = document.querySelectorAll("button");
const inputField = document.querySelector("input");

let currentInput = "";
let lastResult = 0;

buttons.forEach((button) => {
    button.addEventListener("click",(event) => {
        if(event.target.id){
            switch (event.target.id) {
                case "clear-button":
                    currentInput = "";
                    break;
                case "erase-button":
                    currentInput = currentInput.slice(0, -1); 
                    break;
                case "equal-button":
                    lastResult = evaluate(currentInput);
                    currentInput +="="+lastResult;
                    break;
            
                default:
                    console.warn("This button id is not recognized")
                    break;
            }
        } else { // The user clicked on a number or an operator
            if((currentInput.search(/=/) >= 0 || currentInput==="") && event.target.className.search(/operator/) >= 0){
                currentInput=""+lastResult+event.target.textContent;
            } else if(currentInput.search(/=/) >= 0) {
                currentInput=event.target.textContent;
            } else {
                currentInput+=event.target.textContent;
            }
        }
        inputField.value = currentInput;
    })
})