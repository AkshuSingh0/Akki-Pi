document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.gallery-track');
  const leftBtn = document.querySelector('.gallery-left');
  const rightBtn = document.querySelector('.gallery-right');

  let autoScrollInterval;
  let isPaused = false;
  let idleTimer;

  function scrollGallery() {
    if (!isPaused && track) {
      track.scrollBy({ left: 2, behavior: 'smooth' });
    }
  }

  function startAutoScroll() {
    clearInterval(autoScrollInterval); // clear previous if any
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
    }, 5000);
  }

  function showControls() {
    leftBtn.style.display = 'block';
    rightBtn.style.display = 'block';
  }

  function hideControls() {
    leftBtn.style.display = 'none';
    rightBtn.style.display = 'none';
  }

  // Add touchstart to handle phones/tablets
  track.addEventListener('click', stopAutoScroll);
  track.addEventListener('touchstart', stopAutoScroll);

  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -350, behavior: 'smooth' });
    stopAutoScroll();
  });

  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: 350, behavior: 'smooth' });
    stopAutoScroll();
  });

  // Start auto-scroll after short delay to ensure everything is rendered
  setTimeout(() => {
    startAutoScroll();
  }, 300);
});
