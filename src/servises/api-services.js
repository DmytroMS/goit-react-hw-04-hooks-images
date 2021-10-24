import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '23079700-bbc75e3a6b7c3c448487aea29';

export function getPictures({ nextQuery, page }) {
  return axios
    .get(
      `?image_type=photo&orientation=horizontal&q=${nextQuery}&page=${page}&per_page=12&key=${API_KEY}`
    )
    .then((res) => res.data.hits)
    
}


