import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;

// Функция для показа загрузочного индикатора
function showLoader() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

// Функция для скрытия загрузочного индикатора
function hideLoader() {
  document.getElementById('loading-overlay').style.display = 'none';
}

// 🔹 Обработчик отправки формы
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

  showLoader();
  currentPage = 1; // Сбрасываем страницу при новом поиске
  gallery.innerHTML = ''; // Очищаем галерею

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found for your query.',
        position: 'topRight',
      });
      loadMoreButton.style.display = 'none';
      return;
    }

    totalHits = response.totalHits;
    console.log(`Fetched ${response.hits.length} images for query: ${searchQuery}`);
    renderImages(response.hits);

    // Показать кнопку Load More, если есть еще результаты
    if (totalHits > perPage) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight',
    });
    console.error('Error fetching search images:', error);
  } finally {
    hideLoader();
  }
});

// 🔹 Обработчик кнопки Load More
loadMoreButton.addEventListener('click', async () => {
  if (gallery.children.length >= totalHits) {
    loadMoreButton.style.display = 'none';
    return;
  }

  currentPage += 1;
  showLoader();

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);
    
    if (response && response.hits.length > 0) {
      renderImages(response.hits, true);
    }

    // Скрываем кнопку, если загрузили все изображения
    if (gallery.children.length >= totalHits) {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    hideLoader();
  }
});


