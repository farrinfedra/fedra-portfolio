"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowDownRight, FiFileText, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { profile, socials } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

const linkButtons = [
  { label: "Google Scholar", href: socials.scholar, icon: SiGooglescholar },
  { label: "GitHub", href: socials.github, icon: FaGithub },
  { label: "LinkedIn", href: socials.linkedin, icon: FaLinkedin },
  { label: "X", href: socials.x, icon: FaXTwitter },
  { label: "Email", href: `mailto:${profile.email}`, icon: FiMail },
];

export default function Hero({ board }: { board: React.ReactNode }) {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-12 px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_30rem] lg:gap-16 lg:pt-36"
    >
      <div>
        <motion.div
          {...fadeUp(0)}
          className="relative mb-8 h-24 w-24 overflow-hidden rounded-full ring-1 ring-line sm:h-28 sm:w-28"
        >
          <Image
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="112px"
            priority
            className="object-cover"
          />
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="display text-5xl leading-[1.05] text-ink sm:text-6xl md:text-7xl"
        >
          Farrin <span className="text-accent">Marouf Sofian</span>
        </motion.h1>

        <motion.div
          {...fadeUp(0.16)}
          className="mt-6 max-w-xl space-y-4 text-[1.08rem] font-[450] leading-relaxed text-ink/80"
        >
          <p>
            I&apos;m an early fourth-year Ph.D. student at UC Irvine, advised by{" "}
            <a
              href={profile.advisor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Prof. {profile.advisor.name}
            </a>{" "}
            and supported by the Chan Zuckerberg Initiative.
          </p>
          <p>
            I work on generative modeling with{" "}
            <strong className="font-semibold text-ink">diffusion models</strong>:
            designing new{" "}
            <strong className="font-semibold text-indigo">foundation models</strong>,
            conditional sampling via{" "}
            <strong className="font-semibold text-accent">test-time steering</strong>,
            and{" "}
            <strong className="font-semibold text-accent">reward-guided fine-tuning</strong>,
            with applications from images and language to{" "}
            <strong className="font-semibold text-sage">science</strong>. Previously, I was an AI
            Resident at the{" "}
            <a
              href="https://chanzuckerberg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Chan Zuckerberg Initiative
            </a>{" "}
            and at Adobe.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-wrap items-center gap-2">
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-10 px-4 py-0 text-[0.9rem]"
          >
            <FiFileText />
            CV
          </a>
          {linkButtons.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="group btn-outline relative h-10 w-10 justify-center p-0"
            >
              <Icon className="h-[1.1rem] w-[1.1rem] shrink-0" />
              {/* name fades in below the icon on hover / keyboard focus; the button itself never resizes */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 -translate-y-1 whitespace-nowrap text-xs font-medium text-muted opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                {label}
              </span>
            </a>
          ))}
        </motion.div>

        <motion.a
          {...fadeUp(0.4)}
          href="#publications"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-faint transition-colors hover:text-accent"
        >
          Jump to publications <FiArrowDownRight />
        </motion.a>
      </div>

      <div className="hidden lg:block">{board}</div>
    </section>
  );
}
