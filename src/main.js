import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoadMoreButton, hideLoadMoreButton, showEndMessage, hideEndMessage } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;

// 🔹 Скрываем кнопку и сообщение при загрузке страницы
hideLoadMoreButton();
hideEndMessage();

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

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  hideEndMessage();

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);

    // ❌ Оставляем только ОДНО уведомление, если ничего не найдено
    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found for your query. Please try another one.',
        position: 'topRight',
      });
      return; // ❗ Останавливаем выполнение кода, чтобы галерея не загружалась
    }

    totalHits = Math.min(response.totalHits, 500);
    renderImages(response.hits);

    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});

// 🔹 Обработчик клика на кнопку "Load More"
loadMoreButton.addEventListener('click', async () => {
  if (document.querySelector('.gallery').children.length >= totalHits) {
    hideLoadMoreButton();
    showEndMessage();
    return;
  }

  currentPage += 1;

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (response && response.hits.length > 0) {
      renderImages(response.hits, true);
    }

    if (document.querySelector('.gallery').children.length >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  }
});









