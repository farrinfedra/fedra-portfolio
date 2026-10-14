"use client";

import { motion } from "framer-motion";

// Dashed noise → data arrow plus a few drafting marks, drawn on load.
export default function Trajectory({ className }: { className?: string }) {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className}>
      {/* noise → data trajectory */}
      <motion.path
        d="M 22 27 C 26 37, 33 41, 40 43"
        className="stroke-accent"
        strokeWidth="0.35"
        strokeDasharray="1.2 1.2"
        strokeLinecap="round"
        {...draw(0.6)}
      />
      <motion.path
        d="M 38.6 41.6 L 40 43 L 38.2 43.5"
        className="stroke-accent"
        strokeWidth="0.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(2)}
      />

      {/* control nudge u_t */}
      <motion.path
        d="M 64 70 L 69 64"
        className="stroke-ink/50"
        strokeWidth="0.3"
        strokeLinecap="round"
        {...draw(1.2)}
      />
      <motion.path
        d="M 67.4 64.3 L 69 64 L 68.8 65.7"
        className="stroke-ink/50"
        strokeWidth="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(2.2)}
      />

      {/* drafting marks */}
      {[
        [8, 52],
        [92, 42],
        [44, 95],
        [82, 4],
      ].map(([x, y], i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.15 }}
          className="stroke-ink/30"
          strokeWidth="0.3"
        >
          <path d={`M ${x - 1.4} ${y} H ${x + 1.4} M ${x} ${y - 1.4} V ${y + 1.4}`} />
        </motion.g>
      ))}
      <motion.circle
        cx="93"
        cy="31"
        r="2.4"
        className="stroke-accent/70"
        strokeWidth="0.3"
        {...draw(1.4)}
      />
      <motion.circle cx="6" cy="70" r="0.9" className="fill-accent/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
    </svg>
  );
}
