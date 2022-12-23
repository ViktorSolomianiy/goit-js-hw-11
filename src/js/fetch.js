import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=32253350-233c165c5f822b5f85a9694b5';

export default function fetchImages(value) {
  return axios
    .get(
      `${BASE_URL}?${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(resp => {
      return resp.data;
      // console.log(resp.data.hits);
    });

  //   fetch(
  //     `${BASE_URL}?${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
  //   ).then(resp => {
  //     return resp.json();
  //   });
}
