// gallery.js -- supports multiple gallery sections (main gallery + Photon gallery)
// Works on desktop, iPad, Android. Uses requestAnimationFrame and safe touch handling.

(function () {
  // Options (tweak here if you want different speed for all galleries)
  const DEFAULT_SPEED = 1; // px per frame (increase to scroll faster)
  const RESUME_DELAY = 3000; // ms after user stops to resume auto-scroll
  const SCROLL_STEP = 300; // px for left/right button click

  // Initialize all gallery containers
  const containers = Array.from(document.querySelectorAll('.gallery-container'));

  containers.forEach(initGallery);

  function initGallery(container) {
    const track = container.querySelector('.gallery-track');
    if (!track) return;

    // left/right buttons are siblings in same container
    const leftBtn = container.querySelector('.gallery-left');
    const rightBtn = container.querySelector('.gallery-right');

    let scrollSpeed = DEFAULT_SPEED;
    let isPaused = false;
    let idleTimer = null;
    let animId = null;
    let cloned = false;

    // Duplicate images once to allow smooth infinite scroll
    function duplicateImagesOnce() {
      if (cloned) return;
      const imgs = Array.from(track.children);
      // Clone each element 2 times (so we have 3 sets total)
      imgs.forEach(img => track.appendChild(img.cloneNode(true)));
      imgs.forEach(img => track.appendChild(img.cloneNode(true)));
      cloned = true;
    }

    function loopScroll() {
      if (!isPaused) {
        track.scrollLeft += scrollSpeed;
        // safe reset: when scrolled beyond first third, reset to first third
        const third = track.scrollWidth / 3;
        if (track.scrollLeft >= third * 2) {
          track.scrollLeft = third;
        }
      }
      animId = requestAnimationFrame(loopScroll);
    }

    function pauseAutoScroll() {
      isPaused = true;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { isPaused = false; }, RESUME_DELAY);
    }

    // Button handlers (if present)
    if (leftBtn) leftBtn.addEventListener('click', () => {
      pauseAutoScroll();
      // smooth behavior may not be available on all old browsers but works on most
      track.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
    });

    if (rightBtn) rightBtn.addEventListener('click', () => {
      pauseAutoScroll();
      track.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
    });

    // Pause on pointer/touch interactions
    ['pointerdown', 'touchstart', 'mousedown'].forEach(evt => {
      track.addEventListener(evt, pauseAutoScroll, { passive: true });
    });

    // Ensure autoplay resumes after visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        cancelAnimationFrame(animId);
        loopScroll();
      }
    });

    // Initialize on load / micro task
    window.requestAnimationFrame(() => {
      duplicateImagesOnce();
      // Set scroll to the middle block (third)
      const third = track.scrollWidth / 3;
      track.scrollLeft = third;
      // start loop
      loopScroll();
      // iOS momentum touch: allow pan-x
      track.style.touchAction = 'pan-x';
    });
  }
})();
