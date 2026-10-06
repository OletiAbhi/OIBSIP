// ========================================
// CALCULATOR ELEMENTS
// ========================================

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");

const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const equalsButton = document.getElementById("equals");

const clearHistoryButton = document.getElementById("clear-history");

// ========================================
// CALCULATOR STATE
// ========================================

let currentInput = "0";
let firstNumber = null;
let operator = null;

let calculationHistory = [];
const historyList = document.getElementById("history-list");
const historyCount = document.getElementById("history-count");

// ========================================
// DISPLAY UPDATE
// ========================================

function updateDisplay() {
    resultDisplay.textContent = currentInput;
}

// ========================================
// FORMAT CALCULATION RESULT
// ========================================

function formatResult(value) {

    if (!Number.isFinite(value)) {
        return "Error";
    }

    return Number(value.toFixed(10)).toString();
}

// ========================================
// UPDATE HISTORY
// ========================================

function updateHistory(expression, result) {

    calculationHistory.unshift({
        expression: expression,
        result: result
    });

    historyList.innerHTML = "";

    calculationHistory.forEach(function(item) {

        const historyItem = document.createElement("div");

        historyItem.textContent =
            item.expression + " = " + item.result;

        historyList.appendChild(historyItem);

    });

    historyCount.textContent = calculationHistory.length;

    updateClearHistoryButton();
}

// ========================================
// CLEAR HISTORY
// ========================================

function updateClearHistoryButton() {

    clearHistoryButton.disabled =
        calculationHistory.length === 0;

}


clearHistoryButton.addEventListener("click", function() {

    if (calculationHistory.length === 0) {
        return;
    }

    calculationHistory = [];

    historyList.innerHTML = "";

    historyCount.textContent = "0";

    updateClearHistoryButton();

});

// ========================================
// NUMBER BUTTONS
// ========================================

numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const number = button.dataset.value;

        if (currentInput === "0") {
            currentInput = number;
        } else {
            currentInput += number;
        }

        updateDisplay();
    });

});


// ========================================
// DECIMAL BUTTON
// ========================================

decimalButton.addEventListener("click", function() {

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
});


// ========================================
// CLEAR BUTTON
// ========================================

clearButton.addEventListener("click", function() {

    currentInput = "0";
    firstNumber = null;
    operator = null;

    expressionDisplay.textContent = "0";

    updateDisplay();
});


// ========================================
// BACKSPACE BUTTON
// ========================================

backspaceButton.addEventListener("click", function() {

    if (currentInput.length > 1) {

        currentInput = currentInput.slice(0, -1);

    } else {

        currentInput = "0";

    }

    updateDisplay();
});


// ========================================
// OPERATOR BUTTONS
// ========================================

operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const newOperator = button.dataset.value;


        // If an operation is already waiting,
        // calculate it before accepting the new operator.
        if (firstNumber !== null && operator !== null) {

            const secondNumber = parseFloat(currentInput);

            const answer = calculate(
                firstNumber,
                secondNumber,
                operator
            );


            // Division by zero
            if (answer === null) {

                currentInput = "Error";

                expressionDisplay.textContent =
                    firstNumber +
                    " " +
                    getOperatorSymbol(operator) +
                    " 0";

                updateDisplay();

                firstNumber = null;
                operator = null;

                return;
            }


            // Use the previous answer as the
            // first number for the next operation.
            firstNumber = answer;

            currentInput = formatResult(answer);
        }

        else {

            // First operator pressed
            firstNumber = parseFloat(currentInput);

        }


        operator = newOperator;


        expressionDisplay.textContent =
            firstNumber +
            " " +
            getOperatorSymbol(newOperator);


        currentInput = "0";

        updateDisplay();

    });

});


// ========================================
// CALCULATION FUNCTION
// ========================================

function calculate(first, second, operation) {

    switch (operation) {

        case "+":
            return first + second;

        case "-":
            return first - second;

        case "*":
            return first * second;

        case "/":

            if (second === 0) {
                return null;
            }

            return first / second;

        default:
            return second;
    }
}


// ========================================
// EQUALS BUTTON
// ========================================

equalsButton.addEventListener("click", function() {

    if (firstNumber === null || operator === null) {
        return;
    }

    const secondNumber = parseFloat(currentInput);

    const answer = calculate(
        firstNumber,
        secondNumber,
        operator
    );


    // Division by zero
    if (answer === null) {

        currentInput = "Error";

        expressionDisplay.textContent =
            firstNumber + " ÷ 0";

        updateDisplay();

        firstNumber = null;
        operator = null;

        return;
    }


    // Display expression
    expressionDisplay.textContent =
        firstNumber +
        " " +
        getOperatorSymbol(operator) +
        " " +
        secondNumber;

    const calculationExpression =
    firstNumber +
    " " +
    getOperatorSymbol(operator) +
    " " +
    secondNumber;


// Display result
currentInput = formatResult(answer);

updateHistory(calculationExpression, currentInput);

updateDisplay();


    // Reset operation
    firstNumber = null;
    operator = null;

});


// ========================================
// OPERATOR DISPLAY SYMBOL
// ========================================

function getOperatorSymbol(operation) {

    switch (operation) {

        case "*":
            return "×";

        case "/":
            return "÷";

        case "-":
            return "−";

        case "+":
            return "+";

        default:
            return operation;
    }
}

// ========================================
// KEYBOARD SUPPORT
// ========================================

document.addEventListener("keydown", function(event) {

    const key = event.key;


    // Numbers
    if (key >= "0" && key <= "9") {

        const numberButton =
            document.querySelector(
                `.number[data-value="${key}"]`
            );

        if (numberButton) {
            numberButton.click();
        }

    }


    // Decimal
    else if (key === ".") {

        decimalButton.click();

    }


    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        const operatorButton =
            document.querySelector(
                `.operator[data-value="${key}"]`
            );

        if (operatorButton) {
            operatorButton.click();
        }

    }


    // Equals
    else if (key === "Enter" || key === "=") {

        equalsButton.click();

    }


    // Backspace
    else if (key === "Backspace") {

        backspaceButton.click();

    }


    // Clear
    else if (key === "Escape") {

        clearButton.click();

    }

});