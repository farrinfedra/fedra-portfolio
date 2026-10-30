/* ---------- animated graphical model (idea section) ----------
   Steps through RAD's generative process: x_T -> u_T -> x_{T-1} -> ... -> x_t -> u_t -> x_{t-1} -> ... -> x_0.
   x nodes show a sample noised as x_t = (1 - t) x_0 + t * eps (the interpolant used in the paper).
   u nodes are an illustrative token grid that gets cleaner as t drops; they are not real DINOv2 features. */
(() => {
  const stage = document.getElementById("gm-stage");
  if (!stage) return;

  const W = 900, H = 320, NS = "http://www.w3.org/2000/svg";
  const STEP_MS = 2600, FADE_MS = 800, RES = 192;
  const SAMPLES = ["imagenet/gallery/macaw", "imagenet/gallery/lesser_panda", "imagenet/leopard", "imagenet/gallery/goldfinch"];

  const XY = 104, UY = 232, XR = 50, UR = 38;
  const NODES = {
    xT:  { kind: "x", cx: 60,  cy: XY, r: XR, t: 1.0,  sub: "T",   p: 0 },
    uT:  { kind: "u", cx: 150, cy: UY, r: UR, t: 0.9,  sub: "T",   p: 1 },
    xT1: { kind: "x", cx: 240, cy: XY, r: XR, t: 0.88, sub: "T−1", p: 2 },
    xt:  { kind: "x", cx: 450, cy: XY, r: XR, t: 0.55, sub: "t",   p: 3 },
    ut:  { kind: "u", cx: 540, cy: UY, r: UR, t: 0.5,  sub: "t",   p: 4 },
    xt1: { kind: "x", cx: 630, cy: XY, r: XR, t: 0.45, sub: "t−1", p: 5 },
    x0:  { kind: "x", cx: 840, cy: XY, r: XR, t: 0.0,  sub: "0",   p: 6 },
  };
  const DOTS = [{ cx: 345, p: 3 }, { cx: 735, p: 6 }];
  const EDGES = [
    ["xT", "uT", 1, true], ["xT", "xT1", 2], ["uT", "xT1", 2, true],
    ["xT1", { cx: 345 - 24, cy: XY, r: 0 }, 3], [{ cx: 345 + 24, cy: XY, r: 0 }, "xt", 3],
    ["xt", "ut", 4, true], ["xt", "xt1", 5], ["ut", "xt1", 5, true],
    ["xt1", { cx: 735 - 24, cy: XY, r: 0 }, 6], [{ cx: 735 + 24, cy: XY, r: 0 }, "x0", 6],
  ];
  const CAPTIONS = [
    "Start from pure Gaussian noise, $\\mathbf{x}_T \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$.",
    "Predict a representation from the noisy state: $\\mathbf{u}_T \\sim p_\\phi(\\mathbf{u}_T \\mid \\mathbf{x}_T)$.",
    "Take a denoising step conditioned on it: $\\mathbf{x}_{T-1} \\sim p_\\theta(\\mathbf{x}_{T-1} \\mid \\mathbf{x}_T, \\mathbf{u}_T)$.",
    "Repeat at every step. At step $t$ the state is $\\mathbf{x}_t$.",
    "Sample $\\mathbf{u}_t \\sim p_\\phi(\\mathbf{u}_t \\mid \\mathbf{x}_t)$. The representation gets sharper as the noise drops.",
    "Denoise with it: $\\mathbf{x}_{t-1} \\sim p_\\theta(\\mathbf{x}_{t-1} \\mid \\mathbf{x}_t, \\mathbf{u}_t)$.",
    "Repeat until the clean sample $\\mathbf{x}_0$.",
  ];
  const LAST = CAPTIONS.length - 1;

  /* ----- build stage ----- */
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("aria-hidden", "true");
  stage.appendChild(svg);
  const mk = (tag, attrs, parent = svg) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    parent.appendChild(n);
    return n;
  };
  const items = [];   // { el, p }
  const pt = v => (typeof v === "string" ? NODES[v] : v);

  EDGES.forEach(([a, b, p, rep]) => {
    const A = pt(a), B = pt(b);
    const dx = B.cx - A.cx, dy = B.cy - A.cy, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    const gapA = A.r ? A.r + 6 : 0, gapB = B.r ? B.r + 6 : 0;
    const x1 = A.cx + ux * gapA, y1 = A.cy + uy * gapA, x2 = B.cx - ux * gapB, y2 = B.cy - uy * gapB;
    const g = mk("g", { class: "arr" + (rep ? " rep" : "") });
    const hl = 12, hw = 5;
    mk("path", { class: "line", d: `M${x1},${y1} L${x2 - ux * hl * 0.6},${y2 - uy * hl * 0.6}`, pathLength: 1 }, g);
    mk("path", { class: "head", d: `M${x2},${y2} L${x2 - ux * hl - uy * hw},${y2 - uy * hl + ux * hw} L${x2 - ux * hl + uy * hw},${y2 - uy * hl - ux * hw} Z` }, g);
    items.push({ el: g, p });
  });

  DOTS.forEach(d => {
    const g = mk("g", { class: "fade dots" });
    [-12, 0, 12].forEach(o => mk("circle", { cx: d.cx + o, cy: XY, r: 2.6 }, g));
    items.push({ el: g, p: d.p });
  });

  const canvases = [];
  Object.values(NODES).forEach(n => {
    const node = document.createElement("div");
    node.className = "gm-node " + n.kind;
    node.style.cssText = `left:${((n.cx - n.r) / W) * 100}%;top:${((n.cy - n.r) / H) * 100}%;width:${((2 * n.r) / W) * 100}%`;
    const c = document.createElement("canvas");
    c.width = c.height = RES;
    node.appendChild(c);
    stage.appendChild(node);
    canvases.push({ c, n });
    items.push({ el: node, p: n.p });

    const ly = n.kind === "x" ? n.cy - n.r - 16 : n.cy + n.r + 30;
    const t = mk("text", { class: "fade lab " + n.kind, x: n.cx, y: ly, "text-anchor": "middle" });
    t.textContent = n.kind;
    mk("tspan", { "baseline-shift": "sub", "font-size": "17" }, t).textContent = n.sub;
    items.push({ el: t, p: n.p });
  });

  /* ----- drawing ----- */
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const noiseCanvas = size => {
    const c = document.createElement("canvas"); c.width = c.height = size;
    const ctx = c.getContext("2d"), im = ctx.createImageData(size, size);
    for (let i = 0; i < im.data.length; i += 4) {
      for (let k = 0; k < 3; k++) im.data[i + k] = Math.max(0, Math.min(255, 128 + 64 * gauss()));
      im.data[i + 3] = 255;
    }
    ctx.putImageData(im, 0, 0);
    return c;
  };
  const G = 8; // token grid for u
  function drawX(ctx, img, t) {
    ctx.globalAlpha = 1; ctx.drawImage(noiseCanvas(RES), 0, 0);
    ctx.globalAlpha = 1 - t; ctx.drawImage(img, 0, 0, RES, RES);
    ctx.globalAlpha = 1;
  }
  function drawU(ctx, img, t) {
    const tiny = document.createElement("canvas"); tiny.width = tiny.height = G;
    const tc = tiny.getContext("2d"); tc.imageSmoothingQuality = "high"; tc.drawImage(img, 0, 0, G, G);
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = 1; ctx.drawImage(noiseCanvas(G), 0, 0, RES, RES);
    ctx.globalAlpha = 1 - t; ctx.drawImage(tiny, 0, 0, RES, RES);
    ctx.globalAlpha = 1; ctx.imageSmoothingEnabled = true;
    ctx.strokeStyle = "#FBECE6"; ctx.lineWidth = 4;
    for (let i = 1; i < G; i++) {
      const o = (i * RES) / G;
      ctx.beginPath(); ctx.moveTo(o, 0); ctx.lineTo(o, RES); ctx.moveTo(0, o); ctx.lineTo(RES, o); ctx.stroke();
    }
  }
  const imgs = SAMPLES.map(s => { const im = new Image(); im.src = `/rad/assets/img/${s}.jpg`; return im; });
  let sample = 0;
  function paint() {
    const img = imgs[sample];
    if (!img.complete || !img.naturalWidth) { img.onload = paint; return; }
    canvases.forEach(({ c, n }) => (n.kind === "x" ? drawX : drawU)(c.getContext("2d"), img, n.t));
  }
  paint();

  /* ----- captions (KaTeX when available) ----- */
  const capEl = document.getElementById("gm-cap"), kEl = document.getElementById("gm-k");
  const plain = tex => tex.replace(/\\mathbf\{(.*?)\}/g, "$1").replace(/\\mathcal\{(.*?)\}/g, "$1")
    .replace(/\\sim/g, "~").replace(/\\mid/g, "|").replace(/\\phi/g, "ϕ").replace(/\\theta/g, "θ")
    .replace(/_\{(.*?)\}/g, "<sub>$1</sub>").replace(/_(\w)/g, "<sub>$1</sub>").replace(/[{}\\]/g, "");
  const renderCap = s => s.split("$").map((part, i) => {
    if (i % 2 === 0) return part;
    return window.katex ? katex.renderToString(part, { throwOnError: false }) : `<i>${plain(part)}</i>`;
  }).join("");

  /* ----- controls ----- */
  const dotsEl = document.getElementById("gm-dots"), playBtn = document.getElementById("gm-play");
  const dots = CAPTIONS.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-label", `Step ${i + 1}`);
    b.addEventListener("click", () => { pause(true); setPhase(i); });
    dotsEl.appendChild(b);
    return b;
  });

  let phase = -1, timer = null, playing = false, userPaused = false, done = false;
  function setPhase(k) {
    phase = k;
    items.forEach(({ el, p }) => { el.classList.toggle("on", p <= k); el.classList.toggle("cur", p === k); });
    dots.forEach((d, i) => d.classList.toggle("on", i <= k));
    kEl.textContent = `${k + 1} / ${CAPTIONS.length}`;
    capEl.innerHTML = renderCap(CAPTIONS[k]);
  }
  function restart() {
    stage.classList.add("out");
    timer = setTimeout(() => {
      stage.classList.add("instant");
      items.forEach(({ el }) => el.classList.remove("on", "cur"));
      sample = (sample + 1) % imgs.length; paint();
      void stage.offsetWidth;
      stage.classList.remove("instant", "out");
      setPhase(0);
      timer = setTimeout(tick, STEP_MS);
    }, FADE_MS);
  }
  // one pass, then hold on the final frame (x_0) until the reader asks for a replay
  function tick() {
    setPhase(phase + 1);
    if (phase >= LAST) { playing = false; done = true; playBtn.textContent = "↺ replay"; return; }
    timer = setTimeout(tick, STEP_MS);
  }
  function play() {
    if (playing) return;
    playing = true; userPaused = false; done = false; playBtn.textContent = "❚❚ pause";
    clearTimeout(timer);
    if (phase >= LAST) restart(); else tick();
  }
  function pause(byUser) {
    playing = false; clearTimeout(timer); playBtn.textContent = "▶ play";
    if (byUser) userPaused = true;
  }
  playBtn.addEventListener("click", () => (playing ? pause(true) : play()));

  window.addEventListener("load", () => setPhase(phase)); // re-render caption once KaTeX is in
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still) { setPhase(LAST); pause(true); return; }

  // back to the first step (x_T only), without animating the reset
  function reset() {
    stage.classList.add("instant");
    items.forEach(({ el }) => el.classList.remove("on", "cur"));
    setPhase(0);
    void stage.offsetWidth;
    stage.classList.remove("instant", "out");
  }
  reset();
  playBtn.textContent = "▶ play";

  // play from the start when the diagram comes into view; if the reader leaves mid-way, rewind.
  // once a pass has finished it stays on the final frame
  new IntersectionObserver(es => {
    if (es[0].isIntersecting) {
      if (userPaused || playing || done) return;
      reset();
      playing = true; playBtn.textContent = "❚❚ pause";
      timer = setTimeout(tick, 900);
    } else if (!done) {
      pause(false); userPaused = false;
      reset();
    }
  }, { threshold: 0.55 }).observe(stage);
})();
