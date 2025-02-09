import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixabay-api';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(images) {
  if (!Array.isArray(images) || images.length === 0) {
    showErrorMessage();
    return;
  }

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
      return; // 🔹 Теперь сообщение не отображается при пустом запросе
    }

    const response = await fetchImages(query);
    if (response && response.hits) {
      // 🔹 Фильтрация изображений: оставляем только те, у которых главный тег содержит искомое слово полностью
      const filteredImages = response.hits.filter(image => {
        return image.tags.toLowerCase().split(', ').some(tag => tag === query.toLowerCase());
      });
      
      if (filteredImages.length === 0) {
        showErrorMessage();
      } else {
        renderImages(filteredImages);
      }
    } else {
      showErrorMessage();
    }
  });
} else {
  console.error('Search form or input not found in DOM');
}

// Load initial random images
async function loadInitialImages() {
  try {
    const response = await fetchImages(''); // Загружаем популярные фото без категории
    if (response && response.hits) {
      renderImages(response.hits);
    } else {
      showErrorMessage();
    }
  } catch (error) {
    console.error('Error fetching initial images:', error);
    showErrorMessage();
  }
}

loadInitialImages();










