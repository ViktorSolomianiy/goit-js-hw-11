import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=32253350-233c165c5f822b5f85a9694b5';

const loadMore = document.querySelector('.load-more');

export default class PicturesAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const options = {
      params: {
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: 40,
      },
    };

    return axios.get(`${BASE_URL}?${API_KEY}`, options).then(res => {
      return res.data;
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  showLoadMoreBtn() {
    loadMore.classList.remove('is-hidden');
  }

  hideLoadMoreBtn() {
    loadMore.classList.add('is-hidden');
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
