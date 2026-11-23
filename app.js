/* Boot */
(function (MG) {
  MG.bind();
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-dev]'); if (!b) return;
    const d = b.dataset.dev;
    if (d === 'housie8') MG.actions.bighousie();
    if (d === 'lang') MG.askLang();
    if (d === 'reset') { MG.reset(); if (MG.afterReset) MG.afterReset(); }
  });
  function fit() {
    const wrap = document.getElementById('wrap'), phone = document.getElementById('phone');
    if (window.innerWidth <= 760) { phone.style.transform = ''; wrap.style.width = ''; wrap.style.height = ''; return; }
    const s = Math.min(1, (window.innerHeight - 170) / 864);
    phone.style.transform = s < 1 ? `scale(${s})` : ''; wrap.style.width = 390 * s + 'px'; wrap.style.height = 844 * s + 'px';
  }
  window.addEventListener('resize', fit); fit();
  const r = MG.parseHash();
  const start = r && !['ludo', 'snakes', 'housie', 'result'].includes(r.screen) ? r : { screen: 'home', params: {} };
  MG.S.stack = start.screen === 'home' || MG.TABS.includes(start.screen) ? [] : [{ screen: 'home', params: {} }];
  MG.S.screen = start.screen; MG.S.params = start.params;
  MG.render();
  if (!MG.S.lang) MG.askLang();
  window.__mg = MG;
})(window.MG);
