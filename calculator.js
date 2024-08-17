const display = document.querySelector('.display');

function clearDisplay() {
    display.value = '';
}

function clearLastEntry() {
    display.value = display.value.slice(0, -1);
}

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    const functionsWithBrackets = ['sqrt', 'sin', 'cos', 'tan', 'log', 'ln', 'exp'];
    if (functionsWithBrackets.includes(operator)) {
        display.value += operator + '(';
    } else {
        display.value += operator;
    }
}

function calculate() {
    try {
        let result = display.value;

        // Replace scientific functions with JavaScript Math functions
        result = result.replace(/sqrt/g, 'Math.sqrt');
        result = result.replace(/sin/g, 'Math.sin');
        result = result.replace(/cos/g, 'Math.cos');
        result = result.replace(/tan/g, 'Math.tan');
        result = result.replace(/log/g, 'Math.log10');
        result = result.replace(/ln/g, 'Math.log');
        result = result.replace(/\^/g, '**'); // Replace ^ with ** for exponentiation

        // Handle percentage
        result = result.replace(/(\d+)%/g, '($1/100)');

        display.value = eval(result);
    } catch (e) {
        display.value = 'Error';
    }
}

// Memory functions
let memory = 0;

function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    display.value += memory;
}

function memoryAdd() {
    memory += parseFloat(display.value) || 0;
    clearDisplay();
}

function memorySubtract() {
    memory -= parseFloat(display.value) || 0;
    clearDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        clearLastEntry();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (['+', '-', '*', '/', '(', ')', '.', '%'].includes(key)) {
        appendOperator(key);
    }
});

// Attach event listeners to buttons
document.querySelector('.clearButton').addEventListener('click', clearDisplay);
document.querySelector('.clearLastEntryButton').addEventListener('click', clearLastEntry);
document.querySelector('.memoryClearButton').addEventListener('click', memoryClear);
document.querySelector('.memoryRecallButton').addEventListener('click', memoryRecall);
document.querySelector('.memoryAddButton').addEventListener('click', memoryAdd);
document.querySelector('.memorySubtractButton').addEventListener('click', memorySubtract);

document.querySelectorAll('.digitButton').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

document.querySelectorAll('.operatorButton').forEach(button => {
    button.addEventListener('click', () => appendOperator(button.textContent));
});

document.querySelectorAll('.additionalButton').forEach(button => {
    button.addEventListener('click', () => appendOperator(button.textContent));
});

document.querySelectorAll('.bracketButton').forEach(button => {
    button.addEventListener('click', () => appendOperator(button.textContent));
});

document.querySelector('.calculateButton').addEventListener('click', calculate);s