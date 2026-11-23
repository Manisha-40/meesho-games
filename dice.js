/* A 3D die that tumbles and lands on a fair random face. */
(function (MG) {
  const PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
  const face = (n) => `<div class="face f${n}">${Array.from({ length: 9 }, (_, i) => `<i class="${PIPS[n].includes(i) ? 'v' : ''}"></i>`).join('')}</div>`;
  const ROT = { 1: [0, 0], 2: [0, -90], 3: [-90, 0], 4: [90, 0], 5: [0, 90], 6: [0, 180] };
  MG.Dice = {
    html(label) { return `<button class="dicebtn" data-a="roll" aria-label="${label || 'Roll the dice'}"><div class="cube" style="transform:rotateX(-18deg) rotateY(24deg)">${[1, 2, 3, 4, 5, 6].map(face).join('')}</div></button>`; },
    spins: 0,
    roll(btn, n) {
      return new Promise((res) => {
        const cube = btn && btn.querySelector('.cube'); MG.sfx('dice');
        if (!cube) return res();
        this.spins += 2; const [x, y] = ROT[n]; const sx = this.spins * 360 + x, sy = this.spins * 360 + y;
        cube.style.transform = `rotateX(${sx - 8}deg) rotateY(${sy + 10}deg)`;
        setTimeout(res, 820);
      });
    },
    show(btn, n) { const cube = btn && btn.querySelector('.cube'); if (!cube) return; const [x, y] = ROT[n]; cube.style.transition = 'none'; cube.style.transform = `rotateX(${this.spins * 360 + x - 8}deg) rotateY(${this.spins * 360 + y + 10}deg)`; void cube.offsetWidth; cube.style.transition = ''; },
    ready(btn, on) { if (btn) { btn.classList.toggle('ready', !!on); btn.disabled = !on; } }
  };
})(window.MG);
