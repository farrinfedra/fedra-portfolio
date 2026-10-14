"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowDownRight, FiFileText, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
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
            steering pretrained models at{" "}
            <strong className="font-semibold text-accent">test time</strong>,{" "}
            <strong className="font-semibold text-accent">fine-tuning toward rewards</strong>,
            and designing new ways to train{" "}
            <strong className="font-semibold text-indigo">foundation models</strong>,
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
              title={label}
              className="group btn-outline h-10 gap-0 px-[0.7rem] py-0 text-[0.9rem]"
            >
              <Icon className="h-[1.1rem] w-[1.1rem] shrink-0" />
              {/* label slides open on hover / keyboard focus */}
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:ml-2 group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100">
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
