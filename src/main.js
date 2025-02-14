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

// **🔹 Очищаем галерею и скрываем элементы при загрузке страницы**
hideLoadMoreButton();
hideEndMessage();

// **🔹 Обработчик отправки формы**
form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = event.target.elements.searchQuery.value.trim().toLowerCase();

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

    // **❌ Если API вернул пустой массив, показываем сообщение**
    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = Math.min(response.totalHits, 500);
    renderImages(response.hits);

    // **Показываем кнопку "Load More", если есть еще изображения**
    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
});

// **🔹 Обработчик кнопки "Load More"**
loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);
    if (response && response.hits.length > 0) {
      renderImages(response.hits, true);
    }

    // **Если просмотрены все изображения — скрываем кнопку и показываем сообщение**
    if (currentPage * perPage >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again.',
      position: 'topRight',
    });
  }
});











