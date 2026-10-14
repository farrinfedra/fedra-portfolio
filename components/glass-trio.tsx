"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";

// Three translucent "glass" objects, one per research area. Each floats on its
// own, shows a label on hover, and jumps to the matching papers on click.

const ease = [0.22, 1, 0.36, 1] as const;
const v = (name: string, a: number) => `rgb(var(--${name}) / ${a})`;

/* ---------- 1. Foundation model training: stacked glass layers ---------- */
export function LayerStack({ still = false }: { still?: boolean }) {
  const id = `pane-${useId().replace(/:/g, "")}`;
  const panes = [3, 2, 1, 0]; // draw bottom → top
  return (
    <svg viewBox="0 0 200 190" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: v("indigo", 0.16) }} />
          <stop offset="100%" style={{ stopColor: v("indigo", 0.5) }} />
        </linearGradient>
      </defs>
      {panes.map((i) => (
        <motion.g
          key={i}
          animate={still ? undefined : { y: [0, -i * 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        >
          <g transform={`translate(0 ${i * 26})`}>
            <path
              d="M100 12 L190 52 L100 92 L10 52 Z"
              fill={`url(#${id})`}
              style={{ stroke: v("indigo", 0.45) }}
              strokeWidth="1"
            />
            {/* glass edge highlight */}
            <path
              d="M14 51 L100 13 L186 51"
              fill="none"
              className="stroke-white opacity-80 dark:opacity-30"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {i === 0 &&
              // a few "tokens" on the top layer
              [-2, -1, 0, 1, 2].flatMap((a) =>
                [-1, 0, 1].map((b) => (
                  <circle
                    key={`${a}${b}`}
                    cx={100 + a * 15 + b * 15}
                    cy={52 + a * -6.6 + b * 6.6}
                    r="2.2"
                    style={{ fill: v("indigo", 0.85) }}
                  />
                ))
              )}
          </g>
        </motion.g>
      ))}
    </svg>
  );
}

/* ---------- 2a. AI for science: a glass molecule ---------- */
export function Molecule({ still = false }: { still?: boolean }) {
  const id = `atom-${useId().replace(/:/g, "")}`;
  const ring = Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 3) * k - Math.PI / 2;
    return [100 + 40 * Math.cos(a), 100 + 40 * Math.sin(a)] as const;
  });
  const extra = [
    [ring[1], [158, 46] as const],
    [ring[4], [36, 150] as const],
    [ring[3], [100, 172] as const],
  ];
  const atoms = [
    ...ring.map((p) => ({ p, r: 13 })),
    { p: extra[0][1], r: 17 },
    { p: extra[1][1], r: 15 },
    { p: extra[2][1], r: 10 },
  ];

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="0.7" />
          <stop offset="40%" style={{ stopColor: v("sage", 0.8) }} />
          <stop offset="100%" style={{ stopColor: v("sage", 0.65) }} />
        </radialGradient>
      </defs>
      <motion.g
        style={{ originX: "100px", originY: "100px" }}
        animate={still ? undefined : { rotate: [-8, 8, -8] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        {ring.map((p, k) => {
          const q = ring[(k + 1) % 6];
          return (
            <line key={k} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} strokeWidth="4" strokeLinecap="round" style={{ stroke: v("sage", 0.6) }} />
          );
        })}
        {extra.map(([a, b], k) => (
          <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth="4" strokeLinecap="round" style={{ stroke: v("sage", 0.6) }} />
        ))}
        {atoms.map(({ p, r }, k) => (
          <circle
            key={k}
            cx={p[0]}
            cy={p[1]}
            r={r}
            fill={`url(#${id})`}
            style={{ stroke: v("sage", 0.75) }}
            strokeWidth="0.8"
          />
        ))}
      </motion.g>
    </svg>
  );
}

/* ---------- 2b. AI for science: a glass globe with a cyclone (weather) ---------- */
function spiral(cx: number, cy: number, turns: number, phase: number) {
  const pts: string[] = [];
  for (let k = 0; k <= 80; k++) {
    const th = (k / 80) * turns * 2 * Math.PI;
    const r = 3 + 4.2 * th;
    pts.push(`${(cx + r * Math.cos(th + phase)).toFixed(1)} ${(cy + r * Math.sin(th + phase)).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

function WeatherGlobe() {
  const uid = useId().replace(/:/g, "");
  const C = 100;
  const R = 78;
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id={`globe-${uid}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="50%" style={{ stopColor: v("sage", 0.38) }} />
          <stop offset="100%" style={{ stopColor: v("sage", 0.32) }} />
        </radialGradient>
        <clipPath id={`globe-clip-${uid}`}>
          <circle cx={C} cy={C} r={R} />
        </clipPath>
      </defs>

      <circle cx={C} cy={C} r={R} fill={`url(#globe-${uid})`} style={{ stroke: v("ink", 0.12) }} strokeWidth="1" />

      <g clipPath={`url(#globe-clip-${uid})`} fill="none" strokeWidth="0.8" style={{ stroke: v("ink", 0.12) }}>
        {/* parallels + meridians */}
        {[-45, -15, 15, 45].map((dy) => (
          <ellipse key={dy} cx={C} cy={C + dy} rx={Math.sqrt(R * R - dy * dy)} ry={9} />
        ))}
        {[24, 52].map((rx) => (
          <ellipse key={rx} cx={C} cy={C} rx={rx} ry={R} />
        ))}

        {/* wind streamlines */}
        {[
          "M 20 70 C 60 50, 110 60, 150 45",
          "M 30 130 C 70 120, 120 140, 175 118",
          "M 40 160 C 80 150, 120 165, 165 150",
        ].map((d, k) => (
          <motion.path
            key={k}
            d={d}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="10 14"
            style={{ stroke: v("sage", 0.75) }}
            animate={{ strokeDashoffset: [0, -48] }}
            transition={{ duration: 3 + k, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </g>

      {/* cyclone */}
      <motion.g
        style={{ originX: "108px", originY: "92px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <path d={spiral(108, 92, 1.6, 0)} fill="none" strokeWidth="2.2" strokeLinecap="round" className="stroke-white opacity-90 dark:opacity-60" />
        <path d={spiral(108, 92, 1.6, Math.PI)} fill="none" strokeWidth="1.6" strokeLinecap="round" style={{ stroke: v("sage", 0.9) }} />
        <circle cx="108" cy="92" r="3.5" style={{ fill: v("sage", 0.9) }} />
      </motion.g>

      {/* glass rim highlight */}
      <path d={`M ${C - 58} ${C - 46} A ${R} ${R} 0 0 1 ${C + 20} ${C - 76}`} fill="none" strokeWidth="2" strokeLinecap="round" className="stroke-white opacity-80 dark:opacity-30" />
    </svg>
  );
}

function Science() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute right-0 top-0 h-[54%] w-[70%]">
        <Molecule />
      </div>
      <div className="absolute bottom-0 left-0 h-[56%] w-[68%]">
        <WeatherGlobe />
      </div>
    </div>
  );
}

/* ---------- 3. Reward fine-tuning: a path bent toward a glowing target ---------- */
export function RewardPath({ still = false }: { still?: boolean }) {
  const reduce = useReducedMotion() || still;
  const uid = useId().replace(/:/g, "");
  const guided = "M 12 150 C 70 150, 70 70, 125 78 S 185 46, 208 40";
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id={`guided-${uid}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: v("accent", 0.3) }} />
          <stop offset="100%" style={{ stopColor: v("accent", 0.85) }} />
        </linearGradient>
        <radialGradient id={`glow-${uid}`}>
          <stop offset="0%" style={{ stopColor: v("highlight", 0.55) }} />
          <stop offset="100%" style={{ stopColor: v("highlight", 0) }} />
        </radialGradient>
      </defs>

      {/* where the unguided sample would have gone */}
      <path
        d="M 12 150 C 70 150, 100 120, 150 132 S 210 150, 232 160"
        fill="none"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinecap="round"
        style={{ stroke: v("accent", 0.3) }}
      />
      <motion.path
        d={guided}
        fill="none"
        stroke={`url(#guided-${uid})`}
        strokeWidth="3"
        strokeLinecap="round"
        initial={still ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.6, ease }}
      />

      {/* glowing target */}
      <circle cx="210" cy="38" r="34" fill={`url(#glow-${uid})`} />
      <motion.circle
        cx="210"
        cy="38"
        r="20"
        fill="none"
        strokeWidth="1"
        style={{ stroke: v("accent", 0.4), originX: "210px", originY: "38px" }}
        animate={still ? undefined : { scale: [1, 1.25, 1], opacity: [0.9, 0.2, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="210" cy="38" r="12" style={{ fill: v("accent", 0.18), stroke: v("accent", 0.5) }} strokeWidth="1" />
      <circle cx="210" cy="38" r="4.5" style={{ fill: v("accent", 0.95) }} />

      {/* a sample travelling along the guided path */}
      {!reduce && (
        <circle r="4" className="fill-white" style={{ stroke: v("accent", 0.9) }} strokeWidth="1.5">
          <animateMotion dur="4s" repeatCount="indefinite" path={guided} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
        </circle>
      )}
    </svg>
  );
}

/* ---------- layout ---------- */

const objects = [
  {
    id: "foundation",
    label: "Foundation Model Training",
    href: "#foundation-models",
    Art: LayerStack,
    tone: "border-indigo/50 text-indigo",
    box: { top: "0%", right: "0%", width: "54%", height: "50%" },
    labelPos: "right-0 bottom-[2%]",
    delay: 0.2,
    duration: 7,
  },
  {
    id: "science",
    label: "AI for Science",
    href: "#publications",
    topic: "AI for Science",
    Art: Science,
    tone: "border-sage/50 text-science",
    box: { top: "24%", left: "0%", width: "50%", height: "74%" },
    labelPos: "left-0 top-[4%]",
    delay: 0.35,
    duration: 8,
  },
  {
    id: "reward",
    label: "Reward Fine-tuning",
    href: "#test-time-scaling",
    Art: RewardPath,
    tone: "border-accent/40 text-accent",
    box: { bottom: "4%", right: "0%", width: "60%", height: "42%" },
    labelPos: "right-[2%] -bottom-3",
    delay: 0.5,
    duration: 9,
  },
] as const;

export default function GlassTrio() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative aspect-square w-full">
      {/* soft color behind the glass */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute right-[8%] top-[6%] h-[45%] w-[45%] rounded-full bg-indigo/10 blur-3xl" />
        <div className="absolute left-[2%] top-[38%] h-[38%] w-[38%] rounded-full bg-sage/10 blur-3xl" />
        <div className="absolute bottom-[4%] right-[10%] h-[36%] w-[44%] rounded-full bg-accent/10 blur-3xl" />
      </div>

      {objects.map((o) => (
        <motion.a
          key={o.id}
          href={o.href}
          aria-label={`${o.label} — see papers`}
          onClick={() => {
            if ("topic" in o) window.dispatchEvent(new CustomEvent("set-topic", { detail: o.topic }));
          }}
          onHoverStart={() => setHovered(o.id)}
          onHoverEnd={() => setHovered(null)}
          onFocus={() => setHovered(o.id)}
          onBlur={() => setHovered(null)}
          className="absolute block rounded-3xl outline-none"
          style={o.box}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: o.delay, ease }}
        >
          <motion.div
            className="h-full w-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: o.duration, repeat: Infinity, ease: "easeInOut", delay: o.delay }}
          >
            <motion.div
              className="h-full w-full drop-shadow-[0_16px_28px_rgb(0_0_0/0.06)]"
              animate={{ scale: hovered === o.id ? 1.05 : 1, opacity: hovered && hovered !== o.id ? 0.55 : 1 }}
              transition={{ duration: 0.35, ease }}
            >
              <o.Art />
            </motion.div>
          </motion.div>

          {/* always-visible glass title; brightens on hover */}
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered && hovered !== o.id ? 0.5 : 1, y: 0 }}
            transition={{ duration: 0.35, delay: hovered ? 0 : o.delay + 0.4 }}
            className={`pointer-events-none absolute ${o.labelPos} inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1 font-serif text-[1.05rem] italic shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)] backdrop-blur-md transition-colors duration-300 ${
              hovered === o.id
                ? `${o.tone} bg-bg/70`
                : "border-white/70 bg-white/40 text-ink/80 dark:border-white/10 dark:bg-white/5"
            }`}
          >
            {o.label}
            <FiArrowDownRight
              className={`text-[0.85rem] text-current transition-all duration-300 ${hovered === o.id ? "w-3.5 opacity-100" : "w-0 opacity-0"}`}
            />
          </motion.span>
        </motion.a>
      ))}
    </div>
  );
}
