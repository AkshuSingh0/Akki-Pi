const track = document.querySelector('.gallery-track');
const leftBtn = document.querySelector('.gallery-left');
const rightBtn = document.querySelector('.gallery-right');

let scrollAmount = 0;
let isPaused = false;
let autoScrollInterval;
let idleTimer;
const scrollStep = 1;
const scrollDelay = 25; // Faster scroll
const resumeAfter = 3000;

// Duplicate content once
function duplicateContent() {
  const images = Array.from(track.children);
  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });
}

function scrollGallery() {
  if (!isPaused) {
    track.scrollLeft += scrollStep;

    // Loop back if reached halfway (original length)
    if (track.scrollLeft >= track.scrollWidth / 2) {
      track.scrollLeft = 0;
    }
  }
}

function startAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(scrollGallery, scrollDelay);
  isPaused = false;
  hideControls();
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
  isPaused = true;
  showControls();
  resetIdleTimer();
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    isPaused = false;
    startAutoScroll();
  }, resumeAfter);
}

function showControls() {
  leftBtn.style.display = 'block';
  rightBtn.style.display = 'block';
}

function hideControls() {
  leftBtn.style.display = 'none';
  rightBtn.style.display = 'none';
}

// Button scroll
leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -350, behavior: 'smooth' });
  stopAutoScroll();
});

rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: 350, behavior: 'smooth' });
  stopAutoScroll();
});

// Stop auto-scroll on user interaction
track.addEventListener('click', stopAutoScroll);
track.addEventListener('touchstart', stopAutoScroll);

// ✅ Initialize
duplicateContent();
startAutoScroll();
