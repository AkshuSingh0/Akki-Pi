const track = document.querySelector(".gallery-track");
const leftBtn = document.querySelector(".gallery-left");
const rightBtn = document.querySelector(".gallery-right");

let scrollSpeed = 0.5;
let isPaused = false;
let idleTimer = null;
let animationFrame;

// Duplicate images for seamless infinite loop
function duplicateImages() {
  const images = Array.from(track.children);
  for (let i = 0; i < 2; i++) {
    images.forEach(img => track.appendChild(img.cloneNode(true)));
  }
}

// iOS autoplay kickstart
function kickstartIOS() {
  track.scrollLeft += 1;
  track.scrollLeft -= 1;
}

// Loop scroll function
function loopScroll() {
  if (!isPaused) {
    track.scrollLeft += scrollSpeed;
    const third = track.scrollWidth / 3;
    if (track.scrollLeft >= third * 2) track.scrollLeft = third;
  }
  animationFrame = requestAnimationFrame(loopScroll);
}

// Pause on interaction
function pauseAutoScroll() {
  isPaused = true;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { isPaused = false; }, 3000);
}

// Button handlers
leftBtn.onclick = () => { track.scrollBy({ left: -400, behavior: "smooth" }); pauseAutoScroll(); };
rightBtn.onclick = () => { track.scrollBy({ left: 400, behavior: "smooth" }); pauseAutoScroll(); };

// Interaction events
["touchstart", "mousedown", "mousemove"].forEach(evt => 
  track.addEventListener(evt, pauseAutoScroll, { passive: true })
);

// Initialize
window.addEventListener("load", () => {
  duplicateImages();
  setTimeout(() => {
    const third = track.scrollWidth / 3;
    track.scrollLeft = third;
    kickstartIOS();       // necessary iOS trick
    loopScroll();
  }, 100);
});
