const heroContent = document.querySelector('.hero-content');
const heroScroll  = document.querySelector('.hero-scroll');
const heroHeight = document.querySelector('.hero').offsetHeight;

window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (y > heroHeight) return;
    heroContent.style.transform = `translateY(${y * 0.3}px)`;
    heroScroll.style.opacity = Math.max(0, 1 - y / 200);
}, { passive: true });
