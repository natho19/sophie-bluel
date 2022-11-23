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

    for (let i = 0; i < btnsDelete.length; i++) {
        const element = btnsDelete[i].parentElement;
        const id = Number(element.getAttribute('data-id'));
        btnsDelete[i].addEventListener('click', function () {
            deleteWork(element, id);
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

function deleteWork(element, id) {
    console.log('Identifiant à supprimer : ', id);
    console.log('Elément à supprimer : ', element);

    loadConfig().then(config => {
        fetch(config.host + 'api/works/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(response => {
                if (response.ok) element.remove();
            })
            .catch(error => {
                throw new Error(error);
            });
    });
}
