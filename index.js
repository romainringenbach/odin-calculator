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