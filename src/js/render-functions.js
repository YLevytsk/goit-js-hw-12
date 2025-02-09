import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixabay-api'; // Убедитесь в правильности пути

const gallery = document.querySelector('.gallery');
let lightbox;

// Инициализация Lightbox
const initLightbox = () => {
  if (lightbox) lightbox.destroy();
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};

// Основная асинхронная функция рендеринга
export const renderImages = async (searchQuery) => {
  try {
    gallery.innerHTML = '';
    
    if (!searchQuery || typeof searchQuery !== 'string') {
      throw new Error('Invalid search query');
    }

    const data = await fetchImages(searchQuery);
    
    if (!data || !data.hits || data.hits.length === 0) {
      showErrorMessage();
      return;
    }

    await createGalleryMarkup(data.hits);
    initLightbox();
    
  } catch (error) {
    console.error('Render error:', error);
    showErrorMessage();
  }
};

// Создание разметки галереи
const createGalleryMarkup = async (images) => {
  return new Promise((resolve) => {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
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
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    resolve();
  });
};

// Показ ошибки
export const showErrorMessage = () => {
  gallery.innerHTML = `
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `;
};

loadInitialImages();







