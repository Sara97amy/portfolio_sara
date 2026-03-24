const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.carousel-btn--prev');
const nextBtn = document.querySelector('.carousel-btn--next');

let current = 0;

function updateButtons() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;
}

function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    updateButtons();
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

updateButtons();
