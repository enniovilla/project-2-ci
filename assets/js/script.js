document.addEventListener('DOMContentLoaded', function () {
    // moved declaration outside of the event listener
    const savedPasswordsDiv = document.getElementById('saved-passwords');

    document.getElementById('generate-button').addEventListener('click', generatePassword);

    // function to delete all passwords
    function deleteAllPasswords() {
        // reset confirmationShown to false
        confirmationShown = false;

        // check if there are any saved passwords
        if (savedPasswordsDiv.children.length === 0) {
            // no passwords to delete, show an alert
            Swal.fire({
                title: "You don't have passwords to delete.",
                color: '#000000',
                background: '#efefd0'
            });
            return;
        }

        // ask the user for confirmation before deleting all passwords
        const confirmDeleteAll = Swal.fire({
            title: 'Are you sure you want to delete all passwords?',
            text: 'This action cannot be undone.',
            background: '#efefd0',
            color: '#000000',
            icon: 'warning',
            iconColor: '#a30000',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#a30000',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    iconColor: '#008000',
                    color: '#000000',
                    text: 'Your passwords have been deleted.',
                    background: '#efefd0',
                    icon: 'success'
                });
                // clear the saved passwords div
                savedPasswordsDiv.innerHTML = '';
            }
        });
    }

    // initialize a variable to track if confirmation has been shown
    let confirmationShown = false;

    // add event listener to the "Delete All Passwords" button
    document.getElementById('delete-all').addEventListener('click', function () {
        deleteAllPasswords();
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
            Swal.fire({
                title: 'Please select at least one character type.',
                color: '#000000',
                background: '#efefd0'
            });
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

    // show a password as soon as the page is loaded/reloaded
    generatePassword();

    // length value changes as the range goes up
    const lengthInput = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');

    function updateLengthValue() {
        lengthValue.textContent = lengthInput.value;
    }

    updateLengthValue();
    lengthInput.addEventListener('input', updateLengthValue);

    // FAQ accordion animation
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            const body = accordion.querySelector('.accordion-body');
            body.classList.toggle('active');
        });
    });

    // save generated password when the save button is clicked
    document.getElementById('save-button').addEventListener('click', savePassword);

    function savePassword() {
        const generatedPassword = document.getElementById('password-output').textContent;

        // check if the generated password is already saved
        const savedPasswords = savedPasswordsDiv.querySelectorAll('div');
        for (let i = 0; i < savedPasswords.length; i++) {
            if (savedPasswords[i].textContent === generatedPassword) {
                Swal.fire({
                    title: 'This password is already saved.',
                    color: '#000000',
                    background: '#efefd0'
                });
                return;
            }
        }

        // max saved passwords = 10
        if (savedPasswordsDiv.children.length >= 10) {
            // inform the user that they need to delete a password before saving a new one
            Swal.fire({
                title: 'You already have 10 saved passwords. Please delete one of them before saving a new password.',
                color: '#000000',
                background: '#efefd0'
            });
            return;
        }

        // create a new div element to hold the saved password
        const passwordDiv = document.createElement('div');
        passwordDiv.textContent = generatedPassword;

        // create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can fa-lg"></i>';

        // add style to delete button
        deleteButton.style.color = 'red';
        deleteButton.style.border = 'none';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.marginLeft = '5px';

        // add event listener for the delete button
        deleteButton.addEventListener('click', function () {
            deletePassword(passwordDiv);
        });

        // append the delete button and saved password div to the #saved-passwords div
        passwordDiv.appendChild(deleteButton);
        savedPasswordsDiv.appendChild(passwordDiv);

        // alert user that the password has been saved
        Swal.fire({
            title: 'Password saved successfully!',
            color: '#000000',
            background: '#efefd0'
        });
    }

    // function to delete a single password
    function deletePassword(passwordDiv) {
        const confirmDelete = Swal.fire({
            title: 'Are you sure you want to delete this password?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            color: '#000000',
            iconColor: '#a30000',
            background: '#efefd0',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#a30000',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                // remove the password div if the user confirms
                savedPasswordsDiv.removeChild(passwordDiv);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your password has been deleted.',
                    color: '#000000',
                    iconColor: '#008000',
                    background: '#efefd0',
                    icon: 'success'
                });
            }
        });
    }
});