import { fetchImages } from './js/pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Функция для отображения изображений
export function renderImages(images) {
  gallery.innerHTML = '';

  if (images.length === 0) {
    showErrorMessage();
    return;
  }

  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <div class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="image-info">
          <div class="item">
            <span class="label">Likes</span>
            <span class="count">${likes}</span>
          </div>
          <div class="item">
            <span class="label">Views</span>
            <span class="count">${views}</span>
          </div>
          <div class="item">
            <span class="label">Comments</span>
            <span class="count">${comments}</span>
          </div>
          <div class="item">
            <span class="label">Downloads</span>
            <span class="count">${downloads}</span>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  gallery.innerHTML = markup;

  lightbox.refresh();
}

// Функция для отображения сообщения об ошибке
export function showErrorMessage() {
  gallery.innerHTML = `
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `;
}

// Обработчик отправки формы
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (!query || query.trim() === '') {
    alert('Please enter a search term!');
    return;
  }

  try {
    const images = await fetchImages(query);
    renderImages(images);
  } catch (error) {
    showErrorMessage();
  }
});