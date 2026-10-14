"use client";

import { useEffect, useRef } from "react";

// Decorative canvas: points start as Gaussian noise and "denoise" into a
// phyllotaxis disc, following x_t = sqrt(a) * x_0 + sqrt(1 - a) * eps.
const N = 520;
const DENOISE_MS = 2600;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function gaussian() {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export default function DiffusionField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Unit-scale targets (radius <= 1) and noise.
    const pts = Array.from({ length: N }, (_, i) => {
      const r = Math.sqrt((i + 0.5) / N);
      const theta = i * GOLDEN_ANGLE;
      return {
        r,
        theta,
        nx: gaussian() * 0.55,
        ny: gaussian() * 0.55,
        size: 0.6 + Math.random() * 0.9,
      };
    });

    // In reduced-motion mode we draw only when something changes.
    let dirty = true;
    let color = "67 56 202";
    const readColor = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || color;
      dirty = true;
    };
    readColor();
    const themeObserver = new MutationObserver(readColor);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let size = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true; // resizing clears the canvas
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const pointer = { x: 0, y: 0, strength: 0, target: 0 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Same unit space as the points: center = 0, disc edge = 1.
      pointer.x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2 * 0.92);
      pointer.y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2 * 0.92);
      pointer.target = 1;
    };
    const onLeave = () => (pointer.target = 0);
    if (!reduceMotion) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    let visible = true;
    const visObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visObserver.observe(canvas);

    const start = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (reduceMotion ? !dirty : !visible) return;
      dirty = false;

      const t = reduceMotion ? 1 : Math.min((now - start) / DENOISE_MS, 1);
      const a = 1 - Math.pow(1 - t, 3); // ease-out "signal level"
      const sa = Math.sqrt(a);
      const sn = Math.sqrt(1 - a);
      const spin = reduceMotion ? 0 : (now - start) * 0.000025;
      pointer.strength += (pointer.target - pointer.strength) * 0.06;

      const half = size / 2;
      const scale = half * 0.92;
      ctx.clearRect(0, 0, size, size);

      for (const p of pts) {
        const ang = p.theta + spin;
        let x = sa * p.r * Math.cos(ang) + sn * p.nx;
        let y = sa * p.r * Math.sin(ang) + sn * p.ny;

        if (pointer.strength > 0.01) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const falloff = Math.exp(-(dx * dx + dy * dy) / 0.02);
          x += dx * falloff * 0.5 * pointer.strength;
          y += dy * falloff * 0.5 * pointer.strength;
        }

        const alpha = (0.15 + 0.55 * p.r) * (0.35 + 0.65 * a);
        ctx.fillStyle = `rgb(${color} / ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(half + x * scale, half + y * scale, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      visObserver.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
