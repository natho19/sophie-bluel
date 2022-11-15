'use strict';

const loginFormEl = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginFormEl.addEventListener('submit', event => {
    event.preventDefault();
    sendLoginForm();
});

function sendLoginForm() {
    let user = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    postLoginForm(user);
}

function postLoginForm(user) {
    loadConfig().then(config => {
        fetch(config.host + 'api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        })
            .then(data => data.json())
            .then(response => {
                if (response.message === 'user not found') {
                    displayError();
                } else {
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    });
}

function displayError() {
    const errorEl = document.querySelector('.error');

    const error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = `&#10006; Erreur dans l'identifiant ou le mot de passe`;

    if (errorEl === null) loginFormEl.parentNode.insertBefore(error, loginFormEl);
    emailInput.focus();
}
