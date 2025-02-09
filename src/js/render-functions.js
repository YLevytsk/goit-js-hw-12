import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const loadingOverlay = document.getElementById('loading-overlay');
const endMessage = document.createElement('p');

// Инициализация Lightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Настройка сообщения о конце результатов
endMessage.classList.add('end-message');
endMessage.textContent = "We're sorry, but you've reached the end of search results.";
endMessage.style.display = 'none';
document.body.appendChild(endMessage);

// Инициализация переменных состояния
let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;
let loadedImageIds = new Set();

// Функция рендеринга изображений
export async function renderImages(images, append = false) {
  if (!Array.isArray(images) || images.length === 0) {
    showErrorMessage();
    return;
  }

  // Фильтрация дубликатов
  const uniqueImages = images.filter(image => {
    if (!loadedImageIds.has(image.id)) {
      loadedImageIds.add(image.id);
      return true;
    }
    return false;
  });

  // Очистка галереи при новом запросе
  if (!append) {
    gallery.innerHTML = '';
    loadedImageIds.clear();
  }

  // Генерация разметки
  const markup = uniqueImages.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${likes}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${views}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${comments}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${downloads}</span></div>
      </div>
    </div>`).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  // Прокрутка страницы
  if (append && uniqueImages.length > 0) {
    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  // Обновление состояния кнопки и сообщения
  updateLoadMoreState();
}

// Функция обновления состояния кнопки "Load more"
function updateLoadMoreState() {
  const totalLoaded = gallery.querySelectorAll('.gallery-item').length;
  
  if (totalLoaded >= totalHits) {
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'block';
  } else if (totalLoaded > 0) {
    loadMoreButton.style.display = 'block';
    endMessage.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'none';
  }
}

// Функция показа сообщения об ошибке
export function showErrorMessage() {
  gallery.innerHTML = `
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `;
  loadMoreButton.style.display = 'none';
  endMessage.style.display = 'none';
}

// Обработчик формы поиска
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    searchQuery = searchInput.value.trim();

    if (!searchQuery) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search term!',
        position: 'topRight'
      });
      return;
    }

    currentPage = 1;
    loadedImageIds.clear();
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'none';
    gallery.innerHTML = '';
    showLoader();

    try {
      const response = await fetchImages(searchQuery, currentPage, perPage);
      if (response && response.hits.length > 0) {
        totalHits = response.totalHits;
        await renderImages(response.hits);
        updateLoadMoreState();
      } else {
        showErrorMessage();
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images',
        position: 'topRight'
      });
    } finally {
      hideLoader();
    }
  });
}

// Обработчик кнопки "Load more"
loadMoreButton.addEventListener('click', async () => {
  showLoader();
  currentPage += 1;

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);
    if (response && response.hits.length > 0) {
      await renderImages(response.hits, true);
    } else {
      loadMoreButton.style.display = 'none';
      endMessage.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images',
      position: 'topRight'
    });
  } finally {
    hideLoader();
  }
});

// Функции для показа/скрытия лоадера
function showLoader() {
  loadingOverlay.style.display = 'block';
}

function hideLoader() {
  loadingOverlay.style.display = 'none';
}

// Инициализация при загрузке страницы
loadMoreButton.style.display = 'none';
endMessage.style.display = 'none';
gallery.innerHTML = '';
















