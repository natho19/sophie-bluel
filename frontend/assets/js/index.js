'use strict';

const filtersEl = document.querySelectorAll('.filter');
const galleryEl = document.querySelector('.gallery');
const projectsListEl = document.querySelector('.projects-list');

loadConfig().then(config => {
    fetch(config.host + 'api/works')
        .then(data => data.json())
        .then(works => {
            const worksSet = new Set(works);

            // Affichage de tous les travaux par défaut
            for (const work of worksSet) {
                displayWork(work);
                displayGalleryWork(work);
            }

            filtersEl.forEach((element, index) => {
                element.addEventListener('click', function () {
                    // Suppression et ajout de la classe active
                    const filterElActive = document.querySelector('.active');
                    filterElActive.classList.remove('active');
                    element.classList.add('active');

                    // Suppression des travaux
                    galleryEl.textContent = '';

                    // Affichage des travaux
                    for (const work of worksSet) {
                        const categoryId = work.categoryId;
                        // Par défaut (Tous)
                        if (index === 0) displayWork(work);
                        // En fonction du filtre (Objets, Appartements, Hôtels & restaurants)
                        if (index === categoryId) displayWork(work);
                    }
                });
            });

            displayMoveButton();
        })
        .catch(error => {
            throw new Error(error);
        });
});

// Affiche un travail sur la page d'accueil
function displayWork(work) {
    // figure
    const figure = document.createElement('figure');
    figure.setAttribute('data-id', work.id);

    // image
    const image = new Image();
    image.src = work.imageUrl;
    image.alt = work.title;
    image.crossOrigin = 'anonymous';

    // figcaption
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;

    // Ajout de la figure
    figure.appendChild(image);
    figure.appendChild(figcaption);
    galleryEl.appendChild(figure);
}

// Affiche un travail dans la galerie
function displayGalleryWork(work) {
    projectsListEl.innerHTML += `
    <figure data-id="${work.id}">
        <img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
        <a href="#">éditer</a>
        <button class="delete"><img src="./assets/icons/trash.png" alt="trash"></button>
    </figure>`;
}

// Affihce l'icône de déplacement sur le premier projet de la galerie photo
function displayMoveButton() {
    const firstFigure = projectsListEl.firstElementChild;
    const deleteButton = firstFigure.lastElementChild;
    const moveButton = document.createElement('button');
    moveButton.classList.add('move');
    moveButton.innerHTML = `<img src="./assets/icons/move.png" alt="move">`;
    deleteButton.parentNode.insertBefore(moveButton, deleteButton);
}
