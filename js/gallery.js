const track = document.querySelector(".gallery-track");
const leftBtn = document.querySelector(".gallery-left");
const rightBtn = document.querySelector(".gallery-right");

let scrollSpeed = 0.5; // ✅ Slower scroll speed
let isPaused = false;
let idleTimer = null;
let animationFrame;

function duplicateImages() {
  const images = Array.from(track.children);
  for (let i = 0; i < 2; i++) {
    images.forEach((img) => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
    });
  }
}

function loopScroll() {
  if (!isPaused) {
    track.scrollLeft += scrollSpeed;

    const total = track.scrollWidth / 3;
    if (track.scrollLeft >= total * 2) {
      track.scrollLeft = total;
    }
  }

  animationFrame = requestAnimationFrame(loopScroll);
}

function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    isPaused = false;
  }, 3000);
}

leftBtn.addEventListener("click", () => {
  track.scrollBy({ left: -400, behavior: "smooth" });
  pauseAutoScroll();
});

rightBtn.addEventListener("click", () => {
  track.scrollBy({ left: 400, behavior: "smooth" });
  pauseAutoScroll();
});

["click", "touchstart", "mousemove"].forEach((event) => {
  track.addEventListener(event, pauseAutoScroll);
});

window.addEventListener("load", () => {
  duplicateImages();

  // ✅ Wait for DOM to layout before adjusting scroll position
  setTimeout(() => {
    const third = track.scrollWidth / 3;
    track.scrollLeft = third;
    loopScroll();
  }, 50);
});
