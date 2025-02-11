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

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;
let loadedImageIds = new Set();
let isFetching = false; // ✅ Флаг предотвращает дублирование запросов

// Скрываем кнопку при загрузке страницы
loadMoreButton.style.display = 'none';
gallery.innerHTML = ''; 

export async function renderImages(images, append = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return;
  }

  if (!append) {
    gallery.innerHTML = ''; 
    loadMoreButton.style.display = 'none';
    loadedImageIds.clear();
  }

  // ✅ Фильтруем дублирующиеся изображения
  const uniqueImages = images.filter(({ id }) => {
    if (!loadedImageIds.has(id)) {
      loadedImageIds.add(id);
      return true;
    }
    return false;
  });

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

  // Прокрутка страницы после загрузки новых изображений
  if (append) {
    const firstGalleryItem = document.querySelector('.gallery-item');
    if (firstGalleryItem) {
      const cardHeight = firstGalleryItem.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  }

  if (gallery.children.length >= totalHits) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }
}

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', async event => {
    if (isFetching) return; // ✅ Защита от дублирующихся запросов
    event.preventDefault();
    searchQuery = searchInput.value?.trim();

    if (!searchQuery) {
      console.error('Invalid search input:', searchQuery);
      return;
    }

    isFetching = true;
    currentPage = 1;
    loadedImageIds.clear();
    loadMoreButton.style.display = 'none';
    gallery.innerHTML = ''; 

    try {
      const response = await fetchImages(searchQuery, currentPage, perPage);
      if (response && response.hits.length > 0) {
        totalHits = Math.min(response.totalHits, 500);
        await renderImages(response.hits);
        if (gallery.children.length < totalHits) {
          loadMoreButton.style.display = 'block';
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      isFetching = false;
    }
  });
} else {
  console.error('Search form or input not found in DOM');
}

loadMoreButton.addEventListener('click', async (event) => {
  if (isFetching || gallery.children.length >= totalHits) return; // ✅ Фильтрация повторных кликов
  event.preventDefault();

  isFetching = true;
  currentPage += 1;
  showLoader();

  try {
    const response = await fetchImages(searchQuery, currentPage, perPage);
    if (response && response.hits.length > 0) {
      await renderImages(response.hits, true);
    } else {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    hideLoader();
    isFetching = false;
  }
});

function showLoader() {
  loadingOverlay.style.display = 'block';
}

function hideLoader() {
  loadingOverlay.style.display = 'none';
}




















