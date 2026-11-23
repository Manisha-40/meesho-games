/* Snakes and Ladders. Easy: kinder board. Medium: the classic board. Hard: extra snakes and you must land exactly on 100.
   A 6 gives another roll. */
(function (MG) {
  const t = (k) => MG.t(k);
  const BOARDS = {
    easy: { ladders: { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 }, snakes: { 32: 10, 48: 26, 62: 44, 88: 68, 97: 78 }, exact: false },
    medium: { ladders: { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 }, snakes: { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 }, exact: false },
    hard: { ladders: { 4: 14, 9: 31, 21: 42, 28: 84, 51: 67, 71: 91, 80: 100 }, snakes: { 16: 6, 35: 22, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 74: 53, 87: 24, 93: 73, 95: 75, 98: 78 }, exact: true }
  };
  const PCOL = ['#E53935', '#2D7BE5', '#2EAE5B', '#F5B800'];
  const SNAKE_COL = ['#2EAE5B', '#8E44AD', '#E67E22', '#16A085', '#C0392B', '#D35400', '#27AE60', '#9B59B6', '#1ABC9C', '#E74C3C', '#F39C12', '#2980B9'];
  const TILE = ['#FFE7A3', '#FFD1E1', '#D7F2E6', '#E5DBFF', '#D2EEFF', '#FFE0C2'];
  function xy(n) { const i = n - 1, r = Math.floor(i / 10), c = r % 2 === 0 ? i % 10 : 9 - (i % 10); return [c + .5, 9 - r + .5]; }

  function snakePath(a, b, k) {
    const [x1, y1] = xy(a), [x2, y2] = xy(b); const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy); const nx = -dy / len, ny = dx / len; const w = Math.min(1.1, .35 + len * .12) * (k % 2 ? 1 : -1);
    const c1 = [x1 + dx * .3 + nx * w, y1 + dy * .3 + ny * w], c2 = [x1 + dx * .7 - nx * w, y1 + dy * .7 - ny * w];
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }
  function boardSvg(B) {
    let s = `<rect x="-.12" y="-.12" width="10.24" height="10.24" rx=".3" fill="#5B1062"/>`;
    for (let n = 1; n <= 100; n++) { const [x, y] = xy(n); const r = Math.floor((n - 1) / 10); s += `<rect x="${x - .5}" y="${y - .5}" width="1" height="1" fill="${TILE[(r + (n % 2) * 2 + n % 3) % 6]}"/><text x="${x - .4}" y="${y - .28}" font-size=".24" font-weight="800" fill="#7A5A7A" font-family="Plus Jakarta Sans,sans-serif">${n}</text>`; }
    const [hx, hy] = xy(100); s += `<text x="${hx}" y="${hy + .22}" text-anchor="middle" font-size=".55">👑</text>`;
    const [sx, sy] = xy(1); s += `<text x="${sx}" y="${sy + .3}" text-anchor="middle" font-size=".2" font-weight="800" fill="#5B1062" font-family="Plus Jakarta Sans,sans-serif">START</text>`;
    Object.entries(B.ladders).forEach(([a, b]) => {
      const [x1, y1] = xy(+a), [x2, y2] = xy(+b); const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = -dy / len * .17, ny = dx / len * .17;
      s += `<g stroke-linecap="round"><line x1="${x1 + nx}" y1="${y1 + ny}" x2="${x2 + nx}" y2="${y2 + ny}" stroke="#7A4A22" stroke-width=".11"/><line x1="${x1 - nx}" y1="${y1 - ny}" x2="${x2 - nx}" y2="${y2 - ny}" stroke="#7A4A22" stroke-width=".11"/>`;
      const steps = Math.max(2, Math.floor(len / .36)); for (let i = 1; i < steps; i++) { const f = i / steps; s += `<line x1="${x1 + dx * f + nx}" y1="${y1 + dy * f + ny}" x2="${x1 + dx * f - nx}" y2="${y1 + dy * f - ny}" stroke="#C8894A" stroke-width=".08"/>`; }
      s += `</g>`;
    });
    Object.entries(B.snakes).forEach(([a, b], k) => {
      const d = snakePath(+a, +b, k), col = SNAKE_COL[k % SNAKE_COL.length]; const [x1, y1] = xy(+a);
      s += `<path id="sn${a}" d="${d}" stroke="${MG.mix(col, .35, 'black')}" stroke-width=".36" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${col}" stroke-width=".28" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#FFE27A" stroke-width=".07" stroke-dasharray=".05 .22" fill="none" stroke-linecap="round"/>`;
      s += `<g transform="translate(${x1} ${y1})"><ellipse rx=".27" ry=".22" fill="${col}" stroke="${MG.mix(col, .35, 'black')}" stroke-width=".04"/><circle cx="-.09" cy="-.06" r=".07" fill="#fff"/><circle cx=".09" cy="-.06" r=".07" fill="#fff"/><circle cx="-.08" cy="-.05" r=".035" fill="#111"/><circle cx=".1" cy="-.05" r=".035" fill="#111"/><path d="M0 .2l-.06 .14M0 .2l.06 .14" stroke="#E21B3C" stroke-width=".035"/></g>`;
    });
    return s;
  }
  const pawn = (hex) => `<ellipse cx="0" cy=".26" rx=".24" ry=".08" fill="#000" opacity=".28"/><path d="M-.21 .24q0-.28.21-.36q.21 .08.21 .36z" fill="${hex}" stroke="#fff" stroke-width=".05"/><circle cx="0" cy="-.16" r=".15" fill="${hex}" stroke="#fff" stroke-width=".05"/><circle cx="-.05" cy="-.21" r=".04" fill="#fff" opacity=".8"/>`;

  MG.Snakes = {
    start(o) {
      const n = o.players === 4 ? 4 : 2; const opp = MG.pickOpp(n - 1);
      const players = Array.from({ length: n }, (_, i) => ({ who: i === 0 ? MG.ME : opp[i - 1], isMe: i === 0, pos: 0, col: PCOL[i] }));
      const G = { kind: 'snakes', diff: o.diff || 'medium', B: BOARDS[o.diff || 'medium'], players, turn: 0, phase: 'idle', dice: 1, paused: false, over: false, started: Date.now(), shown: new Set(), findCount: 0, lastFind: Date.now() - 14000 };
      G.pause = () => { G.paused = true; const r = document.getElementById('gs'); r && r.insertAdjacentHTML('beforeend', `<div class="pausepill" id="pp">${t('paused')}</div>`); };
      G.resume = () => { G.paused = false; const p = document.getElementById('pp'); if (p) p.remove(); };
      G.userRoll = () => userRoll(G);
      MG.G = G; MG.S.played.snakes++; MG.save();
      MG.go('snakes'); setTimeout(() => nextTurn(G), 500);
      return G;
    }
  };
  async function sleep(G, ms) { let left = ms; while (left > 0) { await MG.wait(100); if (!G.paused && MG.G === G && MG.S.screen === 'snakes') left -= 100; if (MG.G !== G) throw new Error('stopped'); } }

  MG.screens.snakes = function () {
    const G = MG.G;
    return `<div class="gscreen gbg" id="gs"><div class="sparkle"></div>${MG.garland()}
      <div class="gtop"><button class="ib" data-a="leavegame" aria-label="Leave game">${MG.icon.back}</button><h1>${t('snakes')}</h1>${MG.coinPill(true)}<button class="ib" data-a="sound" aria-label="Sound">${MG.S.sound ? '🔊' : '🔇'}</button></div>
      <div class="players" id="spl"></div>
      <div class="boardwrap"><svg viewBox="-.2 -.2 10.4 10.4" id="sb" role="img" aria-label="Snakes and ladders board">${boardSvg(G.B)}<g id="stok"></g></svg></div>
      <div class="dock" id="dock">${MG.Dice.html()}<div class="turnlab" id="tl"></div></div>
    </div>`;
  };
  MG.afters.snakes = function () { const G = MG.G; if (!G) return; drawPlayers(G); drawTokens(G); MG.Dice.show(document.querySelector('.dicebtn'), G.dice); setLabel(G); MG.Dice.ready(document.querySelector('.dicebtn'), G.phase === 'roll' && G.players[G.turn].isMe); if (G.paused) G.paused = false; };

  function drawPlayers(G) {
    const el = document.getElementById('spl'); if (!el) return;
    el.innerHTML = G.players.map((p, i) => `<div class="pl ${i === G.turn ? 'on' : ''}">${MG.face(p.who, 28)}<div class="col" style="min-width:0"><span class="nm">${p.isMe ? t('you') : p.who.name}</span><span class="sub"><span class="pdot" style="display:inline-block;width:9px;height:9px;background:${p.col};vertical-align:-1px"></span> ${p.pos || '—'}</span></div></div>`).join('');
  }
  function tokPos(G, pi, at) {
    const p = G.players[pi]; const pos = at != null ? at : p.pos;
    const [x, y] = xy(pos === 0 ? 1 : pos); const same = G.players.map((q, qi) => ({ q, qi })).filter(({ q }) => q.pos === pos);
    const k = same.findIndex((o) => o.qi === pi); if (same.length < 2) return [x, y - .05];
    return [x + (k % 2 ? .17 : -.17), y + (k > 1 ? .15 : -.12)];
  }
  function drawTokens(G) {
    const g = document.getElementById('stok'); if (!g) return;
    g.innerHTML = G.players.map((p, i) => { const [x, y] = tokPos(G, i); return `<g class="tok" id="st${i}" transform="translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${G.players.filter((q) => q.pos === p.pos).length > 1 ? .8 : 1})" style="transition:transform .13s ease">${pawn(p.col)}</g>`; }).join('');
  }
  function setTok(G, i, x, y, ms) { const el = document.getElementById('st' + i); if (!el) return; el.style.transition = `transform ${ms || 130}ms ease`; el.setAttribute('transform', `translate(${x.toFixed(3)} ${y.toFixed(3)})`); }
  function setLabel(G, txt, sub) {
    const el = document.getElementById('tl'); if (!el) return; const p = G.players[G.turn];
    el.innerHTML = txt ? `${txt}${sub ? `<small>${sub}</small>` : ''}` : (p.isMe ? `${t('yourTurn')}<small>${t('tapRoll')}</small>` : `${p.who.name} ${t('thinking')}<small>${t('snakes')} · ${t(G.diff)}</small>`);
  }
  async function nextTurn(G) {
    if (G.over || MG.G !== G) return; const p = G.players[G.turn]; drawPlayers(G);
    const btn = document.querySelector('.dicebtn');
    if (p.isMe) { G.phase = 'roll'; setLabel(G); MG.Dice.ready(btn, true); }
    else { G.phase = 'bot'; setLabel(G); MG.Dice.ready(btn, false); maybeFind(G, 'luckyFind'); try { await sleep(G, 600); await doRoll(G); } catch (e) {} }
  }
  async function userRoll(G) {
    if (G.phase !== 'roll' || !G.players[G.turn].isMe || G.paused) return;
    MG.hideFind(); G.phase = 'rolling'; MG.Dice.ready(document.querySelector('.dicebtn'), false);
    try { await doRoll(G); } catch (e) {}
  }
  async function doRoll(G) {
    const d = 1 + Math.floor(Math.random() * 6); G.dice = d; await MG.Dice.roll(document.querySelector('.dicebtn'), d);
    const p = G.players[G.turn]; const i = G.turn;
    let target = p.pos + d;
    if (target > 100) { if (G.B.exact) { setLabel(G, `${p.isMe ? t('you') : p.who.name} · ${d}`, `Need exactly ${100 - p.pos}`); await sleep(G, 900); return endTurn(G, false); } target = 100; }
    for (let s = p.pos + 1; s <= target; s++) { p.pos = s; const [x, y] = xy(s); setTok(G, i, x, y - .05, 120); MG.sfx('step'); await sleep(G, 150); }
    let msg = '';
    const up = G.B.ladders[p.pos], down = G.B.snakes[p.pos];
    if (up) {
      MG.sfx('good'); flash(t('ladder'), '#FFD15C'); const [x, y] = xy(up); setTok(G, i, x, y - .05, 750); await sleep(G, 800); msg = `${p.pos} → ${up}`; p.pos = up;
      if (!p.isMe) maybeFind(G, 'ladderFind', true);
    } else if (down) {
      MG.sfx('bad'); flash(t('snake'), '#FF8FB1'); await slide(G, i, p.pos); msg = `${p.pos} → ${down}`; p.pos = down;
    }
    drawTokens(G); drawPlayers(G);
    if (p.pos >= 100) return finish(G, i);
    if (msg) { setLabel(G, `${p.isMe ? t('you') : p.who.name}: ${msg}`, up ? t('ladder') : t('snake')); await sleep(G, 500); }
    return endTurn(G, d === 6);
  }
  async function slide(G, i, from) {
    const path = document.getElementById('sn' + from); if (!path) return; const L = path.getTotalLength(); const el = document.getElementById('st' + i); if (!el) return;
    el.style.transition = 'none'; const T = 900; let tt = 0;
    while (tt < T) { await MG.wait(30); if (G.paused) continue; tt += 30; const pt = path.getPointAtLength(L * Math.min(1, tt / T)); el.setAttribute('transform', `translate(${pt.x.toFixed(3)} ${(pt.y - .05).toFixed(3)})`); }
  }
  function flash(txt, col) {
    const r = document.getElementById('gs'); if (!r) return; const el = document.createElement('div');
    el.style.cssText = `position:absolute;left:50%;top:42%;transform:translateX(-50%);font-family:var(--display);font-size:38px;font-weight:800;color:${col};text-shadow:0 3px 0 #5B1062,0 0 18px rgba(0,0,0,.4);pointer-events:none;z-index:8;white-space:nowrap`;
    el.textContent = txt; r.appendChild(el);
    el.animate([{ transform: 'translate(-50%,10px) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,0) scale(1.1)', opacity: 1, offset: .3 }, { transform: 'translate(-50%,-20px) scale(1)', opacity: 0 }], { duration: 950, fill: 'forwards' }).onfinish = () => el.remove();
  }
  async function endTurn(G, again) { if (G.over) return; if (!again) G.turn = (G.turn + 1) % G.players.length; else if (G.players[G.turn].isMe) setLabel(G, t('extra'), t('tapRoll')); await sleep(G, 250).catch(() => {}); nextTurn(G); }
  function maybeFind(G, label, force) {
    const dock = document.getElementById('dock'); if (!dock) return;
    if (G.findCount >= 3 || Date.now() - G.lastFind < 22000 || (!force && Math.random() < .4)) return;
    const p = MG.pickFind('snakes', G.shown); if (!p) return; G.findCount++; G.lastFind = Date.now(); MG.showFind(dock, p, label);
  }
  function finish(G, wi) {
    G.over = true; G.phase = 'over';
    const ranked = G.players.map((p, i) => ({ p, s: i === wi ? 1000 : p.pos })).sort((a, b) => b.s - a.s);
    const rank = ranked.findIndex((r) => r.p.isMe) + 1;
    setTimeout(() => MG.finishGame({ kind: 'snakes', rank, of: G.players.length, ranking: ranked.map((r) => ({ name: r.p.isMe ? t('you') : r.p.who.name, who: r.p.who, me: r.p.isMe, note: (r.p.pos >= 100 ? 100 : r.p.pos) + '/100' })), shown: [...G.shown] }), 800);
  }
  MG.SnakesTest = { xy, BOARDS };
})(window.MG);
