import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

// Инициализация SimpleLightbox для модального окна с изображениями
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',  // Для отображения подписи
  captionDelay: 250,    // Задержка при отображении подписи
});

// Функция для рендеринга изображений
export function renderImages(images, append = false) {
  if (!images || images.length === 0) {
    // Показать сообщение об ошибке, если не было найдено изображений
    showErrorMessage('Sorry, no images match your search. Please try again!');
    return;
  }

  // Создание разметки для изображений
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, id }) => `
    <div class="gallery-item" data-id="${id}">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${likes}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${views}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${comments}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${downloads}</span></div>
      </div>
    </div>
  `).join('');

  // Если добавляем новые изображения, то не очищаем галерею
  if (!append) {
    gallery.innerHTML = '';  // Очистка галереи перед рендером
  }

  // Добавление разметки в галерею
  gallery.insertAdjacentHTML('beforeend', markup);

  // Обновляем SimpleLightbox для новых изображений
  lightbox.refresh();

  // Плавная прокрутка
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
function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
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
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}




























