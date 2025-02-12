const loadingOverlay = document.getElementById('loading-overlay');
const loadMoreButton = document.querySelector('.load-more');

// 🔹 **Показать лоадер во время запроса**
export function showLoaderDuringRequest() {
  if (loadingOverlay) {
    loadingOverlay.style.display = 'flex';
  }
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}

// 🔹 **Скрыть лоадер после завершения запроса**
export function hideLoaderAfterRequest() {
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
  }
  if (loadMoreButton) {
    loadMoreButton.style.display = 'block';
  }
}

// 🔹 **Очистка галереи**
export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

// 🔹 **Рендер изображений**
export function renderImages(images, append = false) {
  const gallery = document.querySelector('.gallery');
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
}

// 🔹 **Показать/скрыть кнопку Load More**
export function showLoadMoreButton() {
  if (loadMoreButton) {
    loadMoreButton.style.display = 'block';
  }
}

export function hideLoadMoreButton() {
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}






















