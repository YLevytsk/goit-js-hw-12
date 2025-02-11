import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const endMessage = document.createElement('p');
endMessage.classList.add('end-message');
endMessage.textContent = "We're sorry, but you've reached the end of search results.";
endMessage.style.display = 'none';
gallery.after(endMessage);

// Функция для очистки галереи перед новым поиском
export function clearGallery() {
  if (gallery) {
    gallery.innerHTML = '';
  }
}

// Функция для рендеринга изображений
export function renderImages(images, append = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return;
  }

  if (!append) {
    clearGallery(); // Очистка галереи перед новым запросом
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

// Функция для отображения сообщения о конце коллекции
export function showEndMessage() {
  if (endMessage) {
    endMessage.style.display = 'block';
  }
}

// Функция для скрытия сообщения о конце коллекции
export function hideEndMessage() {
  if (endMessage) {
    endMessage.style.display = 'none';
  }
}




















