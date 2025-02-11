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

// **🔹 Обработчик отправки формы (поиск изображений)**
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
  clearGallery(); // Очищаем галерею перед новым запросом
  hideLoadMoreButton(); // Скрываем кнопку "Load More"
  hideEndMessage(); // Скрываем сообщение о конце коллекции

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
    
    renderImages(response.hits); // **Лоадер запускается в SimpleLightbox внутри renderImages**

    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching search images:', error);
  }
});

// **🔹 Обработчик клика на кнопку "Load More"**
loadMoreButton.addEventListener('click', async () => {
  if (gallery.children.length >= totalHits) {
    hideLoadMoreButton();
    showEndMessage();
    return;
  }

  currentPage += 1;

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (response && response.hits.length > 0) {
      renderImages(response.hits, true); // **Лоадер запускается в SimpleLightbox внутри renderImages**
    }

    if (gallery.children.length >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  }
});





