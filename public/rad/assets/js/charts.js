/* ---------- charts ----------
   Values were read from the vector data of the paper's figures (Fig. 1c, 3b, 4, 6a)
   and Table 1; the detailed-view charts use Tables 8-10 of the appendix. */
const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
};
const kfmt = v => v >= 1e6 ? (v / 1e6) + "M" : (v / 1e3) + "K";

function scale(ax, r0, r1) {
  if (ax.type === "cat") {
    const n = ax.cats.length, pad = (r1 - r0) / (n * 2);
    return v => r0 + pad + (v * (r1 - r0 - 2 * pad)) / (n - 1);
  }
  const f = ax.type === "log" ? Math.log : x => x;
  const [d0, d1] = ax.domain.map(f);
  return v => r0 + ((f(v) - d0) / (d1 - d0)) * (r1 - r0);
}

function drawChart(host, cfg) {
  const W = host.clientWidth; if (!W) return;
  const H = Math.max(200, Math.round(W * (+host.dataset.ratio || 0.7)));
  const m = { t: 14, r: 12, b: 40, l: 38, ...cfg.margin };
  host.innerHTML = "";
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, height: H, role: "img", "aria-label": cfg.label }, host);
  const X = scale(cfg.x, m.l, W - m.r), Y = scale(cfg.y, H - m.b, m.t);

  const grid = el("g", { class: "grid" }, svg), axis = el("g", { class: "axis" }, svg);
  cfg.y.ticks.forEach(t => {
    el("line", { x1: m.l, x2: W - m.r, y1: Y(t), y2: Y(t) }, grid);
    const tx = el("text", { x: m.l - 8, y: Y(t) + 3.5, "text-anchor": "end" }, axis); tx.textContent = t;
  });
  const xt = cfg.x.type === "cat" ? cfg.x.cats.map((c, i) => [i, c]) : cfg.x.ticks.map(t => [t, cfg.x.fmt ? cfg.x.fmt(t) : t]);
  xt.forEach(([v, lab]) => {
    const lines = String(lab).split("\n");
    lines.forEach((ln, i) => { const tx = el("text", { x: X(v), y: H - m.b + 16 + i * 13, "text-anchor": "middle" }, axis); tx.textContent = ln; });
  });
  el("line", { class: "domain", x1: m.l, x2: m.l, y1: m.t - 4, y2: H - m.b }, svg);
  el("line", { class: "domain", x1: m.l, x2: W - m.r, y1: H - m.b, y2: H - m.b }, svg);
  const xtl = el("text", { class: "axis-title", x: W - m.r, y: H - 4, "text-anchor": "end" }, svg); xtl.textContent = cfg.x.title || "";
  const ytl = el("text", { class: "axis-title", x: m.l + 6, y: m.t + 4 }, svg); ytl.textContent = cfg.y.title || "";

  (cfg.vlines || []).forEach(v => {
    const g = el("g", { class: "vline" }, svg);
    el("line", { x1: X(v.x), x2: X(v.x), y1: m.t, y2: H - m.b }, g);
    const t = el("text", { x: X(v.x) + 5, y: H - m.b - 8 }, g); t.textContent = v.label;
  });

  // clip for draw-in
  const id = "clip" + Math.random().toString(36).slice(2, 8);
  const cp = el("clipPath", { id }, el("defs", {}, svg));
  const cr = el("rect", { x: 0, y: 0, width: host._drawn ? W : 0, height: H }, cp);
  const plot = el("g", { "clip-path": `url(#${id})` }, svg);

  const pts = [];
  cfg.series.forEach(s => {
    const d = s.pts.map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1)).join("");
    el("path", { d, class: "s-" + s.cls }, plot);
  });
  cfg.series.forEach(s => s.pts.forEach(p => {
    const x = X(p[0]), y = Y(p[1]);
    let mk;
    if (s.cls === "repa") mk = el("rect", { x: x - 3.5, y: y - 3.5, width: 7, height: 7, class: "pt m-repa" }, plot);
    else mk = el("circle", { cx: x, cy: y, r: s.cls === "rad" ? 4.5 : 3.6, class: "pt m-" + s.cls }, plot);
    pts.push({ x, y, s, p, mk });
  }));

  (cfg.arrows || []).forEach(a => {
    const g = el("g", { class: "arrow" }, svg);
    const x1 = X(a.from[0]) - 8, x2 = X(a.to[0]) + 9, y = Y(a.from[1]);
    el("line", { x1, x2: x2 + 6, y1: y, y2: y }, g);
    el("path", { d: `M${x2},${y} l7,-3.5 l0,7 z` }, g);
    const t = el("text", { x: (x1 + x2) / 2 + (a.dx || 0), y: y + (a.dy ?? -7), "text-anchor": "middle" }, g);
    t.textContent = a.label;
  });

  // tooltip
  const tip = document.createElement("div"); tip.className = "tip"; host.appendChild(tip);
  svg.addEventListener("pointermove", e => {
    const r = svg.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
    let best = null, bd = 28;
    pts.forEach(q => { const d = Math.hypot(q.x - mx, q.y - my); if (d < bd) { bd = d; best = q; } });
    pts.forEach(q => q.mk.style.transform = "");
    if (!best) { tip.style.opacity = 0; return; }
    const xl = cfg.x.type === "cat" ? cfg.x.cats[best.p[0]].replace("\n", " ") : (cfg.x.fmt ? cfg.x.fmt(best.p[0]) : best.p[0]);
    tip.innerHTML = `<b>${best.s.name}</b> · ${cfg.x.tipLabel || ""}${xl} · ${cfg.y.tipLabel} ${best.p[1].toFixed(1)}`;
    tip.style.left = best.x + "px"; tip.style.top = best.y + "px"; tip.style.opacity = 1;
  });
  svg.addEventListener("pointerleave", () => { tip.style.opacity = 0; });

  // draw-in once visible
  if (!host._drawn) {
    const ob = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return; ob.disconnect(); host._drawn = true;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { cr.setAttribute("width", W); return; }
      const t0 = performance.now(), dur = 1400;
      const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        cr.setAttribute("width", W * e); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { threshold: 0.35 });
    ob.observe(host);
  }
}

const CHARTS = {
  "c-conv": {
    label: "FID versus training iterations for RAD, REPA and SiT XL/2",
    margin: { l: 34, b: 34 },
    x: { type: "log", domain: [40e3, 8.5e6], ticks: [50e3, 100e3, 200e3, 400e3, 1e6, 4e6, 7e6], fmt: kfmt, title: "training iterations →", tipLabel: "" },
    y: { type: "log", domain: [3, 60], ticks: [5, 10, 20, 40], title: "FID-50k ↓", tipLabel: "FID" },
    series: [
      { name: "SiT-XL/2", cls: "sit", pts: [[400e3, 17.2], [7e6, 8.3]] },
      { name: "REPA-XL/2", cls: "repa", pts: [[50e3, 52.3], [100e3, 19.4], [200e3, 11.1], [400e3, 7.9], [1e6, 6.4], [4e6, 5.9]] },
      { name: "RAD-XL/2", cls: "rad", pts: [[50e3, 24.4], [100e3, 8.3], [150e3, 5.9], [200e3, 4.6], [400e3, 3.7]] },
    ],
    arrows: [
      { from: [7e6, 8.3], to: [100e3, 8.3], label: "70×", dx: 40 },
      { from: [4e6, 5.9], to: [150e3, 5.9], label: "27×", dy: 19, dx: 30 },
    ],
  },
  "c-steps": {
    label: "FID versus number of sampling steps",
    x: { type: "log", domain: [4.2, 120], ticks: [5, 10, 25, 50, 100], title: "Euler ODE steps →", tipLabel: "steps " },
    y: { type: "log", domain: [3, 80], ticks: [5, 10, 20, 40, 80], title: "FID-50k ↓", tipLabel: "FID" },
    series: [
      { name: "REPA-XL/2", cls: "repa", pts: [[5, 62.3], [10, 21.9], [25, 10.5], [50, 8.2], [100, 7.4]] },
      { name: "RAD-XL/2", cls: "rad", pts: [[5, 20.6], [10, 6.8], [25, 4.1], [50, 4.0]] },
    ],
    arrows: [{ from: [100, 7.4], to: [10, 7.4], label: "10×", dy: 19, dx: 18 }],
  },
  "c-size": {
    label: "FID versus model size",
    margin: { b: 50 },
    x: { type: "cat", cats: ["B/2\n130M", "L/2\n458M", "XL/2\n675M"], tipLabel: "" },
    y: { type: "lin", domain: [0, 36], ticks: [0, 10, 20, 30], title: "FID-50k ↓", tipLabel: "FID" },
    series: [
      { name: "SiT", cls: "sit", pts: [[0, 33.0], [1, 18.8], [2, 17.2]] },
      { name: "REPA", cls: "repa", pts: [[0, 24.4], [1, 10.0], [2, 7.9]] },
      { name: "RAD", cls: "rad", pts: [[0, 7.7], [1, 3.9], [2, 3.7]] },
    ],
    arrows: [{ from: [2, 7.9], to: [0, 7.9], label: "4.8×", dy: 20, dx: -10 }],
  },
  "c-probe": {
    label: "Linear probe accuracy per block",
    x: { type: "lin", domain: [3.4, 12.6], ticks: [4, 5, 6, 8, 10, 12], title: "block →", tipLabel: "block " },
    y: { type: "lin", domain: [36, 68], ticks: [40, 50, 60], title: "top-1 % ↑", tipLabel: "acc" },
    vlines: [{ x: 4.5, label: "uₜ enters" }],
    series: [
      { name: "REPA-B/2", cls: "repa", pts: [[4, 63.0], [5, 60.9], [6, 58.3], [8, 52.3], [10, 46.1], [12, 40.7]] },
      { name: "RAD-B/2", cls: "rad", pts: [[4, 62.7], [5, 63.4], [6, 62.1], [8, 56.7], [10, 48.8], [12, 43.3]] },
    ],
  },
};
/* detailed view only (App. A.6, Tables 8-10) */
Object.assign(CHARTS, {
  "c-b2": {
    label: "FID versus training iterations for B/2 models",
    x: { type: "log", domain: [42e3, 480e3], ticks: [50e3, 100e3, 200e3, 400e3], fmt: kfmt, title: "training iterations →", tipLabel: "" },
    y: { type: "log", domain: [6, 90], ticks: [10, 20, 40, 80], title: "FID-50k ↓", tipLabel: "FID" },
    series: [
      { name: "REPA-B/2", cls: "repa", pts: [[50e3, 78.2], [100e3, 49.5], [200e3, 33.2], [400e3, 24.4]] },
      { name: "REPA-XL/2", cls: "alt", pts: [[50e3, 52.3], [100e3, 19.4], [200e3, 11.1], [400e3, 7.9]] },
      { name: "RAD-B/2", cls: "rad", pts: [[50e3, 55.6], [100e3, 23.5], [200e3, 12.0], [400e3, 7.7]] },
    ],
    arrows: [{ from: [400e3, 24.4], to: [100e3, 24.4], label: "4×", dy: -8 }],
  },
  "c-data": {
    label: "FID versus fraction of ImageNet used for training",
    x: { type: "log", domain: [2.4, 125], ticks: [3, 10, 30, 100], fmt: v => v + "%", title: "fraction of ImageNet →", tipLabel: "" },
    y: { type: "log", domain: [6, 50], ticks: [10, 20, 40], title: "FID-50k ↓", tipLabel: "FID" },
    series: [
      { name: "REPA-B/2", cls: "repa", pts: [[3, 40.1], [10, 23.8], [30, 25.7], [100, 26.6]] },
      { name: "RAD-B/2", cls: "rad", pts: [[3, 33.7], [10, 14.9], [30, 9.7], [100, 8.9]] },
    ],
  },
  "c-unipc": {
    label: "FID versus sampling steps for different samplers",
    x: { type: "log", domain: [4.4, 58], ticks: [5, 10, 25, 50], title: "sampling steps →", tipLabel: "steps " },
    y: { type: "log", domain: [3, 26], ticks: [4, 8, 16], title: "FID-50k ↓", tipLabel: "FID" },
    series: [
      { name: "Euler", cls: "rad", pts: [[5, 20.6], [10, 6.8], [25, 4.1], [50, 4.0]] },
      { name: "UniPC-2", cls: "uni2", pts: [[5, 6.5], [10, 4.5], [25, 3.7], [50, 3.8]] },
      { name: "UniPC-3", cls: "uni3", pts: [[5, 6.4], [10, 4.5], [25, 3.8], [50, 3.8]] },
    ],
  },
});

const renderAll = () => Object.entries(CHARTS).forEach(([id, cfg]) => { const h = document.getElementById(id); if (h) drawChart(h, cfg); });
renderAll();
let rz; new ResizeObserver(() => { clearTimeout(rz); rz = setTimeout(renderAll, 120); }).observe(document.body);
document.fonts && document.fonts.ready.then(renderAll);
addEventListener("rad:mode", renderAll); // hidden charts have no width until the detailed view opens
