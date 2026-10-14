"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks, profile } from "@/lib/data";
import { useActiveSection, useScrolledPast } from "@/lib/hooks";
import ThemeToggle from "./theme-toggle";

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolledPast(8);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-lg"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#about"
          className="display text-[1.7rem] text-ink"
          onClick={() => setOpen(false)}
        >
          {profile.shortName}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={clsx(
                    "relative block px-3 py-2 text-sm transition-colors",
                    active === link.id ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {link.name}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-sm ml-2"
          >
            CV
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden px-4 md:hidden"
          >
            {[...navLinks.map((l) => ({ name: l.name, href: `#${l.id}` })), { name: "CV", href: profile.cv }].map(
              (link) => (
                <li key={link.name} className="border-t border-line first:border-t-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-ink"
                  >
                    {link.name}
                  </a>
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
