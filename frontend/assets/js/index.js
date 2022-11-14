'use strict';

const filtersEl = document.querySelectorAll('.filter');
const galleryEl = document.querySelector('.gallery');

loadConfig().then(config => {
    fetch(config.host + 'api/works')
        .then(data => data.json())
        .then(jsonWorks => {
            var worksSet = new Set(jsonWorks);
            console.log(worksSet);
            filtersEl.forEach((element, index) => {
                element.addEventListener('click', function () {
                    console.log('Je clique sur le filtre');
                    galleryEl.textContent = '';
                    for (let jsonWork of worksSet) {
                        const work = new Work(jsonWork);
                        const categoryId = work.categoryId;
                        if (categoryId === index) {
                            // console.log(index);
                            // console.log(work);
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
