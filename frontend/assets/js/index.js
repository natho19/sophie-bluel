'use strict';

const filtersEl = document.querySelectorAll('.filter');
const galleryEl = document.querySelector('.gallery');

loadConfig().then(config => {
    fetch(config.host + 'api/works')
        .then(data => data.json())
        .then(works => {
            const worksSet = new Set(works);

            // Affichage de tous les travaux par défaut
            for (const work of worksSet) {
                displayWork(work);
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
        })
        .catch(error => {
            throw new Error(error);
        });
});

function displayWork(work) {
    // figure
    const figure = document.createElement('figure');

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
