const menu = document.getElementById("menu-content");
const menuButton = document.querySelector(".menu-btn");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Stadionové pozadí — nepotřebuje samostatný obrázek. */

const stadiumSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 800">
  <defs>
    <linearGradient id="sky" x2="0" y2="1">
      <stop stop-color="#090611"/>
      <stop offset="1" stop-color="#34112e"/>
    </linearGradient>

    <linearGradient id="pitch" x2="0" y2="1">
      <stop stop-color="#2b0924"/>
      <stop offset="1" stop-color="#09070e"/>
    </linearGradient>

    <radialGradient id="light">
      <stop stop-color="#fff4fc" stop-opacity=".95"/>
      <stop offset=".12" stop-color="#ff77bf" stop-opacity=".75"/>
      <stop offset=".4" stop-color="#ff008b" stop-opacity=".25"/>
      <stop offset="1" stop-color="#ff008b" stop-opacity="0"/>
    </radialGradient>

    <filter id="blur">
      <feGaussianBlur stdDeviation="22"/>
    </filter>

    <pattern id="seats" width="32" height="20" patternUnits="userSpaceOnUse">
      <path d="M4 14h20" stroke="#a72c72" stroke-width="5" opacity=".35"/>
    </pattern>
  </defs>

  <path fill="url(#sky)" d="M0 0h1600v800H0z"/>

  <path
    d="M0 395L800 310l800 85v160H0z"
    fill="#150c1c"
  />

  <path
    d="M0 395L800 310l800 85v160H0z"
    fill="url(#seats)"
  />

  <path
    d="M0 405L800 320l800 85M0 450h1600M0 495h1600"
    fill="none"
    stroke="#ff239b"
    stroke-opacity=".3"
    stroke-width="3"
  />

  <path d="M0 550h1600v250H0z" fill="url(#pitch)"/>

  <path
    d="M-100 795L485 550h630l585 245M800 550v250"
    fill="none"
    stroke="#da438f"
    stroke-opacity=".45"
    stroke-width="3"
  />

  <ellipse
    cx="800" cy="690" rx="180" ry="52"
    fill="none"
    stroke="#da438f"
    stroke-opacity=".4"
    stroke-width="3"
  />

  <g fill="none" stroke="#ffc3e3" stroke-opacity=".7">
    <path d="M145 595V440h245v155" stroke-width="6"/>
    <path d="M145 440l45-35h245v155l-45 35" stroke-width="3"/>
    <path d="M190 405v155H435M145 595l45-35"/>
    <path d="M180 440v145m35-145v135m35-135v125m35-125v115m35-115v105m35-105v95"/>
    <path d="M145 470h245m-245 30h245m-245 30h245m-245 30h245"/>
  </g>

  <g stroke="#ad6b97" stroke-width="7">
    <path d="M270 160v270M1300 120v330"/>
  </g>

  <g fill="#ffb7dc">
    <path d="M220 155h100v18H220zM1250 115h100v18h-100z"/>
  </g>

  <ellipse cx="270" cy="160" rx="300" ry="260" fill="url(#light)"/>
  <ellipse cx="1300" cy="120" rx="340" ry="280" fill="url(#light)"/>

  <g filter="url(#blur)" fill="none" stroke="#ff008c" opacity=".3">
    <path d="M-80 600Q200 250 330 510T620 480" stroke-width="70"/>
    <path d="M1050 470Q1280 200 1450 440T1700 310" stroke-width="80"/>
  </g>

  <g fill="#ff48a6" opacity=".35">
    <circle cx="110" cy="250" r="3"/>
    <circle cx="430" cy="220" r="2"/>
    <circle cx="600" cy="340" r="3"/>
    <circle cx="1010" cy="230" r="2"/>
    <circle cx="1440" cy="290" r="3"/>
    <circle cx="1190" cy="360" r="2"/>
  </g>
</svg>
`;

document.documentElement.style.setProperty(
  "--stadium",
  'url("data:image/svg+xml,' + encodeURIComponent(stadiumSvg) + '")'
);

/* Růžové ikonky. */

const iconPaths = {
  news: `
    <rect x="4" y="3" width="16" height="18" rx="1"/>
    <path d="M8 7h8M8 11h8M8 15h3M8 18h3"/>
    <rect x="14" y="15" width="3" height="3"/>
  `,

  team: `
    <circle cx="12" cy="6" r="3"/>
    <circle cx="4" cy="9" r="2"/>
    <circle cx="20" cy="9" r="2"/>
    <path d="M7 21v-5a5 5 0 0 1 10 0v5H7z"/>
    <path d="M1 20v-4a3 3 0 0 1 4-3M23 20v-4a3 3 0 0 0-4-3"/>
  `,

  results: `
    <path d="M7 3h10v5a5 5 0 0 1-10 0V3z"/>
    <path d="M7 5H3v3a4 4 0 0 0 5 4M17 5h4v3a4 4 0 0 1-5 4"/>
    <path d="M12 13v5M8 21h8M9 18h6v3H9z"/>
  `,

  gallery: `
    <path d="M3 7h4l2-3h6l2 3h4v14H3z"/>
    <circle cx="12" cy="13" r="4"/>
    <path d="M18 10h1"/>
  `,

  matches: `
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <path d="M7 2v6M17 2v6M3 10h18M7 14h3M14 14h3M7 18h3"/>
  `,

  contact: `
    <path d="M6 3l4 4-2 3a17 17 0 0 0 6 6l3-2 4 4-2 3C10 23 1 14 3 5z"/>
  `,

  about: `
    <path d="M12 2l8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5z"/>
    <path d="M12 7v1M12 11v6"/>
  `,
};

function iconSvg(name) {
  return `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      ${iconPaths[name] || iconPaths.about}
    </svg>
  `;
}

/* Kartičky na úvodní stránce. */

const home = document.getElementById("home");

const homeCards = [
  {
    id: "news",
    title: "Aktuality",
    description: "Novinky ze života Růžového baletu",
  },
  {
    id: "team",
    title: "Tým",
    description: "Hráči, čísla a statistiky",
  },
  {
    id: "results",
    title: "Tabulky a výsledky",
    description: "Sudety Cup a naše zápasy",
  },
  {
    id: "gallery",
    title: "Fotogalerie",
    description: "Momentky ze hřiště i ze zákulisí",
  },
  {
    id: "matches",
    title: "Nadcházející zápasy",
    description: "Kdy a kde nás přijít podpořit",
  },
  {
    id: "contact",
    title: "Kontakt",
    description: "Vedení klubu, e-mail a Instagram",
  },
  {
    id: "about",
    title: "O klubu",
    description: "Historie a úspěchy FC Flamingos",
  },
];

if (home && !home.querySelector(".home-links")) {
  const navigation = document.createElement("nav");
  navigation.className = "home-links";
  navigation.setAttribute("aria-label", "Sekce klubového webu");

  homeCards.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "home-link " + card.id + "-link";
    button.setAttribute("aria-controls", card.id);

    button.innerHTML = `
      <span class="home-link-icon">${iconSvg(card.id)}</span>
      <span class="home-link-text">
        <span class="home-link-title">${card.title}</span>
        <span class="home-link-description">${card.description}</span>
      </span>
      <span class="home-link-arrow" aria-hidden="true">›</span>
    `;

    button.addEventListener("click", () => showSection(card.id));
    navigation.appendChild(button);
  });

  home.prepend(navigation);
}

/* Oprava telefonu manažera: odkaz odpovídá napsanému číslu. */

document.querySelectorAll('#contact a[href^="tel:"]').forEach((link) => {
  let number = link.textContent.replace(/[^\d+]/g, "");

  if (!number.startsWith("+") && number.length === 9) {
    number = "+420" + number;
  }

  if (/^\+\d{9,15}$/.test(number)) {
    link.setAttribute("href", "tel:" + number);
  }
});

/* Rozbalovací menu a přepínání sekcí. */

function setMenu(open) {
  if (!menu || !menuButton) return;

  menu.classList.toggle("show", open);
  menu.inert = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Zavřít menu" : "Otevřít menu");
}

function toggleMenu() {
  if (!menu) return;
  setMenu(!menu.classList.contains("show"));
}

function updateMenuSelection(id) {
  if (!menu) return;

  menu.querySelectorAll("button").forEach((button) => {
    const selected =
      button.getAttribute("onclick") === "showSection('" + id + "')";

    if (selected) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function showSection(id) {
  const target = document.getElementById(id);

  if (!target || target.tagName !== "SECTION") return;

  setMenu(false);

  document.querySelectorAll("section").forEach((section) => {
    section.classList.toggle("active", section === target);
  });

  updateMenuSelection(id);

  const heading = target.querySelector("h2");

  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }

  window.scrollTo({
    top: 0,
    behavior: reducedMotion.matches ? "auto" : "smooth",
  });
}

document.addEventListener("click", (event) => {
  if (event.target instanceof Element && !event.target.closest(".menu")) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu && menu.classList.contains("show")) {
    setMenu(false);
    menuButton.focus();
  }
});

setMenu(false);
updateMenuSelection(document.querySelector("section.active")?.id || "home");
