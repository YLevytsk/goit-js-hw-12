import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const loadMoreButton = document.querySelector('.load-more');
const loadingOverlay = document.getElementById('loading-overlay');
const endMessage = document.createElement('p');
endMessage.classList.add('end-message');
endMessage.textContent = "We're sorry, but you've reached the end of search results.";
endMessage.style.display = 'none';
document.body.appendChild(endMessage);

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;
let loadedImageIds = new Set();

// Изначально скрываем кнопку и сообщение
loadMoreButton.style.display = 'none';
endMessage.style.display = 'none';

export function renderImages(images, append = false) {
  if (!Array.isArray(images) || images.length === 0) {
    showErrorMessage();
    return;
  }

  const uniqueImages = images.filter(image => {
    if (!loadedImageIds.has(image.id)) {
      loadedImageIds.add(image.id);
      return true;
    }
    return false;
  });

  if (!append) {
    gallery.innerHTML = '';
    loadedImageIds.clear();
  }

  gallery.innerHTML += uniqueImages.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
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

  lightbox.refresh();

  // Показываем кнопку загрузки только если доступно больше 40 изображений
  if (gallery.children.length >= totalHits) {
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'block';
  } else if (gallery.children.length >= 40) {
    loadMoreButton.style.display = 'block';
    endMessage.style.display = 'none';
  }
}

export function showErrorMessage() {
  gallery.innerHTML = `
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `;
  loadMoreButton.style.display = 'none';
  endMessage.style.display = 'none';
}

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    searchQuery = searchInput.value?.trim();

    if (!searchQuery) {
      console.error('Invalid search input:', searchQuery);
      return;
    }

    currentPage = 1;
    loadedImageIds.clear();
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'none';

    const response = await fetchImages(searchQuery, currentPage, perPage);
    if (response && response.hits.length > 0) {
      totalHits = response.totalHits;
      renderImages(response.hits);
    } else {
      showErrorMessage();
    }
  });
} else {
  console.error('Search form or input not found in DOM');
}

loadMoreButton.addEventListener('click', async () => {
  if (gallery.children.length >= totalHits) {
    loadMoreButton.style.display = 'none';
    endMessage.style.display = 'block';
    return;
  }

  currentPage += 1;
  showLoader();

  const response = await fetchImages(searchQuery, currentPage, perPage);
  if (response && response.hits) {
    renderImages(response.hits, true);
  }
  hideLoader();
});

function showLoader() {
  loadingOverlay.style.display = 'block';
}

function hideLoader() {
  loadingOverlay.style.display = 'none';
}















