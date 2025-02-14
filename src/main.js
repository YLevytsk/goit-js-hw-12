import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoadMoreButton, hideLoadMoreButton, showEndMessage, hideEndMessage } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message') || createEndMessage();

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;

function showLoader() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoader() {
  document.getElementById('loading-overlay').style.display = 'none';
}

function createEndMessage() {
  const message = document.createElement('p');
  message.classList.add('end-message');
  message.textContent = "We're sorry, but you've reached the end of search results.";
  message.style.display = 'none';
  gallery.after(message);
  return message;
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
  clearGallery(); // Очистка галереи перед загрузкой новых изображений
  hideLoadMoreButton();
  hideEndMessage();

  showLoader();
  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found for the given search term.',
        position: 'topRight',
      });
      return;
    }

    totalHits = Math.min(response.totalHits, 500);
    renderImages(response.hits);

    if (totalHits > perPage) {
      showLoadMoreButton();
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
      renderImages(response.hits, true);
    }

    if (currentPage * perPage >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }

    smoothScroll(); // Плавная прокрутка

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













