const generateButtonElement = document.getElementById('generate-button');
const passwordLengthElement = document.getElementById('pass-length');
const incLowerCaseInputElement = document.getElementById('include-lowercase');
const incUpperCaseInputElement = document.getElementById('include-uppercase');
const includeNumbersInputElement = document.getElementById('include-numbers');
const includeSymbolsInputElement = document.getElementById('include-symbols');
const selectPasswordInputElement = document.getElementById('select');
const resultElement = document.getElementById('generated-password');

generateButtonElement.addEventListener('click', generateButtonHandler);

function generateButtonHandler() {
    const asciiCodes = getCodes();

    if (!asciiCodes.length) {
        resultElement.classList.add('invalid-password');
        resultElement.value = 'Please select at least one option.';
        return;
    }

    let generatedPassword = [];
    const inputPasswordLengthValue = Number(passwordLengthElement.value);
    const asciiCodesLength = asciiCodes.length;

    for (let i = 0; i < inputPasswordLengthValue; i++) {
        const generatedIndex = generateIndex(asciiCodesLength);

        generatedPassword.push(String.fromCharCode(asciiCodes[generatedIndex]));
    }

    if(resultElement.classList.contains('invalid-password')){
        resultElement.classList.remove('invalid-password');
    }

    resultElement.classList.add('valid-password');
    resultElement.value = generatedPassword.join('');

    if (selectPasswordInputElement.checked) {
        resultElement.select();
    }
}

function generateIndex(indexLimit) {
    let index = Math.floor(Math.random() * 100);

    while (index >= indexLimit) {
        index = Math.floor(Math.random() * 100);
    }

    return index;
}
function getCodes() {
    const asciiSymbols = [];

    if (incLowerCaseInputElement.checked) {
        for (let i = 97; i <= 122; i++) {
            asciiSymbols.push(i);
        }
    }

    if (incUpperCaseInputElement.checked) {
        for (let i = 65; i <= 90; i++) {
            asciiSymbols.push(i);
        }
    }

    if (includeNumbersInputElement.checked) {
        for (let i = 48; i <= 57; i++) {
            asciiSymbols.push(i);
        }
    }

    if (includeSymbolsInputElement.checked) {
        for (let i = 33; i <= 47; i++) {
            asciiSymbols.push(i);
        }

        for (let i = 58; i <= 64; i++) {
            asciiSymbols.push(i);
        }
    }

    return asciiSymbols;
}