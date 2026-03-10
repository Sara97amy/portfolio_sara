// ── Hamburger-meny ──────────────────────────────────────────────────────────

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Öppna/stäng menyn när hamburger-knappen klickas
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    // Uppdatera aria-expanded så skärmläsare vet om menyn är öppen
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Stäng menyn automatiskt när användaren klickar på en länk
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ── Parallax-effekt på hero ──────────────────────────────────────────────────

const heroContent = document.querySelector('.hero-content');
const heroScroll = document.querySelector('.hero-scroll');
const heroHeight = document.querySelector('.hero').offsetHeight;

window.addEventListener('scroll', () => {
    const y = window.pageYOffset;

    // Sluta påverka när man scrollat förbi hero-sektionen
    if (y > heroHeight) return;

    // Flytta hero-innehållet nedåt långsammare än scroll-hastigheten (0.3x)
    heroContent.style.transform = `translateY(${y * 0.3}px)`;

    // Tona ut "scroll down"-texten när man börjar scrolla
    heroScroll.style.opacity = Math.max(0, 1 - y / 200);

}, { passive: true }); // passive: true förbättrar scroll-prestanda
