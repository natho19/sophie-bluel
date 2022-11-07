'use strict';

loadConfig().then(config => {
    fetch(config.host + 'api/works')
        .then(data => data.json())
        .then(jsonWorks => {
            for (let jsonWork of jsonWorks) {
                let work = new Work(jsonWork);
                displayWork(work);
            }
        })
        .catch(error => {
            console.log(error);
        });
});

function displayWork(work) {
    // Gallery element
    const galleryEl = document.querySelector('.gallery');

    // figure
    const figure = document.createElement('figure');

    // image
    const image = new Image();
    image.src = work.imageUrl;
    image.alt = work.title;

    // figcaption
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    galleryEl.appendChild(figure);
}
