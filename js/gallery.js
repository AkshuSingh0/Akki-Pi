const track = document.querySelector(".gallery-track");
let isDragging = false;
let startX;
let scrollLeft;

let autoScroll = setInterval(() => {
  track.scrollLeft += 1;
}, 20);

track.addEventListener("mousedown", (e) => {
  clearInterval(autoScroll);
  isDragging = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});

track.addEventListener("mouseleave", () => isDragging = false);

track.addEventListener("mouseup", () => {
  isDragging = false;
  autoScroll = setInterval(() => {
    track.scrollLeft += 1;
  }, 20);
});

track.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

track.addEventListener("touchstart", (e) => {
  clearInterval(autoScroll);
  isDragging = true;
  startX = e.touches[0].pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});

track.addEventListener("touchend", () => {
  isDragging = false;
  autoScroll = setInterval(() => {
    track.scrollLeft += 1;
  }, 20);
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});
