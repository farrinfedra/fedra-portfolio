/* ---------- sample galleries (ImageNet + text-to-image) ----------
   Data lives in samples-data.js. */
(() => {
  const D = window.RAD_SAMPLES;
  if (!D) return;
  const nice = s => s.replace(/_/g, " ");

  /* ImageNet */
  const gin = document.getElementById("gal-in");
  D.imagenet.forEach(name => {
    const f = document.createElement("figure");
    f.innerHTML = `<img src="/rad/assets/img/imagenet/gallery/${name}.jpg" alt="RAD sample: ${nice(name)}" loading="lazy"><figcaption>${nice(name)}</figcaption>`;
    gin.appendChild(f);
  });

  /* text-to-image, per backbone */
  const seg = document.getElementById("t2i-seg"), grid = document.getElementById("gal-t2i"), stats = document.getElementById("t2i-stats");
  const models = Object.keys(D.t2i);
  const btns = models.map(m => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab"); b.textContent = m;
    b.addEventListener("click", () => show(m));
    seg.appendChild(b);
    return b;
  });

  function show(m) {
    const M = D.t2i[m], s = M.stats;
    btns.forEach((b, i) => { const on = models[i] === m; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
    document.getElementById("t2i-model").textContent = `RAD-${m}`;
    document.getElementById("t2i-blurb").textContent = M.blurb || "";
    stats.innerHTML =
      `<div><span class="k">FID-50k ↓</span><b>${s.fid.toFixed(2)}</b><span class="vs">REPA ${s.repaFid.toFixed(2)}</span></div>` +
      `<div><span class="k">GenEval ↑</span><b>${s.geneval.toFixed(3)}</b><span class="vs">REPA ${s.repaGeneval.toFixed(3)}</span></div>` +
      `<div class="who">RAD-${m} · same backbone, encoder and data as REPA-${m}</div>`;
    grid.innerHTML = "";
    if (!M.items.length) {
      grid.innerHTML = `<div class="empty">RAD-${m} samples coming soon.</div>`;
      return;
    }
    M.items.forEach(it => {
      const f = document.createElement("figure");
      f.innerHTML = `<img src="/rad/assets/img/t2i/${M.folder}/${it.src}.jpg" alt="${it.prompt.replace(/"/g, "&quot;")}" loading="lazy"><figcaption>“${it.prompt}”</figcaption>`;
      grid.appendChild(f);
    });
  }
  show(models[0]);
})();
