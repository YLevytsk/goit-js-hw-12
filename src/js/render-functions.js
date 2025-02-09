import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixabay-api';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load more';
loadMoreButton.classList.add('load-more');
loadMoreButton.style.display = 'none';
document.body.appendChild(loadMoreButton);

let searchQuery = '';
let currentPage = 1;
const perPage = 40;

export function renderImages(images, append = false) {
  if (!Array.isArray(images) || images.length === 0) {
    showErrorMessage();
    return;
  }

  if (!append) {
    gallery.innerHTML = '';
  }

  gallery.innerHTML += images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
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

  loadMoreButton.style.display = images.length < perPage ? 'none' : 'block';
}

export function showErrorMessage() {
  gallery.innerHTML = `
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `;
  loadMoreButton.style.display = 'none';
}

// Handling form submission
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
    loadMoreButton.style.display = 'none';

    const response = await fetchImages(searchQuery, currentPage, perPage);
    if (response && response.hits) {
      renderImages(response.hits);
    } else {
      showErrorMessage();
    }
  });
} else {
  console.error('Search form or input not found in DOM');
}

// Load more images
loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  const response = await fetchImages(searchQuery, currentPage, perPage);
  if (response && response.hits) {
    renderImages(response.hits, true);
  } else {
    loadMoreButton.style.display = 'none';
  }
});










