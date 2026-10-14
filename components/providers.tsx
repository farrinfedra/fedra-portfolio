"use client";

import { MotionConfig } from "framer-motion";
import ThemeContextProvider from "@/context/theme-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      {/* Respects the visitor's "reduce motion" OS setting */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContextProvider>
  );
}
