'use strict';

function getToken() {
    return localStorage.getItem('token');
}

// Vérifie si l'utilisateur est connecté ou non
function isConnected() {
    const connecting = getToken() ? true : false;
    return connecting;
}
