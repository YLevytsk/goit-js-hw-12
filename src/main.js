import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showEndMessage, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;
let loadedImages = new Set();

function showLoader() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoader() {
  document.getElementById('loading-overlay').style.display = 'none';
}

// ✅ Функция для загрузки изображений
async function loadImages(query, page) {
  // ✅ Проверка на пустой ввод — выводим только 1 `Warning` 
  if (!query.trim()) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid search term!',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  try {
    const response = await fetchImages(query, page, perPage);

    // ✅ Если API вернул `totalHits: 0`, выводим **ТОЛЬКО 1 `Error`**
    if (!response || response.totalHits === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images match your search. Please try again!',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    totalHits = Math.min(response.totalHits, 500);
    const newImages = response.hits.filter(image => !loadedImages.has(image.id));

    if (newImages.length > 0) {
      renderImages(newImages, currentPage > 1);
      newImages.forEach(image => loadedImages.add(image.id));
    }

    if (totalHits <= currentPage * perPage) {
      hideLoadMoreButton();
      showEndMessage();
    } else {
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

// ✅ Обработчик отправки формы
form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = event.target.elements.searchQuery.value.trim();

  // ✅ Проверка на пустой ввод — теперь **ТОЛЬКО 1 `Warning`**
  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid search term!',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  totalHits = 0;
  loadedImages.clear();
  hideLoadMoreButton();
  showLoader();

  try {
    await loadImages(searchQuery, currentPage);
  } finally {
    hideLoader();
  }
});

// ✅ Обработчик кнопки "Load More"
loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    await loadImages(searchQuery, currentPage);
  } finally {
    hideLoader();
  }
});



























