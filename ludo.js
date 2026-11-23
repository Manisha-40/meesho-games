/* Ludo: standard rules. Roll a 6 to come out, 6 or a cut or reaching home gives another roll,
   three sixes in a row lose the turn, stars and start squares are safe, exact roll to reach home.
   Quick mode: 2 tokens each, first player to bring both home wins. */
(function (MG) {
  const t = (k) => MG.t(k);
  const TRACK = [];
  (function build() {
    const push = (r, c) => TRACK.push([r, c]);
    for (let c = 1; c <= 5; c++) push(6, c);
    for (let r = 5; r >= 0; r--) push(r, 6);
    push(0, 7); push(0, 8);
    for (let r = 1; r <= 5; r++) push(r, 8);
    for (let c = 9; c <= 14; c++) push(6, c);
    push(7, 14); push(8, 14);
    for (let c = 13; c >= 9; c--) push(8, c);
    for (let r = 9; r <= 14; r++) push(r, 8);
    push(14, 7); push(14, 6);
    for (let r = 13; r >= 9; r--) push(r, 6);
    for (let c = 5; c >= 0; c--) push(8, c);
    push(7, 0); push(6, 0);
  })();
  const COLORS = {
    green: { start: 0, hex: '#2EAE5B', light: '#C9F0D6', yard: [0, 0], home: (i) => [7, 1 + i], center: [7, 6.35] },
    yellow: { start: 13, hex: '#F5B800', light: '#FFF0B8', yard: [9, 0], home: (i) => [1 + i, 7], center: [6.35, 7] },
    blue: { start: 26, hex: '#2D7BE5', light: '#CFE2FF', yard: [9, 9], home: (i) => [7, 13 - i], center: [7, 7.65] },
    red: { start: 39, hex: '#E53935', light: '#FFD3D1', yard: [0, 9], home: (i) => [13 - i, 7], center: [7.65, 7] }
  };
  const SAFE = [0, 8, 13, 21, 26, 34, 39, 47];
  const HOME = 56;

  function coord(color, pos, k) {
    const C = COLORS[color];
    if (pos === -1) { const [ox, oy] = C.yard; const sp = [[2, 2], [4, 2], [2, 4], [4, 4]][k]; return [ox + sp[0], oy + sp[1]]; }
    if (pos <= 50) { const [r, c] = TRACK[(C.start + pos) % 52]; return [c + .5, r + .5]; }
    if (pos < HOME) { const [r, c] = C.home(pos - 51); return [c + .5, r + .5]; }
    const [r, c] = C.center; return [c + .5, r + .5];
  }
  const trackIdx = (color, pos) => (pos >= 0 && pos <= 50) ? (COLORS[color].start + pos) % 52 : null;

  function star(cx, cy, r) { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(3) + ' ' + (cy + rr * Math.sin(a)).toFixed(3); } return `<path d="${d}Z" fill="#B9B2C0"/>`; }

  function boardSvg() {
    let s = `<rect x="-.15" y="-.15" width="15.3" height="15.3" rx=".5" fill="#5B1062"/><rect width="15" height="15" rx=".35" fill="#fff"/>`;
    for (const [name, C] of Object.entries(COLORS)) {
      const [ox, oy] = C.yard;
      s += `<rect x="${ox + .08}" y="${oy + .08}" width="5.84" height="5.84" rx=".45" fill="${C.hex}"/><rect x="${ox + .9}" y="${oy + .9}" width="4.2" height="4.2" rx=".5" fill="#fff"/>`;
      [[2, 2], [4, 2], [2, 4], [4, 4]].forEach(([x, y]) => { s += `<circle cx="${ox + x}" cy="${oy + y}" r=".62" fill="${C.light}" stroke="${C.hex}" stroke-width=".08"/>`; });
    }
    TRACK.forEach(([r, c], i) => {
      let fill = '#fff'; const col = Object.values(COLORS).find((C) => C.start === i);
      if (col) fill = col.hex;
      s += `<rect x="${c + .03}" y="${r + .03}" width=".94" height=".94" rx=".1" fill="${fill}" stroke="#E6DDEA" stroke-width=".05"/>`;
      if (col) s += `<path d="M${c + .5} ${r + .22}l.22 .28h-.13v.28h-.18v-.28h-.13z" fill="#fff" opacity=".9"/>`;
      else if (SAFE.includes(i)) s += star(c + .5, r + .5, .34);
    });
    for (const C of Object.values(COLORS)) for (let i = 0; i < 5; i++) { const [r, c] = C.home(i); s += `<rect x="${c + .03}" y="${r + .03}" width=".94" height=".94" rx=".1" fill="${C.hex}" stroke="#fff" stroke-width=".05"/>`; }
    s += `<path d="M6 6L7.5 7.5L6 9Z" fill="${COLORS.green.hex}"/><path d="M6 6L9 6L7.5 7.5Z" fill="${COLORS.yellow.hex}"/><path d="M9 6L9 9L7.5 7.5Z" fill="${COLORS.blue.hex}"/><path d="M6 9L9 9L7.5 7.5Z" fill="${COLORS.red.hex}"/><circle cx="7.5" cy="7.5" r=".42" fill="#fff" opacity=".9"/><path d="M7.5 7.2l.09 .19.2 .03-.15 .14.04 .2-.18-.1-.18 .1.04-.2-.15-.14.2-.03z" fill="#F5B800"/>`;
    return s;
  }
  function pawnSvg(hex) {
    return `<ellipse cx="0" cy=".32" rx=".3" ry=".1" fill="#000" opacity=".28"/><circle class="ringc" cx="0" cy="0" r=".46" fill="none" stroke="transparent"/><path d="M-.27 .3q0-.36.27-.45q.27 .09.27 .45z" fill="${hex}" stroke="#fff" stroke-width=".06"/><circle cx="0" cy="-.2" r=".19" fill="${hex}" stroke="#fff" stroke-width=".06"/><circle cx="-.06" cy="-.26" r=".05" fill="#fff" opacity=".8"/>`;
  }

  MG.Ludo = {
    start(o) {
      const n = o.players === 2 ? 2 : 4; const opp = MG.pickOpp(n - 1);
      const order = n === 2 ? ['red', 'yellow'] : ['red', 'green', 'yellow', 'blue'];
      const tc = o.mode === 'classic' ? 4 : 2;
      const players = order.map((color, i) => { const who = i === 0 ? MG.ME : opp[i - 1]; return { who, color, isMe: i === 0, tokens: Array(tc).fill(-1) }; });
      const G = { kind: 'ludo', diff: o.diff || 'medium', mode: tc === 4 ? 'classic' : 'quick', players, tc, turn: 0, phase: 'idle', sixes: 0, dice: 1, paused: false, over: false, started: Date.now(),
        shown: new Set(), findCount: 0, lastFind: Date.now() - 12000, big: false };
      G.pause = () => { G.paused = true; root() && root().insertAdjacentHTML('beforeend', `<div class="pausepill" id="pp">${t('paused')}</div>`); };
      G.resume = () => { G.paused = false; const p = document.getElementById('pp'); if (p) p.remove(); };
      G.userRoll = () => userRoll(G);
      G.pick = (ti) => userPick(G, ti);
      MG.G = G; MG.S.played.ludo++; MG.save();
      MG.go('ludo');
      setTimeout(() => nextTurn(G), 500);
      return G;
    }
  };
  const root = () => document.getElementById('gs');
  async function sleep(G, ms) { let left = ms; while (left > 0) { await MG.wait(100); if (!G.paused && MG.G === G && MG.S.screen === 'ludo') left -= 100; if (MG.G !== G) throw new Error('stopped'); } }

  MG.screens.ludo = function () {
    const G = MG.G;
    return `<div class="gscreen gbg" id="gs"><div class="sparkle"></div>${MG.garland()}
      <div class="gtop"><button class="ib" data-a="leavegame" aria-label="Leave game">${MG.icon.back}</button><h1>${t('ludo')}</h1>${MG.coinPill(true)}<button class="ib" data-a="sound" aria-label="Sound">${MG.S.sound ? '🔊' : '🔇'}</button></div>
      <div class="players" id="lpl"></div>
      <div class="boardwrap"><svg viewBox="-.3 -.3 15.6 15.6" id="lb" role="img" aria-label="Ludo board">${boardSvg()}<g id="ltok"></g></svg></div>
      <div class="dock" id="dock">${MG.Dice.html()}<div class="turnlab" id="tl"></div></div>
    </div>`;
  };
  MG.afters.ludo = function () { const G = MG.G; if (!G) return; drawPlayers(G); drawTokens(G); MG.Dice.show(document.querySelector('.dicebtn'), G.dice); setLabel(G); if (G.phase === 'roll' && G.players[G.turn].isMe) MG.Dice.ready(document.querySelector('.dicebtn'), true); else MG.Dice.ready(document.querySelector('.dicebtn'), false); if (G.phase === 'pick') highlight(G); if (G.paused) { G.paused = false; } };

  function drawPlayers(G) {
    const el = document.getElementById('lpl'); if (!el) return;
    el.innerHTML = G.players.map((p, i) => `<div class="pl ${i === G.turn ? 'on' : ''}">${MG.face(p.who, 28)}<div class="col" style="min-width:0"><span class="nm">${p.isMe ? t('you') : p.who.name}</span><span class="sub"><span class="pdot" style="display:inline-block;width:9px;height:9px;background:${COLORS[p.color].hex};vertical-align:-1px"></span> ${p.tokens.filter((x) => x === HOME).length}/${G.tc} ${MG.S.lang === 'hi' ? 'घर' : (MG.S.lang === 'ta' ? 'வீடு' : 'home')}</span></div></div>`).join('');
  }
  function drawTokens(G) {
    const g = document.getElementById('ltok'); if (!g) return;
    const groups = {};
    G.players.forEach((p, pi) => p.tokens.forEach((pos, ti) => { const [x, y] = coord(p.color, pos, ti); const key = pos === -1 ? `y${pi}${ti}` : `${x},${y}`; (groups[key] = groups[key] || []).push({ pi, ti, x, y }); }));
    let html = '';
    Object.values(groups).forEach((arr) => arr.forEach((o, k) => {
      const n = arr.length; const off = n > 1 ? [(k % 2 ? .18 : -.18), (k > 1 ? .18 : -.12)] : [0, 0]; const sc = n > 1 ? .72 : 1;
      const p = G.players[o.pi];
      html += `<g class="tok" id="tk${o.pi}${o.ti}" data-a="tokpick" data-v="${o.ti}" data-pi="${o.pi}" transform="translate(${(o.x + off[0]).toFixed(3)} ${(o.y + off[1] - .05).toFixed(3)}) scale(${sc})" style="cursor:${p.isMe ? 'pointer' : 'default'}">${pawnSvg(COLORS[p.color].hex)}</g>`;
    }));
    g.innerHTML = html;
  }
  function setLabel(G, txt, sub) {
    const el = document.getElementById('tl'); if (!el) return;
    const p = G.players[G.turn];
    el.innerHTML = txt ? `${txt}${sub ? `<small>${sub}</small>` : ''}` : (p.isMe ? `${t('yourTurn')}<small>${G.phase === 'pick' ? t('pickToken') : t('tapRoll')}</small>` : `${p.who.name} ${t('thinking')}<small>${t('ludo')} · ${t(G.diff)}</small>`);
  }
  function highlight(G) {
    const p = G.players[G.turn];
    legal(p, G.dice).forEach((ti) => { const el = document.getElementById(`tk${G.turn}${ti}`); if (el) el.classList.add('can'); });
  }
  const legal = (p, d) => p.tokens.map((pos, ti) => ({ pos, ti })).filter(({ pos }) => (pos === -1 ? d === 6 : pos + d <= HOME && pos !== HOME)).map((x) => x.ti);

  async function nextTurn(G) {
    if (G.over || MG.G !== G) return;
    const p = G.players[G.turn];
    drawPlayers(G);
    const btn = document.querySelector('.dicebtn');
    if (p.isMe) { G.phase = 'roll'; setLabel(G); MG.Dice.ready(btn, true); }
    else {
      G.phase = 'bot'; setLabel(G); MG.Dice.ready(btn, false);
      maybeFind(G);
      try { await sleep(G, 650); await doRoll(G); } catch (e) {}
    }
  }
  async function userRoll(G) {
    if (G.phase !== 'roll' || !G.players[G.turn].isMe || G.paused) return;
    MG.hideFind(); G.phase = 'rolling'; MG.Dice.ready(document.querySelector('.dicebtn'), false);
    try { await doRoll(G); } catch (e) {}
  }
  async function doRoll(G) {
    const d = 1 + Math.floor(Math.random() * 6); G.dice = d;
    await MG.Dice.roll(document.querySelector('.dicebtn'), d);
    const p = G.players[G.turn];
    if (d === 6) G.sixes++; else G.sixes = 0;
    if (G.sixes === 3) { G.sixes = 0; setLabel(G, p.isMe ? 'Three sixes!' : `${p.who.name}: three sixes`, 'Turn passes'); await sleep(G, 900); return endTurn(G, false); }
    const moves = legal(p, d);
    if (!moves.length) { setLabel(G, p.isMe ? `${t('yourTurn')} · ${d}` : `${p.who.name} · ${d}`, p.tokens.every((x) => x === -1) ? t('roll6') : 'No move'); await sleep(G, 850); return endTurn(G, d === 6); }
    if (p.isMe) {
      const sameSpot = new Set(moves.map((ti) => p.tokens[ti])).size === 1;
      if (moves.length === 1 || sameSpot) { await sleep(G, 300); return move(G, moves[0]); }
      G.phase = 'pick'; setLabel(G); highlight(G);
    } else { await sleep(G, G.diff === 'easy' ? 500 : 380); return move(G, botChoose(G, p, moves, d)); }
  }
  function userPick(G, ti) {
    if (G.phase !== 'pick' || G.paused) return;
    const p = G.players[G.turn]; if (!p.isMe || !legal(p, G.dice).includes(ti)) return;
    G.phase = 'moving'; move(G, ti).catch(() => {});
  }
  function threatened(G, pi, color, pos) {
    const ti = trackIdx(color, pos); if (ti == null || SAFE.includes(ti)) return false;
    return G.players.some((q, qi) => qi !== pi && q.tokens.some((qp) => { const qt = trackIdx(q.color, qp); if (qt == null) return false; const gap = (ti - qt + 52) % 52; return gap >= 1 && gap <= 6; }));
  }
  function botChoose(G, p, moves, d) {
    if (G.diff === 'easy') return moves[Math.floor(Math.random() * moves.length)];
    const pi = G.turn;
    const score = (ti) => {
      const from = p.tokens[ti], to = from === -1 ? 0 : from + d; let s = to * 0.3;
      const tIdx = trackIdx(p.color, to);
      const cuts = tIdx != null && !SAFE.includes(tIdx) && G.players.some((q, qi) => qi !== pi && q.tokens.some((qp) => trackIdx(q.color, qp) === tIdx));
      if (cuts) s += 50; if (to === HOME) s += 40; if (to > 50 && from <= 50) s += 25; if (from === -1) s += 28;
      if (tIdx != null && SAFE.includes(tIdx)) s += 12;
      if (G.diff === 'hard') { if (from !== -1 && threatened(G, pi, p.color, from)) s += 22; if (threatened(G, pi, p.color, to)) s -= 26; }
      return s + Math.random() * (G.diff === 'hard' ? 2 : 8);
    };
    return moves.slice().sort((a, b) => score(b) - score(a))[0];
  }
  async function move(G, ti) {
    G.phase = 'moving'; document.querySelectorAll('.tok.can').forEach((e) => e.classList.remove('can'));
    const p = G.players[G.turn]; const d = G.dice;
    if (p.tokens[ti] === -1) { p.tokens[ti] = 0; drawTokens(G); MG.sfx('step'); await sleep(G, 220); }
    else { for (let i = 0; i < d; i++) { p.tokens[ti]++; drawTokens(G); MG.sfx('step'); await sleep(G, 170); } }
    const pos = p.tokens[ti]; let cut = false, home = pos === HOME;
    const tIdx = trackIdx(p.color, pos);
    if (tIdx != null && !SAFE.includes(tIdx)) {
      G.players.forEach((q, qi) => { if (qi === G.turn) return; q.tokens.forEach((qp, qti) => { if (trackIdx(q.color, qp) === tIdx) { q.tokens[qti] = -1; cut = true; } }); });
    }
    if (cut) { drawTokens(G); drawPlayers(G); MG.sfx(p.isMe ? 'good' : 'bad'); flash(G, `${t('cut')}`); await sleep(G, 500); }
    if (home) { MG.sfx('good'); flash(G, t('home')); drawPlayers(G); await sleep(G, 400); }
    if (p.tokens.every((x) => x === HOME)) return finish(G, G.turn);
    const again = d === 6 || cut || home;
    if (again) { flash(G, t('extra')); }
    return endTurn(G, again);
  }
  function flash(G, txt) {
    const r = root(); if (!r) return; const el = document.createElement('div');
    el.style.cssText = 'position:absolute;left:50%;top:44%;transform:translateX(-50%);font-family:var(--display);font-size:34px;font-weight:800;color:#FFD15C;text-shadow:0 3px 0 #5B1062,0 0 18px rgba(0,0,0,.4);pointer-events:none;z-index:8;white-space:nowrap';
    el.textContent = txt; r.appendChild(el);
    el.animate([{ transform: 'translate(-50%,10px) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,0) scale(1.1)', opacity: 1, offset: .3 }, { transform: 'translate(-50%,-20px) scale(1)', opacity: 0 }], { duration: 900, fill: 'forwards' }).onfinish = () => el.remove();
  }
  async function endTurn(G, again) {
    if (G.over) return;
    if (!again) { G.sixes = 0; G.turn = (G.turn + 1) % G.players.length; }
    await sleep(G, 250).catch(() => {});
    nextTurn(G);
  }
  function maybeFind(G) {
    const dock = document.getElementById('dock'); if (!dock) return;
    if (G.findCount >= 4 || Date.now() - G.lastFind < 28000 || Math.random() < .35) return;
    const p = MG.pickFind('ludo', G.shown); if (!p) return;
    G.findCount++; G.lastFind = Date.now(); MG.showFind(dock, p, 'luckyFind');
  }
  function finish(G, wi) {
    G.over = true; G.phase = 'over';
    const prog = (p) => p.tokens.reduce((a, x) => a + (x === -1 ? 0 : x + 1), 0);
    const ranked = G.players.map((p, i) => ({ p, i, s: i === wi ? 1e9 : prog(p) })).sort((a, b) => b.s - a.s);
    const rank = ranked.findIndex((r) => r.p.isMe) + 1;
    setTimeout(() => MG.finishGame({ kind: 'ludo', rank, of: G.players.length, ranking: ranked.map((r) => ({ name: r.p.isMe ? t('you') : r.p.who.name, who: r.p.who, me: r.p.isMe, note: r.p.tokens.filter((x) => x === HOME).length + '/' + G.tc })), shown: [...G.shown] }), 700);
  }
  MG.actions.roll = () => { if (MG.G && MG.G.userRoll) MG.G.userRoll(); };
  MG.actions.tokpick = (v, el) => { if (MG.G && MG.G.kind === 'ludo' && Number(el.dataset.pi) === MG.G.turn) MG.G.pick(Number(v)); };
  MG.LudoTest = { TRACK, COLORS, coord, legal, HOME, SAFE };
})(window.MG);
