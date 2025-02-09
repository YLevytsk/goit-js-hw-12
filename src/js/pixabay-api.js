import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '48661000-87492d5612d6e41eb1a42ef3d';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  
  if (!query || query.trim() === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight'
    });
    return [];
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
      },
    });

    if (response.data.totalHits > 0) {
      return response.data.hits;
    } else {
      iziToast.warning({
        title: 'Info',
        message: 'No images found. Please try another search term.',
        position: 'topRight'
      });
      return [];
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight'
    });
    return [];
  }
}
