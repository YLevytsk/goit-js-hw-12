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
  if (images.length === 0) {
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



























