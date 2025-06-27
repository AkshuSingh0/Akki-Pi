const track = document.querySelector(".gallery-track");
const leftBtn = document.querySelector(".gallery-left");
const rightBtn = document.querySelector(".gallery-right");

let scrollAmount = 0;
let isPaused = false;
let idleTimer = null;
let autoScrollInterval;

// Clone the entire gallery twice for looping
function duplicateImages() {
  const images = Array.from(track.children);
  for (let i = 0; i < 2; i++) {
    images.forEach((img) => {
      track.appendChild(img.cloneNode(true));
    });
  }
}

// Reset scroll if near end
function loopScroll() {
  scrollAmount += 1;
  track.scrollLeft += 1;

  const third = track.scrollWidth / 3;
  if (track.scrollLeft >= third * 2) {
    track.scrollLeft = third;
  }
}

// Auto-scroll setup
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (!isPaused) {
      loopScroll();
    }
  }, 20); // Speed of scroll
}

function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    isPaused = false;
  }, 3000);
}

// Button events
leftBtn.addEventListener("click", () => {
  track.scrollBy({ left: -300, behavior: "smooth" });
  pauseAutoScroll();
});

rightBtn.addEventListener("click", () => {
  track.scrollBy({ left: 300, behavior: "smooth" });
  pauseAutoScroll();
});

// Pause auto-scroll on interaction
["touchstart", "click", "mousemove"].forEach((evt) => {
  track.addEventListener(evt, pauseAutoScroll);
});

// Start everything
window.addEventListener("load", () => {
  duplicateImages();
  track.scrollLeft = track.scrollWidth / 3; // Start in center
  startAutoScroll();
});
