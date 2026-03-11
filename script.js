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


const heroContent = document.querySelector('.hero-content');
const heroScroll  = document.querySelector('.hero-scroll');
const heroHeight = document.querySelector('.hero').offsetHeight;

window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (y > heroHeight) return;
    heroContent.style.transform = `translateY(${y * 0.3}px)`;
    heroScroll.style.opacity = Math.max(0, 1 - y / 200);
}, { passive: true });


const navSections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveLink() {
    const scrollY = window.pageYOffset + 80;
    let current = '';
    navSections.forEach(section => {
        if (section.offsetTop <= scrollY) {
            current = section.id;
        }
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
