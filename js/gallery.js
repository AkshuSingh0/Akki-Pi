const track = document.querySelector('.gallery-track');
const leftBtn = document.querySelector('.gallery-left');
const rightBtn = document.querySelector('.gallery-right');

let autoScrollInterval;
let isPaused = false;
let idleTimer;

function scrollGallery() {
  track.scrollBy({ left: 2, behavior: 'smooth' });
}

function startAutoScroll() {
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
    startAutoScroll();
  }, 5000); // resume after 5 sec
}

function showControls() {
  leftBtn.style.display = 'block';
  rightBtn.style.display = 'block';
}

function hideControls() {
  leftBtn.style.display = 'none';
  rightBtn.style.display = 'none';
}

track.addEventListener('click', stopAutoScroll);
leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -350, behavior: 'smooth' });
  resetIdleTimer();
});
rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: 350, behavior: 'smooth' });
  resetIdleTimer();
});

// Start scrolling on load
startAutoScroll();
