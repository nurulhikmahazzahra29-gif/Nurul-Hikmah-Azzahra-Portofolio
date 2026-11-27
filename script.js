
/* MENU NAVIGASI */
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
 const isOpen = nav.classList.toggle("open");
 menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
 link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
 });
});

/* ANIMASI REVEAL */
const revealObserver = new IntersectionObserver(entries => {
 entries.forEach(entry => {
  if (entry.isIntersecting) {
   entry.target.classList.add("visible");
   revealObserver.unobserve(entry.target);
  }
 });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
 revealObserver.observe(element);
});

/* SCROLL PROGRESS */
const scrollLine = document.getElementById("scrollLine");

window.addEventListener("scroll", () => {
 const scrollable =
  document.documentElement.scrollHeight - window.innerHeight;

 const progress = scrollable > 0
  ? (window.scrollY / scrollable) * 100
  : 0;

 scrollLine.style.width = progress + "%";
}, { passive: true });

/* ACTIVE NAVIGATION */
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {
 entries.forEach(entry => {
  if (entry.isIntersecting) {
   navLinks.forEach(link => {
    link.classList.toggle(
     "active",
     link.getAttribute("href") === "#" + entry.target.id
    );
   });
  }
 });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => {
 sectionObserver.observe(section);
});

/* TAHUN OTOMATIS */
document.getElementById("year").textContent =
 new Date().getFullYear();

/* HEADER SAAT SCROLL */
const pageHeader = document.querySelector(".header");

window.addEventListener("scroll", () => {
 pageHeader.classList.toggle("scrolled", window.scrollY > 35);
}, { passive: true });

/* FLOATING LOVE */
const loveBackground = document.getElementById("loveBackground");
const loveSymbols = ["♡", "♥", "💕", "💗", "ღ", "୨୧"];

function createFloatingLove() {
 const love = document.createElement("span");

 love.className = "love";
 love.textContent =
  loveSymbols[Math.floor(Math.random() * loveSymbols.length)];

 love.style.left = Math.random() * 100 + "vw";
 love.style.fontSize = (14 + Math.random() * 25) + "px";

 const duration = 7 + Math.random() * 8;

 love.style.animationDuration = duration + "s";
 loveBackground.appendChild(love);

 setTimeout(() => {
  love.remove();
 }, duration * 1000 + 500);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
 for (let i = 0; i < 12; i++) {
  setTimeout(createFloatingLove, i * 180);
 }

 setInterval(createFloatingLove, 650);
}
