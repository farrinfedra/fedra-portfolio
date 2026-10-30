/* ---------- interpolation ----------
   Each pair folder holds a.jpg / b.jpg (the real ImageNet images) and 00.jpg … 20.jpg,
   the RAD samples at m = 1.00, 0.95, …, 0.00 (step i has m = 1 - i/20). */
(() => {
  const PAIRS = [
    { key: "baboon-macaque",                  a: "baboon",           b: "macaque" },
    { key: "goldenretriever-lion",            a: "golden retriever", b: "lion" },
    { key: "goldenretriever-tabby",           a: "golden retriever", b: "tabby cat" },
    { key: "iguana-komododragon",             a: "iguana",           b: "Komodo dragon" },
    { key: "greenchameleon-africanchameleon", a: "green chameleon",  b: "African chameleon" },
    { key: "mountainbike-motorscooter",       a: "mountain bike",    b: "motor scooter" },
  ];
  const N = 20, FRAME_MS = 160;
  const $ = id => document.getElementById(id);
  const pairsEl = $("ip-pairs"), slider = $("ip-slider"), cur = $("ip-cur"), mEl = $("ip-m"), film = $("ip-film"), playBtn = $("ip-play");
  if (!pairsEl) return;
  const dir = p => `/rad/assets/img/interp/${p.key}`;
  const pad = i => String(i).padStart(2, "0");

  let pair = PAIRS[0], step = 10, timer = null, way = 1, touched = false;

  const chips = PAIRS.map(p => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab");
    b.innerHTML = `<img src="${dir(p)}/a.jpg" alt=""><img src="${dir(p)}/b.jpg" alt=""><span>${p.a} <i>→</i> ${p.b}</span>`;
    b.addEventListener("click", () => { touched = true; pick(p); });
    pairsEl.appendChild(b);
    return b;
  });

  const frames = [];
  for (let i = 0; i <= N; i += 2) {
    const f = document.createElement("button");
    f.type = "button";
    f.innerHTML = `<img alt=""><span>${(1 - i / N).toFixed(1)}</span>`;
    f.addEventListener("click", () => { stop(true); set(i); });
    film.appendChild(f);
    frames.push({ i, el: f, img: f.querySelector("img") });
  }

  function pick(p) {
    pair = p;
    chips.forEach((c, i) => { const on = PAIRS[i] === p; c.classList.toggle("on", on); c.setAttribute("aria-selected", on); });
    $("ip-a").src = `${dir(p)}/a.jpg`; $("ip-a").alt = `${p.a} (real image)`; $("ip-a-l").textContent = p.a;
    $("ip-b").src = `${dir(p)}/b.jpg`; $("ip-b").alt = `${p.b} (real image)`; $("ip-b-l").textContent = p.b;
    frames.forEach(f => { f.img.src = `${dir(p)}/${pad(f.i)}.jpg`; f.img.alt = `m = ${(1 - f.i / N).toFixed(1)}`; });
    for (let i = 0; i <= N; i++) new Image().src = `${dir(p)}/${pad(i)}.jpg`; // preload for smooth scrubbing
    set(step);
  }
  function set(i) {
    step = i; slider.value = i;
    cur.src = `${dir(pair)}/${pad(i)}.jpg`;
    cur.alt = `RAD interpolation between ${pair.a} and ${pair.b}, m = ${(1 - i / N).toFixed(2)}`;
    mEl.textContent = (1 - i / N).toFixed(2);
    frames.forEach(f => f.el.classList.toggle("on", f.i === i - (i % 2))); // film shows every other step
  }
  slider.addEventListener("input", () => { stop(true); set(+slider.value); });

  function play() {
    if (timer) return;
    playBtn.textContent = "■ stop";
    timer = setInterval(() => {
      let i = step + way;
      if (i > N || i < 0) { way *= -1; i = step + way; }
      set(i);
    }, FRAME_MS);
  }
  function stop(byUser) {
    clearInterval(timer); timer = null; playBtn.textContent = "▶ play";
    if (byUser) touched = true;
  }
  playBtn.addEventListener("click", () => (timer ? stop(true) : (touched = true, play())));

  pick(PAIRS[0]);
  // start the morph once it scrolls into view (unless the viewer already took over)
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    new IntersectionObserver(es => {
      if (es[0].isIntersecting && !touched) play();
      else if (!es[0].isIntersecting && timer && !touched) stop(false);
    }, { threshold: 0.5 }).observe(cur);
  }

  /* RAD vs. REPA strip from the paper (Fig. 5), static */
  const strip = $("film");
  const MS = ["1.00", "0.85", "0.65", "0.50", "0.35", "0.15", "0.00"];
  const add = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; strip.appendChild(n); return n; };
  add("div", "ml", "");
  add("div", "ml ab", "A");
  MS.forEach(v => add("div", "ml", "m=" + v));
  add("div", "ml ab", "B");
  [["rad", "RAD<br>400K"], ["repa", "REPA<br>4M"]].forEach(([k, lab]) => {
    add("div", "rl " + k, lab);
    for (let i = 0; i <= 8; i++) {
      const im = add("img", i === 0 || i === 8 ? "end" : "");
      im.src = `/rad/assets/img/interp/vs-repa/${k}_${i}.jpg`;
      im.alt = i === 0 ? "baboon (A)" : i === 8 ? "macaque (B)" : `${k.toUpperCase()} m = ${MS[i - 1]}`;
      im.loading = "lazy";
    }
  });
})();
