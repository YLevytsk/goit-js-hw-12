import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoadMoreButton, hideLoadMoreButton, showEndMessage, hideEndMessage } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;
let loadedImages = new Set(); // Используем Set для хранения уникальных изображений

function showLoader() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoader() {
  document.getElementById('loading-overlay').style.display = 'none';
}

// Функция для отправки запроса и обработки данных
async function loadImages(query, page) {
  showLoader();
  try {
    const response = await fetchImages(query, page, perPage);

    // Проверка на отсутствие данных
    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found for the given search term.',
        position: 'topRight',
      });
      return;
    }

    // Обновляем количество найденных изображений
    totalHits = Math.min(response.totalHits, 500);

    // Отфильтровываем изображения, чтобы избежать повторений
    const newImages = response.hits.filter(image => !loadedImages.has(image.id));
    
    // Если есть новые изображения, рендерим их
    if (newImages.length > 0) {
      renderImages(newImages, currentPage > 1);
      newImages.forEach(image => loadedImages.add(image.id)); // Добавляем в Set
    }

    // Если количество всех найденных изображений больше, чем одно подгружаем следующее
    if (totalHits > perPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      showEndMessage();
    }

    smoothScroll(); // Плавная прокрутка
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

// Плавная прокрутка
function smoothScroll() {
  const firstGalleryItem = document.querySelector('.gallery-item');
  if (firstGalleryItem) {
    const cardHeight = firstGalleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }
}

// Обработчик отправки формы
form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery || searchQuery.trim() === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  totalHits = 0;
  loadedImages.clear(); // Очистка Set с загруженными изображениями
  clearGallery(); // Очистка галереи перед загрузкой новых изображений
  hideLoadMoreButton();
  hideEndMessage();

  loadImages(searchQuery, currentPage); // Отправка запроса на API
});

// Обработчик кнопки "Load More"
loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  loadImages(searchQuery, currentPage);
});















