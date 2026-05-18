"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FIcon } from "@/components/icon";
import Link from "next/link";
import { links } from "@/lib/data";
import clsx from "clsx";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useTheme } from "@/context/theme-context";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { theme, toggleTheme } = useTheme();

  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed left-1/2 top-3 h-16 w-[calc(100%_-_1rem)] max-w-[72rem]
        rounded-full border border-white/70 bg-white/75 shadow-lg
        shadow-black/[0.08] backdrop-blur-[1rem] dark:border-white/10
        dark:bg-[#141414]/75 dark:shadow-black/40"
        initial={{ opacity: 0, y: -12, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      ></motion.div>
      <nav className="fixed left-1/2 top-3 w-[calc(100%_-_1rem)] max-w-[72rem] -translate-x-1/2 sm:rounded-full">
        <div className="flex h-16 flex-row items-center justify-between px-4 sm:px-6">
          {/* Logo goes here */}
          <div className="flex shrink-0">
            <Link href="#">
              <FIcon />
            </Link>
          </div>

          {/* Primary Navbar goes here */}
          <ul className="hidden sm:flex flex-row gap-1 items-center text-[#6e6e73] dark:text-[#a1a1a6] font-medium">
            {links.map((link) => (
              <motion.li
                key={link.hash}
                className={clsx("hover:text-[#0071e3] dark:hover:text-[#2997ff] transition relative rounded-full px-4 py-2", {
                  "text-[#1d1d1f] dark:text-white": activeSection === link.name,
                })}
              >
                <Link
                  href={link.hash}
                  onClick={() => setActiveSection(link.name)}
                >
                  {link.name}
                  {link.name === activeSection && (
                    <motion.span
                      className="bg-white dark:bg-white/10 rounded-full absolute inset-0 -z-30 shadow-sm dark:shadow-none"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="hidden rounded-full border border-[#d2d2d7] bg-white/70 p-3 text-[#1d1d1f] shadow-sm transition hover:border-[#0071e3]/40 hover:bg-[#0071e3] hover:text-white sm:flex dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-[#2997ff]/50 dark:hover:bg-[#2997ff] dark:hover:text-black"
          >
            {theme === "dark" ? <BsSun /> : <BsMoonStars />}
          </button>
          {/* Mobile menu trigger */}
          <div className="sm:hidden flex items-center justify-end gap-2">
            <button
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="rounded-full border border-[#d2d2d7] bg-white/70 p-3 text-[#1d1d1f] shadow-sm transition hover:border-[#0071e3]/40 hover:bg-[#0071e3] hover:text-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-[#2997ff]/50 dark:hover:bg-[#2997ff] dark:hover:text-black"
            >
              {theme === "dark" ? <BsSun /> : <BsMoonStars />}
            </button>
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="rounded-full border border-[#d2d2d7] bg-white/70 p-3 text-[#1d1d1f] shadow-sm transition hover:border-[#0071e3]/40 hover:bg-[#0071e3] hover:text-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-[#2997ff]/50 dark:hover:bg-[#2997ff] dark:hover:text-black"
            >
              {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
          {/* Mobile menu */}
        </div>

        {isMenuOpen && (
          <ul className="sm:hidden mx-2 mt-3 flex flex-col gap-1 rounded-2xl border border-[#d2d2d7] bg-white/95 p-2 shadow-2xl shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-[#141414]/95 dark:shadow-black/40">
            {links.map((link) => (
              <li key={link.hash}>
                <Link
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setMenuOpen(false);
                  }}
                  className="block rounded-xl px-4 py-3 text-center font-medium text-[#424245] transition hover:bg-[#f5f5f7] hover:text-[#0071e3] dark:text-[#f5f5f7] dark:hover:bg-white/10 dark:hover:text-[#2997ff]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
