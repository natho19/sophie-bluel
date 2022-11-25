'use strict';

// Modale galerie
const galleryModal = document.querySelector('#modal-gallery');
const btnOpenGalleryModal = document.querySelector('#portfolio .edit');
const btnCloseGalleryModal = document.querySelector('#close-modal-gallery');

// Modale projet
const projectModal = document.querySelector('#modal-add-project');
const btnOpenProjectModal = document.querySelector('#add-project');
const btnCloseProjectModal = document.querySelector('#close-modal-add-project');

const overlay = document.querySelector('.overlay');
const btnArrowLeft = document.querySelector('.arrow-left');

// Ouverture de la modale galerie
function openGalleryModal() {
    galleryModal.classList.remove('hidden');
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

// Ouverture de la modale projet
function openProjectModal() {
    projectModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Fermeture de la modale galerie
function closeGalleryModal() {
    galleryModal.classList.add('hidden');
    if (!overlay.classList.contains('hidden')) overlay.classList.add('hidden');
}

// Fermeture de la modale projet
function closeProjectModal() {
    projectModal.classList.add('hidden');
    if (!overlay.classList.contains('hidden')) overlay.classList.add('hidden');
}

function closeAllModals() {
    if (!projectModal.classList.contains('hidden')) closeProjectModal();
    if (!galleryModal.classList.contains('hidden')) closeGalleryModal();
}

// Supprimer un projet
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

// Ouvrir les modales
if (btnOpenGalleryModal) btnOpenGalleryModal.addEventListener('click', openGalleryModal);
if (btnOpenProjectModal)
    btnOpenProjectModal.addEventListener('click', function () {
        closeGalleryModal();
        openProjectModal();
    });

// Fermer les modales
btnCloseGalleryModal.addEventListener('click', closeGalleryModal);
btnCloseProjectModal.addEventListener('click', closeProjectModal);

btnArrowLeft.addEventListener('click', function () {
    closeProjectModal();
    openGalleryModal();
});

// Au clic de l'overlay, fermer toutes les modales
overlay.addEventListener('click', closeAllModals);

// Esc pour fermer toutes les modales
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});
