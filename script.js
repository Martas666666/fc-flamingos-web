const menu = document.getElementById("menu-content");
const menuButton = document.querySelector(".menu-btn");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMenu(open) {
  menu.classList.toggle("show", open);
  menu.inert = !open;

  menuButton.setAttribute("aria-expanded", String(open));

  menuButton.setAttribute("aria-label", open ? "Zavřít menu" : "Otevřít menu");
}

function toggleMenu() {
  setMenu(!menu.classList.contains("show"));
}

function showSection(id) {
  const target = document.getElementById(id);

  if (!target || target.tagName !== "SECTION") {
    return;
  }

  setMenu(false);

  document.querySelectorAll("section").forEach((section) => {
    section.classList.toggle("active", section === target);
  });

  menu.querySelectorAll("button").forEach((button) => {
    const selected =
      button.getAttribute("onclick") === "showSection('" + id + "')";

    if (selected) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  const heading = target.querySelector("h2");

  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }

  window.scrollTo({
    top: 0,
    behavior: reducedMotion.matches ? "instant" : "smooth",
  });
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu")) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("show")) {
    setMenu(false);
    menuButton.focus();
  }
});

setMenu(false);

menu.querySelector("button").setAttribute("aria-current", "page");
