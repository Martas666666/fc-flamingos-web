function toggleMenu() {
  document.getElementById("menu-content").classList.toggle("show");
}

function showSection(id) {
  document.querySelectorAll("section").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  document.getElementById("menu-content").classList.remove("show");
}
function showSection(sectionId) {
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });

  document.getElementById(sectionId).style.display = "block";
}
