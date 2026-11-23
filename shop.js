/* The Meesho shell: home, categories, mall, video, orders, product page, cart, coins. */
(function (MG) {
  const S = () => MG.S, t = (k) => MG.t(k), I = MG.icon;
  const coinPill = (dark) => `<button class="coinpill" data-a="go" data-v="coins" data-coinpill aria-label="Meesho coins" style="${dark ? 'background:rgba(255,255,255,.16);color:#fff' : ''}"><span class="coin">₹</span><span data-coins>${S().coins}</span> ${t('coins')}</button>`;
  MG.coinPill = coinPill;
  MG.nav = function () {
    const cur = S().screen;
    const items = [['home', 'Home', I.home], ['categories', 'Categories', I.cats], ['mall', 'Mall', I.mall], ['video', 'Video Finds', I.video], ['orders', 'My Orders', I.orders]];
    return `<nav class="nav" aria-label="Main">${items.map(([id, l, ic]) => `<button data-a="go" data-v="${id}" ${cur === id ? 'aria-current="page"' : ''}>${cur === id && id === 'home' ? I.homeOn : ic}${l}</button>`).join('')}</nav>`;
  };
  const pc = (p) => `<div class="pc" role="button" tabindex="0" data-a="pdp" data-v="${p.id}" aria-label="${p.name}, ₹${p.price}">
    <div class="im">${MG.prod(p.art, { label: p.name })}</div>
    <button class="heart" data-a="wish" data-v="${p.id}" aria-label="Wishlist">${I.heart(!!S().wish[p.id])}</button>
    <div class="bd"><span class="nm">${p.mall ? '<span class="mall">Mall</span> ' : ''}${p.name}</span><span class="pr"><b>₹${p.price}</b><s>₹${p.mrp}</s><span class="off">${MG.off(p)}% off</span></span><span class="fd">Free Delivery</span><span class="rate"><b>${p.r} ★</b>(${p.rv.toLocaleString('en-IN')})</span></div></div>`;
  MG.pc = pc;
  const topbar = (title, right = '') => `<div class="top"><button class="ib" data-a="back" aria-label="Back">${I.back}</button><h1>${title}</h1>${right}</div>`;
  MG.topbar = topbar;
  const shopIcons = () => `<button class="ib" data-a="noop" aria-label="Search">${I.search}</button><button class="ib" data-a="go" data-v="wishlist" aria-label="Wishlist">${I.heart(false)}</button><button class="ib" data-a="go" data-v="cart" aria-label="Cart">${I.cart}${S().cart.length ? `<span class="badge-n">${S().cart.length}</span>` : ''}</button>`;
  function feed() { const w = S().views, X = MG.PX(), rk = (c) => { const i = X.cats.indexOf(c); return i < 0 ? 0 : (10 - i); }; return MG.P.slice().sort((a, b) => ((w[b.cat] || 0) - (w[a.cat] || 0)) * 2 + (rk(b.cat) - rk(a.cat)) * 1.5 + (Math.sin(+a.id.slice(1) * 7) - Math.sin(+b.id.slice(1) * 7))); }

  let slideIdx = 0, slideTimer = null, cdTimer = null;
  MG.screens.home = function () {
    const [h, m, s] = MG.hms(MG.to8pm());
    return `<header class="mh">
      <div class="row" style="gap:8px">
        <button data-a="go" data-v="account" class="avatar" aria-label="Account">${MG.face(MG.ME, 40)}</button>
        <div class="col" style="flex:1;min-width:0;gap:3px"><span class="hello">Hi, ${MG.ME.name}</span>${coinPill()}</div>
        <button class="ib" data-a="go" data-v="wishlist" aria-label="Wishlist">${I.heart(false)}</button>
        <button class="ib" data-a="noop" aria-label="Notifications">${I.bell}<span class="badge-n" style="background:#FF7A00;min-width:9px;height:9px;padding:0;top:9px;right:10px"></span></button>
        <button class="ib" data-a="go" data-v="cart" aria-label="Cart">${I.cart}${S().cart.length ? `<span class="badge-n">${S().cart.length}</span>` : ''}</button>
      </div>
      <label class="search">${I.search}<span class="sr">Search</span><input type="search" placeholder='Search for "trending"'><span>${I.mic}</span><span>${I.cam}</span></label>
    </header>
    <div class="scroll">
      <button class="deliver anim">${I.pin} Delivering to Bhopal - 462001 <b>›</b></button>
      <div class="circles anim">
        <button class="circ games" data-a="go" data-v="games"><span class="ci">${I.pad}</span><span class="newtag">NEW</span><span class="ping"></span><span>${t('games')}</span></button>
        ${MG.PX().cats.slice(0, 9).map((c) => { const C = MG.CATS.find((x) => x.id === c); return `<button class="circ" data-a="cat" data-v="${c}"><span class="ci">${MG.prod(C.art)}</span><span>${C.short}</span></button>`; }).join('')}
      </div>
      <div class="hurry anim">${MG.PX().hurry}</div>
      <div class="banner anim"><div class="slides" id="slides">
        <button class="slide" data-a="go" data-v="games" aria-label="Meesho Games">${MG.bannerGames()}</button>
        ${MG.PX().banners.map((b) => `<button class="slide" data-a="cat" data-v="${b[4]}" aria-label="${b[1]}">${MG.bannerPhoto(b[0], b[1], b[2], b[3], 'Shop now', b[5])}</button>`).join('')}
      </div></div>
      <div class="dots" id="dots"><i class="on"></i><i></i><i></i></div>
      <button class="cdstrip anim" data-a="bighousie"><span style="font-size:18px">🎱</span>${t('big')} ${t('startsIn').toLowerCase()} <span class="cd" data-cd><b>${h}</b>h:<b>${m}</b>m:<b>${s}</b>s</span><span class="go">${t('join')}</span></button>
      <div class="trust"><div><i>💵</i>Cash on Delivery</div><div><i>🚚</i>Free Delivery, Free Returns</div><div><i>🏷️</i>Lowest Price</div></div>
      <section class="sec"><div class="sech"><h2>Rocket Deals<br><span style="font-size:12.5px;font-weight:600;color:var(--muted)">${MG.PX().rdSub}</span></h2><span class="timerpill">💣 <span data-cd2>${h}h : ${m}m : ${s}s</span></span></div>
        <div class="hx" style="padding:0 12px">${MG.PX().strip.map(([pid, l]) => `<button class="rocket" data-a="pdp" data-v="${pid}"><span class="fr"><span class="im">${MG.prod(MG.BYID[pid].art)}</span><span class="lab">Min 10% off</span></span><span>${l}</span></button>`).join('')}</div></section>
      <section class="sec"><div class="sech"><h2>Recently Viewed</h2></div>
        <div class="hx" style="padding:0 12px">${S().recent.slice(0, 6).map((pid) => { const p = MG.BYID[pid]; return `<button class="minifind" style="box-shadow:inset 0 0 0 1px var(--line)" data-a="pdp" data-v="${pid}"><span class="im" style="display:block">${MG.prod(p.art)}</span><div>₹${p.price}</div></button>`; }).join('')}</div></section>
      <div style="background:#fff;margin-top:8px;padding:14px 12px 10px"><h2 class="h2" style="margin:0;font-size:19px;font-weight:800">Products For You</h2></div>
      <div class="filt"><span>⇅ Sort</span><span>Category ▾</span><span>Gender ▾</span><span>⚟ Filters</span></div>
      <div class="pgrid">${feed().map(pc).join('')}</div>
    </div>${MG.nav()}`;
  };
  MG.afters.home = function () {
    clearInterval(slideTimer); clearInterval(cdTimer);
    const el = document.getElementById('slides'), dots = document.getElementById('dots');
    const show = (i) => { slideIdx = i; if (el) el.style.transform = `translateX(-${i * 100}%)`; if (dots) [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i)); };
    show(slideIdx);
    slideTimer = setInterval(() => { if (MG.S.screen !== 'home') return clearInterval(slideTimer); show((slideIdx + 1) % 3); }, 4200);
    cdTimer = setInterval(() => {
      if (!['home', 'games'].includes(MG.S.screen)) return;
      const [h, m, s] = MG.hms(MG.to8pm());
      document.querySelectorAll('[data-cd]').forEach((x) => { x.innerHTML = `<b>${h}</b>h:<b>${m}</b>m:<b>${s}</b>s`; });
      document.querySelectorAll('[data-cd2]').forEach((x) => { x.textContent = `${h}h : ${m}m : ${s}s`; });
    }, 1000);
  };

  MG.screens.categories = function () {
    const cur = S().params.cat || 'kurtis'; const C = MG.CATS.find((c) => c.id === cur) || MG.CATS[0];
    const list = MG.P.filter((p) => p.cat === cur);
    return `<div class="top" style="padding-left:14px"><h1>Categories</h1>${shopIcons()}</div>
    <div style="flex:1;min-height:0;display:flex">
      <div style="width:92px;background:#F7F4FA;overflow-y:auto;flex-shrink:0">
        <button data-a="go" data-v="games" style="width:100%;padding:10px 4px;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;font-weight:800;color:var(--purple)"><span style="width:48px;height:48px;border-radius:50%;overflow:hidden;display:block">${I.pad}</span>${t('games')}</button>
        ${MG.CATS.map((c) => `<button data-a="cat" data-v="${c.id}" style="width:100%;padding:10px 4px;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;font-weight:${c.id === cur ? 800 : 600};background:${c.id === cur ? '#fff' : 'transparent'};border-left:3px solid ${c.id === cur ? 'var(--purple)' : 'transparent'};color:${c.id === cur ? 'var(--purple)' : 'var(--ink)'}"><span style="width:48px;height:48px;border-radius:50%;overflow:hidden;display:block;border:1px solid #E3D6EC">${MG.prod(c.art)}</span>${c.short}</button>`).join('')}
      </div>
      <div class="scroll" style="background:#fff"><div style="padding:12px 12px 6px;font-weight:800;font-size:15px">${C.name}</div>
        <div class="pgrid">${list.map(pc).join('') || '<div style="padding:20px;color:var(--muted);grid-column:1/-1;background:#fff">More coming soon</div>'}</div></div>
    </div>${MG.nav()}`;
  };

  MG.screens.mall = function () {
    const items = MG.P.filter((p) => p.mall || p.r >= 4.2).slice(0, 10);
    return `<div class="top" style="padding-left:14px"><h1>Meesho Mall</h1>${shopIcons()}</div>
    <div class="filt"><span>⇅ Sort</span><span>Category ▾</span><span>Gender ▾</span><span>⚟ Filters</span></div>
    <div class="scroll"><div class="hx" style="padding:12px;background:#fff">${['Synthetic', 'Polyester', 'Cotton', 'Silk', 'Plus size'].map((x, i) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;width:64px;flex-shrink:0;font-size:11.5px;font-weight:600"><span style="width:56px;height:56px;border-radius:50%;background:${['#C8B6FF', '#2D7BE5', '#F6F1E6', '#E2457A', '#FFE7A8'][i]}"></span>${x}</span>`).join('')}</div>
      <div class="pgrid">${items.map((p) => pc(Object.assign({}, p, { mall: true }))).join('')}</div></div>${MG.nav()}`;
  };

  MG.screens.video = function () {
    const vids = [['p3', 'stylewithneha', 'Shaadi look in ₹899'], ['p13', 'ghar.ki.roshni', 'Diwali corner makeover'], ['p6', 'mommy.picks', 'Gift for the little one']];
    return `<div class="scroll" style="background:#000;scroll-snap-type:y mandatory">${vids.map(([pid, who, cap]) => { const p = MG.BYID[pid]; return `<section style="height:100%;min-height:740px;scroll-snap-align:start;position:relative;color:#fff;overflow:hidden">
      <div style="position:absolute;inset:0">${MG.prod(p.art, { bg: '#2A1B2E' })}</div>
      <div style="position:absolute;left:0;right:0;top:0;padding:12px;background:linear-gradient(180deg,rgba(0,0,0,.55),transparent)" class="row"><span class="row" style="gap:8px;flex:1">${MG.face(MG.OPPONENTS[pid.length % 8], 30)}<b>${who}</b></span><button data-a="go" data-v="home" style="color:#fff;font-size:22px" aria-label="Close">✕</button></div>
      <div style="position:absolute;left:0;right:0;bottom:0;padding:14px 12px;background:linear-gradient(0deg,rgba(0,0,0,.75),transparent);display:flex;gap:10px;align-items:flex-end">
        <button data-a="pdp" data-v="${pid}" style="background:#fff;color:var(--ink);border-radius:10px;width:92px;overflow:hidden;text-align:left;flex-shrink:0"><span style="display:block;height:84px">${MG.prod(p.art)}</span><span style="display:block;padding:4px 6px;font-weight:800;font-size:13px">₹${p.price} <span style="color:var(--green);font-size:11px">${MG.off(p)}% off</span></span></button>
        <div class="col" style="gap:4px"><b>${cap}</b><span style="font-size:12px;opacity:.85">${p.name}</span></div></div></section>`; }).join('')}</div>${MG.nav()}`;
  };

  MG.screens.orders = function () {
    const ord = (pid, when, was) => { const p = MG.BYID[pid]; return `<div style="background:#fff;border-bottom:8px solid var(--bg)"><button data-a="pdp" data-v="${pid}" class="row" style="gap:12px;padding:12px;width:100%;text-align:left"><span style="width:62px;height:62px;border-radius:8px;overflow:hidden;flex-shrink:0">${MG.prod(p.art)}</span><span class="col" style="flex:1;gap:2px"><b style="font-size:15px">Delivered Early</b><span style="font-size:13px;color:var(--muted)">${when} <s>${was}</s></span><span style="font-size:12px;color:var(--muted)">Size: Free Size · Qty: 1</span></span><b>›</b></button><div style="border-top:1px solid var(--line);padding:11px 12px;color:var(--purple);font-weight:800;font-size:13px">ADD FEEDBACK</div></div>`; };
    return `<div class="top" style="padding-left:14px"><h1>My Orders</h1></div>
    <div class="scroll"><div class="row" style="gap:10px;padding:12px;background:#fff"><label class="search" style="flex:1;height:40px">${I.search}<input placeholder="Search orders"></label><span style="font-weight:700;font-size:14px">⚟ Filters</span></div>
      <div style="margin-top:8px">${ord('p21', 'Wed, 18 Nov', 'Thu, 19 Nov')}${ord('p17', 'Mon, 2 Nov', 'Wed, 4 Nov')}${ord('p1', 'Sat, 18 Oct', 'Wed, 22 Oct')}</div></div>${MG.nav()}`;
  };

  MG.screens.pdp = function () {
    const p = MG.BYID[S().params.id]; const fromGame = S().params.fromGame && MG.G;
    const sizes = ['kurtis', 'men'].includes(p.cat) ? ['S', 'M', 'L', 'XL', 'XXL'] : (p.cat === 'footwear' ? ['5', '6', '7', '8'] : ['Free Size']);
    const sel = S().params.size || sizes[Math.min(1, sizes.length - 1)];
    const sim = MG.P.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
    const coinsRs = MG.redeemable(p.price);
    return `<div class="top"><button class="ib" data-a="back" aria-label="Back">${I.back}</button><h1>${fromGame ? '' : 'Product'}</h1>${fromGame ? `<button class="btn gold sm" data-a="back" style="margin-right:6px">▶ ${t('backToGame')}</button>` : shopIcons()}</div>
    <div class="scroll">
      <button class="deliver">${I.pin} Delivering to Bhopal - 462001 <b>›</b></button>
      <div style="background:#fff;height:380px">${MG.prod(p.art, { label: p.name })}</div>
      ${sim.length ? `<div style="background:#fff;padding:10px 12px;display:flex;align-items:center;gap:8px"><span style="font-size:13px;font-weight:700;flex:1">${sim.length} Similar Products</span>${sim.map((x) => `<button data-a="pdp" data-v="${x.id}" style="width:44px;height:44px;border-radius:6px;overflow:hidden;border:1px solid var(--line)">${MG.prod(x.art)}</button>`).join('')}</div>` : ''}
      <div style="background:#fff;padding:12px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:6px">
        <div class="row" style="gap:8px"><span style="flex:1;font-size:14px;color:var(--muted)">${p.name}</span><button class="ib" data-a="wish" data-v="${p.id}" aria-label="Wishlist">${I.heart(!!S().wish[p.id])}</button></div>
        <div class="row" style="gap:8px;align-items:baseline"><b style="font-size:24px">₹${p.price}</b><s style="color:#9A9AA6">₹${p.mrp}</s><span style="color:var(--green);font-weight:800">${MG.off(p)}% off</span></div>
        ${coinsRs ? `<span style="font-size:13px;color:#5B2B86;font-weight:700"><span class="coin" style="width:16px;height:16px;font-size:9px">₹</span> ₹${p.price - coinsRs} with your Meesho coins</span>` : ''}
        <span class="rate"><b>${p.r} ★</b>${p.rv.toLocaleString('en-IN')} Ratings, ${Math.round(p.rv / 3).toLocaleString('en-IN')} Reviews</span>
        <span class="fd" style="font-size:12px;background:#F3F3F7;border-radius:999px;padding:2px 10px;width:fit-content">Free Delivery</span></div>
      <div style="background:#fff;margin-top:8px;padding:12px;display:flex;flex-direction:column;gap:8px"><b>Select Size</b><div class="chiprow">${sizes.map((x) => `<button class="chip sz" data-a="size" data-v="${x}" aria-pressed="${x === sel}">${x}</button>`).join('')}</div></div>
      <div style="background:#fff;margin-top:8px;padding:12px;display:flex;align-items:center;gap:10px"><span class="col" style="flex:1"><span style="font-size:12px;color:var(--muted)">Sold by</span><b>Shree Fashion Hub, Surat <span class="rate"><b>4.0 ★</b></span></b></span><b>›</b></div>
      <div class="trust" style="margin-top:8px;background:#fff"><div><i style="background:#F3EEFF">🏷️</i>Lowest Price</div><div><i style="background:#F3EEFF">💵</i>Cash on Delivery</div><div><i style="background:#F3EEFF">↩️</i>7-day Returns</div></div>
      <div style="height:12px"></div>
    </div>
    <div class="row" style="gap:10px;padding:10px 12px 14px;background:#fff;border-top:1px solid var(--line)"><button class="btn o" data-a="addcart" data-v="${p.id}" style="border-radius:6px">${I.cart} Add to Cart</button><button class="btn" data-a="buynow" data-v="${p.id}" style="border-radius:6px">▶▶ Buy Now</button></div>`;
  };

  MG.screens.cart = function () {
    const items = S().cart.map((id) => MG.BYID[id]).filter(Boolean); const total = items.reduce((a, p) => a + p.price, 0);
    const rs = MG.redeemable(total); const use = S().useCoins && rs > 0; const pay = total - (use ? rs : 0);
    return `${topbar('Cart', '<span style="font-size:12px;font-weight:800;color:var(--purple);margin-right:10px">STEP 1/3</span>')}
    <div class="scroll">${!items.length ? `<div style="padding:30px 20px;text-align:center;display:flex;flex-direction:column;gap:12px;align-items:center"><b style="font-size:17px">Your cart is empty</b><span style="color:var(--muted);font-size:13px">Add something you like. Coins you win in Meesho Games come off here.</span><button class="btn" data-a="go" data-v="home" style="width:auto">Start shopping</button></div>` : `
      ${items.map((p, i) => `<div style="background:#fff;border-bottom:8px solid var(--bg);padding:12px;display:flex;gap:12px"><span style="width:70px;height:78px;border-radius:8px;overflow:hidden;flex-shrink:0">${MG.prod(p.art)}</span><span class="col" style="flex:1;gap:3px"><span style="font-size:13px">${p.name}</span><span class="row" style="gap:6px;align-items:baseline"><b>₹${p.price}</b><s style="color:#9A9AA6;font-size:12px">₹${p.mrp}</s></span><span style="font-size:12px;color:var(--muted)">Qty 1 · Free Delivery</span><button data-a="cartrm" data-v="${i}" style="color:var(--purple);font-weight:800;font-size:12.5px;text-align:left;margin-top:4px">✕ REMOVE</button></span></div>`).join('')}
      <div style="background:#fff;padding:14px 12px;display:flex;align-items:center;gap:12px;border-bottom:8px solid var(--bg)"><span class="coin" style="width:34px;height:34px;font-size:16px">₹</span><span class="col" style="flex:1;gap:2px"><b>Use Meesho coins</b><span style="font-size:12px;color:var(--muted)">${rs > 0 ? `${rs * MG.COIN.perRupee} of ${S().coins} coins · save ₹${rs}` : `You have ${S().coins} coins`}. Up to 10% of the order, max ₹${MG.COIN.orderMaxRs}.</span></span>
        <button data-a="togglecoins" aria-pressed="${use}" aria-label="Use coins" style="width:50px;height:28px;border-radius:14px;background:${use ? 'var(--green)' : '#CFC8D6'};position:relative"><span style="position:absolute;top:3px;left:${use ? 25 : 3}px;width:22px;height:22px;border-radius:50%;background:#fff;transition:left .2s"></span></button></div>
      <div style="background:#fff;padding:12px;display:flex;flex-direction:column;gap:8px"><b>Price Details (${items.length} item${items.length > 1 ? 's' : ''})</b>
        <div class="row" style="justify-content:space-between;font-size:14px"><span style="color:var(--muted)">Total Product Price</span><span>₹${total}</span></div>
        ${use ? `<div class="row" style="justify-content:space-between;font-size:14px;color:var(--green)"><span>Meesho coins</span><span>- ₹${rs}</span></div>` : ''}
        <div class="row" style="justify-content:space-between;font-size:16px;font-weight:800;border-top:1px solid var(--line);padding-top:8px"><span>Order Total</span><span>₹${pay}</span></div></div>`}
    </div>
    ${items.length ? `<div class="row" style="gap:12px;padding:10px 12px 14px;background:#fff;border-top:1px solid var(--line)"><span class="col" style="flex:1"><b style="font-size:18px">₹${pay}</b><span style="font-size:11px;color:var(--purple);font-weight:800">VIEW PRICE DETAILS</span></span><button class="btn" data-a="checkout" style="width:auto;flex:1;border-radius:6px">Continue</button></div>` : ''}`;
  };

  MG.screens.wishlist = function () {
    const list = MG.P.filter((p) => S().wish[p.id]);
    return `${topbar('Wishlist')}<div class="scroll">${list.length ? `<div class="pgrid">${list.map(pc).join('')}</div>` : `<div style="padding:30px 20px;text-align:center;color:var(--muted)">Tap ♡ on anything you like, in the shop or on a lucky find in a game.</div>`}</div>`;
  };

  MG.screens.coins = function () {
    const C = MG.COIN;
    return `<div class="gscreen gbg"><div class="sparkle"></div>
      <div class="gtop"><button class="ib" data-a="back" aria-label="Back">${I.back}</button><h1>Meesho ${t('coins')}</h1></div>
      <div class="scroll" style="padding:0 14px 16px;display:flex;flex-direction:column;gap:12px;position:relative">
        <div class="ghero" style="text-align:center"><span class="k">Your balance</span><h2 style="font-size:44px"><span data-coins>${S().coins}</span> ${t('coins')}</h2><b>= ₹${MG.coinsToRs(S().coins)} off your next order</b></div>
        <div class="gcardw"><div class="row" style="justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:6px"><span>${t('coinsToday')}</span><span data-cointoday>${S().coinToday}/${C.dailyCap}</span></div><div class="progressbar"><span data-coinbar style="width:${Math.min(100, S().coinToday)}%"></span></div></div>
        <div class="gcardw" style="display:flex;flex-direction:column;gap:8px;font-size:13.5px;line-height:1.45">
          <b style="font-size:15px">How it works</b>
          <span>🎲 Finish a game: <b>+${C.finish}</b> · Win: <b>+${C.win} more</b></span>
          <span>🎱 Housie: Early 5 <b>+${C.housie.early}</b>, each line <b>+${C.housie.top}</b>, Full House <b>+${C.housie.full}</b>. Big Housie pays double.</span>
          <span>🪙 ${C.perRupee} coins = ₹1. Earn up to ${C.dailyCap} coins a day.</span>
          <span>🎯 Weekly goals and streaks pay bonus coins on top of the daily limit. See <b>Rewards</b>.</span>
          <span>🛒 Use up to 10% of an order, max ₹${C.orderMaxRs} per order. Coins expire after ${C.expiryDays} days.</span>
        </div>
        <div class="gcardw"><b style="font-size:15px">History</b>${S().hist.slice(0, 12).map((h) => `<div class="row" style="justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.1);font-size:13px"><span>${h.t}</span><b style="color:var(--gold)">+${h.n}</b></div>`).join('')}</div>
        <button class="btn" data-a="go" data-v="rewards" style="background:rgba(255,255,255,.18)">${t('openRewards')} ›</button>
        <button class="btn gold" data-a="go" data-v="games">${t('playNow')}</button>
      </div></div>`;
  };

  MG.screens.account = function () {
    return `${topbar('Account')}<div class="scroll" style="background:#fff">
      <div class="row" style="gap:12px;padding:16px;border-bottom:8px solid var(--bg)">${MG.face(MG.ME, 56)}<div class="col"><b style="font-size:17px">Priya</b><span style="font-size:13px;color:var(--muted)">+91 ••••• ••••0</span></div></div>
      ${[['coins', 'Meesho coins', S().coins + ' coins'], ['games', 'Meesho Games', ''], ['rewards', 'Rewards and badges', ''], ['wishlist', 'My Wishlist', ''], ['orders', 'My Orders', '']].map(([v, l, r]) => `<button data-a="go" data-v="${v}" class="row" style="width:100%;padding:15px 16px;border-bottom:1px solid var(--line);font-size:15px;justify-content:space-between"><span>${l}</span><b style="color:var(--purple)">${r} ›</b></button>`).join('')}
      <button data-a="lang" class="row" style="width:100%;padding:15px 16px;border-bottom:1px solid var(--line);font-size:15px;justify-content:space-between"><span>Change language</span><b style="color:var(--purple)">${(MG.LANGS.find((l) => l.id === S().lang) || MG.LANGS[0]).native} ›</b></button>
      <button data-a="resetdemo" class="row" style="width:100%;padding:15px 16px;font-size:15px;color:var(--muted)">Reset this demo</button>
      <p style="font-size:12px;color:var(--muted);padding:12px 16px">Concept prototype for a case study. Not affiliated with Meesho.</p></div>`;
  };

  // actions
  const A = MG.actions;
  A.go = (v) => MG.go(v);
  A.back = () => MG.back();
  A.noop = () => {};
  A.pdp = (v) => MG.go('pdp', { id: v });
  A.cat = (v) => MG.go('categories', { cat: v === 'all' ? 'kurtis' : v });
  A.size = (v) => { S().params = Object.assign({}, S().params, { size: v }); MG.render(); };
  A.wish = (v) => { S().wish[v] = !S().wish[v]; MG.save(); MG.render(); MG.toast(S().wish[v] ? 'Saved to your wishlist' : 'Removed from wishlist'); };
  A.addcart = (v) => { S().cart.push(v); MG.save(); MG.render(); MG.toast('Added to cart'); };
  A.buynow = (v) => { if (!S().cart.includes(v)) S().cart.push(v); MG.save(); MG.go('cart'); };
  A.cartrm = (v) => { S().cart.splice(Number(v), 1); MG.save(); MG.render(); };
  A.togglecoins = () => { S().useCoins = !S().useCoins; MG.save(); MG.render(); };
  A.checkout = () => MG.toast('Checkout is not part of this prototype');
  A.lang = () => MG.askLang();
  A.resetdemo = () => MG.reset();
})(window.MG);
