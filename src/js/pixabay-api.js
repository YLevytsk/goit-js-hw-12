import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '48661000-87492d5612d6e41eb1a42ef3d';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 40) {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight'
    });
    return null;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: encodeURIComponent(query),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage, // 🔹 Количество изображений за один запрос
        page: page // 🔹 Добавлен параметр пагинации
      },
    });

    console.log('API Response:', response.data); // Лог ответа API

    if (response.status !== 200) {
      throw new Error(`API error: ${response.status}`);
    }

    if (!response.data.hits || response.data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found for your search!',
        position: 'topRight'
      });
      return null;
    }

    return {
      hits: response.data.hits,
      totalHits: Math.min(response.data.totalHits, 500) // 🔹 Учитываем ограничение API
    };

  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight'
    });
    return null;
  }
}

