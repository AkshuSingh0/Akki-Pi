const track = document.querySelector(".gallery-track");
const leftBtn = document.querySelector(".gallery-left");
const rightBtn = document.querySelector(".gallery-right");

let scrollSpeed = 0.5; // ✅ slower speed for Android
let isPaused = false;
let idleTimer = null;
let autoScrollInterval;

function duplicateImages() {
  const images = Array.from(track.children);
  for (let i = 0; i < 2; i++) {
    images.forEach((img) => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
    });
  }
}

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (!isPaused) {
      track.scrollLeft += scrollSpeed;
      const third = track.scrollWidth / 3;
      if (track.scrollLeft >= third * 2) {
        track.scrollLeft = third;
      }
    }
  }, 20); // ✅ smooth but slow interval
}

function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    isPaused = false;
  }, 3000);
}

leftBtn.addEventListener("click", () => {
  track.scrollBy({ left: -300, behavior: "smooth" });
  pauseAutoScroll();
});

rightBtn.addEventListener("click", () => {
  track.scrollBy({ left: 300, behavior: "smooth" });
  pauseAutoScroll();
});

["click", "touchstart", "mousemove"].forEach((event) => {
  track.addEventListener(event, pauseAutoScroll);
});

window.addEventListener("load", () => {
  duplicateImages();
  const third = track.scrollWidth / 3;
  track.scrollLeft = third;
  startAutoScroll(); // ✅ setInterval more reliable on iOS
});
