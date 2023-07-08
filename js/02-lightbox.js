import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

// Create markup for gallery
function createItemsGalleryMarkup(galleryItems) {
  const itemsGalleryMarkup = galleryItems
    .map(
      ({ original, preview, description }) =>
        `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img 
              class="gallery__image" 
              src="${preview}" 
              alt="${description}" />
          </a>
        </li>
        `
    )
    .join("");

  return itemsGalleryMarkup;
}

// Insert markup to gallery
galleryContainer.insertAdjacentHTML(
  "beforeend",
  createItemsGalleryMarkup(galleryItems)
);

// Create lightbox
const lightBox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  disableScroll: false,
});

// Body scroll lock
lightBox.on("show.simplelightbox", () => {
  const body = document.querySelector("body");
  const bodyStyle = window.getComputedStyle(body);
  const bodyWidth =
    body.offsetWidth +
    parseInt(bodyStyle.marginLeft) +
    parseInt(bodyStyle.marginRight);
  const verticalScrollBar = window.innerWidth - bodyWidth;

  body.style.overflow = "hidden";
  body.style.paddingRight = verticalScrollBar + "px";
});

// Body scroll unlock
lightBox.on("close.simplelightbox", () => {
  const body = document.querySelector("body");

  setTimeout(() => {
    body.style.overflow = "auto";
    body.style.paddingRight = "";
  }, 250);
})
