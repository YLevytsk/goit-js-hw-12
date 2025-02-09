import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixabay-api';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export async function renderImages(query) {
  try {
    if (!query || typeof query !== 'string') {
      console.error('Expected a string, but received:', query);
      showErrorMessage();
      return;
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery === '') {
      showErrorMessage();
      return;
    }

    gallery.innerHTML = '';

    const response = await fetchImages(trimmedQuery);

    // ✅ Исправлена проверка ответа API
    if (!response || !response.hits || !Array.isArray(response.hits) || response.hits.length === 0) {
      console.error('Unexpected response from fetchImages:', response);
      showErrorMessage();
      return;
    }

    const images = response.hits;
    gallery.innerHTML = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
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
  } catch (error) {
    console.error('Error fetching images:', error);
    showErrorMessage();
  }
}

export function showErrorMessage() {
  gallery.innerHTML = `
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `;
}

// Handling form submission
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    const query = searchInput.value?.trim();

    if (!query) {
      console.error('Invalid search input:', query);
      showErrorMessage();
      return;
    }

    await renderImages(query);
  });
} else {
  console.error('Search form or input not found in DOM');
}


