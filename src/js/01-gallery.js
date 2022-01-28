// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryBoxEl = document.querySelector('.gallery');
const galleryMarkup = galleryItems
    .map(
        ({ preview, original, description }) =>
        ` <a class="gallery__item" href="${original}">
<img class="gallery__image" src="${preview}" alt="${description}"/>
</a>`,
        
    )
    .join('');

galleryBoxEl.insertAdjacentHTML('afterbegin', galleryMarkup); 
const lightbox = new SimpleLightbox('.gallery a', {});
console.log(galleryItems);