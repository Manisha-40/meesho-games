/* Meesho Games: lobby, pre-game choices, results, coins. */
(function (MG) {
  const S = () => MG.S, t = (k) => MG.t(k);
  const INFO = {
    snakes: { art: () => MG.snakesArt(), col: 'linear-gradient(160deg,#2EAE5B,#14703A)', time: '2 to 3 min', start: (o) => MG.Snakes.start(o) },
    ludo: { art: () => MG.ludoArt(), col: 'linear-gradient(160deg,#E53935,#9E1B1B)', time: '5 min · quick', start: (o) => MG.Ludo.start(o) },
    housie: { art: () => MG.housieArt(), col: 'linear-gradient(160deg,#9F2089,#5B1062)', time: '4 to 5 min', start: (o) => MG.Housie.start(o) }
  };
  MG.screens.games = function () {
    const [h, m, s] = MG.hms(MG.to8pm()); const C = MG.COIN;
    return `<div class="gscreen gbg"><div class="sparkle"></div>${MG.garland()}
      <div class="gtop" style="padding-top:12px"><button class="ib" data-a="back" aria-label="Back">${MG.icon.back}</button><h1>${t('mgames')}</h1>${MG.coinPill(true)}</div>
      <div class="scroll" style="position:relative;padding-bottom:16px">
        <div class="anim" style="padding:0 14px 10px"><div class="row" style="justify-content:space-between;font-size:12.5px;font-weight:700;margin-bottom:6px"><span>${t('coinsToday')}</span><span data-cointoday>${S().coinToday}/${C.dailyCap}</span></div><div class="progressbar"><span data-coinbar style="width:${Math.min(100, S().coinToday / C.dailyCap * 100)}%"></span></div></div>
        ${MG.RW.strip()}
        <button class="ghero anim" data-a="bighousie" style="width:calc(100% - 24px);text-align:left;display:block">
          <span class="k">${t('bigSub')}</span><h2>${t('big')}</h2>
          <span class="row" style="gap:8px;font-weight:800;font-size:13px">${t('startsIn')} <span class="cd" data-cd style="display:inline-flex;gap:3px">${[h, m, s].map((x, i) => `<b style="background:#5B1062;color:#fff;border-radius:5px;padding:2px 6px">${x}</b>${i < 2 ? ':' : ''}`).join('')}</span></span>
          <span class="row" style="gap:5px;margin-top:8px;flex-wrap:wrap">${MG.SLOTS.map((sl, i) => `<span style="font-size:10.5px;font-weight:800;padding:3px 7px;border-radius:999px;${i === MG.nextSlot().idx ? 'background:#5B1062;color:#fff' : 'background:rgba(91,16,98,.12);color:#5B1062'}">${MG.fmtSlot(sl)}</span>`).join('')}</span>
          <span class="row" style="gap:8px;margin-top:10px"><span class="btn sm" style="background:#5B1062">${t('join')}</span><span class="btn sm" data-a="remind" style="background:rgba(91,16,98,.12);color:#5B1062">${S().remind ? '✓ ' + t('reminded') : '🔔 ' + t('remind')}</span></span>
          <span style="position:absolute;right:-6px;bottom:-14px;width:120px;height:120px;transform:rotate(-8deg)">${MG.housieArt().replace('<svg', '<svg style="width:100%;height:100%;border-radius:14px"')}</span>
        </button>
        <div style="display:grid;grid-template-columns:1fr;gap:14px;padding:16px 12px 0">
          ${['snakes', 'ludo', 'housie'].map((g) => `<button class="gtile anim" data-a="pregame" data-v="${g}" style="background:${INFO[g].col}"><span class="art">${INFO[g].art().replace('xMidYMid slice', 'xMidYMid meet')}</span><span class="meta"><span style="flex:1"><b>${t(g)}</b><small>${t(g + 'Sub')} · ${INFO[g].time}</small></span><span class="btn gold sm" style="pointer-events:none">${t('play')} ▶</span></span></button>`).join('')}
        </div>
        ${S().finds.length ? `<div style="padding:18px 12px 0"><div style="font-weight:800;font-size:15px;margin-bottom:8px">${t('recentFinds')}</div><div class="hx">${S().finds.slice(0, 10).map((pid) => { const p = MG.BYID[pid]; return `<button class="minifind" data-a="pdp" data-v="${pid}"><span class="im" style="display:block">${MG.prod(p.art)}</span><div>₹${p.price} <span style="color:var(--green);font-size:10.5px">${MG.off(p)}% off</span></div></button>`; }).join('')}</div></div>` : ''}
        <p style="font-size:11.5px;opacity:.75;padding:14px 14px 0;margin:0;line-height:1.5">${t('freePlay')}. ${C.perRupee} coins = ₹1, up to ${C.dailyCap} coins a day. Concept prototype, not affiliated with Meesho.</p>
      </div></div>`;
  };
  MG.afters.games = function () { if (MG.afters.home && !document.getElementById('slides')) { /* countdown handled by home timer */ } startCd(); };
  let cdT = null;
  function startCd() {
    clearInterval(cdT);
    cdT = setInterval(() => {
      if (S().screen !== 'games') return clearInterval(cdT);
      const [h, m, s] = MG.hms(MG.to8pm());
      document.querySelectorAll('[data-cd]').forEach((x) => { x.innerHTML = [h, m, s].map((v, i) => `<b style="background:#5B1062;color:#fff;border-radius:5px;padding:2px 6px">${v}</b>${i < 2 ? ':' : ''}`).join(''); });
    }, 1000);
  }

  let pre = { game: 'snakes', diff: 'medium', players: 2, mode: 'quick' };
  MG.actions.pregame = function (g) {
    pre.game = g; if (g === 'housie') pre.players = 6;
    else if (pre.players === 6) pre.players = 2;
    drawPre();
  };
  function drawPre() {
    const g = pre.game; const opp = MG.OPPONENTS.slice(0, g === 'housie' ? 5 : pre.players - 1);
    const seg = (key, vals) => `<div class="chiprow">${vals.map(([v, l]) => `<button class="chip" data-a="preset" data-v="${key}:${v}" aria-pressed="${String(pre[key]) === String(v)}">${l}</button>`).join('')}</div>`;
    MG.openLayer(`<div class="sheetwrap" data-a="preclose"><div class="sheet" data-stop>
      <span class="grab"></span>
      <div class="row" style="gap:12px"><span style="width:76px;height:56px;border-radius:12px;overflow:hidden;flex-shrink:0">${INFO[g].art()}</span><div class="col" style="flex:1"><b style="font-family:var(--display);font-size:26px;line-height:1">${t(g)}</b><span style="font-size:12.5px;color:var(--muted)">${t(g + 'Sub')} · ${INFO[g].time}</span></div></div>
      <div class="col" style="gap:8px"><b style="font-size:13px">${t('level')}</b>${seg('diff', [['easy', t('easy')], ['medium', t('medium')], ['hard', t('hard')]])}
        <span style="font-size:12px;color:var(--muted)">${g === 'snakes' ? { easy: 'Fewer snakes, same ladders.', medium: 'The classic board.', hard: 'Extra snakes, and you must land exactly on 100.' }[pre.diff] : g === 'ludo' ? { easy: 'Relaxed opponents.', medium: 'Opponents cut you when they can.', hard: 'Opponents play safe and smart.' }[pre.diff] : { easy: 'Slow calls, called numbers glow on your ticket.', medium: 'Normal speed.', hard: 'Fast calls, sharp opponents.' }[pre.diff]}</span></div>
      ${g !== 'housie' ? `<div class="col" style="gap:8px"><b style="font-size:13px">${t('players')}</b>${seg('players', [[2, '2'], [4, '4']])}</div>` : ''}
      ${g === 'ludo' ? `<div class="col" style="gap:8px"><b style="font-size:13px">${t('mode')}</b>${seg('mode', [['quick', t('quick') + ' · 2 tokens'], ['classic', t('classic') + ' · 4 tokens']])}</div>` : ''}
      <div class="row" style="gap:8px;background:#F7F4F8;border-radius:12px;padding:10px">${MG.face(MG.ME, 30, '#9F2089')}<span style="font-size:12px;font-weight:800;color:var(--purple)">vs</span>${opp.map((o) => MG.face(o, 30)).join('')}<span style="font-size:12px;color:var(--muted);margin-left:4px">${opp.map((o) => o.name).join(', ')}</span></div>
      <div class="row" style="gap:8px;font-size:12.5px;color:#5B2B86;font-weight:700"><span class="coin">₹</span>${S().coinToday >= MG.COIN.dailyCap ? t('capHit') : `+${MG.COIN.finish} to finish, +${MG.COIN.win} more to win`}</div>
      <button class="btn gold" data-a="startgame">${t('playNow')}  ▶</button>
    </div></div>`);
  }
  MG.actions.preset = function (v) { const [k, val] = v.split(':'); pre[k] = k === 'players' ? Number(val) : val; drawPre(); };
  MG.actions.preclose = () => MG.closeLayer();
  MG.actions.startgame = function () { MG.closeLayer(); MG.G = null; INFO[pre.game].start({ diff: pre.diff, players: pre.players, mode: pre.mode }); };
  MG.actions.bighousie = function () { MG.closeLayer(); MG.G = null; MG.toast(MG.to8pm() > 60 ? 'Demo: starting Big Housie now' : t('big')); MG.Housie.start({ diff: 'medium', big: true }); };
  MG.actions.remind = function (v, el, e) { if (e) e.stopPropagation(); S().remind = !S().remind; MG.save(); MG.render(); MG.toast(S().remind ? 'We will remind you 5 minutes before the ' + MG.fmtSlot(MG.nextSlot().slot) + ' game' : 'Reminder off'); };
  MG.actions.sound = function () { S().sound = !S().sound; MG.save(); document.querySelectorAll('[data-a=sound]').forEach((b) => { b.textContent = S().sound ? '🔊' : '🔇'; }); };
  MG.actions.leavegame = function () {
    if (MG.G && MG.G.pause) MG.G.pause();
    MG.openLayer(`<div class="sheetwrap center"><div class="modal" data-stop><span style="font-size:40px">🎲</span><b style="font-size:19px">${t('leave')}</b><span style="color:var(--muted);font-size:14px">${t('leaveSub')}</span><div class="row" style="gap:10px;width:100%"><button class="btn o" data-a="quitgame">${t('quit')}</button><button class="btn gold" data-a="staygame">${t('stay')}</button></div></div></div>`);
  };
  MG.actions.staygame = () => { MG.closeLayer(); if (MG.G) MG.G.resume(); };
  MG.actions.quitgame = () => { MG.closeLayer(); MG.G = null; MG.S.stack = MG.S.stack.filter((x) => !['ludo', 'snakes', 'housie', 'result'].includes(x.screen)); MG.go('games', {}, { replace: true }); };

  // ---------- results ----------
  MG.finishGame = function (r) {
    const C = MG.COIN; let gained = 0; const lines = [];
    const mult = r.big ? 2 : 1;
    const f = MG.earn(C.finish, `${MG.T.en[r.kind]}: finished`, mult); if (f) { gained += f; lines.push([MG.T.en.finish || 'Finished the game', f]); }
    if (r.kind !== 'housie' && r.rank === 1) { const w = MG.earn(C.win, `${MG.T.en[r.kind]}: won`, mult); if (w) { gained += w; lines.push(['Won the game', w]); } }
    if (r.kind === 'housie') { (r.mine || []).forEach((p) => lines.push([MG.T.en[p], C.housie[p] * mult, true])); gained += r.prizeCoins || 0; }
    if (r.rank === 1 || (r.mine && r.mine.length)) S().wins++;
    const rw = MG.RW.onGame(r, gained);
    MG.save();
    MG.lastResult = Object.assign({}, r, { gained, lines, rw });
    MG.G = null;
    MG.S.stack = MG.S.stack.filter((x) => !['ludo', 'snakes', 'housie'].includes(x.screen));
    MG.S.screen = 'result'; MG.S.params = {}; MG.save(); MG.render();
    if (r.rank === 1) MG.confetti(); else if (rw.newBadges.length) setTimeout(() => MG.confetti(), 700);
    if (rw.newBadges.length) setTimeout(() => MG.toast(t('newBadge') + ': ' + t('b_' + rw.newBadges[0])), 1200);
    setTimeout(() => { const el = document.getElementById('gain'); if (el && gained) { const l = MG.local(el); MG.coinBurst({ x: l.x + l.w / 2, y: l.y + l.h / 2 }, gained); } else MG.updateCoins(); }, 600);
  };
  MG.screens.result = function () {
    const r = MG.lastResult; if (!r) return MG.screens.games();
    const head = r.kind === 'housie' ? (r.mine.includes('full') ? t('won') : (r.mine.length ? `${r.mine.length} ${r.mine.length > 1 ? 'prizes' : 'prize'}` : 'Good game!')) : (r.rank === 1 ? t('won') : `${t('placed')} ${r.rank} ${t('of')} ${r.of}`);
    const finds = (r.shown || []).map((id) => MG.BYID[id]).filter(Boolean);
    const extra = finds.length < 3 ? MG.P.filter((p) => !finds.includes(p) && (S().views[p.cat] || 0) > 0).slice(0, 3 - finds.length) : [];
    return `<div class="gscreen gbg"><div class="sparkle"></div>${MG.garland()}
      <div class="gtop" style="padding-top:12px"><button class="ib" data-a="go" data-v="games" aria-label="All games">${MG.icon.back}</button><h1>${t(r.kind === 'housie' && r.big ? 'big' : r.kind)}</h1>${MG.coinPill(true)}</div>
      <div class="scroll" style="position:relative;padding-bottom:16px">
        <div style="text-align:center;padding:8px 14px 14px"><div style="font-size:54px;line-height:1">${r.rank === 1 ? '🏆' : (r.kind === 'housie' && r.mine.length ? '🎉' : '👏')}</div><div style="font-family:var(--display);font-size:36px;font-weight:800;color:var(--gold);line-height:1.1;margin-top:6px">${head}</div></div>
        <div class="rescard">
          <div class="row" id="gain" style="gap:10px;justify-content:center;background:#FFF4D6;border-radius:14px;padding:12px"><span class="coin" style="width:36px;height:36px;font-size:17px">₹</span><b style="font-size:26px;font-family:var(--display)">+${r.gained}</b><span style="font-weight:700">${t('coinsEarned')}</span></div>
          ${r.lines.length ? `<div class="col" style="gap:4px;font-size:13px">${r.lines.map(([l, n]) => `<div class="row" style="justify-content:space-between"><span>${l}</span><b>+${n}</b></div>`).join('')}</div>` : ''}
          ${S().coinToday >= MG.COIN.dailyCap ? `<span style="font-size:12px;color:var(--muted)">${t('capHit')}</span>` : `<span style="font-size:12px;color:var(--muted)">${t('coinsToday')}: ${S().coinToday}/${MG.COIN.dailyCap} · ${MG.COIN.perRupee} coins = ₹1</span>`}
          ${r.kind === 'housie' ? `<div class="col" style="gap:6px">${['early', 'top', 'middle', 'bottom', 'full'].map((p) => `<div class="rank ${r.prizes[p] === 'me' ? 'me' : ''}"><span style="flex:1;font-weight:700">${t(p)}</span><b>${r.prizes[p] === 'me' ? t('you') : (r.prizes[p] || '—')}</b></div>`).join('')}</div>`
          : `<div class="col" style="gap:6px">${r.ranking.map((x, i) => `<div class="rank ${x.me ? 'me' : ''}"><b class="r">${i + 1}</b>${MG.face(x.who, 30)}<span style="flex:1;font-weight:700">${x.name}</span><span style="font-size:12px;color:var(--muted)">${x.note}</span></div>`).join('')}</div>`}
        </div>
        ${MG.RW.resultCard()}
        ${finds.concat(extra).length ? `<div style="padding:16px 12px 0"><div style="font-weight:800;font-size:15px;margin-bottom:8px">${t('findsFrom')}</div><div class="hx">${finds.concat(extra).map((p) => `<button class="minifind" data-a="pdp" data-v="${p.id}"><span class="im" style="display:block">${MG.prod(p.art)}</span><div>₹${p.price} <span style="color:var(--green);font-size:10.5px">${MG.off(p)}% off</span></div></button>`).join('')}</div></div>` : ''}
        <div class="row" style="gap:10px;padding:16px 12px 0"><button class="btn o" data-a="go" data-v="games" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.6)">${t('gamesHome')}</button><button class="btn gold" data-a="again">${t('playAgain')}  ▶</button></div>
      </div></div>`;
  };
  MG.actions.again = function () { const r = MG.lastResult; if (!r) return MG.go('games'); MG.G = null; if (r.kind === 'housie') MG.Housie.start({ diff: pre.diff, big: false }); else INFO[r.kind].start({ diff: pre.diff, players: pre.players === 6 ? 2 : pre.players, mode: pre.mode }); };
})(window.MG);
