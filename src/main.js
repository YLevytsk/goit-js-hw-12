import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
  hideEndMessage,
  showLoader,
  hideLoader
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;

// **🔹 Скрываем кнопку и сообщение при загрузке страницы**
hideLoadMoreButton();
hideEndMessage();

// **🔹 Обработчик отправки формы**
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
  hideEndMessage();
  showLoader(); // **Показываем лоадер при начале запроса**

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);
    hideLoader(); // **Скрываем лоадер после получения данных**

    if (!response || !response.hits.length) {
      iziToast.info({ title: 'Info', message: 'No images found for your query.', position: 'topRight' });
      return;
    }

    totalHits = Math.min(response.totalHits, 500);
    renderImages(response.hits);

    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
  }
});

// **🔹 Обработчик клика на кнопку "Load More"**
loadMoreButton.addEventListener('click', async () => {
  if (document.querySelectorAll('.gallery-item').length >= totalHits) {
    hideLoadMoreButton();
    showEndMessage();
    return;
  }

  currentPage += 1;
  showLoader(); // **Показываем лоадер при загрузке новых изображений**

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);
    hideLoader(); // **Скрываем лоадер после ответа**

    if (response && response.hits.length > 0) {
      renderImages(response.hits, true);
    }

    if (document.querySelectorAll('.gallery-item').length >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch (error) {
    hideLoader();
    console.error('Error loading more images:', error);
  }
});





