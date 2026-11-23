/* Side panels and shopper personalisation. Nothing is selected until the visitor picks a shopper. */
(function (MG) {
  const img = (id) => MG.BYID[id].art[1];
  const P = [
    { id: 'sunita', name: 'Sunita', full: 'Sunita Devi', age: 40, city: 'Kanpur', tag: 'Shops for the family', lang: 'hi', langName: 'Hindi', col: '#F43397',
      shops: 'Sarees, kurtis and kids wear for the house',
      before: 'I open Meesho about once a week, when something at home runs out',
      after: 'After the kids sleep I play Housie in Hindi, and spot a saree I like',
      exp: 'Something light I can play in Hindi, with no paying and no pushing me to buy',
      gain: ['Big Housie with the family at 7 PM', 'Coins she can use on her next order', 'A lucky find on sarees and kurtis'],
      biz: ['She opens the app on days she is not buying', 'More time looking at sarees and kids wear', 'She comes back for the next Housie'],
      px: { cats: ['kurtis', 'kids', 'home', 'jewellery', 'beauty', 'kitchen', 'men', 'footwear', 'bags', 'gadgets'],
        hurry: 'Housie with the family at 7 PM · <b>double coins</b>', rdSub: 'Picked for Sunita',
        strip: [['p4', 'Sarees'], ['p1', 'Kurtis & Suits'], ['p10', 'Kids Toys'], ['p14', 'Pooja Diyas'], ['p19', 'Beauty']],
        banners: [[img('p5'), 'SHAADI SEASON', 'Sarees for every function', 'Silk, georgette and more', 'kurtis', '#570D48'], [img('p10'), 'FOR THE LITTLE ONES', 'Toys they will love', 'Wooden toys from ₹199', 'kids', '#2E5E8C']] },
      steps: [['Open Meesho Games', 'games'], ['Join Big Housie', 'housie'], ['See streak, goals and badges', 'rewards'], ['Look at her lucky find', 'pdp:p4'], ['Use her coins in the cart', 'cart:p4']] },
    { id: 'pinky', name: 'Ritika', full: 'Ritika Das', age: 22, city: 'Siliguri', tag: 'Installs for sales', lang: 'en', langName: 'English', col: '#2F6FED',
      shops: 'Jewellery, bags and gadgets when a sale is on',
      before: 'I installed Meesho for a sale and have not opened it since',
      after: 'I play a two minute Snakes and Ladders on the way to college and find earrings I want',
      exp: 'A reason to open the app that is not another discount',
      gain: ['Snakes and Ladders in two minutes', 'Coins that add up day by day', 'Jewellery she did not have to search for'],
      biz: ['A quiet user starts opening the app again', 'A sale visit turns into a daily habit', 'She can bring her friends to play'],
      px: { cats: ['jewellery', 'bags', 'gadgets', 'beauty', 'footwear', 'kurtis', 'kids', 'men', 'home', 'kitchen'],
        hurry: 'Two minute Snakes and Ladders · <b>win coins</b>', rdSub: 'Picked for Ritika',
        strip: [['p22', 'Jewellery'], ['p27', 'Bags'], ['p20', 'Makeup'], ['p30', 'Earbuds'], ['p24', 'Bangles']],
        banners: [[img('p21'), 'PARTY READY', 'Jewellery that pops', 'Chokers, necklaces, bangles', 'jewellery', '#7A1F5C'], [img('p29'), 'GADGET DAYS', 'Smart picks under ₹800', 'Watches and earbuds', 'gadgets', '#1E3C8C']] },
      steps: [['Open Meesho Games', 'games'], ['Play Snakes and Ladders', 'snakes'], ['See streak, goals and badges', 'rewards'], ['Look at her lucky find', 'pdp:p22'], ['Use her coins in the cart', 'cart:p22']] },
    { id: 'raju', name: 'Rahul', full: 'Rahul Yadav', age: 27, city: 'Jaipur', tag: 'Plays games at night', lang: 'hi', langName: 'Hindi', col: '#16A37F',
      shops: 'Shoes, earbuds and watches, mostly at night',
      before: 'I play Ludo on another app every evening, and open Meesho only to buy',
      after: 'I play Ludo with friends inside Meesho and see earbuds between games',
      exp: 'Games I like, inside an app I already have, with something to win',
      gain: ['A quick Ludo game against friends', 'Coins from every win', 'Earbuds and shoes shown after each game'],
      biz: ['An evening player stays inside Meesho', 'A second visit in the day, at night', 'Gadgets shown to someone ready to browse'],
      px: { cats: ['men', 'footwear', 'gadgets', 'bags', 'kurtis', 'home', 'kitchen', 'jewellery', 'beauty', 'kids'],
        hurry: 'Ludo night is on · <b>win coins</b>', rdSub: 'Picked for Rahul',
        strip: [['p25', 'Running Shoes'], ['p29', 'Smart Watch'], ['p28', 'Earbuds'], ['p13', 'T-shirts'], ['p26', 'Sneakers']],
        banners: [[img('p29'), 'GAME NIGHT', 'Gear up to play', 'Watches and earbuds', 'gadgets', '#0F5C4A'], [img('p25'), 'RUN IN STYLE', 'Shoes from ₹449', 'Running and casual', 'footwear', '#26323F']] },
      steps: [['Open Meesho Games', 'games'], ['Play a quick Ludo', 'ludo'], ['See streak, goals and badges', 'rewards'], ['Look at his lucky find', 'pdp:p28'], ['Use his coins in the cart', 'cart:p28']] },
    { id: 'lakshmi', name: 'Lakshmi', full: 'Lakshmi Selvam', age: 45, city: 'Madurai', tag: 'Shops for festivals', lang: 'ta', langName: 'Tamil', col: '#FF8A00',
      shops: 'Sarees, diyas and home decor before every festival',
      before: 'I shop in one big burst before each festival, and not much in between',
      after: 'I play Big Housie in Tamil every evening, and the festive banners keep me coming back',
      exp: 'A festive feel in my own language, like the show we all watch together',
      gain: ['Big Housie four times a day in Tamil', 'Festive banners for what she shops', 'Coins towards diyas and decor'],
      biz: ['One festival visit becomes many visits', 'A Tamil user becomes an everyday user', 'Sarees and decor sell through the season'],
      px: { cats: ['home', 'kurtis', 'jewellery', 'kitchen', 'kids', 'beauty', 'men', 'footwear', 'bags', 'gadgets'],
        hurry: 'Big Housie in Tamil · <b>double coins</b>', rdSub: 'Picked for Lakshmi',
        strip: [['p14', 'Diyas'], ['p16', 'Deepam Lamp'], ['p4', 'Silk Sarees'], ['p23', 'Bangles'], ['p18', 'Kitchen']],
        banners: [[img('p14'), 'DEEPAVALI SEASON', 'Light up your home', 'Diyas, lamps and more', 'home', '#7A2E00'], [img('p4'), 'KANJEEVARAM', 'Silk sarees for the season', 'Sarees from ₹549', 'kurtis', '#570D48']] },
      steps: [['Open Meesho Games', 'games'], ['Join Big Housie', 'housie'], ['See streak, goals and badges', 'rewards'], ['Look at her lucky find', 'pdp:p14'], ['Use her coins in the cart', 'cart:p14']] }
  ];
  const DEFAULT = { cats: ['kurtis', 'jewellery', 'kids', 'men', 'home', 'beauty', 'footwear', 'bags', 'gadgets'], hurry: 'Big Housie four times a day · <b>double coins</b>', rdSub: 'Picked for you',
    strip: [['p4', 'Sarees'], ['p1', 'Kurtis & Suits'], ['p11', 'Men Fashion'], ['p25', 'Footwear'], ['p14', 'Home']],
    banners: [[img('p5'), 'SHAADI SEASON', 'Wedding looks', 'Lehengas, sarees, jewellery', 'kurtis', '#570D48'], [img('p14'), 'FESTIVE HOME', 'Light up your home', 'Diyas, lamps and more', 'home', '#7A2E00']] };
  const $ = (id) => document.getElementById(id);
  const li = (a) => a.map((x) => `<li>${x}</li>`).join('');
  let cur = null, done = {};
  MG.PX = () => { const p = P.find((x) => x.id === cur); return p ? p.px : DEFAULT; };
  const person = (p) => MG.OPPONENTS.find((x) => x.id === p.id) || MG.ME;

  function left() {
    $('who').innerHTML = P.map((q) => `<button class="pp${q.id === cur ? ' on' : ''}" data-p="${q.id}" style="--c:${q.col}"><span class="av">${MG.face(person(q), 48)}</span><span class="pt"><b>${q.full}</b><small>${q.age}, ${q.city}</small><i>${q.tag}</i></span></button>`).join('');
    const p = P.find((x) => x.id === cur);
    $('profile').innerHTML = p ? `<small>What ${p.name} shops</small><b>${p.shops}</b><small>Phone language</small><b>${p.langName}</b>` : `<small>Start here</small><b>Tap any shopper and the phone switches on, in their language, with their kind of products</b>`;
  }
  function right() {
    const p = P.find((x) => x.id === cur), r = document.querySelector('.side.right');
    r.classList.toggle('empty', !p);
    if (!p) { $('rbody').innerHTML = `<div class="ghost"><b>Waiting for you</b><span>Pick a shopper and this side shows what they expect, what they get and what Meesho gets</span></div>`; return; }
    $('rbody').innerHTML = `<div class="rhead"><span class="av">${MG.face(person(p), 56)}</span><div><small>Following</small><b>${p.full}</b><em>${p.age}, ${p.city}</em></div></div>
      <section class="card ba"><div class="bf"><small>Before Meesho Games</small><p>${p.before}</p></div><span>›</span><div class="af"><small>With Meesho Games</small><p>${p.after}</p></div></section>
      <section class="card exp"><h2>What ${p.name} expects</h2><p class="q">“${p.exp}”</p></section>
      <div class="two"><section class="card gain"><h2>What ${p.name} gains</h2><ul>${li(p.gain)}</ul></section><section class="card biz"><h2>What Meesho gains</h2><ul>${li(p.biz)}</ul></section></div>
      <section class="card flow"><h2>${p.name}'s flow, tap a step to play it</h2><div class="pbar"><i id="pfill"></i></div><div id="steps"></div></section>`;
    steps();
  }
  function steps() {
    const p = P.find((x) => x.id === cur); if (!p) return; const d = done[cur] || {};
    let nxt = p.steps.findIndex((_, i) => !d[i]);
    $('steps').innerHTML = p.steps.map((s, i) => `<button class="st${d[i] ? ' ok' : ''}${i === nxt ? ' next' : ''}" data-s="${i}"><span class="n">${d[i] ? '✓' : i + 1}</span>${s[0]}<i>${d[i] ? 'Again' : (i === nxt ? 'Next up' : 'Play')} ›</i></button>`).join('');
    $('pfill').style.width = (Object.keys(d).length / p.steps.length * 100) + '%';
  }
  function coach(on) {
    let c = $('coach');
    if (!on) { if (c) c.remove(); return; }
    if (!c) { c = document.createElement('div'); c.id = 'coach'; $('phone').appendChild(c); }
    c.innerHTML = '<b>Tap Meesho Games to start</b><i></i>';
  }
  function run(spec) {
    const [k, id] = spec.split(':');
    coach(false); MG.closeLayer(); MG.G = null;
    if (k === 'games') MG.go('games');
    else if (k === 'rewards') MG.go('rewards');
    else if (k === 'pdp') MG.go('pdp', { id });
    else if (k === 'cart') { if (!MG.S.cart.includes(id)) MG.S.cart.push(id); MG.save(); MG.go('cart'); }
    else if (k === 'housie') MG.actions.bighousie();
    else MG.actions.pregame(k);
  }
  function pick(id) {
    cur = id; const p = P.find((x) => x.id === id), o = person(p);
    Object.assign(MG.ME, { name: p.name, skin: o.skin, hair: o.hair, top: o.top, city: p.city });
    MG.S.rw = null;
    MG.S.lang = p.lang; MG.S.cart = []; MG.S.views = {}; MG.save();
    document.body.style.setProperty('--glow', p.col);
    document.body.classList.add('on'); $('standby').classList.add('off');
    MG.closeLayer(); MG.G = null; MG.S.stack = []; MG.go('home');
    left(); right();
    setTimeout(() => coach(true), 600);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-p]'); if (a) return pick(a.dataset.p);
    const s = e.target.closest('[data-s]'); if (s) {
      const p = P.find((x) => x.id === cur), i = +s.dataset.s;
      (done[cur] = done[cur] || {})[i] = 1; run(p.steps[i][1]); steps();
    }
    if (e.target.closest('#phone') && $('coach')) coach(false);
  });
  document.addEventListener('scroll', () => { if ($('coach')) coach(false); }, true);
  MG.afterReset = () => { done = {}; cur = null; document.body.classList.remove('on'); $('standby').classList.remove('off'); coach(false); MG.S.lang = 'en'; MG.save(); MG.closeLayer(); MG.go('home'); left(); right(); };
  MG.S.lang = 'en'; MG.save(); left(); right();
})(window.MG);
