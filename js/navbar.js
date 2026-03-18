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


const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.pageYOffset > 400);
}, { passive: true });
