"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiCopy, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiGooglescholar } from "react-icons/si";
import { profile, socials } from "@/lib/data";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";

const elsewhere = [
  { label: "Google Scholar", href: socials.scholar, icon: SiGooglescholar },
  { label: "GitHub", href: socials.github, icon: FaGithub },
  { label: "LinkedIn", href: socials.linkedin, icon: FaLinkedin },
  { label: "X / Twitter", href: socials.x, icon: FaXTwitter },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <SectionHeading index="03" title="Get in touch" />

      <Reveal className="grid gap-10 rounded-3xl border border-line bg-surface p-6 sm:p-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="max-w-md space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m always happy to talk about research collaborations or new
              opportunities.
            </p>
            <p>
              If you&apos;re a woman in STEM and would like guidance, a sounding
              board, or just a chat, please reach out. Supporting other women in
              the field means a lot to me, wherever you are in your journey.
            </p>
            <p>Email is the best way to reach me.</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary"
            >
              <FiMail />
              {profile.email}
            </a>
            <button
              onClick={copy}
              aria-label="Copy email address"
              className="btn-outline relative overflow-hidden px-4"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "copy"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  {copied ? "Copied" : "Copy"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">
            Elsewhere
          </p>
          <ul className="divide-y divide-line">
            {elsewhere.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3 text-ink transition-colors hover:text-accent"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="text-muted transition-colors group-hover:text-accent" />
                    {label}
                  </span>
                  <span className="text-faint transition-transform group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
