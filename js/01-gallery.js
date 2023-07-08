import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
let instance;

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
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`
    )
    .join("");

  return itemsGalleryMarkup;
}

// Insert markup to gallery
galleryContainer.insertAdjacentHTML(
  "afterbegin",
  createItemsGalleryMarkup(galleryItems)
);

// Gallery event listener by click
galleryContainer.addEventListener('click', (e) => {
  e.preventDefault();
  
  const isGalleryImage = e.target.classList.contains("gallery__image");
  
  if (!isGalleryImage) {
    return;
  }
  
  const { target: galleryImgEl } = e;
  
  showModal(galleryImgEl);
});


// Create a basic lightbox and show modal
function showModal({ dataset: { source }, alt }) {
  instance = basicLightbox.create(`<img src="${source}" alt="${alt}">`, {
    onShow: openModal,
    onClose: closeModal,
  });

  instance.show();
}

// Before open lightbox
function openModal() {
  window.addEventListener("keydown", onKeyPress);
  bodyScrollLock();
}

// Before close lightbox
function closeModal() {
  window.removeEventListener("keydown", onKeyPress);
  bodyScrollUnlock();
}

// Body scroll lock function
function bodyScrollLock() {
  const body = document.querySelector("body");
  const bodyStyle = window.getComputedStyle(body);
  const bodyWidth = body.offsetWidth + parseInt(bodyStyle.marginLeft) + parseInt(bodyStyle.marginRight);
  const verticalScrollBar = window.innerWidth - bodyWidth;

  body.style.overflow = "hidden";
  body.style.paddingRight = verticalScrollBar + "px";
}

// Body scroll unlock function
function bodyScrollUnlock() {
  const body = document.querySelector("body");

  setTimeout(() => {
    body.style.overflow = "auto";
    body.style.paddingRight = "";
  }, 250);
}

// Close lightbox on Escape
function onKeyPress(e) {
  if (e.code !== "Escape") {
    return;
  }

  instance.close();
}
