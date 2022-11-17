'use strict';

// Vérifie si l'utilisateur est connecté ou non
function isConnected() {
    const connecting = localStorage.getItem('token') ? true : false;
    return connecting;
}
