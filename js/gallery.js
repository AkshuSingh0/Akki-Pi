const track = document.querySelector(".gallery-track");
const leftBtn = document.querySelector(".gallery-left");
const rightBtn = document.querySelector(".gallery-right");

let scrollSpeed = 1;
let isPaused = false;
let idleTimer = null;
let animId = null;

// Clone images twice for infinite scroll effect
function duplicateImages() {
  const imgs = Array.from(track.children);
  for (let i = 0; i < 2; i++) imgs.forEach(img => track.appendChild(img.cloneNode(true)));
}

// Continuous looping scroll using requestAnimationFrame
function loopScroll() {
  if (!isPaused) {
    track.scrollLeft += scrollSpeed;
    const third = track.scrollWidth / 3;
    if (track.scrollLeft >= third * 2) {
      track.scrollLeft = third;
    }
  }
  animId = requestAnimationFrame(loopScroll);
}

// Pause on interaction and resume after 3 seconds
function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { isPaused = false; }, 3000);
}

// Button handlers
leftBtn.addEventListener("click", () => {
  pauseAutoScroll();
  track.scrollBy({ left: -300, behavior: "smooth" });
});
rightBtn.addEventListener("click", () => {
  pauseAutoScroll();
  track.scrollBy({ left: 300, behavior: "smooth" });
});

// Pause on user touch/mouse down
["touchstart", "pointerdown", "mousedown"].forEach(evt => {
  track.addEventListener(evt, pauseAutoScroll, { passive: true });
});

// Ensure autoplay on iOS with visibility recovery
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    cancelAnimationFrame(animId);
    loopScroll();
  }
});

// Initialize gallery
window.addEventListener("load", () => {
  duplicateImages();
  const third = track.scrollWidth / 3;
  track.scrollLeft = third;
  loopScroll();
});
