import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// **🔹 Функция очистки галереи**
export function clearGallery() {
  gallery.innerHTML = '';
}

// **🔹 Функция рендера изображений**
export function renderImages(images, append = false) {
  if (!Array.isArray(images) || images.length === 0) return;

  if (!append) {
    clearGallery();
  }

  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes:</span> <span class="count">${likes}</span></div>
        <div class="item"><span class="label">Views:</span> <span class="count">${views}</span></div>
        <div class="item"><span class="label">Comments:</span> <span class="count">${comments}</span></div>
        <div class="item"><span class="label">Downloads:</span> <span class="count">${downloads}</span></div>
      </div>
    </div>`).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // **Обновляем галерею**

  smoothScroll(); // **Плавная прокрутка**
}

// **🔹 Функция плавной прокрутки после загрузки**
export function smoothScroll() {
  const firstGalleryItem = document.querySelector('.gallery-item');
  if (firstGalleryItem) {
    const cardHeight = firstGalleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }
}

// **🔹 Функции управления UI**
export function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

export function showEndMessage() {
  endMessage.style.display = 'block';
}

export function hideEndMessage() {
  endMessage.style.display = 'none';
}
























