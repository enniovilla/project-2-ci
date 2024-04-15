document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate-button').addEventListener('click', generatePassword);

    function generatePassword() {
        // selected options
        const length = document.getElementById('length').value;
        const useLowercase = document.getElementById('lowercase').checked;
        const useUppercase = document.getElementById('uppercase').checked;
        const useNumbers = document.getElementById('numbers').checked;
        const useSymbols = document.getElementById('symbols').checked;

        // array to store characters based on selected options
        const characters = [];
        if (useLowercase) characters.push('abcdefghijklmnopqrstuvwxyz');
        if (useUppercase) characters.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (useNumbers) characters.push('0123456789');
        if (useSymbols) characters.push('!@#$%^&*');

        // check if at least one character type is selected
        if (characters.length === 0) {
            alert('Please select at least one character type.');
            return;
        }
        let password = '';
        // ensure at least one character from each selected character type
        for (let i = 0; i < characters.length; i++) {
            password += characters[i].charAt(Math.floor(Math.random() * characters[i].length));
        }

        // fill the rest of the password with random characters
        for (let i = password.length; i < length; i++) {
            const randomTypeIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomTypeIndex].charAt(Math.floor(Math.random() * characters[randomTypeIndex].length));
        }

        // shuffle the password characters to make it more random
        password = password.split('').sort(function () {
            return Math.random() - 0.5;
        }).join('');

        document.getElementById('password-output').textContent = password;
    }

    // length value changes as the range goes up
    const lengthInput = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');

    function updateLengthValue() {
        lengthValue.textContent = lengthInput.value;
    }

    updateLengthValue();
    lengthInput.addEventListener('input', updateLengthValue);

});