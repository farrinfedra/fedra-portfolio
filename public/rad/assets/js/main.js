/* ---------- links ---------- */
document.querySelectorAll("[data-link]").forEach(a => {
  const url = (window.RAD_LINKS || {})[a.dataset.link];
  if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  else { a.classList.add("is-soon"); a.title = "Coming soon"; a.addEventListener("click", e => e.preventDefault()); }
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* ---------- section nav: show after the intro, highlight the current section ---------- */
const secnav = document.getElementById("secnav");
if (secnav) {
  const hero = document.querySelector(".hero");
  new IntersectionObserver(es => secnav.classList.toggle("show", !es[0].isIntersecting), { threshold: 0.15 }).observe(hero);
  const links = [...secnav.querySelectorAll("a[href^='#']")].filter(a => a.getAttribute("href") !== "#top");
  const secs = links.map(a => document.querySelector(a.getAttribute("href")));
  const mark = () => {
    const y = window.innerHeight * 0.35;
    let cur = -1;
    secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= y) cur = i; });
    links.forEach((a, i) => a.classList.toggle("on", i === cur));
  };
  addEventListener("scroll", mark, { passive: true });
  mark();
}

/* ---------- KaTeX ----------
   data-tex renders display math, data-texi renders inline math. */
window.addEventListener("load", () => {
  if (!window.katex) return;
  document.querySelectorAll("[data-tex]").forEach(el =>
    katex.render(el.dataset.tex, el, { displayMode: true, throwOnError: false }));
  document.querySelectorAll("[data-texi]").forEach(el =>
    katex.render(el.dataset.texi, el, { throwOnError: false }));
});

/* ---------- copy bibtex ---------- */
document.getElementById("copy").addEventListener("click", async e => {
  try { await navigator.clipboard.writeText(document.getElementById("bib").textContent); e.target.textContent = "copied"; }
  catch { e.target.textContent = "select + ⌘C"; }
  setTimeout(() => (e.target.textContent = "copy"), 1600);
});
