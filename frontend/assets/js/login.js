'use strict';

const loginFormEl = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Au clic du bouton "Se connecter"
loginFormEl.addEventListener('submit', event => {
    event.preventDefault();
    sendLoginFormDatas();
});

// Envoie l'email et le mot de passe de l'utilisateur
function sendLoginFormDatas() {
    let user = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    postLoginForm(user);
}

// Soumission des données de l'utilisateur
function postLoginForm(user) {
    loadConfig().then(config => {
        fetch(config.host + 'api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                // Si l'email ou le mot de passe est incorrect
                if (!response.ok) displayError();
                return response.json();
            })
            .then(data => {
                if (data) connecting(data);
            })
            .catch(error => {
                throw new Error(error);
            });
    });
}

// Affichage du message d'erreur
function displayError() {
    const errorEl = document.querySelector('.error');

    const error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = `&times; Erreur dans l'identifiant ou le mot de passe`;

    // Si la div error n'existe pas encore
    if (errorEl === null) loginFormEl.parentNode.insertBefore(error, loginFormEl);

    // Remettre le focus sur l'input de l'email
    emailInput.focus();
}

// Connexion de l'utilisateur
function connecting(data) {
    // Redirection vers la page d'accueil
    const url = window.location.origin + '/index.html';
    window.location.replace(url);

    // Enregistrement du userId et du token
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('token', data.token);
}
