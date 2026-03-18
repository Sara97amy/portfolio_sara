# Portfolio – Sara Lindh

Personlig portfoliosida byggd med HTML, CSS och JavaScript. Sidan presenterar mig, mina projekt, min tekniska kompetens och mina kontaktuppgifter.

## Sektioner

- **Om mig** – kort presentation
- **Utbildning** – Jensen YH med expanderbara kurser, övriga utbildningar
- **Nuvarande & kommande kompetenser** – tech stack med ikoner
- **Projekt** – kodprojekt med beskrivningar och GitHub-länkar
- **Arbetslivserfarenheter** – tidslinje + meriter
- **Omdömen** – referenser med avatarbilder
- **Kontakt** – formulär kopplat till Web3Forms

## Tekniker

- HTML5, CSS3, JavaScript (vanilla – inget ramverk)
- CSS Grid, Flexbox och Custom Properties för layout och teman
- Fetch API för väderdata (OpenWeatherMap) och formulärinlämning (Web3Forms)

## Mappstruktur

```
portfolio_sara/
├── index.html
├── css/
│   ├── base.css          – globala variabler, typografi, container
│   ├── navbar.css        – navigation och hamburger-meny
│   ├── hero.css          – hero-sektionen
│   ├── about.css         – om mig-sektionen
│   ├── education.css     – utbildningssektionen (kort, kurser, accordion)
│   ├── experience.css    – arbetslivserfarenhet (tidslinje, meriter)
│   ├── skills.css        – kompetenser-grid
│   ├── projects.css      – projektkort
│   ├── testimonials.css  – omdömen
│   ├── contact.css       – kontaktformulär
│   └── footer.css        – sidfot
├── js/
│   ├── navbar.js         – hamburger-meny, aktiv länk, tillbaka-till-toppen
│   ├── contact.js        – formulärinlämning via Web3Forms
│   └── weather.js        – vädervisning i sidfoten (OpenWeatherMap)
├── images/
│   ├── profil.jpg
│   ├── skola-jensen.png
│   ├── projekt-zoo.png
│   ├── projekt-bloggportal.jpg
│   ├── projekt-shotgun.png
│   ├── projekt-adressbok.png
│   ├── omdome-sofia.jpg
│   ├── omdome-victoria.jpg
│   └── omdome-rebecca.png
└── docs/
    ├── cv.pdf
    └── kursöversikt.pdf
```

## Funktioner

- Responsiv design för mobil, surfplatta och desktop
- Hamburger-meny med tillgänglighetsattribut (aria-expanded)
- Aktiv navigationslänk uppdateras automatiskt vid scrollning
- Flytande tillbaka-till-toppen-knapp (dyker upp efter 400px scroll)
- Expanderbara kurser och utbildningar med `<details>`/`<summary>`
- Kontaktformulär med asynkron inlämning, svenska felmeddelanden och bakåtknapp-reset
- Vädervisning i sidfoten som uppdateras var 60:e sekund
- Lazy loading på projektbilder
- Stöd för `prefers-reduced-motion`
