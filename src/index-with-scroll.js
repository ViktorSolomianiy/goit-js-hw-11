import PicturesAPI from './js/fetch';
import easyScroll from 'easy-scroll';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const gallery = document.querySelector('.gallery');

const picturesAPI = new PicturesAPI();

window.addEventListener('scroll', async infinityScroll => {
  const body = document.body,
    html = document.documentElement;

  const totalHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  const pixelsToBottom = totalHeight - window.innerHeight - window.scrollY;
  console.log(pixelsToBottom);

  if (pixelsToBottom < 500) {
    picturesAPI.incrementPage();

    const articles = await fetchPhotosAndCreatePage();
  }
});
formEl.addEventListener('submit', onFormSubmit);

const lightBox = new SimpleLightbox('.photo-link', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

easyScroll({
  scrollableDomEle: window,
  duration: 2000,
  easingPreset: 'easeInQuad',
  scrollAmount: 1000,
});

let totalCount = 0;

function onFormSubmit(e) {
  e.preventDefault();
  totalCount = 0;

  gallery.innerHTML = '';
  picturesAPI.query = inputEl.value.trim();
  picturesAPI.resetPage();

  if (picturesAPI.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    return;
  }

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

  if (totalHits !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${photosArray.length} images.`);
  }

  createPhotosList(photosArray);
}

function createPhotosList(photosArray) {
  const markupPhotoList = photosArray
    .map(photo => {
      return `
          <div class="photo-card">
          <a href="${photo.largeImageURL}" class="photo-link">
           <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/>
          </a>
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
          `;
    })
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

  lightBox.refresh();
}
