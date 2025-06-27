const track = document.querySelector(".gallery-track");
const leftBtn = document.querySelector(".gallery-left");
const rightBtn = document.querySelector(".gallery-right");

let scrollSpeed = 1;
let isPaused = false;
let idleTimer = null;
let animId = null;

// Clone images twice to allow smooth infinite loop
function duplicateImages() {
  const imgs = Array.from(track.children);
  for (let i = 0; i < 2; i++) {
    imgs.forEach(img => track.appendChild(img.cloneNode(true)));
  }
}

// Loop scroll using requestAnimationFrame
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

// Pause scroll, resume after 3 seconds
function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { isPaused = false; }, 3000);
}

// Button interactions
leftBtn.addEventListener("click", () => {
  pauseAutoScroll();
  track.scrollBy({ left: -300, behavior: "smooth" });
});
rightBtn.addEventListener("click", () => {
  pauseAutoScroll();
  track.scrollBy({ left: 300, behavior: "smooth" });
});

// Capture touch/mouse events for pause
["touchstart", "pointerdown", "mousedown"].forEach(evt => {
  track.addEventListener(evt, pauseAutoScroll, { passive: true });
});

// Initialize on page load
window.addEventListener("load", () => {
  duplicateImages();
  const third = track.scrollWidth / 3;
  track.scrollLeft = third;
  loopScroll();
});
