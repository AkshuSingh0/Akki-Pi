const track = document.querySelector('.gallery-track');
const leftBtn = document.querySelector('.gallery-left');
const rightBtn = document.querySelector('.gallery-right');

let scrollSpeed = 1.5;
let isPaused = false;
let idleTimer = null;
let animationFrame;

// Duplicate gallery images for seamless looping
function duplicateImages() {
  const images = Array.from(track.children);
  for (let i = 0; i < 2; i++) {
    images.forEach(img => track.appendChild(img.cloneNode(true)));
  }
}

// Scroll continuously unless paused
function autoScroll() {
  if (!isPaused) {
    track.scrollLeft += scrollSpeed;
    const scrollLimit = (track.scrollWidth / 3) * 2;

    if (track.scrollLeft >= scrollLimit) {
      track.scrollLeft = track.scrollWidth / 3;
    }
  }
  animationFrame = requestAnimationFrame(autoScroll);
}

// Pause on interaction, resume after 3s
function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    isPaused = false;
  }, 3000);
}

// Button click handlers
leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -300, behavior: 'smooth' });
  pauseAutoScroll();
});
rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: 300, behavior: 'smooth' });
  pauseAutoScroll();
});

// Pause on user interaction (touch, move)
['click', 'touchstart', 'mousemove'].forEach(evt => {
  track.addEventListener(evt, pauseAutoScroll, { passive: true });
});

// Init on load
window.addEventListener('load', () => {
  duplicateImages();
  track.scrollLeft = track.scrollWidth / 3;
  autoScroll();
});
