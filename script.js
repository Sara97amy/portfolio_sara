// ════════════════════════════════════════════════════════════════════════════
// script.js  –  All interaktiv JavaScript för portfolion
// ════════════════════════════════════════════════════════════════════════════
//
// Filen är uppdelad i tre logiska delar:
//   1. Hamburger-meny  (mobil-navigation)
//   2. Parallax-effekt (hero-sektionen rör sig långsammare vid scroll)
//   3. Aktiv navbar-länk (markerar vilken sektion man befinner sig i)
//
// Skriptet laddas med attributet "defer" i index.html, vilket innebär att
// webbläsaren laddar ned JS-filen parallellt med HTML:en men VÄNTAR med att
// köra koden tills hela DOM:en är byggd. Det garanterar att alla element
// (hamburger, nav-links, hero osv.) finns tillgängliga när koden körs.
// ════════════════════════════════════════════════════════════════════════════


// ── 1. Hamburger-meny ────────────────────────────────────────────────────────
//
// På mobil (≤768 px) ersätts det horisontella navigationsmenyn av en
// "hamburger"-knapp (tre streck). När knappen klickas togglas klassen "open"
// på både knappen och länklistan, vilket CSS:en använder för att visa/dölja
// och animera elementen.

// Väljer det första elementet i DOM:en som matchar CSS-selektorn '.hamburger'
// querySelector returnerar null om inget hittas, men här vet vi att det finns.
const hamburger = document.querySelector('.hamburger');

// Väljer <ul class="nav-links"> – listan med navigeringslänkarna
const navLinks = document.querySelector('.nav-links');

// Lyssnar efter 'click'-händelsen på hamburger-knappen.
// Arrow-funktion används (istället för function()) – kortare syntax, och
// 'this' binds inte om, vilket spelar roll i vissa sammanhang men inte här.
hamburger.addEventListener('click', () => {
    // classList.toggle('open') lägger till klassen om den saknas, tar bort den
    // om den redan finns – precis som att trycka på en strömbrytare.
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');

    // ARIA (Accessible Rich Internet Applications) – hjälper skärmläsare att
    // förstå sidans dynamiska tillstånd.
    // aria-expanded="true"  → menyn är öppen
    // aria-expanded="false" → menyn är stängd
    // classList.contains('open') returnerar true/false; setAttribute omvandlar
    // det till strängen "true"/"false" som ARIA kräver.
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Stäng menyn automatiskt när användaren klickar på en intern länk.
// querySelectorAll returnerar en NodeList (ej Array, men itererbar med forEach).
// Vi hämtar alla <a>-taggar inuti nav-links.
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        // Ta bort 'open' från båda elementen → menyn kollapsar
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        // Sätt tillbaka aria-expanded till "false" för tillgänglighet
        hamburger.setAttribute('aria-expanded', 'false');
    });
});


// ── 2. Parallax-effekt på hero-sektionen ─────────────────────────────────────
//
// Parallax = bakgrunden (eller innehållet) rör sig i en annan hastighet än
// scrollningen. Det ger ett djupintryck. Här rör sig hero-texten NEDÅT med
// 30 % av scroll-hastigheten (koefficient 0.3) – text upplevs som "efter" i
// rörelsen.
//
// Tekniken fungerar via CSS transform: translateY() som är GPU-accelererad
// och prestandavänlig att animera (till skillnad från att ändra 'top' eller
// 'margin-top').

// Hämtar hero-textcontainern och "scrolla ned"-texten
const heroContent = document.querySelector('.hero-content');
const heroScroll  = document.querySelector('.hero-scroll');

// offsetHeight = elementets höjd i pixlar inkl. padding men exkl. margin.
// Vi behöver hero-sektionens höjd för att veta NÄR vi ska sluta med effekten.
const heroHeight = document.querySelector('.hero').offsetHeight;

// scroll-händelsen avfyras varje gång användaren scrollar.
window.addEventListener('scroll', () => {
    // window.pageYOffset = hur många pixlar sidan har scrollats nedåt.
    // (äldre egenskap; modernare alternativ: window.scrollY – men pageYOffset
    // stöds i alla webbläsare inklusive äldre)
    const y = window.pageYOffset;

    // Optimering: avbryt tidigt om vi scrollat förbi hero-sektionen helt.
    // Ingen anledning att räkna ut och applicera transform när hero inte syns.
    if (y > heroHeight) return;

    // Flytta hero-innehållet nedåt med 30 % av scroll-positionen.
    // Vid y=0 → translateY(0px)  = ingen förflyttning
    // Vid y=300 → translateY(90px) = skjuts ned 90 px
    // Effekt: innehållet rör sig LÅNGSAMMARE än sidan → parallax-känsla
    heroContent.style.transform = `translateY(${y * 0.3}px)`;

    // Tona ut "Scrolla ner"-texten gradvis de första 200 pixlarna.
    // Math.max(0, …) ser till att opacity aldrig blir negativt (kan hända om
    // y > 200, då blir 1 - y/200 negativt).
    // Vid y=0   → opacity = 1.0 (fullt synlig)
    // Vid y=100 → opacity = 0.5 (halvt genomskinlig)
    // Vid y=200 → opacity = 0.0 (osynlig)
    heroScroll.style.opacity = Math.max(0, 1 - y / 200);

// { passive: true } – talar om för webbläsaren att scroll-lyssnaren aldrig
// anropar preventDefault(). Webbläsaren behöver då inte vänta på att koden
// körs innan den scrollar, vilket ger jämnare scroll-prestanda (60 fps).
}, { passive: true });


// ── 3. Aktiv navbar-länk vid scroll ──────────────────────────────────────────
//
// Markerar automatiskt vilken sektion användaren befinner sig i genom att
// lägga till CSS-klassen "active" på motsvarande nav-länk. Gör det lättare
// att orientera sig på sidan.
//
// Algoritm:
//   – Iterera alla sektioner uppifrån och ned.
//   – Om sektionens topp-position (offsetTop) är OVANFÖR eller PÅ nuvarande
//     scroll-position, anses den "aktiv".
//   – Sista sektionen som uppfyller villkoret vinner → korrekt sektion markeras.

// querySelectorAll('section[id]') – hämtar alla <section>-element SOM HAR ett
// id-attribut. Attributselektor [id] matchar vilket id-värde som helst.
const navSections = document.querySelectorAll('section[id]');

// Hämtar alla nav-länkarna vars href börjar med "#" (interna ankarlänkar).
// ^= är CSS-attributselektorn för "börjar med".
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveLink() {
    // Adderar 80 px till scrollY som offset för den fasta navbar:en (ca 60 px hög).
    // Utan offset skulle nästa sektion markeras lite "för tidigt" – vi vill att
    // sektionen ska ha hunnit förbi navbaren innan den markeras aktiv.
    const scrollY = window.pageYOffset + 80;

    let current = ''; // Håller id:t på den aktuella sektionen

    // Iterera alla sektioner och hitta den senaste vars topp passerat scrollY.
    // offsetTop = elementets avstånd från sidans topp (ej viewport-relativ).
    navSections.forEach(section => {
        if (section.offsetTop <= scrollY) {
            current = section.id; // Uppdateras för varje sektion som uppfyller kravet
        }
    });

    // Gå igenom alla nav-ankare och sätt/ta bort 'active'-klassen.
    // classList.toggle(klass, boolean): om boolean är true → lägg till, annars → ta bort.
    // a.getAttribute('href') returnerar t.ex. "#about" som vi jämför med "#current".
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

// Kör updateActiveLink varje gång användaren scrollar
window.addEventListener('scroll', updateActiveLink, { passive: true });

// Kör även direkt vid sidladdning (ifall sidan laddas med ett ankrar-fragment
// i URL:en, t.ex. portfolio.html#projects, eller bara för att sätta initialt läge)
updateActiveLink();
