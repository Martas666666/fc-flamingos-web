/* Skutečné odkazy a plné načtení dokumentu při přechodu mezi stránkami. */
(function () {
  const urls = {"home": "/", "news": "/aktuality/", "team": "/tym/", "matches": "/nadchazejici-zapasy/", "results": "/tabulky-a-vysledky/", "gallery": "/fotogalerie/", "contact": "/kontakt/", "about": "/o-klubu/", "sponsors": "/sponzori/"};
  function visit(id, fragment) {
    if (!Object.prototype.hasOwnProperty.call(urls,id)) return;
    window.location.assign(urls[id] + (fragment ? '#' + fragment : ''));
  }
  window.showSection = function (id) { visit(id); };
  window.showPolisArticle = function () { visit('news', 'novinky-polis'); };
  window.showJomaArticle = function () { visit('news', 'novinky-joma'); };
  document.querySelectorAll('.home-links button[aria-controls]').forEach(function (button) {
    const id = button.getAttribute('aria-controls');
    if (!Object.prototype.hasOwnProperty.call(urls,id)) return;
    const link = document.createElement('a');
    link.className = button.className;
    link.innerHTML = button.innerHTML;
    link.href = urls[id];
    link.dataset.section = id;
    button.replaceWith(link);
  });
  const current = document.body.dataset.page;
  document.querySelectorAll('#menu-content a[data-section]').forEach(function (link) {
    if (link.dataset.section === current) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
})();
