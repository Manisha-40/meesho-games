/* Illustrations: products, people, game art, icons. All drawn in SVG, nothing copied. */
(function (MG) {
  let uid = 0;
  const id = () => 'a' + (++uid);
  function mix(hex, t, to) {
    const h = hex.replace('#', ''); const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const a = [0, 2, 4].map((i) => parseInt(f.substr(i, 2), 16));
    const b = to === 'black' ? [20, 10, 20] : [255, 255, 255];
    return '#' + a.map((c, i) => Math.round(c + (b[i] - c) * t).toString(16).padStart(2, '0')).join('');
  }
  MG.mix = mix;
  const L = (c, t) => mix(c, t, 'white'), D = (c, t) => mix(c, t, 'black');

  // ---------- products ----------
  function shapes(type, c1, c2, g) {
    const grad = `url(#${g}m)`, acc = c2, hi = L(c1, .35), sh = D(c1, .25);
    const S = {
      kurta: `<path d="M38 26l14-8h16l14 8 18 24-12 9-9-10v70H41V49l-9 10-12-9z" fill="${grad}"/><path d="M52 18q8 10 16 0v10q-8 6-16 0z" fill="${sh}"/><path d="M60 28v36" stroke="${acc}" stroke-width="2.4" stroke-dasharray="3 3"/>${[0, 1, 2, 3, 4].map((i) => `<circle cx="${48 + i * 6}" cy="${96 + (i % 2) * 6}" r="2.2" fill="${acc}"/>`).join('')}<path d="M41 112h38" stroke="${acc}" stroke-width="5"/><path d="M44 50l6 60" stroke="${hi}" stroke-width="3" opacity=".5"/>`,
      lehenga: `<path d="M47 18h26l4 26H43z" fill="${acc}"/><path d="M43 44h34l26 74H17z" fill="${grad}"/><path d="M17 116h86" stroke="${acc}" stroke-width="6"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${30 + i * 10}" cy="${100 - (i % 2) * 8}" r="2.4" fill="#fff" opacity=".9"/>`).join('')}<path d="M43 44l-6 30" stroke="${hi}" stroke-width="3" opacity=".5"/>`,
      saree: `<path d="M36 14h46l10 104H28z" fill="${grad}"/><path d="M82 14l-52 70 9 8 52-62z" fill="${acc}"/><path d="M28 110h64" stroke="${acc}" stroke-width="7"/>${[0, 1, 2, 3].map((i) => `<path d="M${40 + i * 12} 60l4 6-4 6-4-6z" fill="${acc}" opacity=".85"/>`).join('')}<path d="M40 20l-6 90" stroke="${hi}" stroke-width="3" opacity=".45"/>`,
      teddy: `<circle cx="38" cy="34" r="12" fill="${c1}"/><circle cx="82" cy="34" r="12" fill="${c1}"/><circle cx="38" cy="34" r="6" fill="${acc}"/><circle cx="82" cy="34" r="6" fill="${acc}"/><ellipse cx="60" cy="88" rx="30" ry="30" fill="${grad}"/><circle cx="60" cy="48" r="24" fill="${grad}"/><ellipse cx="60" cy="56" rx="10" ry="8" fill="${acc}"/><circle cx="51" cy="44" r="3" fill="#2B1B24"/><circle cx="69" cy="44" r="3" fill="#2B1B24"/><ellipse cx="60" cy="53" rx="3.5" ry="2.5" fill="#2B1B24"/><ellipse cx="60" cy="92" rx="16" ry="14" fill="${acc}"/><circle cx="34" cy="110" r="10" fill="${c1}"/><circle cx="86" cy="110" r="10" fill="${c1}"/><path d="M50 70q10 6 20 0" stroke="#E53935" stroke-width="5" fill="none"/>`,
      frock: `<path d="M48 18h24l4 26 30 70H14l30-70z" fill="${grad}"/><path d="M44 44h32" stroke="#fff" stroke-width="5"/><circle cx="60" cy="31" r="3" fill="#fff"/>${[0, 1, 2, 3, 4].map((i) => `<circle cx="${32 + i * 14}" cy="${96 + (i % 2) * 6}" r="4" fill="${acc}"/>`).join('')}<path d="M14 114h92" stroke="#fff" stroke-width="3" stroke-dasharray="4 3"/>`,
      car: `<path d="M18 84l10-22q4-8 14-8h36q10 0 14 8l10 22v16H18z" fill="${grad}"/><path d="M36 58h48l8 18H28z" fill="#BFE6FF"/><path d="M60 58v18" stroke="${c1}" stroke-width="4"/><circle cx="38" cy="102" r="11" fill="#2B2B38"/><circle cx="82" cy="102" r="11" fill="#2B2B38"/><circle cx="38" cy="102" r="4" fill="#ccc"/><circle cx="82" cy="102" r="4" fill="#ccc"/><rect x="92" y="80" width="10" height="6" rx="2" fill="${acc}"/><path d="M26 76h10" stroke="${acc}" stroke-width="4"/>`,
      dress: `<path d="M48 16h24l2 14 10 4-6 14 20 66H22l20-66-6-14 10-4z" fill="${grad}"/><path d="M42 48h36" stroke="${acc}" stroke-width="4"/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${34 + i * 10}" cy="${70 + (i * 13) % 34}" r="3" fill="#fff" opacity=".85"/>`).join('')}`,
      jeans: `<path d="M38 14h44l8 104H66l-6-66-6 66H30z" fill="${grad}"/><path d="M38 24h44" stroke="${acc}" stroke-width="2.5"/><path d="M60 24v20" stroke="${acc}" stroke-width="2"/><path d="M42 30q6 8 0 16M78 30q-6 8 0 16" stroke="${acc}" stroke-width="2" fill="none"/>`,
      shirt: `<path d="M36 26l14-8 10 8 10-8 14 8 16 22-12 8-8-8v66H40V50l-8 8-12-8z" fill="${grad}"/><path d="M50 18l10 14 10-14" fill="${sh}"/><path d="M60 32v80" stroke="${acc}" stroke-width="2"/>${[0, 1, 2, 3, 4].map((i) => `<circle cx="60" cy="${42 + i * 15}" r="1.8" fill="#fff"/>`).join('')}<path d="M42 40l36 50M42 60l30 40M50 40l28 40" stroke="${acc}" stroke-width="2.4" opacity=".6"/>`,
      mkurta: `<path d="M38 24l14-8h16l14 8 16 22-12 8-8-8v72H42V46l-8 8-12-8z" fill="${grad}"/><path d="M60 18v34" stroke="${acc}" stroke-width="2.5"/><path d="M42 106h36" stroke="${acc}" stroke-width="4"/><path d="M50 18h20v8H50z" fill="${sh}"/>`,
      diya: [0, 1, 2].map((i) => { const x = 18 + i * 32; return `<path d="M${x} 86q14 18 28 0z" fill="${grad}"/><path d="M${x + 2} 86h24" stroke="${acc}" stroke-width="2"/><path d="M${x + 14} 82q-8-12 0-26q8 14 0 26z" fill="#FF7A00"/><path d="M${x + 14} 80q-4-7 0-14q4 7 0 14z" fill="#FFE27A"/>`; }).join('') + `<ellipse cx="60" cy="58" rx="46" ry="34" fill="#FFB400" opacity=".18"/>`,
      lights: `<path d="M8 40q26 30 52 0t52 0" stroke="#4A3A2A" stroke-width="2" fill="none"/><path d="M8 80q26 30 52 0t52 0" stroke="#4A3A2A" stroke-width="2" fill="none"/>` + [0, 1, 2, 3, 4, 5, 6].map((i) => { const x = 12 + i * 16; const y1 = 40 + Math.sin(i * 0.9) * 10 + 6; return `<circle cx="${x}" cy="${y1}" r="5" fill="${i % 2 ? c1 : '#FFE27A'}"/><circle cx="${x}" cy="${y1 + 40}" r="5" fill="${i % 2 ? '#FFE27A' : c1}"/><circle cx="${x}" cy="${y1}" r="10" fill="#FFD15C" opacity=".25"/>`; }).join(''),
      decor: `<circle cx="60" cy="64" r="44" fill="${grad}"/><circle cx="60" cy="64" r="30" fill="${acc}"/><circle cx="60" cy="64" r="14" fill="#E9F4FF"/><circle cx="56" cy="60" r="5" fill="#fff"/>` + Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<circle cx="${60 + 37 * Math.cos(a)}" cy="${64 + 37 * Math.sin(a)}" r="4" fill="#E9F4FF" stroke="#fff"/>`; }).join(''),
      cushion: `<rect x="18" y="26" width="84" height="76" rx="18" fill="${grad}"/><rect x="30" y="38" width="60" height="52" rx="10" fill="none" stroke="${acc}" stroke-width="3" stroke-dasharray="5 4"/><path d="M60 46l8 18-8 18-8-18z" fill="${acc}"/><circle cx="18" cy="26" r="5" fill="${acc}"/><circle cx="102" cy="26" r="5" fill="${acc}"/><circle cx="18" cy="102" r="5" fill="${acc}"/><circle cx="102" cy="102" r="5" fill="${acc}"/>`,
      pan: `<ellipse cx="54" cy="70" rx="40" ry="38" fill="${grad}"/><ellipse cx="54" cy="70" rx="31" ry="29" fill="${D(c1, .3)}"/><ellipse cx="44" cy="58" rx="10" ry="6" fill="#fff" opacity=".18"/><rect x="88" y="62" width="30" height="13" rx="6.5" fill="${acc}"/>`,
      tiffin: `<rect x="34" y="38" width="52" height="22" rx="8" fill="${grad}"/><rect x="34" y="62" width="52" height="22" rx="8" fill="${grad}"/><rect x="34" y="86" width="52" height="22" rx="8" fill="${grad}"/><path d="M40 38V24q20-14 40 0v14" stroke="${acc}" stroke-width="5" fill="none"/><path d="M40 48h40M40 72h40M40 96h40" stroke="#fff" stroke-width="2" opacity=".5"/>`,
      lipstick: [0, 1, 2, 3].map((i) => { const x = 18 + i * 22; const col = ['#C2185B', '#E91E63', '#8C0A14', '#D9573F'][i]; return `<rect x="${x}" y="64" width="16" height="50" rx="3" fill="#2B2B38"/><rect x="${x}" y="58" width="16" height="10" rx="2" fill="#D9A520"/><path d="M${x + 1} 58v-20l14-10v30z" fill="${col}"/>`; }).join(''),
      bottle: `<rect x="48" y="14" width="24" height="18" rx="4" fill="#2B2B38"/><rect x="40" y="32" width="40" height="84" rx="12" fill="${grad}"/><rect x="46" y="58" width="28" height="34" rx="5" fill="#fff" opacity=".9"/><path d="M52 66h16M52 74h12M52 82h14" stroke="${c1}" stroke-width="2.5"/><rect x="44" y="36" width="5" height="70" rx="2.5" fill="#fff" opacity=".35"/>`,
      jhumka: [36, 84].map((x) => `<circle cx="${x}" cy="24" r="6" fill="${grad}"/><path d="M${x} 30v8" stroke="${c1}" stroke-width="3"/><path d="M${x - 16} 62a16 16 0 0 1 32 0l-4 18H${x - 12}z" fill="${grad}"/>${[-10, -5, 0, 5, 10].map((d) => `<circle cx="${x + d}" cy="${86 + Math.abs(d) * .3}" r="3" fill="${acc}"/>`).join('')}<circle cx="${x}" cy="54" r="4" fill="${acc}"/>`).join(''),
      necklace: `<path d="M24 24q36 76 72 0" stroke="${grad}" stroke-width="12" fill="none" stroke-linecap="round"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => { const t = i / 6; const x = 24 + 72 * t; const y = 24 + 4 * 38 * t * (1 - t) * 1.0 * 1.0 + 0; return `<circle cx="${x}" cy="${y + 8}" r="4" fill="${acc}"/>`; }).join('')}<path d="M60 70l12 14-12 18-12-18z" fill="${acc}" stroke="${c1}" stroke-width="4"/>`,
      bangles: [0, 1, 2, 3, 4].map((i) => `<ellipse cx="60" cy="${50 + i * 9}" rx="40" ry="14" fill="none" stroke="${i % 2 ? acc : c1}" stroke-width="6"/>`).join('') + `<ellipse cx="60" cy="50" rx="40" ry="14" fill="none" stroke="#fff" stroke-width="1.5" opacity=".6"/>`,
      jutti: `<path d="M14 84q10-30 44-30h24q26 0 26 22v10H14z" fill="${grad}"/><path d="M14 94h94" stroke="${D(c1, .35)}" stroke-width="7" stroke-linecap="round"/><path d="M30 76q20-14 40-8" stroke="${acc}" stroke-width="3" fill="none"/>${[0, 1, 2, 3].map((i) => `<circle cx="${44 + i * 10}" cy="${70 - i}" r="2.4" fill="${acc}"/>`).join('')}<path d="M100 58q10-10 4-22" stroke="${acc}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      heels: `<path d="M18 74q24-28 58-22l24 6v18H74l-4 30h-10l2-30H18z" fill="${grad}"/><path d="M40 60q14-8 28-4" stroke="${acc}" stroke-width="4" fill="none"/>`,
      sneaker: `<path d="M12 84q4-34 34-34l18 12h24q22 0 22 20v8H12z" fill="${grad}"/><path d="M12 92h98" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M12 98h98" stroke="${D(c1, .3)}" stroke-width="3"/><path d="M48 60l8 10M58 58l8 10M68 58l6 10" stroke="#fff" stroke-width="3"/><path d="M30 70q30 6 56 2" stroke="${acc}" stroke-width="5" fill="none"/>`,
      bag: `<path d="M38 50q0-26 22-26t22 26" stroke="${acc}" stroke-width="5" fill="none"/><rect x="22" y="48" width="76" height="62" rx="12" fill="${grad}"/><rect x="22" y="48" width="76" height="22" rx="10" fill="${D(c1, .15)}"/><rect x="54" y="64" width="12" height="10" rx="2" fill="${acc}"/>`,
      earbuds: `<rect x="26" y="60" width="68" height="46" rx="23" fill="${grad}"/><path d="M26 82h68" stroke="#000" stroke-width="1.5" opacity=".35"/><circle cx="44" cy="44" r="13" fill="#F2F2F6" stroke="${c1}" stroke-width="5"/><circle cx="76" cy="44" r="13" fill="#F2F2F6" stroke="${c1}" stroke-width="5"/><circle cx="60" cy="94" r="3" fill="${acc}"/>`,
      watch: `<rect x="46" y="10" width="28" height="112" rx="13" fill="${D(c1, .1)}"/><rect x="34" y="38" width="52" height="58" rx="14" fill="${grad}" stroke="#555" stroke-width="2"/><rect x="40" y="44" width="40" height="46" rx="9" fill="#0E0E16"/><path d="M46 70h8l4-10 6 20 4-10h8" stroke="${acc}" stroke-width="2.5" fill="none"/><text x="60" y="58" text-anchor="middle" font-size="9" font-weight="700" fill="#fff" font-family="sans-serif">10:08</text>`,
      bedsheet: `<rect x="14" y="40" width="92" height="66" rx="8" fill="${grad}"/><rect x="20" y="30" width="38" height="22" rx="8" fill="#fff"/><rect x="62" y="30" width="38" height="22" rx="8" fill="#fff"/>${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<path d="M${26 + c * 22} ${62 + r * 14}l6 6-6 6-6-6z" fill="${acc}"/>`).join('')).join('')}`,
      lamp: `<path d="M38 24h44l12 44H26z" fill="${grad}"/><path d="M38 24h44" stroke="${acc}" stroke-width="3"/><rect x="57" y="68" width="6" height="36" fill="#8A5A2E"/><rect x="40" y="104" width="40" height="10" rx="5" fill="#8A5A2E"/><ellipse cx="60" cy="72" rx="34" ry="10" fill="#FFD15C" opacity=".35"/>`
    };
    return S[type] || S.kurta;
  }
  MG.prod = function (art, opt = {}) {
    if (art[0] === 'photo') return `<img class="ph" src="${art[1]}" alt="${opt.label || ''}" draggable="false">`;
    const [type, c1, c2] = art; const g = id();
    const bg1 = opt.bg || L(c1, .9), bg2 = L(c1, .74);
    return `<svg viewBox="0 0 120 132" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${opt.label || ''}"><defs>
      <radialGradient id="${g}b" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></radialGradient>
      <linearGradient id="${g}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${L(c1, .22)}"/><stop offset=".55" stop-color="${c1}"/><stop offset="1" stop-color="${D(c1, .22)}"/></linearGradient></defs>
      <rect width="120" height="132" fill="url(#${g}b)"/><ellipse cx="60" cy="122" rx="40" ry="5" fill="#000" opacity=".1"/>
      <g transform="translate(0,4)">${shapes(type, c1, c2, g)}</g></svg>`;
  };

  // ---------- people ----------
  MG.face = function (p, size = 40, ring) {
    const g = id(); const top = p.top || '#9F2089';
    const hair = p.male ? `<path d="M10 17q1-11 10-11t10 11q-3-5-10-5t-10 5z" fill="${p.hair}"/>` : `<path d="M8 20q0-15 12-15t12 15v8q-2 6-4 6V18q-3-5-8-5t-8 5v16q-2 0-4-6z" fill="${p.hair}"/>`;
    return `<svg viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true" style="border-radius:50%;flex-shrink:0;${ring ? `box-shadow:0 0 0 2px #fff,0 0 0 4px ${ring}` : ''}"><defs><radialGradient id="${g}" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="${L(top, .82)}"/><stop offset="1" stop-color="${L(top, .55)}"/></radialGradient></defs>
      <circle cx="20" cy="20" r="20" fill="url(#${g})"/><path d="M6 40q2-12 14-12t14 12z" fill="${top}"/><rect x="17" y="22" width="6" height="6" rx="2" fill="${p.skin}"/><ellipse cx="20" cy="18" rx="8" ry="9" fill="${p.skin}"/>${hair}
      <circle cx="17" cy="18.5" r="1" fill="#2B1B24"/><circle cx="23" cy="18.5" r="1" fill="#2B1B24"/><path d="M17.5 22.5q2.5 2 5 0" stroke="#9A3A2E" stroke-width="1" fill="none" stroke-linecap="round"/>${p.male ? '' : `<circle cx="20" cy="13.5" r=".9" fill="#E21B3C"/>`}</svg>`;
  };

  // ---------- festive bits ----------
  MG.garland = function (w = 390) {
    const n = Math.ceil(w / 26); let s = '';
    for (let i = 0; i < n; i++) {
      const x = i * 26 + 13, y = 8 + Math.sin((i / (n - 1)) * Math.PI) * 10;
      s += `<circle cx="${x}" cy="${y}" r="6.5" fill="${i % 2 ? '#FFB400' : '#FF7A00'}"/><circle cx="${x}" cy="${y}" r="3" fill="${i % 2 ? '#FFD15C' : '#FFA040'}"/>`;
      if (i % 3 === 1) s += `<path d="M${x} ${y + 6}l-4 9 4 6 4-6z" fill="#2E9E4F"/><circle cx="${x}" cy="${y + 22}" r="3" fill="#FFB400"/>`;
    }
    return `<svg class="garland" viewBox="0 0 ${w} 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 Q${w / 2} 30 ${w} 6" stroke="#2E9E4F" stroke-width="2" fill="none"/>${s}</svg>`;
  };

  function pips(n) { return { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] }[n]; }
  MG.diceSvg = function (n, x, y, s, rot = 0) {
    const pp = pips(n).map((k) => `<circle cx="${x + s * (0.25 + (k % 3) * 0.25)}" cy="${y + s * (0.25 + Math.floor(k / 3) * 0.25)}" r="${s * 0.08}" fill="${n === 1 ? '#E21B3C' : '#2B1B2B'}"/>`).join('');
    return `<g transform="rotate(${rot} ${x + s / 2} ${y + s / 2})"><rect x="${x + 2}" y="${y + 4}" width="${s}" height="${s}" rx="${s * .2}" fill="#000" opacity=".25"/><rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${s * .2}" fill="#fff"/>${pp}</g>`;
  };
  MG.pawn = function (x, y, s, col, gid) {
    return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="${s * .46}" rx="${s * .42}" ry="${s * .14}" fill="#000" opacity=".25"/><path d="M${-s * .38} ${s * .42}q0-${s * .5} ${s * .38}-${s * .62}q${s * .38} ${s * .12} ${s * .38} ${s * .62}z" fill="${col}"/><circle cx="0" cy="${-s * .3}" r="${s * .26}" fill="${col}"/><circle cx="${-s * .08}" cy="${-s * .38}" r="${s * .08}" fill="#fff" opacity=".7"/></g>`;
  };

  // Game card art
  MG.ludoArt = function () {
    const c = ['#2EAE5B', '#FFC21A', '#2D7BE5', '#E53935'];
    return `<svg viewBox="0 0 160 118" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="160" height="118" fill="#E53935"/><circle cx="130" cy="20" r="40" fill="#FF6B5B" opacity=".5"/>
      <g transform="translate(36 10) rotate(-8 49 49)"><rect x="-3" y="1" width="104" height="104" rx="10" fill="#000" opacity=".25"/><rect width="98" height="98" rx="8" fill="#fff"/>
      <rect x="4" y="4" width="36" height="36" rx="6" fill="${c[0]}"/><rect x="58" y="4" width="36" height="36" rx="6" fill="${c[1]}"/><rect x="58" y="58" width="36" height="36" rx="6" fill="${c[2]}"/><rect x="4" y="58" width="36" height="36" rx="6" fill="${c[3]}"/>
      ${[[22, 22], [76, 22], [76, 76], [22, 76]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="12" fill="#fff"/>${MG.pawn(x - 5, y - 2, 9, c[i])}${MG.pawn(x + 5, y + 3, 9, c[i])}`).join('')}
      <path d="M40 40h18l-9 9z" fill="${c[1]}"/><path d="M58 40v18l-9-9z" fill="${c[2]}"/><path d="M58 58H40l9-9z" fill="${c[3]}"/><path d="M40 58V40l9 9z" fill="${c[0]}"/></g>
      ${MG.diceSvg(6, 8, 64, 30, -14)}${MG.diceSvg(5, 122, 70, 26, 12)}</svg>`;
  };
  MG.snakesArt = function () {
    const cols = ['#FFD15C', '#FF8FB1', '#9AD9C3', '#B9A4FF', '#8FD3FF'];
    let cells = ''; for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) cells += `<rect x="${c * 23}" y="${r * 24}" width="23" height="24" fill="${cols[(r + c) % 5]}"/>`;
    return `<svg viewBox="0 0 160 118" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${cells}
      <g stroke="#8A5A2E" stroke-width="4" stroke-linecap="round"><path d="M100 110L130 14M116 114L146 18"/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${103 + i * 4.6} ${100 - i * 15}L${119 + i * 4.6} ${104 - i * 15}"/>`).join('')}</g>
      <path d="M20 20q30 0 26 26t28 30q20 6 12 30" stroke="#2EAE5B" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M20 20q30 0 26 26t28 30q20 6 12 30" stroke="#FFD15C" stroke-width="3" stroke-dasharray="2 7" fill="none"/>
      <ellipse cx="18" cy="20" rx="10" ry="8" fill="#2EAE5B"/><circle cx="14" cy="17" r="2.4" fill="#fff"/><circle cx="14" cy="17" r="1.2" fill="#000"/><path d="M8 22l-6 2M8 22l-6-1" stroke="#E21B3C" stroke-width="1.6"/>
      ${MG.pawn(64, 60, 16, '#E53935')}${MG.pawn(78, 66, 16, '#2D7BE5')}${MG.diceSvg(4, 118, 6, 26, 14)}</svg>`;
  };
  MG.housieArt = function () {
    return `<svg viewBox="0 0 160 118" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="160" height="118" fill="#7B1B6A"/><circle cx="20" cy="110" r="50" fill="#9F2089" opacity=".6"/>
      <g transform="translate(14 44) rotate(-6 66 30)"><rect x="2" y="4" width="132" height="62" rx="8" fill="#000" opacity=".25"/><rect width="132" height="62" rx="8" fill="#FFF8E8"/>
      ${[0, 1, 2].map((r) => [0, 1, 2, 3, 4, 5, 6, 7, 8].map((c) => { const has = (r * 3 + c * 7) % 9 < 5; const n = c * 10 + ((r * 3 + c) % 9) + 1; return `<rect x="${5 + c * 13.6}" y="${5 + r * 18.5}" width="12" height="16" rx="2" fill="${has ? '#fff' : '#FBE7C0'}"/>${has ? `<text x="${11 + c * 13.6}" y="${16.5 + r * 18.5}" text-anchor="middle" font-size="7.5" font-weight="800" fill="#3B1B00" font-family="sans-serif">${n}</text>${(r + c) % 3 === 0 ? `<circle cx="${11 + c * 13.6}" cy="${13 + r * 18.5}" r="6" fill="#F43397" opacity=".8"/>` : ''}` : ''}`; }).join('')).join('')}</g>
      <circle cx="122" cy="30" r="24" fill="#FFB400"/><circle cx="116" cy="24" r="8" fill="#fff" opacity=".5"/><text x="122" y="38" text-anchor="middle" font-size="22" font-weight="800" fill="#5A2A00" font-family="sans-serif">88</text></svg>`;
  };
  MG.bannerGames = function () {
    return `<svg viewBox="0 0 390 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="bgG" cx="70%" cy="40%" r="80%"><stop offset="0" stop-color="#B8268F"/><stop offset=".6" stop-color="#6A1470"/><stop offset="1" stop-color="#3B0A3A"/></radialGradient>
      <linearGradient id="goldT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1B0"/><stop offset=".5" stop-color="#FFD15C"/><stop offset="1" stop-color="#E9A300"/></linearGradient></defs>
      <rect width="390" height="250" fill="url(#bgG)"/>${Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 73) % 390}" cy="${(i * 41) % 250}" r="${1 + (i % 3)}" fill="#FFD15C" opacity="${.3 + (i % 4) * .15}"/>`).join('')}
      <g transform="translate(232 40)"><circle cx="70" cy="80" r="86" fill="#FFB400" opacity=".14"/><g transform="rotate(10 70 70)"><rect x="12" y="20" width="110" height="110" rx="12" fill="#fff"/>
      <rect x="16" y="24" width="40" height="40" rx="6" fill="#2EAE5B"/><rect x="78" y="24" width="40" height="40" rx="6" fill="#FFC21A"/><rect x="78" y="86" width="40" height="40" rx="6" fill="#2D7BE5"/><rect x="16" y="86" width="40" height="40" rx="6" fill="#E53935"/>
      <path d="M56 64h22l-11 11z" fill="#FFC21A"/><path d="M78 64v22l-11-11z" fill="#2D7BE5"/><path d="M78 86H56l11-11z" fill="#E53935"/><path d="M56 86V64l11 11z" fill="#2EAE5B"/>
      ${MG.pawn(36, 46, 14, '#fff')}${MG.pawn(98, 108, 14, '#fff')}</g>${MG.diceSvg(6, -20, 112, 44, -16)}${MG.diceSvg(3, 104, 140, 34, 18)}</g>
      <g font-family="'Baloo 2',sans-serif" font-weight="800"><text x="22" y="62" font-size="15" fill="#FFD15C" letter-spacing="2">PLAY, WIN COINS</text>
      <text x="20" y="104" font-size="44" fill="#3B0A3A" opacity=".35">Meesho</text><text x="18" y="101" font-size="44" fill="url(#goldT)">Meesho</text>
      <text x="20" y="146" font-size="44" fill="#3B0A3A" opacity=".35">Games</text><text x="18" y="143" font-size="44" fill="url(#goldT)">Games</text></g>
      <text x="20" y="172" font-family="'Plus Jakarta Sans',sans-serif" font-size="13.5" font-weight="700" fill="#fff">Ludo · Snakes · Housie</text>
      <g transform="translate(20 188)"><rect width="132" height="34" rx="17" fill="#FFB400"/><text x="66" y="22" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="14" font-weight="800" fill="#3B1B00">Play free  ›</text></g></svg>`;
  };
  MG.bannerPhoto = function (img, kicker, title, sub, btn, col) {
    return `<span class="pb" style="background-image:url(${img});--pbc:${col}"><span class="pbt"><small>${kicker}</small><b>${title}</b><em>${sub}</em><i>${btn} ›</i></span></span>`;
  };
  MG.bannerEdit = function (kind) {
    const isW = kind === 'wed';
    const p1 = isW ? ['lehenga', '#C2185B', '#FFC94A'] : ['diya', '#D99A1E', '#FF7A00'];
    const p2 = isW ? ['necklace', '#D9A520', '#B0102A'] : ['lights', '#FFB400', '#7B1B6A'];
    return `<svg viewBox="0 0 390 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="be${kind}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${isW ? '#FFE3EC' : '#FFF1D0'}"/><stop offset="1" stop-color="${isW ? '#FFB3C8' : '#FFC970'}"/></linearGradient></defs>
      <rect width="390" height="250" fill="url(#be${kind})"/><circle cx="300" cy="125" r="110" fill="#fff" opacity=".45"/>
      <g transform="translate(200 40) scale(1.4)">${MG.prod(p1).replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</g>
      <g transform="translate(300 110) scale(.9)">${MG.prod(p2).replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</g>
      <text x="22" y="70" font-family="'Baloo 2',sans-serif" font-size="15" font-weight="800" fill="${isW ? '#9F2089' : '#B04A00'}" letter-spacing="2">${isW ? 'SHAADI SEASON' : 'GHAR KI ROSHNI'}</text>
      <text x="20" y="112" font-family="'Baloo 2',sans-serif" font-size="38" font-weight="800" fill="#3B0A3A">${isW ? 'Wedding' : 'Light up'}</text>
      <text x="20" y="150" font-family="'Baloo 2',sans-serif" font-size="38" font-weight="800" fill="#3B0A3A">${isW ? 'looks' : 'your home'}</text>
      <text x="20" y="176" font-family="'Plus Jakarta Sans',sans-serif" font-size="13.5" font-weight="700" fill="#3B0A3A">${isW ? 'Lehengas, jewellery, juttis' : 'Diyas, lights, wall decor'}</text>
      <g transform="translate(20 190)"><rect width="120" height="32" rx="16" fill="#3B0A3A"/><text x="60" y="21" text-anchor="middle" font-family="'Plus Jakarta Sans',sans-serif" font-size="13.5" font-weight="800" fill="#fff">Shop now  ›</text></g></svg>`;
  };

  MG.icon = {
    back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    heart: (on) => `<svg width="21" height="21" viewBox="0 0 24 24" fill="${on ? '#E21B3C' : 'none'}" stroke="${on ? '#E21B3C' : 'currentColor'}" stroke-width="2" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>`,
    bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    cart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 4h2l2.2 11.5h11L20 8H7"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>',
    search: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>',
    mic: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    cam: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    pin: '<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" fill="#6E8BFF"/><circle cx="12" cy="9" r="2.6" fill="#fff"/></svg>',
    home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z"/></svg>',
    homeOn: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z" fill="#9F2089"/></svg>',
    cats: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 3h12v18H6z"/><path d="M9 3v4h6V3M9 12h6"/></svg>',
    mall: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19V6l4 6 4-6 4 6 4-6v13"/></svg>',
    video: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>',
    orders: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7l8-4 8 4v10l-8 4-8-4z"/><path d="M4 7l8 4 8-4M12 11v10"/></svg>',
    pad: '<svg viewBox="0 0 60 60" aria-hidden="true"><defs><linearGradient id="padg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD15C"/><stop offset="1" stop-color="#FF8A00"/></linearGradient></defs><rect width="60" height="60" fill="#5B1062"/><circle cx="30" cy="30" r="26" fill="#7B1B6A"/><rect x="12" y="20" width="36" height="22" rx="11" fill="url(#padg)"/><path d="M20 27v8M16 31h8" stroke="#5B1062" stroke-width="2.6" stroke-linecap="round"/><circle cx="38" cy="28" r="2.2" fill="#E21B3C"/><circle cx="42" cy="33" r="2.2" fill="#2EAE5B"/><circle cx="34" cy="33" r="2.2" fill="#2D7BE5"/><circle cx="17" cy="14" r="1.5" fill="#FFD15C"/><circle cx="46" cy="12" r="1.2" fill="#fff"/><circle cx="48" cy="48" r="1.6" fill="#FFD15C"/></svg>'
  };
})(window.MG);
