import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const loadMoreButton = document.querySelector('.load-more');

// **🔹 Создаем и добавляем сообщение о конце коллекции только при необходимости**
let endMessage = document.querySelector('.end-message');
if (!endMessage) {
  endMessage = document.createElement('p');
  endMessage.classList.add('end-message');
  endMessage.textContent = "We're sorry, but you've reached the end of search results.";
  endMessage.style.display = 'none';
  gallery.after(endMessage);
}

// **🔹 Очистка галереи перед новым запросом**
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
        <div class="item"><span class="label">Likes</span><span class="count">${likes}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${views}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${comments}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${downloads}</span></div>
      </div>
    </div>`).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// **🔹 Функции для управления UI**
export function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

export function showEndMessage() {
  if (gallery.children.length > 0) {
    endMessage.style.display = 'block';
  }
}

export function hideEndMessage() {
  endMessage.style.display = 'none';
}




















