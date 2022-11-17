'use strict';

let connecting = false;

const headerEl = document.querySelector('header');
const imgEl = document.querySelector('figure img');
const introductionTitleEl = document.querySelector('#introduction h2');
const portfolioTitleEl = document.querySelector('#portfolio h2');
const logoutLink = document.querySelector('[href="login.html"]');

// Si le token est présent, l'utilisateur est connecté
if (localStorage.getItem('token')) connecting = true;

if (connecting) {
    // Création du header-top
    const headerTopEl = document.createElement('div');
    headerTopEl.classList.add('header-top');
    headerTopEl.innerHTML = `<button class="edition"><img src="./assets/icons/edit-white.png" alt="edit-black"> Mode édition</button><button class="publish">publier les changements</button>`;

    // Création du button d'édition
    const editButtonEl = document.createElement('button');
    editButtonEl.classList.add('edit');
    editButtonEl.innerHTML = `<img src="./assets/icons/edit-black.png" alt="edit-black"> modifier`;

    // Ajout des éléments au DOM
    headerEl.parentNode.insertBefore(headerTopEl, headerEl);
    imgEl.parentNode.insertBefore(editButtonEl, imgEl.nextSibling);
    introductionTitleEl.parentNode.insertBefore(editButtonEl.cloneNode(true), introductionTitleEl);
    portfolioTitleEl.parentNode.insertBefore(editButtonEl.cloneNode(true), portfolioTitleEl.nextSibling);

    // Transformer le lien login en logout
    logoutLink.textContent = 'logout';
    logoutLink.setAttribute('href', '#');

    // Au clic du lien logout, déconnecter l'utilisateur
    logoutLink.addEventListener('click', event => {
        event.preventDefault();
        
        // Supprimer le token et rafraîchir la page
        localStorage.removeItem('token');
        window.location.reload();
    });
}
