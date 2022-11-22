'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('#portfolio .edit');

// Ouverture de la modale
function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Fermeture de la modale
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

// Fermeture de la modale quand on clique sur l'overlay et sur la touche Escape
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
