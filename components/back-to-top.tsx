"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { useScrolledPast } from "@/lib/hooks";

export default function BackToTop() {
  const show = useScrolledPast(700);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-lg shadow-black/5 backdrop-blur transition-colors hover:border-accent/50 hover:text-accent sm:bottom-8 sm:right-8"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
