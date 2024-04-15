document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate-button').addEventListener('click', generatePassword);
});

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
    // combine all selected characters into one string
    const allCharacters = characters.join('');
    let password = '';
    // generate random password
    for (let i = 0; i < length; i++) {
        password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    document.getElementById('password-output').textContent = password;
}