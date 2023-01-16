'use strict';

function getUserId() {
    return localStorage.getItem('userId');
}

function getToken() {
    return localStorage.getItem('token');
}

// Vérifie si l'utilisateur est connecté ou non
function isConnected() {
    const connecting = getToken() ? true : false;
    return connecting;
}

// Affichage du message d'erreur
function displayMessage(status, info, element) {
    const message = document.createElement('div');
    message.classList.add('message', status);
    message.innerHTML = info;

    const messageEl = document.querySelector('.message');

    // Si la div n'existe pas encore
    if (messageEl === null) element.parentNode.insertBefore(message, element);
}
