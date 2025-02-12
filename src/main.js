import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoaderDuringRequest,
  hideLoaderAfterRequest,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;

// 🔹 **Скрываем кнопку Load More при загрузке страницы**
hideLoadMoreButton();

// 🔹 **Обработчик отправки формы**
form.addEventListener('submit', async event => {
  event.preventDefault();
  
  searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search term!', position: 'topRight' });
    return;
  }

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  
  showLoaderDuringRequest(); // **Лоадер во время запроса**

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (!response || !response.hits.length) {
      iziToast.info({ title: 'Info', message: 'No images found for your query.', position: 'topRight' });
      hideLoaderAfterRequest();
      return;
    }

    totalHits = Math.min(response.totalHits, 500);
    renderImages(response.hits);

    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    hideLoaderAfterRequest(); // **Лоадер скрывается только после завершения запроса**
  }
});

// 🔹 **Обработчик кнопки "Load More"**
loadMoreButton.addEventListener('click', async () => {
  if (document.querySelector('.gallery').children.length >= totalHits) {
    hideLoadMoreButton();
    return;
  }

  currentPage += 1;
  showLoaderDuringRequest(); // **Лоадер во время запроса**

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);
    
    if (response && response.hits.length > 0) {
      renderImages(response.hits, true);
    }

    if (document.querySelector('.gallery').children.length >= totalHits) {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    hideLoaderAfterRequest(); // **Лоадер скрывается только после завершения запроса**
  }
});





