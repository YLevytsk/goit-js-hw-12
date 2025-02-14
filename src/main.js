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
let loadedImages = new Set(); // Для хранения уникальных изображений (по ID)

function showLoader() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoader() {
  document.getElementById('loading-overlay').style.display = 'none';
}

// Функция для отправки запроса и обработки данных
async function loadImages(query, page) {
  if (!query || query.trim() === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid search term!',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  try {
    // Логирование запроса для отладки
    console.log(`Sending request with query: ${query}, page: ${page}`);

    const response = await fetchImages(query, page, perPage);

    // Логирование ответа от API
    console.log('API Response:', response);

    // Если API вернул пустой массив, показываем ошибку
    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images match your search. Please try again!',
        position: 'topRight',
      });
      return;
    }

    // Обновляем количество найденных изображений
    totalHits = Math.min(response.totalHits, 500);

    // Отфильтровываем изображения, чтобы избежать повторений
    const newImages = response.hits.filter(image => !loadedImages.has(image.id));

    if (newImages.length > 0) {
      renderImages(newImages, currentPage > 1);
      newImages.forEach(image => loadedImages.add(image.id)); // Добавляем в Set уникальные ID
    }

    // Если количество всех найденных изображений больше, чем одно подгружаем следующее
    if (totalHits <= currentPage * perPage) {
      hideLoadMoreButton(); // Скрыть кнопку "Load More"
      showEndMessage(); // Показать сообщение о конце коллекции
    } else {
      loadMoreButton.style.display = 'block'; // Показать кнопку "Load More"
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
      message: 'Please enter a valid search term!',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  totalHits = 0;
  loadedImages.clear(); // Очистка Set с загруженными изображениями
  hideLoadMoreButton(); // Скрыть кнопку "Load More"
  showLoader();

  try {
    // Логирование запроса
    console.log(`Search request: ${searchQuery}, Page: ${currentPage}`);

    const response = await fetchImages(searchQuery, currentPage, perPage);

    // Логирование ответа
    console.log('API Response:', response);

    // Проверка на пустой ответ
    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images match your search. Please try again!',
        position: 'topRight',
      });
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
      // Отфильтровываем изображения, чтобы избежать повторений
      const newImages = response.hits.filter(image => !loadedImages.has(image.id));
      renderImages(newImages, true);
      newImages.forEach(image => loadedImages.add(image.id));

      // Если достигнут конец коллекции
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


















