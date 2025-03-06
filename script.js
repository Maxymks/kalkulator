const display = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll(".calculator-keys>button");

let buttonNum = [];
let buttonOperator = [];
let buttonFunction = [];
let cache = [];
let cacheValue = "";
let currentOperator = null;

buttons.forEach((button) => {
    if (button.classList.contains('operator')) {
        buttonOperator.push(button);
        const operator = button.value;
        switch (operator) {
            case '+':
                button.addEventListener('click', () => {
                    handleOperator('+');
                });
                break;
            case '-':
                button.addEventListener('click', () => {
                    handleOperator('-');
                });
                break;
            case '*':
                button.addEventListener('click', () => {
                    handleOperator('*');
                });
                break;
            case '/':
                button.addEventListener('click', () => {
                    handleOperator('/');
                });
                break;
        }
    } else if (button.classList.contains('decimal')) {
        buttonFunction.push(button);
        button.addEventListener('click', () => {
            addDecimal();
        });
    } else if (button.classList.contains('all-clear')) {
        buttonFunction.push(button);
        button.addEventListener('click', () => {
            clearDisplay();
        });
    } else if (button.classList.contains('equal-sign')) {
        buttonFunction.push(button);
        button.addEventListener('click', () => {
            calculateResult();
        });
    } else {
        buttonNum.push(button);
        button.addEventListener('click', (e) => {
            appendNumber(e.target.value);
        });
    }
});

function appendNumber(value) {
    if (cacheValue === "0") {
        cacheValue = value;
    } else {
        cacheValue += value;
    }
    updateDisplay();
}

function addDecimal() {
    if (!cacheValue.includes('.')) {
        cacheValue += '.';
        updateDisplay();
    }
}

function handleOperator(operator) {
    if (cacheValue === "") return;

    if (cache.length === 0) {
        cache.push(parseFloat(cacheValue));
    } else if (currentOperator) {
        calculateResult();
    }

    currentOperator = operator;
    cacheValue = "";
}

function calculateResult() {
    if (cache.length === 0 || cacheValue === "") return;

    cache.push(parseFloat(cacheValue));

    let result;
    switch (currentOperator) {
        case '+':
            result = cache[0] + cache[1];
            break;
        case '-':
            result = cache[0] - cache[1];
            break;
        case '*':
            result = cache[0] * cache[1];
            break;
        case '/':
            result = cache[1] !== 0 ? cache[0] / cache[1] : "Błąd";
            break;
        default:
            return;
    }

    cache = [result];
    cacheValue = result.toString();
    currentOperator = null;
    updateDisplay();
}

function clearDisplay() {
    cacheValue = "";
    cache = [];
    currentOperator = null;
    updateDisplay();
}

function updateDisplay() {
    display.value = cacheValue || "0";
}
function equal(){
    // Sprawdź, jaki operator został wybrany jako ostatni i czy została podana liczba, wtedy wykonaj działanie ostatniego operatora.
    // Jeśli nie podano liczby, a kliknięto operator, wyświetl wartość z pamięci podręcznej (cache).
}

// Metoda/funkcja mnożenia

// Metoda/funkcja dzielenia

// Metoda/funkcja dodawania liczb zmiennoprzecinkowych: dodawany jest przecinek, a wartości float muszą zawierać kropkę (np. 1.2 zamiast 1,2).

// Te zmienne nie są wykorzystywane. Dodaje się do nich przyciski z kalkulatora, ale potem nie są używane.
// Pasowałoby je usunąć z kodu.
// let buttonNum = [];
// let buttonOperator = [];
// let buttonFunction = [];

// Gdy wszystko będzie działać, dopisz komentarze wyjaśniające działanie kodu oraz udokumentuj go w plikach Markdown dokumentacji:
// https://github.com/Code-V-Craft/Documentation
// Ten kod powinien być w Moduł 0: Kalkulator