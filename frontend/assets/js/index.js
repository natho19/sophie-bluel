'use strict';

const filtersEl = document.querySelectorAll('.filter');
const galleryEl = document.querySelector('.gallery');

loadConfig().then(config => {
    fetch(config.host + 'api/works')
        .then(data => data.json())
        .then(jsonWorks => {
            var worksSet = new Set(jsonWorks);

            for (let jsonWork of worksSet) {
                const work = new Work(jsonWork);
                displayWork(work);
            }

            filtersEl.forEach((element, index) => {
                element.addEventListener('click', function () {
                    const filterElActive = document.querySelector('.active');
                    filterElActive.classList.remove('active');
                    element.classList.add('active');

                    galleryEl.textContent = '';

                    for (let jsonWork of worksSet) {
                        const work = new Work(jsonWork);
                        const categoryId = work.categoryId;
                        if (categoryId === index) {
                            displayWork(work);
                        }
                        if (index === 0) {
                            displayWork(work);
                        }
                    }
                });
            });
        })
        .catch(error => {
            console.log(error);
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

    figure.appendChild(image);
    figure.appendChild(figcaption);
    galleryEl.appendChild(figure);
}
