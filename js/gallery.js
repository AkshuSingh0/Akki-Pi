const track = document.querySelector('.gallery-track');
const leftBtn = document.querySelector('.gallery-left');
const rightBtn = document.querySelector('.gallery-right');

let scrollAmount = 0;
let isPaused = false;
let autoScrollInterval;
let idleTimer;

// Duplicate content for infinite scroll
function duplicateContent() {
  const images = Array.from(track.querySelectorAll('img'));
  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });
}

function scrollGallery() {
  if (!isPaused) {
    scrollAmount += 2;
    track.scrollLeft += 2;

    if (scrollAmount >= track.scrollWidth / 2) {
      track.scrollLeft = 0;
      scrollAmount = 0;
    }
  }
}

function startAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(scrollGallery, 20);
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
  }, 3000);
}

function showControls() {
  leftBtn.style.display = 'block';
  rightBtn.style.display = 'block';
}

function hideControls() {
  leftBtn.style.display = 'none';
  rightBtn.style.display = 'none';
}

// Event Listeners
track.addEventListener('click', stopAutoScroll);

leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -350, behavior: 'smooth' });
  stopAutoScroll();
});

rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: 350, behavior: 'smooth' });
  stopAutoScroll();
});

// Start everything
duplicateContent();
startAutoScroll();
