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
let totalHits = 0;
let loadedImages = new Set();

function showLoader() {
  const loaderElement = document.getElementById('loading-overlay');
  if (loaderElement) loaderElement.style.display = 'flex';
}

function hideLoader() {
  const loaderElement = document.getElementById('loading-overlay');
  if (loaderElement) loaderElement.style.display = 'none';
}

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

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    await loadImages(searchQuery, currentPage);
  } finally {
    hideLoader();
  }
});

// Обработка загрузки SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  beforeShow: () => showLoader(), // Показ лоадера при открытии изображения
  afterShow: () => hideLoader(),  // Скрытие лоадера после загрузки
});

// Добавление HTML-структуры лоадера в index.html
const loaderHTML = `
  <div id="loading-overlay" class="loader loader-5"></div>
`;
document.body.insertAdjacentHTML('beforeend', loaderHTML);




























