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

const uploadImageInput = document.querySelector('.upload-file');
const uploadContent = document.querySelector('#upload-content');
const uploadGroup = document.querySelector('#upload-group');

const projectFormEl = document.querySelector('#add-project-form');

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
            if (window.confirm('Voulez-vous vraiment supprimer ce projet ?')) {
                deleteWork(id);
                alert('Projet supprimé avec succès');
            }
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

// Uploader une image
function uploadImage() {
    if (uploadImageInput.files && uploadImageInput.files[0]) {
        const reader = new FileReader(); // Pour lire le fichier sélectionné
        const image = new Image();
        const fileName = uploadImageInput.files[0].name;

        reader.onload = e => {
            image.src = e.target.result; // Ajoute le src de l'image en base64
            image.alt = fileName.split('.')[0];
        };

        uploadGroup.style.visibility = 'hidden';
        reader.readAsDataURL(uploadImageInput.files[0]);
        uploadContent.appendChild(image);
    }
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

// Quand on veut ajouter une photo
uploadImageInput.addEventListener('change', function () {
    uploadImage();
});

// Soumission du formulaire
projectFormEl.addEventListener('submit', event => {
    event.preventDefault();

    loadConfig().then(config => {
        fetch(config.host + 'api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            body: new FormData(projectFormEl),
        })
            .then(response => {
                if (!response.ok) {
                    displayMessage(
                        'error',
                        "&times; Le formulaire n'est pas correctement rempli",
                        projectFormEl
                    );
                } else {
                    displayMessage('success', '&check; Photo ajoutée avec succès', projectFormEl);
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    });
});
