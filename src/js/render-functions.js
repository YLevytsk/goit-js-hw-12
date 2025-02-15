import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Функция для рендеринга изображений
export function renderImages(images, append = false) {
  if (!append) {
    gallery.innerHTML = ''; // Очищаем галерею при новом запросе
  }

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
          <div class="item"><span class="label">Likes</span><span class="count">${likes}</span></div>
          <div class="item"><span class="label">Views</span><span class="count">${views}</span></div>
          <div class="item"><span class="label">Comments</span><span class="count">${comments}</span></div>
          <div class="item"><span class="label">Downloads</span><span class="count">${downloads}</span></div>
        </div>
      </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // Обновляем SimpleLightbox после добавления изображений
  smoothScroll();
}

// Функция для плавной прокрутки
function smoothScroll() {
  const firstGalleryItem = document.querySelector('.gallery-item');
  if (firstGalleryItem) {
    const cardHeight = firstGalleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }
}

// Функция для отображения сообщения об ошибке
export function showErrorMessage() {
  gallery.innerHTML = `
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `;
}

// Функция для отображения сообщения о конце коллекции
export function showEndMessage() {
  const message = document.createElement('p');
  message.classList.add('end-message');
  message.textContent = "We're sorry, but you've reached the end of search results.";
  gallery.after(message);
}

// Функция для скрытия кнопки "Load More"
export function hideLoadMoreButton() {
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}




























