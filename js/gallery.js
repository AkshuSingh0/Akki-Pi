const track = document.querySelector('.gallery-track');
const leftBtn = document.querySelector('.gallery-left');
const rightBtn = document.querySelector('.gallery-right');

let scrollSpeed = 1;      // px per step
let autoScrollInterval;
let idleTimer;
let isPaused = false;

// Duplicate to enable infinite loop
function duplicateContent() {
  const imgs = Array.from(track.querySelectorAll('img'));
  imgs.forEach(img => track.append(img.cloneNode()));
}

// Scroll function with seamless loop check
function scrollGallery() {
  if (isPaused) return;

  track.scrollLeft += scrollSpeed;
  if (track.scrollLeft >= track.scrollWidth / 2) {
    track.scrollLeft = 0;
  }
}

// Start auto-scrolling
function startAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(scrollGallery, 20);
  isPaused = false;
  hideControls();
}

// Stop scrolling + show buttons + begin idle timeout
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
  isPaused = true;
  showControls();
  clearTimeout(idleTimer);
  idleTimer = setTimeout(startAutoScroll, 3000); // 3s resume
}

function showControls() {
  leftBtn.style.display = 'block';
  rightBtn.style.display = 'block';
}

function hideControls() {
  leftBtn.style.display = 'none';
  rightBtn.style.display = 'none';
}

// Button controls
leftBtn.addEventListener('click', () => {
  stopAutoScroll();
  track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  stopAutoScroll();
  track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
});

// Pause on track click or touch
track.addEventListener('mousedown', stopAutoScroll);
track.addEventListener('touchstart', stopAutoScroll);

// Init
duplicateContent();
startAutoScroll();
