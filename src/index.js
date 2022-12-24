import PicturesAPI from './js/fetch';
import fetchImages from './js/fetch';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const picturesAPI = new PicturesAPI();

formEl.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', loadMoreBtn);

let totalCount = 0;

function onFormSubmit(e) {
  e.preventDefault();
  totalCount = 0;

  gallery.innerHTML = '';
  picturesAPI.query = inputEl.value.trim();
  picturesAPI.resetPage();
  picturesAPI.hideLoadMoreBtn();

  if (picturesAPI.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    return;
  }

  fetchPhotosAndCreatePage();
}

function loadMoreBtn() {
  picturesAPI.query = inputEl.value.trim();
  picturesAPI.incrementPage();

  fetchPhotosAndCreatePage();
}

function createPhotoList(photos) {
  const photosArray = photos.hits;
  const totalHits = photos.totalHits;

  totalCount += photosArray.length;

  if (photosArray.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  if (totalHits !== 0 && totalCount >= totalHits) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }

  if (totalCount < totalHits) {
    picturesAPI.showLoadMoreBtn();
  } else {
    picturesAPI.hideLoadMoreBtn();
  }

  createPhotosList(photosArray);
}

function createPhotosList(photosArray) {
  const markupPhotoList = photosArray
    .map(
      photo =>
        `<a href="${photo.largeImageURL}" class="photo-link">
          <div class="photo-card">
           <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/>
            <div class="info">
               <p class="info-item">
                <b>Likes</b>${photo.likes}
              </p>
              <p class="info-item">
                <b>Views</b>${photo.views}
              </p>
              <p class="info-item">
                <b>Comments</b>${photo.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>${photo.downloads}
              </p>
           </div>
          </div>
         </a>
         `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markupPhotoList);
}

async function fetchPhotosAndCreatePage() {
  try {
    const photoList = await picturesAPI.fetchImages();
    createPhotoList(photoList);
  } catch (error) {
    console.log(error);
  }
}
