import { fetchImages } from './js/pixabay-api.js';
import { 
  renderImages, 
  clearGallery, 
  showLoadMoreButton, 
  hideLoadMoreButton, 
  showEndMessage, 
  hideEndMessage 
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;

// При загрузке страницы скрываем кнопку и сообщение
hideLoadMoreButton();
hideEndMessage();

// 🔹 Функция для показа загрузочного индикатора
function showLoader() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

// 🔹 Функция для скрытия загрузочного индикатора
function hideLoader() {
  document.getElementById('loading-overlay').style.display = 'none';
}

// 🔹 Функция для загрузки случайных фото при старте страницы
async function loadRandomImages() {
  showLoader();
  try {
    const categories = ['nature', 'technology', 'art', 'food', 'travel'];
    const randomQuery = categories[Math.floor(Math.random() * categories.length)];
    console.log(`Fetching random images for: ${randomQuery}`);

    const response = await fetchImages(randomQuery, 1, perPage);

    if (!response || !response.hits || response.hits.length === 0) {
      return;
    }

    console.log(`Fetched ${response.hits.length} random images`);
    renderImages(response.hits, false, response.totalHits);
  } catch (error) {
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

  searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  hideEndMessage();

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found for your query.',
        position: 'topRight',
      });
      return;
    }

    totalHits = Math.min(response.totalHits, 500);
    console.log(`Fetched ${response.hits.length} images for query: ${searchQuery}`);
    renderImages(response.hits, false, totalHits);

    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching search images:', error);
  } finally {
    hideLoader();
  }
});

// 🔹 Обработчик клика на кнопку "Load More"
loadMoreButton.addEventListener('click', async () => {
  if (gallery.children.length >= totalHits) {
    hideLoadMoreButton();
    showEndMessage();
    return;
  }

  currentPage += 1;
  showLoader();

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);
    if (response && response.hits.length > 0) {
      renderImages(response.hits, true, totalHits);
    }

    if (gallery.children.length >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    hideLoader();
  }
});


