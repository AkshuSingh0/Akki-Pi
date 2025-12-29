// menu.js — mobile slide menu controller

function openMenu() {
  const menu = document.getElementById("menuOverlay");
  if (menu) menu.style.left = "0";
}

function closeMenu() {
  const menu = document.getElementById("menuOverlay");
  if (menu) menu.style.left = "-100%";
}
