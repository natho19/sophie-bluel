'use strict';

const connecting = localStorage.getItem('token');

const headerEl = document.querySelector('header');
const imgEl = document.querySelector('figure img');
const h2El = document.querySelector('article h2');
console.log(h2El);

const headerTopEl = document.createElement('div');
headerTopEl.classList.add('header-top');
headerTopEl.innerHTML = `<button class="edit"><img src="./assets/icons/edit-white.png" alt="edit-black"> Mode édition</button>
<button class="publish">publier les changements</button>`;

const editButtonEl = document.createElement('button');
editButtonEl.classList.add('edit');
editButtonEl.innerHTML = `<img src="./assets/icons/edit-black.png" alt="edit-black"> modifier`;

if (connecting) {
    headerEl.parentNode.insertBefore(headerTopEl, headerEl);

    // Insert before : element.parentNode.insertBefore(newElement, element);
    // Insert after : element.parentNode.insertBefore(newElement, element.nextSibling);

    //BUG : Je n'arrive pas à utiliser insertBefore plusieurs fois avec la même variable. Seul le dernier s'affiche
    imgEl.parentNode.insertBefore(editButtonEl, imgEl.nextSibling);
    h2El.parentNode.insertBefore(editButtonEl, h2El);
}
