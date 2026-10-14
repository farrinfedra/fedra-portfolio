"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { FiChevronDown, FiGlobe, FiPenTool } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { SiArxiv } from "react-icons/si";
import { publicationGroups, type Publication, type Tag } from "@/lib/data";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import { LayerStack, RewardPath, WeatherGlobe } from "./glass-trio";

// Each category reuses its artwork and color from the intro.
type Artwork = { Art: React.ComponentType<{ still?: boolean }>; glow: string; size: string };

const groupThemes: Record<string, { arts: Artwork[]; card: string; index: string }> = {
  "foundation-models": {
    arts: [{ Art: LayerStack, glow: "bg-indigo/10", size: "h-24 w-32" }],
    card: "border-indigo/20 bg-indigo/[0.04] hover:border-indigo/40",
    index: "text-indigo",
  },
  "test-time-scaling": {
    // reward path + the weather globe (this group holds the weather / data assimilation paper)
    arts: [
      { Art: RewardPath, glow: "bg-accent/10", size: "h-24 w-32" },
      { Art: WeatherGlobe, glow: "bg-sage/10", size: "h-20 w-20" },
    ],
    card: "border-accent/20 bg-accent/[0.04] hover:border-accent/40",
    index: "text-accent",
  },
};
const neutralTheme = {
  arts: [] as Artwork[],
  card: "border-line bg-surface hover:border-ink/20",
  index: "text-accent",
};

const SELF = "F. M. Sofian";
const ease = [0.22, 1, 0.36, 1] as const;

const allTags = Array.from(
  new Set(publicationGroups.flatMap((g) => g.papers.flatMap((p) => p.tags)))
) as Tag[];
const totalPapers = publicationGroups.reduce((n, g) => n + g.papers.length, 0);

// Year comes from the venue label, e.g. "NeurIPS 2026" or "Preprint 2024".
const paperYear = (p: Publication) => Number(p.venue.match(/\d{4}/)?.[0] ?? 0);
const allYears = Array.from(
  new Set(publicationGroups.flatMap((g) => g.papers.map(paperYear)))
).sort((x, y) => y - x);

function Authors({ authors }: { authors: string }) {
  return (
    <p className="text-sm leading-relaxed text-muted">
      {authors.split(new RegExp(`(${SELF.replace(/\./g, "\\.")}\\*?)`)).map((part, i) =>
        part.startsWith(SELF) ? (
          <span key={i} className="font-semibold text-ink">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

function TagPill({ tag, active }: { tag: Tag; active?: boolean }) {
  const science = tag === "AI for Science";
  return (
    <span
      className={clsx(
        "rounded-full px-2.5 py-0.5 text-xs",
        science ? "bg-sage/[0.14] font-medium text-sage" : "bg-ink/[0.05] text-muted",
        active && "ring-1 ring-current"
      )}
    >
      {tag}
    </span>
  );
}

const linkClass =
  "btn btn-sm gap-1.5 border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bg";

function PaperLinks({
  paper,
  open,
  onToggle,
}: {
  paper: Publication;
  open: boolean;
  onToggle: () => void;
}) {
  const { links } = paper;
  const items = [
    links.arxiv && { label: "arXiv", href: links.arxiv, icon: SiArxiv },
    links.github && { label: "Code", href: links.github, icon: FaGithub },
    links.project && { label: "Project", href: links.project, icon: FiGlobe },
    links.blog && { label: "Blog", href: links.blog, icon: FiPenTool },
  ].filter(Boolean) as { label: string; href: string; icon: React.ElementType }[];

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {paper.abstract && (
        <button onClick={onToggle} aria-expanded={open} className={linkClass}>
          Abstract
          <FiChevronDown
            className={clsx("transition-transform duration-300", open && "rotate-180")}
          />
        </button>
      )}
      {items.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
      {links.arxivSoon && !links.arxiv && (
        <span className="btn btn-sm cursor-default gap-1.5 border border-dashed border-ink/25 font-normal text-faint">
          <SiArxiv className="h-3.5 w-3.5" />
          arXiv coming soon
        </span>
      )}
    </div>
  );
}

function PaperCard({
  paper,
  activeTags,
  cardClass,
}: {
  paper: Publication;
  activeTags: Tag[];
  cardClass: string;
}) {
  const [open, setOpen] = useState(false);
  const published = paper.status === "published";

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease }}
      className={`rounded-2xl border p-5 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_12px_32px_-16px_rgb(0_0_0/0.18)] sm:p-6 ${cardClass}`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          title={paper.venueFull}
          className={clsx(
            "rounded-md px-2 py-0.5 font-mono text-[0.76rem] font-bold",
            published ? "bg-accent/10 text-accent" : "border border-line text-faint"
          )}
        >
          {paper.venue}
        </span>
        {paper.tags.map((t) => (
          <TagPill key={t} tag={t} active={activeTags.includes(t)} />
        ))}
      </div>

      <h4 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
        {paper.title}
      </h4>
      <div className="mt-1.5">
        <Authors authors={paper.authors} />
      </div>

      <div className="mt-4 flex gap-3 rounded-xl border border-line bg-bg px-4 py-3">
        <span className="mt-[0.2rem] shrink-0 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-accent">
          TL;DR
        </span>
        <p className="text-[0.95rem] leading-relaxed text-ink/85">{paper.oneLiner}</p>
      </div>

      <PaperLinks paper={paper} open={open} onToggle={() => setOpen((o) => !o)} />

      <AnimatePresence initial={false}>
        {open && paper.abstract && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-l-2 border-accent/30 pl-4 text-sm leading-relaxed text-muted">
              {paper.abstract}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function FilterChips<T extends string | number>({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: T[];
  selected: T[];
  onChange: React.Dispatch<React.SetStateAction<T[]>>;
}) {
  const toggle = (o: T) =>
    onChange((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));

  const chip = (key: string, text: string, on: boolean, onClick: () => void) => (
    <button
      key={key}
      onClick={onClick}
      aria-pressed={on}
      className={clsx(
        "rounded-full border px-3 py-1 text-xs transition-colors duration-200",
        on
          ? "border-ink bg-ink text-bg"
          : "border-line text-muted hover:border-ink/30 hover:text-ink"
      )}
    >
      {text}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p className="w-14 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
        {chip("all", "All", selected.length === 0, () => onChange([]))}
        {options.map((o) => chip(String(o), String(o), selected.includes(o), () => toggle(o)))}
      </div>
    </div>
  );
}

export default function Publications() {
  const [topics, setTopics] = useState<Tag[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const filtering = topics.length > 0 || years.length > 0;

  // Lets other parts of the page (e.g. the intro visual) pre-select a topic.
  useEffect(() => {
    const onTopic = (e: Event) => {
      setTopics([(e as CustomEvent<Tag>).detail]);
      setYears([]);
    };
    window.addEventListener("set-topic", onTopic);
    return () => window.removeEventListener("set-topic", onTopic);
  }, []);

  const groups = useMemo(
    () =>
      publicationGroups
        .map((g) => ({
          ...g,
          // any selected topic AND any selected year
          papers: g.papers.filter(
            (p) =>
              (topics.length === 0 || p.tags.some((t) => topics.includes(t))) &&
              (years.length === 0 || years.includes(paperYear(p)))
          ),
        }))
        .filter((g) => g.papers.length > 0),
    [topics, years]
  );
  const shown = groups.reduce((n, g) => n + g.papers.length, 0);
  const clearAll = () => {
    setTopics([]);
    setYears([]);
  };

  return (
    <section id="publications" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <SectionHeading index="02" title="Publications">
        <p className="font-mono text-xs text-faint">
          {totalPapers} papers
        </p>
      </SectionHeading>

      <Reveal className="mb-6 space-y-3">
        <FilterChips label="Topic" options={allTags} selected={topics} onChange={setTopics} />
        <FilterChips label="Year" options={allYears} selected={years} onChange={setYears} />
        <div className="flex h-5 items-center gap-3 font-mono text-xs text-faint">
          {filtering && (
            <>
              <span>
                Showing {shown} of {totalPapers}
              </span>
              <button onClick={clearAll} className="text-accent underline-offset-4 hover:underline">
                Clear filters
              </button>
            </>
          )}
        </div>
      </Reveal>

      {shown === 0 && (
        <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center text-muted">
          No papers match these filters.{" "}
          <button onClick={clearAll} className="text-accent underline underline-offset-4">
            Clear filters
          </button>
        </div>
      )}

      <AnimatePresence mode="popLayout" initial={false}>
        {groups.map((group) => {
          const index = publicationGroups.findIndex((g) => g.id === group.id) + 1;
          const hasEqual = group.papers.some((p) => p.authors.includes("*"));
          const theme = groupThemes[group.id] ?? neutralTheme;
          return (
            <motion.div
              key={group.id}
              id={group.id}
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid scroll-mt-24 gap-6 border-t border-line py-12 lg:grid-cols-[15rem_1fr] lg:gap-14"
            >
              {/* Category: stays pinned while its papers scroll by */}
              <Reveal className="lg:sticky lg:top-24 lg:self-start">
                {theme.arts.length > 0 && (
                  <div aria-hidden className="mb-6 flex items-end gap-4">
                    {theme.arts.map(({ Art, glow, size }, i) => (
                      <div key={i} className={`relative ${size}`}>
                        <div className={`absolute inset-2 rounded-full blur-2xl ${glow}`} />
                        <div className="relative h-full w-full">
                          <Art still />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <p className={`mb-3 font-mono text-sm font-bold tracking-[0.15em] ${theme.index}`}>
                  {String(index).padStart(2, "0")}
                </p>
                <h3 className="display text-[2rem] leading-[1.1] text-ink [text-wrap:balance]">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{group.description}</p>
              </Reveal>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {group.papers.map((paper) => (
                    <PaperCard
                      key={paper.title}
                      paper={paper}
                      activeTags={topics}
                      cardClass={theme.card}
                    />
                  ))}
                </AnimatePresence>
                {hasEqual && (
                  <p className="pt-1 text-right text-sm text-muted">* Equal contribution</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </section>
  );
}
