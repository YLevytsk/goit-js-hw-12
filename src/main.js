import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
const endMessage = document.createElement('p');
endMessage.classList.add('end-message');
endMessage.textContent = "We're sorry, but you've reached the end of search results.";
endMessage.style.display = 'none';
gallery.after(endMessage);

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;
let isFetching = false; // Предотвращаем дублирование запросов

// Скрываем кнопку и сообщение при старте страницы
loadMoreButton.style.display = 'none';
endMessage.style.display = 'none';

// Функция для показа загрузочного индикатора
function showLoader() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

// Функция для скрытия загрузочного индикатора
function hideLoader() {
  document.getElementById('loading-overlay').style.display = 'none';
}

// 🔹 Загружаем случайные изображения при старте страницы (1 раз)
async function loadRandomImages() {
  if (isFetching) return;
  isFetching = true;

  showLoader();
  try {
    const categories = ['nature', 'technology', 'art', 'food', 'travel'];
    const randomQuery = categories[Math.floor(Math.random() * categories.length)];
    console.log(`Fetching random images for: ${randomQuery}`);

    const response = await fetchImages(randomQuery, 1, perPage);

    if (!response || !response.hits || response.hits.length === 0) {
      return;
    }

    console.log(`Fetched ${response.hits.length} random images`);
    renderImages(response.hits);
  } catch (error) {
    console.error('Error fetching random images:', error);
  } finally {
    hideLoader();
    isFetching = false;
  }
}

// 🔹 Загружаем случайные фото при загрузке страницы (только 1 раз)
document.addEventListener("DOMContentLoaded", loadRandomImages);

// 🔹 Обработчик отправки формы (поиск изображений)
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (isFetching) return; // Предотвращаем повторные запросы

  searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  isFetching = true;
  showLoader();
  currentPage = 1;
  gallery.innerHTML = ''; // Очищаем галерею перед новым запросом
  loadMoreButton.style.display = 'none';
  endMessage.style.display = 'none';

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
    renderImages(response.hits);

    if (totalHits > perPage) {
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching search images:', error);
  } finally {
    hideLoader();
    isFetching = false;
  }
});

// 🔹 Обработчик клика "Load More"
loadMoreButton.addEventListener('click', async () => {
  if (isFetching || gallery.children.length >= totalHits) return;
  isFetching = true;
  showLoader();

  try {
    currentPage += 1;
    const response = await fetchImages(searchQuery, currentPage, perPage);

    if (response && response.hits.length > 0) {
      renderImages(response.hits, true);
    }

    if (gallery.children.length >= totalHits) {
      loadMoreButton.style.display = 'none';
      endMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    hideLoader();
    isFetching = false;
  }
});


