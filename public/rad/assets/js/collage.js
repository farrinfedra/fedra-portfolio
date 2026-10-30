/* ---------- hero collage ----------
   Floating, semi-transparent RAD samples on the right of the hero.
   t2i tiles show their prompt on hover, in (ImageNet) tiles their class.
   x / y are % of the collage box, s is the tile size in vw (at a 1440px viewport,
   1vw ≈ 14px; also capped by height on short screens), r is the resting rotation, z is depth (1 front … 3 back). */
(() => {
  const host = document.getElementById("collage");
  if (!host) return;

  // t2i tiles name a file in assets/img/t2i/xl2 and take their prompt from samples-data.js
  const TILES = [
    { t2i: "showcase_4.0_000054",       x: 18, y: 4,  s: 7.5,  r: -4, z: 3 },
    { t2i: "showcase_4.0_000318",       x: 38, y: 0,  s: 11,   r: 3,  z: 1 },
    { t2i: "showcase_4.0_000383",       x: 66, y: 2,  s: 9,    r: -5, z: 2 },
    { t2i: "showcase_3.0_000108",       x: 90, y: 10, s: 7,    r: 5,  z: 3 },
    { in: "macaw",                      x: 22, y: 22, s: 11.5, r: -3, z: 1 },
    { t2i: "showcase_4.0_000235",       x: 52, y: 23, s: 9.5,  r: 4,  z: 2 },
    { t2i: "showcase_4.0_000321",       x: 78, y: 27, s: 9,    r: -4, z: 2 },
    { in: "goldfinch",                  x: 13, y: 47, s: 10.5, r: 5,  z: 1 },
    { t2i: "showcase_3.0_000349",       x: 38, y: 46, s: 8.5,  r: -2, z: 2 },
    { t2i: "compositional_3.0_000075",  x: 59, y: 45, s: 12,   r: -3, z: 1 },
    { in: "toucan",                     x: 88, y: 51, s: 7.5,  r: 6,  z: 3 },
    { t2i: "showcase_4.0_000288",       x: 22, y: 69, s: 11.5, r: 3,  z: 1 },
    { t2i: "showcase_3.0_000307",       x: 50, y: 72, s: 9,    r: 5,  z: 2 },
    { t2i: "showcase_4.0_000195",       x: 71, y: 73, s: 8,    r: -4, z: 2 },
    { in: "lesser_panda",               x: 90, y: 77, s: 7,    r: 4,  z: 3 },
  ];
  const PROMPTS = {};
  ((window.RAD_SAMPLES || {}).t2i?.["XL/2"]?.items || []).forEach(it => (PROMPTS[it.src] = it.prompt));

  TILES.forEach((t, i) => {
    const tile = document.createElement("div");
    tile.className = "tile z" + t.z;
    tile.style.cssText =
      `left:${t.x}%;top:${t.y}%;--s:${t.s}vw;--sh:${(t.s * 1.55).toFixed(1)}vh;--r:${t.r}deg;` +
      `--dur:${(9 + t.z * 2.5 + (i % 4)).toFixed(1)}s;--delay:${(-i * 1.7).toFixed(1)}s;` +
      `--fx:${i % 2 ? 6 : -6}px;--fy:${-8 - t.z * 2}px`;
    const img = document.createElement("img");
    img.src = t.t2i ? `/rad/assets/img/t2i/xl2/${t.t2i}.jpg` : `/rad/assets/img/imagenet/gallery/${t.in}.jpg`;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    const cap = document.createElement("span");
    cap.innerHTML = t.t2i
      ? `<b>RAD-XL/2 · text-to-image</b>“${PROMPTS[t.t2i] || ""}”`
      : `<b>RAD · ImageNet class</b>${t.in.replace(/_/g, " ")}`;
    if (t.y > 55) cap.classList.add("up"); // lower rows: caption above the tile
    tile.addEventListener("mouseenter", () => { // nudge the caption back inside the window
      cap.style.setProperty("--dx", "0px");
      const over = cap.getBoundingClientRect().right - (innerWidth - 16);
      if (over > 0) cap.style.setProperty("--dx", `${-over}px`);
    });
    tile.append(img, cap);
    host.appendChild(tile);
  });
})();
