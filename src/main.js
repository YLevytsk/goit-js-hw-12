import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showEndMessage, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.getElementById('loading-overlay');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
const MAX_PAGES = 5; // ✅ Ограничение на 5 страниц
let totalHits = 0;
let loadedImages = new Set(); // ✅ Хранение уникальных ID загруженных изображений

function showLoader() {
  const loaderElement = document.getElementById('loading-overlay');
  if (loaderElement) loaderElement.style.display = 'flex';
}

function hideLoader() {
  const loaderElement = document.getElementById('loading-overlay');
  if (loaderElement) loaderElement.style.display = 'none';
}

// ✅ Функция плавной прокрутки
function smoothScroll() {
  const firstGalleryItem = document.querySelector('.gallery-item');
  if (firstGalleryItem) {
    const cardHeight = firstGalleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }
}

// ✅ Функция загрузки изображений
async function loadImages(query, page) {
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

    if (!response || response.totalHits === 0) {
      hideLoader();
      return;
    }

    totalHits = Math.min(response.totalHits, 500);
    const newImages = response.hits.filter(image => !loadedImages.has(image.id));

    if (newImages.length > 0) {
      renderImages(newImages, currentPage > 1);
      newImages.forEach(image => loadedImages.add(image.id));
      smoothScroll(); // ✅ Добавил прокрутку после загрузки
    }

    // ✅ Ограничение в 5 страниц (200 изображений)
    if (currentPage >= MAX_PAGES || totalHits <= currentPage * perPage) {
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

// ✅ Обработчик отправки формы (новый поиск)
form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid search term!',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1; // ✅ Сбрасываем страницу до 1
  totalHits = 0;
  loadedImages.clear(); // ✅ Очищаем загруженные ID
  hideLoadMoreButton(); // ✅ Скрываем кнопку "Load More"
  showLoader();

  try {
    await loadImages(searchQuery, currentPage);
  } finally {
    hideLoader();
  }
});

// ✅ Обработчик кнопки "Load More"
loadMoreButton.addEventListener('click', async () => {
  if (currentPage >= MAX_PAGES) {
    hideLoadMoreButton();
    showEndMessage();
    return;
  }

  currentPage += 1;
  showLoader();

  try {
    await loadImages(searchQuery, currentPage);
  } finally {
    hideLoader();
  }
});





























