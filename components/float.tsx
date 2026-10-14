"use client";

import { motion } from "framer-motion";

// Fades an element in, then lets it drift gently up and down.
export default function Float({
  children,
  className,
  style,
  delay = 0,
  drift = 5,
  duration = 7,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  drift?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -drift, 0] }}
        transition={{ duration, delay: delay + 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
