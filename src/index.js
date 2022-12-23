import fetchImages from './js/fetch';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const btnEl = document.querySelector('button');
const gallery = document.querySelector('.gallery');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const inputValue = inputEl.value.trim();

  fetchImages(inputValue)
    .then(createPhotoList)
    .catch(err => console.log(err));
}

function createPhotoList(photos) {
  const photosArray = photos.hits;

  const markupPhotoList = photosArray
    .map(
      photo =>
        `
          <div class="photo-card">
           <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/>
           <div class="info">
               <p class="info-item">
                <b>Likes</b><br />${photo.likes}
              </p>
              <p class="info-item">
                <b>Views</b><br />${photo.views}
              </p>
              <p class="info-item">
                <b>Comments</b><br />${photo.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b><br />${photo.downloads}
              </p>
           </div>
          </div>
         `
    )
    .join();

  gallery.innerHTML = markupPhotoList;
  // console.log(markupPhotoList);
}
