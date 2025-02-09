import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 40;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Инициализация
hideLoadMore();
hideLoader();

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newQuery = searchInput.value.trim();
  
  if (!newQuery) {
    showWarning('Please enter a search term!');
    return;
  }

  if (newQuery !== currentQuery) {
    currentQuery = newQuery;
    currentPage = 1;
    totalHits = 0;
    clearGallery();
  }

  await loadImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  await loadImages();
});

async function loadImages() {
  try {
    showLoader();
    const { hits, totalHits: newTotalHits } = await fetchImages(currentQuery, currentPage, perPage);
    
    if (currentPage === 1) {
      totalHits = newTotalHits;
      showSuccess(`Hooray! We found ${totalHits} images!`);
    }

    if (hits.length === 0) {
      showError('Sorry, there are no images matching your search...');
      return;
    }

    renderImages(hits);
    updateLoadMoreState();

  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
}

function renderImages(images) {
  const markup = images.map(image => `
    <div class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function updateLoadMoreState() {
  const loadedCount = currentPage * perPage;
  
  if (loadedCount >= totalHits) {
    hideLoadMore();
    showEndMessage();
    smoothScroll();
  } else {
    showLoadMore();
  }
}

// Вспомогательные функции
function clearGallery() {
  gallery.innerHTML = '';
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showLoadMore() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMore() {
  loadMoreBtn.classList.add('hidden');
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showEndMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight'
  });
}

function showWarning(message) {
  iziToast.warning({
    title: 'Warning',
    message,
    position: 'topRight'
  });
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight'
  });
  hideLoadMore();
}

function showSuccess(message) {
  iziToast.success({
    title: 'Success',
    message,
    position: 'topRight'
  });
}


















