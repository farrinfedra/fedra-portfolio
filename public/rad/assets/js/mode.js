/* ---------- overview / detailed view ----------
   Elements with class "dense" only show in the detailed view (body.is-dense).
   The choice is remembered, shareable as ?view=detailed, and toggled with the floating
   button, the "Detailed ×" badge in the section nav, or the D key. The paragraph you are
   reading stays put when the page grows or shrinks around it. */
(() => {
  const body = document.body, KEY = "rad-view";
  const btn = document.getElementById("mode-btn"), lbl = document.getElementById("mode-lbl"), tip = document.getElementById("mode-tip");
  const store = v => { try { localStorage.setItem(KEY, v); } catch (e) {} };
  const seen = () => { try { return localStorage.getItem(KEY) !== null; } catch (e) { return true; } };

  // the first element (present in both views) that is still on screen
  function anchor() {
    const els = document.querySelectorAll(".hero, main section > :not(.dense)");
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.height && r.bottom > 80) return { el, top: r.top };
    }
    return null;
  }

  function sync() {
    const dense = body.classList.contains("is-dense");
    btn.setAttribute("aria-pressed", dense);
    btn.setAttribute("aria-label", dense ? "Switch to overview" : "Switch to detailed view");
    lbl.textContent = dense ? "brief" : "detail";
    tip.innerHTML = dense ? "Back to the overview <kbd>D</kbd>" : "Detailed view: math, architecture, training <kbd>D</kbd>";
  }

  function setMode(dense) {
    const a = anchor();
    body.classList.toggle("is-dense", dense);
    if (a) window.scrollBy({ top: a.el.getBoundingClientRect().top - a.top, behavior: "instant" });
    store(dense ? "detailed" : "overview");
    const url = new URL(location.href);
    if (dense) url.searchParams.set("view", "detailed"); else url.searchParams.delete("view");
    history.replaceState(null, "", url);
    sync();
    dispatchEvent(new Event("rad:mode"));
  }
  const toggle = () => setMode(!body.classList.contains("is-dense"));

  document.querySelectorAll("[data-mode-toggle]").forEach(b => b.addEventListener("click", toggle));
  addEventListener("keydown", e => {
    if (e.key !== "d" && e.key !== "D") return;
    if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable) return;
    toggle();
  });
  sync();

  /* back to top */
  const top = document.getElementById("to-top");
  const onScroll = () => top.classList.toggle("show", scrollY > innerHeight * 0.8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));

  /* first visit: point at the toggle once, after the reader leaves the intro */
  if (!seen()) {
    let shown = false;
    const hint = () => {
      if (shown || scrollY < innerHeight * 0.6) return;
      shown = true; removeEventListener("scroll", hint);
      btn.classList.add("nudge");
      setTimeout(() => btn.classList.remove("nudge"), 5000);
    };
    addEventListener("scroll", hint, { passive: true });
  }

  /* architecture figure: training vs generation path */
  const arch = document.getElementById("arch"), archSay = document.getElementById("arch-say");
  if (arch) {
    const SAY = {
      train: "<b>Training.</b> u<sub>t</sub> comes from the teacher: noised features of the clean image from a frozen encoder (DINOv2 in our runs). The projector h<sub>ϕ</sub> is pulled toward it by the alignment loss.",
      gen: "<b>Generation.</b> No encoder. The model's own policy samples u<sub>t</sub> from h<sub>t</sub><sup>ℓ</sup>, then injects it exactly as in training.",
    };
    const segBtns = document.querySelectorAll("#arch-seg [data-arch]");
    const show = m => {
      arch.dataset.mode = m;
      segBtns.forEach(b => { const on = b.dataset.arch === m; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
      archSay.innerHTML = SAY[m];
    };
    segBtns.forEach(b => b.addEventListener("click", () => show(b.dataset.arch)));
    show("train");
  }
})();
