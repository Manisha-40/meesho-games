/* Core: state, language, routing, coins, lucky finds, sheets, effects, sound. */
(function (MG) {
  const $ = (s, r = document) => r.querySelector(s);
  MG.$ = $;
  const KEY = 'meesho-games-proto-v1';
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} },
    clear() { try { localStorage.removeItem(KEY); } catch (e) {} }
  };
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  function fresh() {
    return {
      v: 1, lang: null, coins: MG.COIN.start, coinDay: today(), coinToday: 0,
      hist: [{ t: 'Welcome bonus', n: MG.COIN.start, d: Date.now() }],
      wish: {}, cart: [], views: { kurtis: 3, home: 2, jewellery: 2 }, recent: ['p1', 'p21', 'p14'],
      finds: [], played: { ludo: 0, snakes: 0, housie: 0 }, wins: 0, remind: false, useCoins: true, sound: true,
      screen: 'home', params: {}, stack: []
    };
  }
  let S = Object.assign(fresh(), store.get() || {});
  if (S.coinDay !== today()) { S.coinDay = today(); S.coinToday = 0; }
  MG.S = S;
  MG.save = () => store.set(S);
  MG.reset = () => { store.clear(); S = fresh(); MG.S = S; MG.G = null; MG.closeLayer(); MG.go('home'); MG.askLang(); };

  // ---------- language ----------
  MG.t = (k) => { const L = MG.T[S.lang] || MG.T.en; return L[k] != null ? L[k] : (MG.T.en[k] != null ? MG.T.en[k] : k); };

  // ---------- routing ----------
  MG.screens = {}; MG.actions = {}; MG.afters = {};
  const FULL = ['ludo', 'snakes', 'housie', 'result'];
  MG.TABS = ['home', 'categories', 'mall', 'video', 'orders'];
  let lastScreen = null, hashBusy = false;
  MG.go = function (screen, params = {}, opts = {}) {
    if (!MG.screens[screen]) screen = 'home';
    if (FULL.includes(screen) && screen !== 'result' && !(MG.G && MG.G.kind === screen)) { screen = 'games'; }
    if (screen === 'pdp' && !MG.BYID[params.id]) screen = 'home';
    if (!opts.replace) {
      if (MG.TABS.includes(screen)) S.stack = [];
      else if (S.screen !== screen || JSON.stringify(S.params) !== JSON.stringify(params)) S.stack.push({ screen: S.screen, params: S.params });
    }
    S.screen = screen; S.params = params;
    if (screen === 'pdp') { const p = MG.BYID[params.id]; S.views[p.cat] = (S.views[p.cat] || 0) + 1; S.recent = [p.id].concat(S.recent.filter((x) => x !== p.id)).slice(0, 10); }
    MG.save(); MG.render();
    if (!opts.fromHash) pushHash();
  };
  MG.back = function (fromHash) {
    const prev = S.stack.pop();
    if (prev && (!FULL.includes(prev.screen) || (MG.G && MG.G.kind === prev.screen))) { S.screen = prev.screen; S.params = prev.params; }
    else if (prev) { S.screen = 'games'; S.params = {}; }
    else { S.screen = MG.KHEL.includes(S.screen) && S.screen !== 'games' ? 'games' : 'home'; S.params = {}; }
    MG.save(); MG.render();
    if (!fromHash) pushHash();
  };
  MG.KHEL = ['games', 'ludo', 'snakes', 'housie', 'result', 'coins', 'rewards'];
  const hashOf = () => S.screen === 'pdp' ? 'pdp-' + S.params.id : S.screen;
  function pushHash() { const h = hashOf(); if (location.hash.slice(1) === h) return; hashBusy = true; try { location.hash = h; } catch (e) {} setTimeout(() => { hashBusy = false; }, 0); }
  MG.parseHash = function () { const h = (location.hash || '').slice(1); if (!h) return null; if (h.indexOf('pdp-') === 0) return { screen: 'pdp', params: { id: h.slice(4) } }; return MG.screens[h] ? { screen: h, params: {} } : null; };
  window.addEventListener('hashchange', () => {
    if (hashBusy) return; const r = MG.parseHash(); if (!r) return;
    if (r.screen === S.screen && (r.screen !== 'pdp' || r.params.id === S.params.id)) return;
    const top = S.stack[S.stack.length - 1];
    if (top && top.screen === r.screen) { MG.back(true); return; }
    MG.closeLayer(); MG.go(r.screen, r.params, { fromHash: true });
  });

  const app = () => $('#app');
  MG.render = function () {
    const a = app(); const sc = a.querySelector('.scroll'); const keep = lastScreen === S.screen && sc ? sc.scrollTop : 0;
    let html;
    try { html = MG.screens[S.screen](); } catch (e) { console.error(e); S.screen = 'home'; S.stack = []; html = MG.screens.home(); }
    a.className = lastScreen !== S.screen ? 'enter' : '';
    a.innerHTML = html;
    const nsc = a.querySelector('.scroll'); if (nsc) nsc.scrollTop = keep;
    const changed = lastScreen !== S.screen; lastScreen = S.screen;
    if (MG.afters[S.screen]) MG.afters[S.screen](changed);
    MG.updateCoins();
    const dd = $('[data-dev=lang]'); if (dd) dd.textContent = 'Language: ' + ((MG.LANGS.find((l) => l.id === S.lang) || MG.LANGS[0]).native);
  };
  MG.updateCoins = function () {
    document.querySelectorAll('[data-coins]').forEach((el) => { el.textContent = S.coins; });
    document.querySelectorAll('[data-cointoday]').forEach((el) => { el.textContent = S.coinToday + '/' + MG.COIN.dailyCap; });
    document.querySelectorAll('[data-coinbar]').forEach((el) => { el.style.width = Math.min(100, S.coinToday / MG.COIN.dailyCap * 100) + '%'; });
  };

  // ---------- events ----------
  function handle(e, root) {
    const el = e.target.closest('[data-a]'); if (!el || !root.contains(el)) return;
    const stop = e.target.closest('[data-stop]');
    if (stop && el.contains(stop) && el !== stop) return;
    if (el.disabled) return;
    const fn = MG.actions[el.dataset.a]; if (!fn) return;
    e.stopPropagation();
    MG.unlockAudio();
    fn(el.dataset.v, el, e);
  }
  MG.bind = function () {
    app().addEventListener('click', (e) => handle(e, app()));
    $('#layer').addEventListener('click', (e) => handle(e, $('#layer')));
    app().addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role=button][data-a]')) { e.preventDefault(); e.target.click(); } });
  };
  MG.point = function (e) { const p = $('#phone').getBoundingClientRect(), s = p.width / $('#phone').offsetWidth || 1; return { x: (e.clientX - p.left) / s, y: (e.clientY - p.top) / s }; };
  MG.local = function (el) { const p = $('#phone').getBoundingClientRect(), s = p.width / $('#phone').offsetWidth || 1, r = el.getBoundingClientRect(); return { x: (r.left - p.left) / s, y: (r.top - p.top) / s, w: r.width / s, h: r.height / s }; };

  // ---------- coins ----------
  MG.earn = function (n, reason, mult = 1) {
    const want = n * mult; const room = Math.max(0, MG.COIN.dailyCap - S.coinToday); const got = Math.min(want, room);
    if (got > 0) { S.coins += got; S.coinToday += got; S.hist.unshift({ t: reason, n: got, d: Date.now() }); S.hist = S.hist.slice(0, 40); MG.save(); }
    return got;
  };
  MG.coinsToRs = (c) => Math.floor(c / MG.COIN.perRupee);
  MG.redeemable = function (orderRs) { const capRs = Math.min(MG.COIN.orderMaxRs, Math.floor(orderRs * MG.COIN.orderPct)); return Math.min(capRs, MG.coinsToRs(S.coins)); };

  // ---------- lucky finds ----------
  const CONTEXT = { housie: ['home', 'jewellery', 'kurtis'], ludo: ['kids', 'gadgets', 'men', 'footwear'], snakes: ['kids', 'kitchen', 'beauty', 'bags'] };
  MG.pickFind = function (kind, shown) {
    const w = {}; MG.CATS.forEach((c) => { w[c.id] = (S.views[c.id] || 0) * 2; });
    Object.keys(S.wish).forEach((pid) => { if (S.wish[pid] && MG.BYID[pid]) w[MG.BYID[pid].cat] += 3; });
    const explore = Math.random() < 0.4;
    const pool = MG.P.filter((p) => !shown.has(p.id));
    let cands;
    if (explore) { const cold = MG.CATS.filter((c) => w[c.id] === 0).map((c) => c.id); const ctx = CONTEXT[kind] || []; cands = pool.filter((p) => cold.includes(p.cat) && (ctx.includes(p.cat) || Math.random() < .5)); if (!cands.length) cands = pool.filter((p) => cold.includes(p.cat)); }
    if (!cands || !cands.length) { const scored = pool.map((p) => ({ p, s: w[p.cat] + ((CONTEXT[kind] || []).includes(p.cat) ? 2 : 0) + Math.random() * 3 })); scored.sort((a, b) => b.s - a.s); cands = scored.slice(0, 5).map((x) => x.p); }
    const p = cands[Math.floor(Math.random() * cands.length)] || pool[0];
    if (p) { shown.add(p.id); S.finds = [p.id].concat(S.finds.filter((x) => x !== p.id)).slice(0, 16); MG.save(); }
    return p;
  };
  // Small chip at the bottom of the game dock. Never covers the board.
  MG.showFind = function (host, p, labelKey) {
    MG.hideFind(host);
    const el = document.createElement('div'); el.className = 'findchip'; el.setAttribute('role', 'status');
    el.innerHTML = `<button class="th" data-a="peek" data-v="${p.id}" aria-label="View ${p.name}">${MG.prod(p.art)}</button>
      <button class="tx" data-a="peek" data-v="${p.id}"><span class="lk">✦ ${MG.t(labelKey || 'luckyFind')}</span><span class="nm">${p.name}</span><span class="pr"><b>₹${p.price}</b><s>₹${p.mrp}</s><em>${MG.off(p)}% off</em></span></button>
      <button class="view" data-a="peek" data-v="${p.id}">${MG.t('view')}</button><button class="x" data-a="hidefind" aria-label="Close">✕</button><span class="timer"><i></i></span>`;
    host.appendChild(el);
    el._t = setTimeout(() => { if (el.isConnected && !(MG.G && MG.G.paused)) el.remove(); }, 7000);
    MG.sfx('pop');
    return el;
  };
  MG.hideFind = function (host) { (host || document).querySelectorAll('.findchip').forEach((c) => { clearTimeout(c._t); c.remove(); }); };
  MG.actions.hidefind = () => MG.hideFind();
  MG.actions.peek = function (pid) {
    const p = MG.BYID[pid]; if (!p) return;
    if (MG.G && MG.G.pause) MG.G.pause();
    MG.hideFind();
    MG.openLayer(`<div class="sheetwrap" data-a="peekclose"><div class="sheet" data-stop>
      <span class="grab"></span>
      <div class="row" style="gap:12px;align-items:stretch"><span style="width:130px;height:143px;border-radius:12px;overflow:hidden;flex-shrink:0;background:#F7F2EC">${MG.prod(p.art, { label: p.name })}</span>
        <div class="col" style="gap:6px;min-width:0;flex:1"><span style="font-size:11px;font-weight:800;color:var(--pink);letter-spacing:.05em;text-transform:uppercase">✦ ${MG.t('luckyFind')}</span>
          <span style="font-size:14px;color:var(--muted);line-height:1.35">${p.name}</span>
          <span class="row" style="gap:8px;align-items:baseline"><b style="font-size:22px">₹${p.price}</b><s style="color:#9A9AA6">₹${p.mrp}</s></span>
          <span style="display:inline-flex;width:fit-content;background:#E7F6EF;color:var(--green);border-radius:6px;padding:2px 8px;font-weight:800;font-size:12.5px">${MG.off(p)}% off · Free delivery</span>
          <span class="rate"><b>${p.r} ★</b>${p.rv.toLocaleString('en-IN')} ratings</span></div></div>
      <div class="row" style="gap:10px"><button class="btn o" data-a="peeksave" data-v="${p.id}">${MG.icon.heart(!!S.wish[p.id])} ${S.wish[p.id] ? MG.t('saved') : MG.t('save')}</button><button class="btn o" data-a="peekdetails" data-v="${p.id}">${MG.t('details')}</button></div>
      <button class="btn gold" data-a="peekclose">${MG.G ? MG.t('backToGame') + '  ▶' : 'Close'}</button>
    </div></div>`);
  };
  MG.actions.peekclose = function () { MG.closeLayer(); if (MG.G && MG.G.resume && MG.screens[S.screen] && MG.G.kind === S.screen) MG.G.resume(); };
  MG.actions.peeksave = function (pid, el) { S.wish[pid] = !S.wish[pid]; MG.save(); el.innerHTML = `${MG.icon.heart(!!S.wish[pid])} ${S.wish[pid] ? MG.t('saved') : MG.t('save')}`; MG.toast(S.wish[pid] ? 'Saved to your wishlist' : 'Removed from wishlist'); };
  MG.actions.peekdetails = function (pid) { MG.closeLayer(); MG.go('pdp', { id: pid, fromGame: !!MG.G }); };

  // ---------- layers, toasts, effects ----------
  MG.openLayer = function (html) { const l = $('#layer'); l.innerHTML = html; };
  MG.closeLayer = function () { const l = $('#layer'); if (l) l.innerHTML = ''; };
  let toastT = null;
  MG.toast = function (msg, ms = 1900) {
    const fx = $('#fx'); fx.querySelectorAll('.toast').forEach((t) => t.remove());
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; fx.appendChild(t);
    t.animate([{ opacity: 0, transform: 'translate(-50%,10px)' }, { opacity: 1, transform: 'translate(-50%,0)', offset: .12 }, { opacity: 1, offset: .85 }, { opacity: 0 }], { duration: ms, fill: 'forwards' });
    clearTimeout(toastT); toastT = setTimeout(() => t.remove(), ms + 50);
  };
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  MG.coinBurst = function (from, n) {
    const target = document.querySelector('[data-coinpill]'); if (!target || reduced) { MG.updateCoins(); return; }
    const end = MG.local(target); const ex = end.x + 12, ey = end.y + end.h / 2;
    const count = Math.min(10, 3 + Math.round(n / 5));
    for (let i = 0; i < count; i++) {
      const c = document.createElement('span'); c.className = 'coin coinfly'; c.textContent = '₹';
      c.style.left = (from.x - 11 + Math.random() * 24 - 12) + 'px'; c.style.top = (from.y - 11 + Math.random() * 16 - 8) + 'px'; $('#fx').appendChild(c);
      const dx = ex - from.x, dy = ey - from.y;
      const a = c.animate([{ transform: 'translate(0,0) scale(.6)', opacity: 0 }, { transform: `translate(${dx * .25 + (Math.random() * 60 - 30)}px,${dy * .25 - 50}px) scale(1.15)`, opacity: 1, offset: .35 }, { transform: `translate(${dx}px,${dy}px) scale(.7)`, opacity: 1 }], { duration: 800 + i * 50, delay: i * 70, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'forwards' });
      a.onfinish = () => { c.remove(); if (i === count - 1) { MG.updateCoins(); target.classList.remove('bump'); void target.offsetWidth; target.classList.add('bump'); MG.sfx('coin'); } };
    }
  };
  MG.confetti = function () {
    if (reduced) return; const fx = $('#fx'); const W = $('#phone').offsetWidth;
    const cols = ['#FFB400', '#F43397', '#9F2089', '#2EAE5B', '#2D7BE5', '#FF7A00'];
    for (let i = 0; i < 70; i++) {
      const c = document.createElement('span'); c.className = 'confetti'; c.style.background = cols[i % cols.length]; c.style.left = (Math.random() * W) + 'px'; c.style.top = '-20px'; fx.appendChild(c);
      const a = c.animate([{ transform: `translate(0,0) rotate(0)` }, { transform: `translate(${Math.random() * 120 - 60}px,${700 + Math.random() * 200}px) rotate(${Math.random() * 720}deg)` }], { duration: 1800 + Math.random() * 1400, delay: Math.random() * 400, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'forwards' });
      a.onfinish = () => c.remove();
    }
  };

  // ---------- sound (tiny WebAudio blips, after first tap) ----------
  let ac = null;
  MG.unlockAudio = function () { if (ac || !S.sound) return; try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ac = null; } };
  MG.sfx = function (kind) {
    if (!S.sound || !ac) return;
    try {
      const t = ac.currentTime; const o = ac.createOscillator(), g = ac.createGain(); o.connect(g); g.connect(ac.destination);
      const P = { pop: [660, 990, .08], coin: [988, 1319, .12], step: [420, 420, .04], dice: [180, 120, .18], good: [523, 784, .22], bad: [330, 196, .25], call: [600, 750, .1] }[kind] || [500, 500, .05];
      o.type = kind === 'dice' ? 'square' : 'triangle'; o.frequency.setValueAtTime(P[0], t); o.frequency.exponentialRampToValueAtTime(P[1], t + P[2]);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(kind === 'step' ? .05 : .12, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + P[2] + .05);
      o.start(t); o.stop(t + P[2] + .08);
    } catch (e) {}
  };

  // ---------- time helpers ----------
  /* Big Housie runs four times a day: two in the day, two at night (more at night, when people are free). */
  MG.SLOTS = [[11, 0], [15, 0], [19, 0], [21, 30]];
  MG.fmtSlot = function (s) { const h = s[0], m = s[1]; const hh = h % 12 === 0 ? 12 : h % 12; return hh + (m ? ':' + String(m).padStart(2, '0') : '') + ' ' + (h >= 12 ? 'PM' : 'AM'); };
  MG.nextSlot = function () {
    const n = new Date(); let best = null;
    MG.SLOTS.forEach((s, i) => { const e = new Date(n); e.setHours(s[0], s[1], 0, 0); if (e <= n) e.setDate(e.getDate() + 1); const secs = Math.floor((e - n) / 1000); if (!best || secs < best.secs) best = { secs, slot: s, idx: i }; });
    return best;
  };
  MG.to8pm = function () { return MG.nextSlot().secs; }; /* name kept: seconds to the next Big Housie */
  MG.hms = function (s) { const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return [h, m, x].map((v) => String(v).padStart(2, '0')); };
  MG.rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  MG.shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  MG.pickOpp = (n) => MG.shuffle(MG.OPPONENTS).slice(0, n);
  MG.wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // ---------- language sheet ----------
  MG.askLang = function () {
    MG.openLayer(`<div class="sheetwrap"><div class="sheet" data-stop>
      <span class="grab"></span>
      <div class="col" style="gap:2px"><b style="font-size:18px">Choose your language</b><span style="font-size:13px;color:var(--muted)">अपनी भाषा चुनें · உங்கள் மொழியைத் தேர்ந்தெடுங்கள்</span></div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">${MG.LANGS.map((l) => `<button data-a="setlang" data-v="${l.id}" style="border:1.5px solid ${S.lang === l.id ? 'var(--purple)' : 'var(--line)'};background:${S.lang === l.id ? '#F7EAF5' : '#fff'};border-radius:12px;padding:12px;text-align:left"><b style="font-size:17px;display:block">${l.native}</b><span style="font-size:12px;color:var(--muted)">${l.label}${l.ok ? '' : ' · preview in English'}</span></button>`).join('')}</div>
      <span style="font-size:11.5px;color:var(--muted)">In this prototype, English, Hindi and Tamil are translated for Meesho Games. Other languages show English.</span>
    </div></div>`);
  };
  MG.actions.setlang = function (v) { S.lang = v; MG.save(); MG.closeLayer(); MG.render(); };
})(window.MG);
