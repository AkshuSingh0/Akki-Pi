const track = document.querySelector(".gallery-track");
const leftBtn = document.querySelector(".gallery-left");
const rightBtn = document.querySelector(".gallery-right");

let isPaused = false;
let idleTimer = null;
let animationFrame;

// Step 1: Duplicate images to support seamless infinite scroll
function duplicateImages() {
  const originalImages = Array.from(track.children);
  for (let i = 0; i < 2; i++) {
    originalImages.forEach((img) => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
    });
  }
}

// Step 2: Auto-scroll function
function autoScroll() {
  if (!isPaused) {
    track.scrollLeft += 1;
    const scrollWidth = track.scrollWidth;
    const third = scrollWidth / 3;

    // Loop: If scroll reaches end of 2nd copy, jump back to start of 2nd
    if (track.scrollLeft >= third * 2) {
      track.scrollLeft = third;
    }
  }
  animationFrame = requestAnimationFrame(autoScroll);
}

// Step 3: Pause/resume logic
function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    isPaused = false;
  }, 3000);
}

// Step 4: Button Events
leftBtn.addEventListener("click", () => {
  track.scrollBy({ left: -300, behavior: "smooth" });
  pauseAutoScroll();
});
rightBtn.addEventListener("click", () => {
  track.scrollBy({ left: 300, behavior: "smooth" });
  pauseAutoScroll();
});

// Step 5: Pause when user interacts (touch or hover or click)
["touchstart", "mouseenter", "click"].forEach((evt) => {
  track.addEventListener(evt, pauseAutoScroll);
});

// Step 6: On Load
window.addEventListener("load", () => {
  duplicateImages();
  const third = track.scrollWidth / 3;
  track.scrollLeft = third;
  autoScroll();
});
