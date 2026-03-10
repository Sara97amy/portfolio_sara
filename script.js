const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

const header = document.querySelector('header');
let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
    if (navLinks.classList.contains('open')) return;

    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        header.style.top = '0';
    } else {
        header.style.top = `-${header.offsetHeight}px`;
    }
    prevScrollPos = currentScrollPos;
};

const heroContent = document.querySelector('.hero-content');
const heroScroll = document.querySelector('.hero-scroll');
const heroHeight = document.querySelector('.hero').offsetHeight;

window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (y > heroHeight) return;

    heroContent.style.transform = `translateY(${y * 0.3}px)`;
    heroScroll.style.opacity = Math.max(0, 1 - y / 200);
}, { passive: true });
