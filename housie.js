/* Housie (Tambola). Proper ticket: 3 rows x 9 columns, 15 numbers, 5 per row, column ranges 1-9, 10-19 ... 80-90.
   Numbers are called at random. Tap a called number to mark it. Claim Early 5, each line and Full House. */
(function (MG) {
  const t = (k) => MG.t(k);
  const PRIZES = ['early', 'top', 'middle', 'bottom', 'full'];
  const SPEED = { easy: 3700, medium: 3100, hard: 2500 };
  const BOT_LAG = { easy: 3, medium: 1, hard: 0 };
  const BOT_ALERT = { easy: .45, medium: .8, hard: 1 };

  function ticket() {
    for (let tries = 0; tries < 200; tries++) {
      const counts = Array(9).fill(1); let extra = 6;
      while (extra > 0) { const c = Math.floor(Math.random() * 9); if (counts[c] < 3) { counts[c]++; extra--; } }
      const rows = [0, 0, 0]; const grid = [[], [], []].map(() => Array(9).fill(0)); let ok = true;
      const order = counts.map((k, c) => ({ k, c })).sort((a, b) => b.k - a.k || Math.random() - .5);
      for (const { k, c } of order) {
        const avail = [0, 1, 2].filter((r) => rows[r] < 5).sort((a, b) => rows[a] - rows[b] || Math.random() - .5);
        if (avail.length < k) { ok = false; break; }
        avail.slice(0, k).forEach((r) => { rows[r]++; grid[r][c] = -1; });
      }
      if (!ok || rows.some((x) => x !== 5)) continue;
      for (let c = 0; c < 9; c++) {
        const lo = c === 0 ? 1 : c * 10, hi = c === 8 ? 90 : c * 10 + 9;
        const need = [0, 1, 2].filter((r) => grid[r][c] === -1);
        const pool = MG.shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, need.length).sort((a, b) => a - b);
        need.forEach((r, i) => { grid[r][c] = pool[i]; });
      }
      return grid;
    }
    return null;
  }
  const nums = (g) => g.flat().filter((x) => x > 0);
  const rowNums = (g, r) => g[r].filter((x) => x > 0);
  function done(prize, g, marked) {
    const has = (n) => marked.has(n);
    if (prize === 'early') return nums(g).filter(has).length >= 5;
    if (prize === 'full') return nums(g).every(has);
    const r = { top: 0, middle: 1, bottom: 2 }[prize]; return rowNums(g, r).every(has);
  }

  MG.Housie = {
    start(o) {
      const opp = MG.pickOpp(5);
      const G = { kind: 'housie', diff: o.diff || 'medium', big: !!o.big, ticket: ticket(), marked: new Set(), order: MG.shuffle(Array.from({ length: 90 }, (_, i) => i + 1)), idx: 0, called: [], prizes: {}, mine: [],
        bots: opp.map((who) => ({ who, ticket: ticket() })), pending: [], prizeCoins: 0, paused: false, over: false, started: Date.now(), shown: new Set(), findCount: 0, lastFindCall: 4, timer: null };
      G.pause = () => { G.paused = true; const r = document.getElementById('gs'); r && r.insertAdjacentHTML('beforeend', `<div class="pausepill" id="pp">${t('paused')}</div>`); };
      G.resume = () => { G.paused = false; const p = document.getElementById('pp'); if (p) p.remove(); };
      MG.G = G; MG.S.played.housie++; MG.save();
      MG.go('housie'); setTimeout(() => loop(G), 1200);
      return G;
    },
    ticket, done
  };

  MG.screens.housie = function () {
    const G = MG.G; const last = G.called[G.called.length - 1];
    return `<div class="gscreen gbg" id="gs"><div class="sparkle"></div>${MG.garland()}
      <div class="gtop"><button class="ib" data-a="leavegame" aria-label="Leave game">${MG.icon.back}</button><h1>${G.big ? t('big') : t('housie')}</h1>${MG.coinPill(true)}<button class="ib" data-a="sound" aria-label="Sound">${MG.S.sound ? '🔊' : '🔇'}</button></div>
      <div class="row" style="gap:6px;padding:0 14px 4px;font-size:11.5px;opacity:.9">${G.bots.map((b) => MG.face(b.who, 22)).join('')}<span style="margin-left:4px">${G.bots.map((b) => b.who.name).slice(0, 3).join(', ')} +2 · ${G.big ? '2x coins' : t(G.diff)}</span></div>
      <div class="caller"><div class="ball" id="ball">${last || '?'}</div><div class="calltx"><div class="ct" id="ct">${last ? callText(last) : 'Get ready…'}</div><div class="cs" id="cs">${G.called.length}/90 · ${t('allNums')}</div><div class="recent" id="recent">${G.called.slice(-6, -1).reverse().map((n) => `<span>${n}</span>`).join('')}</div></div></div>
      <div class="ticket"><div class="tgrid" id="tgrid"></div></div>
      <div class="claims" id="claims"></div>
      <div class="dock hd" id="dock" style="min-height:86px;justify-content:center"><button class="btn sm" data-a="allnums" style="background:rgba(255,255,255,.16)">${t('allNums')} (${G.called.length})</button></div>
    </div>`;
  };
  MG.afters.housie = function () { const G = MG.G; if (!G) return; drawTicket(G); drawClaims(G); if (G.paused) G.paused = false; };

  function callText(n) {
    const nick = MG.CALLS[n]; const lang = MG.S.lang;
    if (lang === 'hi') return `${t('number')} ${n}${nick ? ` · ${nick}` : ''}`;
    if (lang === 'ta') return `${t('number')} ${n}`;
    if (nick) return `${nick}, ${n}`;
    return n < 10 ? `Only number ${n}` : `${String(n)[0]} and ${String(n)[1]}, ${n}`;
  }
  function drawTicket(G) {
    const el = document.getElementById('tgrid'); if (!el) return; const called = new Set(G.called);
    el.innerHTML = G.ticket.map((row, r) => row.map((n, c) => n ? `<button class="tc num ${G.diff === 'easy' && called.has(n) && !G.marked.has(n) ? 'hint' : ''} ${G.marked.has(n) ? 'marked' : ''}" data-a="daub" data-v="${n}" aria-label="${n}${G.marked.has(n) ? ' marked' : ''}">${G.marked.has(n) ? '<i class="daub"></i>' : ''}<span>${n}</span></button>` : `<span class="tc empty"></span>`).join('')).join('');
  }
  function drawClaims(G) {
    const el = document.getElementById('claims'); if (!el) return;
    el.innerHTML = PRIZES.map((p) => { const w = G.prizes[p]; return `<button class="claim ${w ? 'done' : ''}" data-a="hclaim" data-v="${p}" ${w ? 'disabled' : ''}>${t(p)}<small>${w ? (w === 'me' ? '✓ ' + t('you') : w) : '+' + MG.COIN.housie[p] * (G.big ? 2 : 1)}</small></button>`; }).join('');
  }
  async function loop(G) {
    while (!G.over && MG.G === G) {
      let left = SPEED[G.diff];
      while (left > 0) { await MG.wait(100); if (MG.G !== G || G.over) return; if (!G.paused && MG.S.screen === 'housie') left -= 100; }
      if (G.idx >= 90) return end(G);
      const n = G.order[G.idx++]; G.called.push(n); MG.sfx('call');
      const ball = document.getElementById('ball'); if (ball) { ball.textContent = n; ball.classList.remove('pop'); void ball.offsetWidth; ball.classList.add('pop'); }
      const ct = document.getElementById('ct'); if (ct) ct.textContent = callText(n);
      const cs = document.getElementById('cs'); if (cs) cs.textContent = `${G.called.length}/90 · ${t('allNums')}`;
      const rc = document.getElementById('recent'); if (rc) rc.innerHTML = G.called.slice(-6, -1).reverse().map((x) => `<span>${x}</span>`).join('');
      const ab = document.querySelector('[data-a=allnums]'); if (ab) ab.textContent = `${t('allNums')} (${G.called.length})`;
      if (G.diff === 'easy') drawTicket(G);
      botsCheck(G);
      if (G.over) return;
      if (G.idx - G.lastFindCall >= 11 && G.findCount < 5 && Math.random() < .6) { const dock = document.getElementById('dock'); const p = MG.pickFind('housie', G.shown); if (dock && p) { G.findCount++; G.lastFindCall = G.idx; MG.showFind(dock, p, 'luckyFind'); } }
    }
  }
  function botsCheck(G) {
    const called = new Set(G.called);
    PRIZES.forEach((p) => {
      if (G.prizes[p] || G.pending.some((x) => x.p === p)) return;
      const b = G.bots.find((bb) => done(p, bb.ticket, called)); if (b && Math.random() < BOT_ALERT[G.diff]) G.pending.push({ p, b, at: G.idx + BOT_LAG[G.diff] + (Math.random() < .3 ? 1 : 0) });
    });
    G.pending = G.pending.filter((x) => {
      if (G.prizes[x.p]) return false;
      if (G.idx >= x.at) { G.prizes[x.p] = x.b.who.name; MG.toast(`${x.b.who.name}: ${t(x.p)}!`); MG.sfx('bad'); drawClaims(G); if (x.p === 'full') end(G); return false; }
      return true;
    });
  }
  MG.actions.daub = function (v, el) {
    const G = MG.G; if (!G || G.kind !== 'housie' || G.over) return; const n = Number(v);
    if (G.marked.has(n)) return;
    if (!G.called.includes(n)) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); MG.sfx('bad'); return; }
    G.marked.add(n); MG.sfx('pop'); drawTicket(G);
  };
  MG.actions.hclaim = function (p, el, e) {
    const G = MG.G; if (!G || G.kind !== 'housie' || G.over || G.prizes[p]) return;
    const valid = new Set([...G.marked].filter((n) => G.called.includes(n)));
    if (!done(p, G.ticket, valid)) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); MG.toast(t('bogus')); MG.sfx('bad'); return; }
    G.prizes[p] = 'me'; G.mine.push(p); G.pending = G.pending.filter((x) => x.p !== p); MG.sfx('good'); drawClaims(G);
    const got = MG.earn(MG.COIN.housie[p], `${G.big ? 'Big ' : ''}Housie: ${MG.T.en[p]}`, G.big ? 2 : 1);
    G.prizeCoins += got; if (got && e) MG.coinBurst(MG.point(e), got);
    MG.toast(`${t(p)}! ${got ? '+' + got + ' ' + t('coins') : ''}`);
    if (p === 'full') end(G);
  };
  MG.actions.allnums = function () {
    const G = MG.G; if (!G) return; G.pause();
    const called = new Set(G.called);
    MG.openLayer(`<div class="sheetwrap" data-a="allclose"><div class="sheet" data-stop><span class="grab"></span><b style="font-size:17px">${t('allNums')} · ${G.called.length}/90</b><div class="board90">${Array.from({ length: 90 }, (_, i) => `<span class="${called.has(i + 1) ? 'on' : ''}">${i + 1}</span>`).join('')}</div><button class="btn gold" data-a="allclose">${t('backToGame')}  ▶</button></div></div>`);
  };
  MG.actions.allclose = () => { MG.closeLayer(); if (MG.G) MG.G.resume(); };
  function end(G) {
    if (G.over) return; G.over = true;
    setTimeout(() => MG.finishGame({ kind: 'housie', big: G.big, prizes: Object.assign({}, G.prizes), mine: G.mine.slice(), prizeCoins: G.prizeCoins, calls: G.called.length, shown: [...G.shown], rank: G.mine.includes('full') ? 1 : (G.mine.length ? 2 : 3), of: 6 }), 900);
  }
})(window.MG);
