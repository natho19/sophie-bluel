'use strict';

const modal = document.querySelector('.modal');
const galleryModal = document.querySelector('.modal-gallery');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('#portfolio .edit');

// Ouverture de la modale
function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    const btnsDelete = document.querySelectorAll('.delete');

    // Au clic du bouton supprimer, récupérer l'id du projet à supprimer
    for (let i = 0; i < btnsDelete.length; i++) {
        const id = Number(btnsDelete[i].parentElement.getAttribute('data-id'));
        btnsDelete[i].addEventListener('click', function () {
            // Après confirmation, supprimer le projet
            if (window.confirm('Voulez-vous vraiment supprimer ce projet ?')) deleteWork(id);
        });
    }
}

// Fermeture de la modale
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

if (btnOpenModal) btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

// Fermeture de la modale quand on clique sur l'overlay et sur la touche Escape
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

function deleteWork(id) {
    // Récupérer tous les projets du DOM à supprimer (sur la page d'accueil et dans la modale)
    const elements = document.querySelectorAll(`[data-id="${id}"]`);

    loadConfig().then(config => {
        fetch(config.host + 'api/works/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(response => {
                // Après confirmation de la suppression en base de données
                if (response.ok) {
                    // Supprimer les éléments du DOM
                    elements.forEach(element => {
                        element.remove();
                    });
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    });
}
