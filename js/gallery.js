const track = document.querySelector(".gallery-track");
const leftBtn = document.querySelector(".gallery-left");
const rightBtn = document.querySelector(".gallery-right");

let scrollSpeed = 0.5;
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

// ✅ This is required for Safari/iOS to keep it active
function keepActiveHack() {
  const dummy = document.createElement('div');
  dummy.style.height = '1px';
  dummy.style.width = '1px';
  dummy.style.position = 'absolute';
  dummy.style.left = '0';
  dummy.style.top = '0';
  dummy.style.opacity = '0';
  track.appendChild(dummy);
  dummy.scrollIntoView(); // triggers scroll interaction
}

function loopScroll() {
  if (!isPaused) {
    track.scrollLeft += scrollSpeed;

    const third = track.scrollWidth / 3;
    if (track.scrollLeft >= third * 2) {
      track.scrollLeft = third;
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
  track.addEventListener(event, pauseAutoScroll, { passive: true });
});

window.addEventListener("load", () => {
  duplicateImages();

  // ✅ Wait for layout + apply Safari fix
  setTimeout(() => {
    const third = track.scrollWidth / 3;
    track.scrollLeft = third;
    keepActiveHack();
    loopScroll();
  }, 100);
});
