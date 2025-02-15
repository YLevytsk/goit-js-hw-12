import SimpleLightbox from 'simplelightbox'; 
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(images, append = false) {
  if (!append) {
    gallery.innerHTML = ''; 
  }

  if (images.length === 0) {
    showErrorMessage();
    return;
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
    </div>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  
  lightbox.refresh(); 

  smoothScroll();
}

function smoothScroll() {
  const firstGalleryItem = document.querySelector('.gallery-item');
  if (firstGalleryItem) {
    const cardHeight = firstGalleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }
}

export function showErrorMessage() {
  iziToast.error({
    title: 'Error',
    message: 'Sorry, no images match your search. Please try again!',
    position: 'topRight',
  });
}

export function showEndMessage() {
  const message = document.createElement('p');
  message.classList.add('end-message');
  message.textContent = "We're sorry, but you've reached the end of search results.";
  gallery.after(message);
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}




























