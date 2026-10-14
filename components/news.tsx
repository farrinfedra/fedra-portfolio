"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import { news, type NewsItem } from "@/lib/data";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";

const VISIBLE = 5;

const kindStyles: Record<NewsItem["kind"], string> = {
  paper: "text-accent",
  honor: "text-science",
  career: "text-muted",
};

const kindLabels: Record<NewsItem["kind"], string> = {
  paper: "Paper",
  honor: "Honor",
  career: "Career",
};

function NewsRow({ item }: { item: NewsItem }) {
  const external = item.href?.startsWith("http");
  const body = (
    <>
      {item.text}
      {item.href && (
        <FiArrowUpRight className="ml-1 inline -translate-y-px opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </>
  );

  return (
    <li className="grid gap-1 border-t border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <div className="flex items-baseline gap-3 font-mono text-xs sm:flex-col sm:gap-1">
        <span className="text-faint">{item.date}</span>
        <span className={clsx("uppercase tracking-wider", kindStyles[item.kind])}>
          {kindLabels[item.kind]}
        </span>
      </div>
      {item.href ? (
        <a
          href={item.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group leading-relaxed text-ink transition-colors hover:text-accent"
        >
          {body}
        </a>
      ) : (
        <p className="leading-relaxed text-ink">{body}</p>
      )}
    </li>
  );
}

export default function News() {
  const [expanded, setExpanded] = useState(false);
  const first = news.slice(0, VISIBLE);
  const rest = news.slice(VISIBLE);

  return (
    <section id="news" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <SectionHeading index="01" title="News & Honors" />

      <Reveal>
        <div className="border-b border-line">
          <ul>
            {first.map((item) => (
              <NewsRow key={item.date + item.text} item={item} />
            ))}
          </ul>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                {rest.map((item) => (
                  <NewsRow key={item.date + item.text} item={item} />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {rest.length > 0 && (
          <button
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            {expanded ? "Show less" : `Show all ${news.length}`}
            <FiChevronDown
              className={clsx("transition-transform duration-300", expanded && "rotate-180")}
            />
          </button>
        )}
      </Reveal>
    </section>
  );
}
