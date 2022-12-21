const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=32253350-233c165c5f822b5f85a9694b5';

export default function fetchImages(value) {
  fetch(
    `${BASE_URL}?${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(resp => {
    return resp.json();
  });
}
