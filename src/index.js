import fetchImages from './js/fetch';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const btnEl = document.querySelector('button');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const inputValue = e.target.value;

  fetchImages(inputValue);
}
