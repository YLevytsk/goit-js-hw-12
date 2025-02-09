import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');

// Функция для показа загрузочного индикатора
function showLoader() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

// Функция для скрытия загрузочного индикатора
function hideLoader() {
  document.getElementById('loading-overlay').style.display = 'none';
}

// 🔹 Функция для загрузки случайных фото
async function loadRandomImages() {
  showLoader();
  try {
    const categories = ['nature', 'technology', 'art', 'food', 'travel'];
    const randomQuery = categories[Math.floor(Math.random() * categories.length)]; // Выбираем случайную тему
    console.log(`Fetching images for: ${randomQuery}`);

    const response = await fetchImages(randomQuery);

    // ✅ Проверяем, что API вернул корректный объект
    if (!response || !response.hits || !Array.isArray(response.hits) || response.hits.length === 0) {
      throw new Error('No images found');
    }

    renderImages(response.hits);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight',
    });
    console.error('Error fetching random images:', error);
  } finally {
    hideLoader();
  }
}

// 🔹 Загружаем случайные фото при загрузке страницы
loadRandomImages();

// 🔹 Обработчик отправки формы
form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  try {
    const response = await fetchImages(query);

    // ✅ Проверяем, что API вернул корректный объект
    if (!response || !response.hits || !Array.isArray(response.hits) || response.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found for your query.',
        position: 'topRight',
      });
      return;
    }

    renderImages(response.hits);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight',
    });
    console.error('Error fetching search images:', error);
  } finally {
    hideLoader();
  }
});

