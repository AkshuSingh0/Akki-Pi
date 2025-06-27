const track = document.querySelector('.gallery-track');
const leftBtn = document.querySelector('.gallery-left');
const rightBtn = document.querySelector('.gallery-right');

let scrollSpeed = 1; // Adjust for faster scroll
let isPaused = false;
let idleTimer = null;
let animationFrame;

// Clone all images 2 more times for infinite effect
function duplicateImages() {
  const images = Array.from(track.children);
  for (let i = 0; i < 2; i++) {
    images.forEach(img => track.appendChild(img.cloneNode(true)));
  }
}

// Auto-scroll using requestAnimationFrame
function autoScroll() {
  if (!isPaused) {
    track.scrollLeft += scrollSpeed;

    // Looping logic: if scroll passes original image set, reset
    if (track.scrollLeft >= track.scrollWidth / 3 * 2) {
      track.scrollLeft = track.scrollWidth / 3;
    }
  }

  animationFrame = requestAnimationFrame(autoScroll);
}

// Pause scroll on user interaction
function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    isPaused = false;
  }, 3000);
}

// Button Events
leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -300, behavior: 'smooth' });
  pauseAutoScroll();
});

rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: 300, behavior: 'smooth' });
  pauseAutoScroll();
});

// Pause on manual touch/click/hover
['click', 'touchstart', 'mousemove'].forEach(evt => {
  track.addEventListener(evt, pauseAutoScroll);
});

// Initialize
window.addEventListener('load', () => {
  duplicateImages();
  track.scrollLeft = track.scrollWidth / 3; // Start from middle
  autoScroll();
});
