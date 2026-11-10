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
  const teamCard = document.querySelector('.home-links .team-link .home-link-title');
  if (teamCard) teamCard.textContent = 'Týmy';

  const teamLink = document.querySelector('#menu-content a[data-section="team"]');
  if (teamLink) {
    const details = document.createElement('details');
    details.className = 'teams-menu';
    details.innerHTML = '<summary>Týmy</summary><a href="/tym/#a-tym">A tým</a><a href="/tym/#b-tym">B tým</a>';
    teamLink.replaceWith(details);
    const style = document.createElement('style');
    style.textContent = '.teams-menu summary{cursor:pointer;padding:10px 14px;border-radius:8px;color:#fff;background:#2d1428}.teams-menu[open] summary{color:#ff9ed0}.teams-menu a{margin:4px 0 0 12px}';
    document.head.append(style);
  }
})();
