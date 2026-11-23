/* Rewards: streak, weekly goals, badges, leaderboard, bonus coins. */
(function (MG) {
  const S = () => MG.S, t = (k) => MG.t(k);
  const f = (k, o) => { let s = String(t(k)); for (const x in (o || {})) s = s.split('{' + x + '}').join(o[x]); return s; };
  const dkey = (d) => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  const ago = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };
  const today = () => dkey(new Date());
  const dayIdx = () => (new Date().getDay() + 6) % 7; // Monday = 0
  const weekKey = () => dkey(ago(dayIdx()));

  // Design choices for the prototype. Every number here is a concept setting, not a Meesho figure.
  MG.REWARD = {
    pts: { finish: 10, win: 20, prize: 10, full: 20, big: 10 },
    goals: [
      { id: 'plays', n: 10, coins: 60, key: 'goalPlay' },
      { id: 'wins', n: 3, coins: 40, key: 'goalWin' },
      { id: 'big', n: 2, coins: 50, key: 'goalBig' }
    ],
    streak: [{ d: 3, coins: 20 }, { d: 7, coins: 50 }, { d: 14, coins: 100 }]
  };

  const BADGES = [
    { id: 'first', ico: '🎲', c: ['#FFB400', '#FF7A00'], p: (r) => [r.st.plays, 1] },
    { id: 'winner', ico: '🏆', c: ['#FFD15C', '#E59400'], p: (r) => [r.st.wins, 1] },
    { id: 'ludo5', ico: '🔴', c: ['#E53935', '#9E1B1B'], p: (r) => [r.st.ludo, 5] },
    { id: 'snakes5', ico: '🪜', c: ['#2EAE5B', '#14703A'], p: (r) => [r.st.snakes, 5] },
    { id: 'housie3', ico: '🎱', c: ['#9F2089', '#5B1062'], p: (r) => [r.st.big, 3] },
    { id: 'fullhouse', ico: '🏡', c: ['#F43397', '#B0165F'], p: (r) => [r.st.full, 1] },
    { id: 'streak3', ico: '🔥', c: ['#FF8A00', '#E53935'], p: (r) => [r.streak.best, 3] },
    { id: 'streak7', ico: '⚡', c: ['#2F6FED', '#1B3FA0'], p: (r) => [r.streak.best, 7] },
    { id: 'coins200', ico: '🪙', c: ['#FFD15C', '#C98800'], p: (r) => [r.st.earned, 200] },
    { id: 'finds5', ico: '👁️', c: ['#16A37F', '#0B6B53'], p: () => [Math.min(S().finds.length, 5), 5] },
    { id: 'week3', ico: '🎯', c: ['#7B61FF', '#4328B8'], p: (r) => [r.st.goalWeeks, 1] }
  ];
  MG.BADGES = BADGES;

  // ---------- strings ----------
  const EN = {
    rewards: 'Rewards', goals: 'Goals', badges: 'Badges', board: 'Leaderboard',
    streakWord: 'Streak', dayWord: 'days', dayStreak: 'day streak', rankWord: 'Rank', pts: 'pts',
    streakHow: 'Play one game a day to keep your streak going',
    streakRewards: 'Streak rewards', weekGoals: "This week's goals",
    resetsIn: 'Resets in {n} days', collect: 'Collect', collected: 'Collected',
    goalPlay: 'Play {n} games', goalWin: 'Win {n} games', goalBig: 'Join Big Housie {n} times',
    bonusNote: 'Goal and streak coins come on top of the daily limit.',
    walletTitle: 'Your coins', offOrder: 'off your next order', history: 'History',
    weekBoard: "This week's leaderboard",
    earnPts: 'Points: finish a game +10, win +20, each Housie prize +10, Full House +20.',
    toPass: '{n} pts to pass {name}', topSpot: 'You are in the top spot',
    sampleNote: 'Streak, goals and the leaderboard start with sample numbers so you can see them working. The other players are samples too.',
    badgeLocked: 'Not unlocked yet', newBadge: 'New badge', goalDone: 'Goal done!', milestoneHit: 'Streak reward ready!',
    collectHint: 'Collect your coins in Rewards', gotIt: 'Got it', unlocked: 'Unlocked', openRewards: 'Open Rewards',
    dayLetters: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    b_first: 'First Roll', b_winner: 'Winner', b_ludo5: 'Ludo Lover', b_snakes5: 'Ladder Climber', b_housie3: 'Housie Regular', b_fullhouse: 'Full House Hero',
    b_streak3: 'On a Roll', b_streak7: 'Week Warrior', b_coins200: 'Coin Collector', b_finds5: 'Lucky Eye', b_week3: 'Goal Getter',
    bd_first: 'Finish your first game', bd_winner: 'Win a game', bd_ludo5: 'Play 5 Ludo games', bd_snakes5: 'Play 5 Snakes & Ladders games', bd_housie3: 'Join Big Housie 3 times',
    bd_fullhouse: 'Win a Full House prize', bd_streak3: 'Keep a 3 day streak', bd_streak7: 'Keep a 7 day streak', bd_coins200: 'Earn 200 coins from games',
    bd_finds5: 'Spot 5 lucky finds', bd_week3: 'Finish all 3 weekly goals'
  };
  const HI = {
    rewards: 'रिवॉर्ड्स', goals: 'लक्ष्य', badges: 'बैज', board: 'लीडरबोर्ड',
    streakWord: 'स्ट्रीक', dayWord: 'दिन', dayStreak: 'दिन की स्ट्रीक', rankWord: 'रैंक', pts: 'अंक',
    streakHow: 'स्ट्रीक चालू रखने के लिए रोज़ एक गेम खेलें',
    streakRewards: 'स्ट्रीक इनाम', weekGoals: 'इस हफ़्ते के लक्ष्य',
    resetsIn: '{n} दिन में रीसेट', collect: 'पाएँ', collected: 'मिल गया',
    goalPlay: '{n} गेम खेलें', goalWin: '{n} गेम जीतें', goalBig: 'बिग हाउज़ी में {n} बार शामिल हों',
    bonusNote: 'लक्ष्य और स्ट्रीक के कॉइन्स रोज़ की सीमा के ऊपर से मिलते हैं।',
    walletTitle: 'आपके कॉइन्स', offOrder: 'अगले ऑर्डर पर छूट', history: 'हिस्ट्री',
    weekBoard: 'इस हफ़्ते का लीडरबोर्ड',
    earnPts: 'अंक: गेम पूरा करने पर +10, जीतने पर +20, हर हाउज़ी इनाम पर +10, फुल हाउस पर +20।',
    toPass: '{name} से आगे निकलने के लिए {n} अंक', topSpot: 'आप सबसे ऊपर हैं',
    sampleNote: 'स्ट्रीक, लक्ष्य और लीडरबोर्ड सैंपल नंबरों से शुरू होते हैं ताकि आप इन्हें चलते देख सकें। बाकी खिलाड़ी भी सैंपल हैं।',
    badgeLocked: 'अभी अनलॉक नहीं हुआ', newBadge: 'नया बैज', goalDone: 'लक्ष्य पूरा!', milestoneHit: 'स्ट्रीक इनाम तैयार!',
    collectHint: 'रिवॉर्ड्स में कॉइन्स लें', gotIt: 'ठीक है', unlocked: 'अनलॉक हुआ', openRewards: 'रिवॉर्ड्स खोलें',
    dayLetters: ['सो', 'मं', 'बु', 'गु', 'शु', 'श', 'र'],
    b_first: 'पहला पासा', b_winner: 'विजेता', b_ludo5: 'लूडो प्रेमी', b_snakes5: 'सीढ़ी चढ़ाई', b_housie3: 'हाउज़ी रेगुलर', b_fullhouse: 'फुल हाउस हीरो',
    b_streak3: 'लगातार', b_streak7: 'हफ़्ते का योद्धा', b_coins200: 'कॉइन कलेक्टर', b_finds5: 'तेज़ नज़र', b_week3: 'गोल गेटर',
    bd_first: 'अपना पहला गेम पूरा करें', bd_winner: 'एक गेम जीतें', bd_ludo5: '5 लूडो गेम खेलें', bd_snakes5: '5 साँप सीढ़ी गेम खेलें', bd_housie3: 'बिग हाउज़ी में 3 बार शामिल हों',
    bd_fullhouse: 'फुल हाउस इनाम जीतें', bd_streak3: '3 दिन की स्ट्रीक बनाएँ', bd_streak7: '7 दिन की स्ट्रीक बनाएँ', bd_coins200: 'गेम से 200 कॉइन्स कमाएँ',
    bd_finds5: '5 लकी फाइंड्स देखें', bd_week3: 'हफ़्ते के सभी 3 लक्ष्य पूरे करें'
  };
  const TA = {
    rewards: 'ரிவார்ட்ஸ்', goals: 'இலக்குகள்', badges: 'பேட்ஜ்கள்', board: 'லீடர்போர்டு',
    streakWord: 'தொடர்', dayWord: 'நாட்கள்', dayStreak: 'நாள் தொடர்', rankWord: 'ரேங்க்', pts: 'புள்ளி',
    streakHow: 'தொடரைத் தொடர தினமும் ஒரு கேம் விளையாடுங்கள்',
    streakRewards: 'தொடர் பரிசுகள்', weekGoals: 'இந்த வார இலக்குகள்',
    resetsIn: '{n} நாட்களில் மீளும்', collect: 'பெறு', collected: 'பெற்றாயிற்று',
    goalPlay: '{n} கேம் விளையாடு', goalWin: '{n} கேம் வெல்', goalBig: 'பிக் ஹவுஸியில் {n} முறை சேர்',
    bonusNote: 'இலக்கு, தொடர் காயின்ஸ் தினசரி வரம்புக்கு மேலாகக் கிடைக்கும்.',
    walletTitle: 'உங்கள் காயின்ஸ்', offOrder: 'அடுத்த ஆர்டரில் தள்ளுபடி', history: 'வரலாறு',
    weekBoard: 'இந்த வார லீடர்போர்டு',
    earnPts: 'புள்ளிகள்: கேம் முடிக்க +10, வெல்ல +20, ஒவ்வொரு ஹவுஸி பரிசுக்கும் +10, ஃபுல் ஹவுஸுக்கு +20.',
    toPass: '{name}-ஐ முந்த {n} புள்ளிகள்', topSpot: 'நீங்கள் முதலிடத்தில் உள்ளீர்கள்',
    sampleNote: 'தொடர், இலக்குகள், லீடர்போர்டு மாதிரி எண்களுடன் தொடங்கும், அவை எப்படி வேலை செய்கின்றன என்று பார்க்கலாம். மற்ற வீரர்களும் மாதிரி வீரர்களே.',
    badgeLocked: 'இன்னும் திறக்கவில்லை', newBadge: 'புதிய பேட்ஜ்', goalDone: 'இலக்கு முடிந்தது!', milestoneHit: 'தொடர் பரிசு தயார்!',
    collectHint: 'ரிவார்ட்ஸில் காயின்ஸ் பெறுங்கள்', gotIt: 'சரி', unlocked: 'திறந்தது', openRewards: 'ரிவார்ட்ஸ் திற',
    dayLetters: ['தி', 'செ', 'பு', 'வி', 'வெ', 'ச', 'ஞா'],
    b_first: 'முதல் உருட்டு', b_winner: 'வெற்றியாளர்', b_ludo5: 'லூடோ ரசிகர்', b_snakes5: 'ஏணி ஏறி', b_housie3: 'ஹவுஸி வழக்கமானவர்', b_fullhouse: 'ஃபுல் ஹவுஸ் ஹீரோ',
    b_streak3: 'தொடர் வெற்றி', b_streak7: 'வார வீரர்', b_coins200: 'காயின் சேகரிப்பாளர்', b_finds5: 'அதிர்ஷ்டக் கண்', b_week3: 'இலக்கு வெற்றியாளர்',
    bd_first: 'உங்கள் முதல் கேமை முடியுங்கள்', bd_winner: 'ஒரு கேமில் வெல்லுங்கள்', bd_ludo5: '5 லூடோ கேம் விளையாடுங்கள்', bd_snakes5: '5 பரமபதம் கேம் விளையாடுங்கள்', bd_housie3: 'பிக் ஹவுஸியில் 3 முறை சேருங்கள்',
    bd_fullhouse: 'ஃபுல் ஹவுஸ் பரிசு வெல்லுங்கள்', bd_streak3: '3 நாள் தொடர் வையுங்கள்', bd_streak7: '7 நாள் தொடர் வையுங்கள்', bd_coins200: 'கேம்களில் 200 காயின்ஸ் சம்பாதியுங்கள்',
    bd_finds5: '5 லக்கி ஃபைண்ட்ஸ் பாருங்கள்', bd_week3: 'வாரத்தின் 3 இலக்குகளையும் முடியுங்கள்'
  };
  Object.assign(MG.T.en, EN); Object.assign(MG.T.hi, HI); Object.assign(MG.T.ta, TA);

  // ---------- state ----------
  function seed() {
    const di = dayIdx(), days = [0, 0, 0, 0, 0, 0, 0];
    [1, 2].forEach((o) => { if (di - o >= 0) days[di - o] = 1; });
    return {
      streak: { n: 2, best: 2, last: dkey(ago(1)), claimed: [] },
      week: { key: weekKey(), plays: 3, wins: 1, big: 0, pts: 50, claimed: {}, days, allDone: false },
      st: { plays: 7, wins: 2, ludo: 3, snakes: 3, housie: 1, big: 0, full: 0, earned: 60, goalWeeks: 0 },
      badges: ['first', 'winner'], tab: 'goals'
    };
  }
  const R = () => {
    const s = S(); if (!s.rw) { s.rw = seed(); MG.save(); }
    if (s.rw.week.key !== weekKey()) { s.rw.week = { key: weekKey(), plays: 0, wins: 0, big: 0, pts: 0, claimed: {}, days: [0, 0, 0, 0, 0, 0, 0], allDone: false }; MG.save(); }
    return s.rw;
  };
  const effStreak = (rw) => (rw.streak.last === today() || rw.streak.last === dkey(ago(1))) ? rw.streak.n : 0;
  const toClaim = (rw) => MG.REWARD.goals.filter((g) => rw.week[g.id] >= g.n && !rw.week.claimed[g.id]).length + MG.REWARD.streak.filter((m) => effStreak(rw) >= m.d && !rw.streak.claimed.includes(m.d)).length;
  const goalDone = (rw) => MG.REWARD.goals.filter((g) => rw.week[g.id] >= g.n).length;

  // ---------- leaderboard (sample players, steady through the week) ----------
  const NEWP = [
    { id: 'deepa', name: 'Deepa', skin: '#D9A877', hair: '#2B1B24', top: '#2E9E7A' },
    { id: 'farhan', name: 'Farhan', skin: '#C98E62', hair: '#1A1014', top: '#7B1B6A', male: true },
    { id: 'anita', name: 'Anita', skin: '#E0AC80', hair: '#3A2318', top: '#2D7BE5' }
  ];
  const who = (id) => MG.OPPONENTS.find((o) => o.id === id) || NEWP.find((o) => o.id === id);
  const BOTS = [['pinky', 'Surat', 320], ['raju', 'Patna', 285], ['meena', 'Jaipur', 250], ['kavya', 'Madurai', 210], ['arjun', 'Indore', 180], ['imran', 'Lucknow', 150], ['deepa', 'Nagpur', 120], ['farhan', 'Bhopal', 90], ['anita', 'Ranchi', 60]];
  function board(ptsOverride) {
    const k = 0.35 + 0.65 * (dayIdx() + 1) / 7;
    const rows = BOTS.map(([id, city, base]) => ({ who: who(id), name: who(id).name, city, pts: Math.round(base * k / 5) * 5 }));
    rows.push({ me: true, who: MG.ME, name: t('you'), city: MG.ME.city || '', pts: ptsOverride != null ? ptsOverride : R().week.pts });
    rows.sort((a, b) => b.pts - a.pts || (a.me ? -1 : b.me ? 1 : 0));
    rows.forEach((r, i) => { r.rank = i + 1; });
    return rows;
  }
  const myRank = (pts) => board(pts).find((r) => r.me).rank;

  // ---------- coins outside the daily limit ----------
  MG.bonus = function (n, reason) {
    const s = S(); s.coins += n; s.hist.unshift({ t: reason, n, d: Date.now() }); s.hist = s.hist.slice(0, 40); MG.save();
  };

  function checkBadges(rw) {
    const fresh = [];
    BADGES.forEach((b) => { if (!rw.badges.includes(b.id)) { const [c, n] = b.p(rw); if (c >= n) { rw.badges.push(b.id); fresh.push(b.id); } } });
    return fresh;
  }

  // Called once per finished game. Returns what changed so the result screen can show it.
  MG.RW = {
    onGame(r, gained) {
      const rw = R(), P = MG.REWARD.pts, st = rw.st, wk = rw.week, sk = rw.streak;
      const rankBefore = myRank(wk.pts);
      const won = r.kind === 'housie' ? !!(r.mine && r.mine.length) : r.rank === 1;
      let pts = P.finish;
      if (r.kind === 'housie') { (r.mine || []).forEach((p) => { pts += p === 'full' ? P.full : P.prize; }); if (r.big) pts += P.big; }
      else if (r.rank === 1) pts += P.win;
      const prev = { plays: wk.plays, wins: wk.wins, big: wk.big };
      const td = today(); let up = false;
      if (sk.last !== td) { if (sk.last === dkey(ago(1))) sk.n += 1; else { sk.n = 1; sk.claimed = []; } sk.last = td; up = true; }
      sk.best = Math.max(sk.best, sk.n);
      wk.days[dayIdx()] = 1;
      st.plays++; wk.plays++; if (won) { st.wins++; wk.wins++; }
      st[r.kind] = (st[r.kind] || 0) + 1;
      if (r.big) { st.big++; wk.big++; }
      if (r.mine && r.mine.includes('full')) st.full++;
      st.earned += gained || 0; wk.pts += pts;
      const justDone = MG.REWARD.goals.filter((g) => prev[g.id] < g.n && wk[g.id] >= g.n).map((g) => g.id);
      if (!wk.allDone && goalDone(rw) === MG.REWARD.goals.length) { wk.allDone = true; st.goalWeeks++; }
      const newBadges = checkBadges(rw);
      const mile = up ? MG.REWARD.streak.find((m) => m.d === sk.n) : null;
      MG.save();
      return {
        pts, total: wk.pts, rank: myRank(wk.pts), rankBefore, streak: sk.n, up, justDone, mile: mile ? mile.d : 0, newBadges,
        goals: MG.REWARD.goals.map((g) => ({ id: g.id, key: g.key, n: g.n, cur: Math.min(wk[g.id], g.n) }))
      };
    },
    strip() {
      const rw = R(), sk = effStreak(rw);
      return `<button class="rwstrip anim" data-a="go" data-v="rewards" aria-label="${t('rewards')}">
        <span>🔥 <b>${sk}</b> ${t('dayWord')}</span><span>🎯 <b>${goalDone(rw)}/${MG.REWARD.goals.length}</b></span><span>🏅 <b>${rw.badges.length}/${BADGES.length}</b></span><span>🏆 <b>#${myRank()}</b></span><i>›</i></button>`;
    },
    resultCard() {
      const r = MG.lastResult; if (!r || !r.rw) return '';
      const w = r.rw;
      const up = w.rank < w.rankBefore ? ` <span class="rwup">▲ ${w.rankBefore - w.rank}</span>` : '';
      const bars = w.goals.map((g) => `<div class="col" style="gap:4px"><div class="row" style="justify-content:space-between;font-size:12.5px"><span>${f(g.key, { n: g.n })}</span><b>${g.cur}/${g.n}</b></div><div class="rwbar"><i style="width:${g.cur / g.n * 100}%"></i></div></div>`).join('');
      const hints = [];
      if (w.justDone.length) hints.push(`🎯 ${t('goalDone')} ${t('collectHint')}`);
      if (w.mile) hints.push(`🔥 ${t('milestoneHit')} ${t('collectHint')}`);
      const nb = w.newBadges.map((id) => { const b = BADGES.find((x) => x.id === id); return `<div class="rwnew">${disc(b, true, 44)}<span class="col" style="gap:1px;text-align:left"><small style="opacity:.8;font-weight:800;letter-spacing:.06em;text-transform:uppercase;font-size:10.5px">${t('newBadge')}</small><b style="font-size:15px">${t('b_' + id)}</b></span></div>`; }).join('');
      return `<div style="padding:16px 12px 0"><div class="gcardw rwres">
        ${nb}
        <div class="row" style="justify-content:space-between;font-size:14px"><b>+${w.pts} ${t('pts')}</b><span>🏆 ${t('rankWord')} <b>#${w.rank}</b>${up}</span><span>🔥 <b>${w.streak}</b> ${t('dayStreak')}</span></div>
        ${bars}
        ${hints.map((h) => `<div style="font-size:12.5px;font-weight:700;background:rgba(255,215,0,.16);border-radius:10px;padding:7px 10px">${h}</div>`).join('')}
        <button class="btn sm" data-a="go" data-v="rewards" style="align-self:flex-start;background:rgba(255,255,255,.18)">${t('openRewards')} ›</button>
      </div></div>`;
    }
  };

  const disc = (b, got, s) => `<span class="rwdisc${got ? '' : ' lock'}" style="--s:${s}px;--c1:${b.c[0]};--c2:${b.c[1]}"><i>${b.ico}</i></span>`;

  // ---------- rewards screen ----------
  function goalsTab(rw) {
    const sk = effStreak(rw), letters = t('dayLetters'), di = dayIdx();
    const dots = letters.map((l, i) => `<span class="rwday${rw.week.days[i] ? ' on' : ''}${i === di ? ' now' : ''}"><i>${rw.week.days[i] ? '🔥' : ''}</i><small>${l}</small></span>`).join('');
    const ms = MG.REWARD.streak.map((m) => {
      const reached = sk >= m.d, got = rw.streak.claimed.includes(m.d);
      const act = got ? `<span class="rwdone">✓ ${t('collected')}</span>` : reached ? `<button class="rwclaim" data-a="claimstreak" data-v="${m.d}">${t('collect')} +${m.coins}</button>` : `<span class="rwlock"><span class="coin">₹</span> +${m.coins}</span>`;
      return `<div class="rwm${got ? ' ok' : ''}"><b>${m.d} ${t('dayWord')}</b>${act}</div>`;
    }).join('');
    const goals = MG.REWARD.goals.map((g) => {
      const cur = Math.min(rw.week[g.id], g.n), done = cur >= g.n, got = rw.week.claimed[g.id];
      const act = got ? `<span class="rwdone">✓ ${t('collected')}</span>` : done ? `<button class="rwclaim" data-a="claimgoal" data-v="${g.id}">${t('collect')} +${g.coins}</button>` : `<span class="rwlock"><span class="coin">₹</span> +${g.coins}</span>`;
      return `<div class="rwgoal"><div class="row" style="justify-content:space-between;gap:8px"><b style="font-size:14px">${f(g.key, { n: g.n })}</b>${act}</div>
        <div class="row" style="gap:8px"><div class="rwbar" style="flex:1"><i style="width:${cur / g.n * 100}%"></i></div><small style="font-weight:800;min-width:34px;text-align:right">${cur}/${g.n}</small></div></div>`;
    }).join('');
    return `<div class="gcardw col" style="gap:10px">
        <div class="row" style="justify-content:space-between;align-items:center"><div class="row" style="gap:8px"><span style="font-size:30px;line-height:1">🔥</span><div class="col"><b style="font-family:var(--display);font-size:26px;line-height:1">${sk} ${t('dayStreak')}</b><small style="opacity:.8">${t('streakHow')}</small></div></div></div>
        <div class="rwdays">${dots}</div>
        <b style="font-size:13px;margin-top:2px">${t('streakRewards')}</b><div class="rwms">${ms}</div>
      </div>
      <div class="gcardw col" style="gap:2px">
        <div class="row" style="justify-content:space-between;margin-bottom:4px"><b style="font-size:15px">${t('weekGoals')}</b><small style="opacity:.8">${f('resetsIn', { n: 7 - di })}</small></div>
        ${goals}
        <small style="opacity:.75;padding-top:8px;line-height:1.4">${t('bonusNote')}</small>
      </div>`;
  }
  function badgesTab(rw) {
    return `<div class="rwbadges">${BADGES.map((b) => {
      const got = rw.badges.includes(b.id), [c, n] = b.p(rw);
      return `<button class="rwbadge" data-a="openbadge" data-v="${b.id}" aria-label="${t('b_' + b.id)}">${disc(b, got, 62)}<b>${t('b_' + b.id)}</b><small>${got ? '✓ ' + t('unlocked') : Math.min(c, n) + '/' + n}</small></button>`;
    }).join('')}</div>`;
  }
  function boardTab(rw) {
    const B = board(), me = B.find((x) => x.me), above = B[me.rank - 2];
    const tip = above ? f('toPass', { n: above.pts - me.pts, name: above.name }) : t('topSpot');
    return `<div class="gcardw col" style="gap:10px">
        <div class="row" style="justify-content:space-between"><b style="font-size:15px">${t('weekBoard')}</b><small style="opacity:.8">${f('resetsIn', { n: 7 - dayIdx() })}</small></div>
        <div class="rwme"><span>🏆 ${t('rankWord')} <b>#${me.rank}</b></span><span>${tip}</span></div>
        <div class="col" style="gap:6px">${B.map((r) => `<div class="rwrow${r.me ? ' me' : ''}"><b class="r">${r.rank <= 3 ? ['🥇', '🥈', '🥉'][r.rank - 1] : r.rank}</b>${MG.face(r.who, 34)}<span class="nm"><b>${r.name}</b>${r.city ? `<small>${r.city}</small>` : ''}</span><span class="pt"><b>${r.pts}</b><small>${t('pts')}</small></span></div>`).join('')}</div>
        <small style="opacity:.75;line-height:1.4">${t('earnPts')}</small>
      </div>`;
  }
  MG.screens.rewards = function () {
    const rw = R(), tab = rw.tab || 'goals', B = board(), me = B.find((x) => x.me);
    const tile = (ico, v, l) => `<div class="rwtile"><span>${ico}</span><b>${v}</b><small>${l}</small></div>`;
    return `<div class="gscreen gbg"><div class="sparkle"></div>
      <div class="gtop" style="padding-top:12px"><button class="ib" data-a="back" aria-label="Back">${MG.icon.back}</button><h1>${t('rewards')}</h1>${MG.coinPill(true)}</div>
      <div class="scroll" style="padding:0 14px 18px;display:flex;flex-direction:column;gap:12px;position:relative">
        <div class="rwwallet anim"><div class="row" style="justify-content:space-between;align-items:flex-end"><div class="col"><small>${t('walletTitle')}</small><span class="big"><span data-coins>${S().coins}</span></span><b style="font-size:13px">= ₹${MG.coinsToRs(S().coins)} ${t('offOrder')}</b></div><button class="btn sm" data-a="go" data-v="coins" style="background:#5B1062">${t('history')} ›</button></div>
          <div><div class="row" style="justify-content:space-between;font-size:12px;font-weight:800;margin-bottom:4px"><span>${t('coinsToday')}</span><span data-cointoday>${S().coinToday}/${MG.COIN.dailyCap}</span></div><div class="progressbar"><span data-coinbar style="width:${Math.min(100, S().coinToday / MG.COIN.dailyCap * 100)}%"></span></div></div></div>
        <div class="rwtiles">${tile('🔥', effStreak(rw), t('streakWord'))}${tile('🎯', goalDone(rw) + '/' + MG.REWARD.goals.length, t('goals'))}${tile('🏅', rw.badges.length + '/' + BADGES.length, t('badges'))}${tile('🏆', '#' + me.rank, t('rankWord'))}</div>
        <div class="rwtabs" role="tablist">${[['goals', 'goals'], ['badges', 'badges'], ['board', 'board']].map(([id, k]) => `<button role="tab" data-a="rwtab" data-v="${id}" aria-selected="${tab === id}">${t(k)}${id === 'goals' && toClaim(rw) ? `<em class="rwdot">${toClaim(rw)}</em>` : ''}</button>`).join('')}</div>
        ${tab === 'badges' ? badgesTab(rw) : tab === 'board' ? boardTab(rw) : goalsTab(rw)}
        <small style="opacity:.7;line-height:1.45;padding:0 2px">${t('sampleNote')}</small>
      </div></div>`;
  };

  // ---------- actions ----------
  function collect(el, n, reason) {
    MG.bonus(n, reason);
    if (el) { el.disabled = true; el.textContent = '✓ ' + t('collected'); const l = MG.local(el); MG.coinBurst({ x: l.x + l.w / 2, y: l.y + l.h / 2 }, n); MG.sfx && MG.sfx('coin'); }
    setTimeout(() => { if (S().screen === 'rewards') MG.render(); }, 1100);
  }
  MG.actions.rwtab = (v) => { R().tab = v; MG.save(); MG.render(); };
  MG.actions.claimgoal = (v, el) => {
    const rw = R(), g = MG.REWARD.goals.find((x) => x.id === v); if (!g || rw.week[g.id] < g.n || rw.week.claimed[g.id]) return;
    rw.week.claimed[g.id] = true; collect(el, g.coins, 'Weekly goal: ' + MG.T.en[g.key].replace('{n}', g.n));
  };
  MG.actions.claimstreak = (v, el) => {
    const rw = R(), d = Number(v), m = MG.REWARD.streak.find((x) => x.d === d); if (!m || effStreak(rw) < d || rw.streak.claimed.includes(d)) return;
    rw.streak.claimed.push(d); collect(el, m.coins, d + ' day streak reward');
  };
  MG.actions.openbadge = (id) => {
    const b = BADGES.find((x) => x.id === id), rw = R(); if (!b) return;
    const [c, n] = b.p(rw), got = rw.badges.includes(id), cur = Math.min(c, n);
    MG.openLayer(`<div class="sheetwrap center" data-a="preclose"><div class="modal" data-stop>
      ${disc(b, got, 96)}
      <b style="font-size:20px">${t('b_' + id)}</b><span style="color:var(--muted);font-size:14px">${t('bd_' + id)}</span>
      ${got ? `<span class="rwtag">✓ ${t('unlocked')}</span>` : `<div class="col" style="gap:6px;width:100%"><div class="rwbar lt"><i style="width:${cur / n * 100}%"></i></div><small style="color:var(--muted);font-weight:800">${cur}/${n} · ${t('badgeLocked')}</small></div>`}
      <button class="btn" data-a="preclose">${t('gotIt')}</button></div></div>`);
  };
})(window.MG);
