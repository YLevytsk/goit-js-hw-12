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

// Функция для отправки запроса и обработки данных
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

    // Если API вернул пустой массив (нет результатов)
    if (!response || !response.hits || response.hits.length === 0) {
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

    smoothScroll();
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

// Функция плавной прокрутки
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
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images match your search. Please try again!',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    renderImages(response.hits);
    totalHits = response.totalHits;

    if (totalHits > perPage) {
      loadMoreButton.style.display = 'block';
    } else {
      showEndMessage();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

// Обработчик кнопки "Load More"
loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (response && response.hits.length > 0) {
      const newImages = response.hits.filter(image => !loadedImages.has(image.id));
      renderImages(newImages, true);
      newImages.forEach(image => loadedImages.add(image.id));

      if (currentPage * perPage >= totalHits) {
        hideLoadMoreButton();
        showEndMessage();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});





















