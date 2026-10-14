"use client";

import React from "react";
import { motion } from "framer-motion";

type Publication = {
  title: string;
  date: string;
  venue: string;
  type: string;
  authors: string;
  links: { label: string; url?: string }[]; // no url = shown as a non-clickable "coming soon" tag
};

const publications: Publication[] = [
  {
    title: "Hierarchical Variational Policies for Reward-Guided Diffusion",
    date: "2026",
    venue: "Neural Information Processing Systems (NeurIPS)",
    type: "Conference",
    authors: "K. Pandey*, F. M. Sofian*, J. Groeneveld, F. Draxler, S. Mandt",
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2605.21661" }],
  },
  {
    title: "Variational Test-time Optimization for Diffusion Synchronization",
    date: "2026",
    venue: "Pre-print",
    type: "Pre-print",
    authors: "H. Lee*, F. M. Sofian*, K. Pandey, S. Mandt",
    links: [{ label: "arXiv", url: "https://arxiv.org/pdf/2606.15614" }],
  },
  {
    title: "Representation-Augmented Diffusions",
    date: "2026",
    venue: "Pre-print",
    type: "Pre-print",
    authors: "F. M. Sofian*, K. Pandey*, S. Mandt",
    links: [{ label: "arXiv (coming soon)" }],
  },
  {
    title: "Parallel Language Models via Variational Decoding",
    date: "2026",
    venue: "Pre-print",
    type: "Pre-print",
    authors:
      "F. Draxler*, R. C. Geyer*, D. Geyfman*, F. M. Sofian*, J. Will*, et al.",
    links: [{ label: "arXiv (coming soon)" }],
  },
  {
    title: "Control-Augmented Autoregressive Diffusion for Data Assimilation",
    date: "2026",
    venue: "Neural Information Processing Systems (NeurIPS)",
    type: "Conference",
    authors: "P. Srivastava, F. M. Sofian, F. Immorlano, K. Pandey, S. Mandt",
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2510.06637" }],
  },
  {
    title: "Parallel Token Generation for Language Models",
    date: "2026",
    venue: "International Conference on Learning Representations (ICLR)",
    type: "Conference",
    authors: "F. Draxler, J. Will, F. M. Sofian, T. Karaletsos, S. Mandt",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2512.21323" },
      { label: "GitHub", url: "https://github.com/mandt-lab/ptp" },
    ],
  },
  {
    title: "Variational Control for Guidance in Diffusion Models",
    date: "2025",
    venue: "International Conference on Machine Learning (ICML)",
    type: "Conference",
    authors: "K. Pandey*, F. M. Sofian*, F. Draxler, T. Karaletsos, S. Mandt",
    links: [
      { label: "arXiv", url: "https://arxiv.org/pdf/2502.03686" },
      { label: "GitHub", url: "https://github.com/czi-ai/oc-guidance" },
    ],
  },
  {
    title:
      "SonicDiffusion: Audio-Driven Image Generation and Editing with Pretrained Diffusion Models",
    date: "2024",
    venue: "ACM Transactions on Graphics (TOG)",
    type: "Journal",
    authors:
      "B. C. Biner, F. M. Sofian, U. B. Karakaş, D. Ceylan, E. Erdem, et al.",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2405.00878" },
      {
        label: "GitHub",
        url: "https://github.com/BurakCanBiner/SonicDiffusion",
      },
    ],
  },
  {
    title:
      "GECTurk: Grammatical Error Correction and Detection Dataset for Turkish",
    date: "2023",
    venue: "IJCNLP-AACL",
    type: "Conference",
    authors: "A. Kara, F. M. Sofian, A. Bond, G. G. Sahin",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2309.11346" },
      { label: "GitHub", url: "https://github.com/GGLAB-KU/gecturk" },
    ],
  },
];

// Helper function to bold "F. M. Sofian" inside authors string
function formatAuthors(authors: string) {
  const parts = authors.split(/(F\. M\. Sofian)/);
  return parts.map((part, idx) =>
    part === "F. M. Sofian" ? (
      <strong key={idx} className="font-bold text-gray-900 dark:text-white">
        {part}
      </strong>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
}

export default function Publications() {
  return (
    <motion.section
      id="publications"
      className="flex flex-col w-full mt-40 mx-auto space-y-24 max-w-[65rem] px-4 md:px-0 mb-48 scroll-mt-32"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <h2 className="text-center text-3xl font-bold">📚 Publications</h2>

      <div className="relative border-l-2 border-[#d2d2d7] pl-6 space-y-20 mx-auto dark:border-white/10">
        {publications.map((pub, index) => (
          <div
            key={index}
            className="ml-2 grid grid-cols-1 gap-4 items-start sm:grid-cols-[120px_1fr] sm:gap-6"
          >
            {/* Left: Type Tag */}
            <div>
              <span className="inline-block bg-white dark:bg-white/10 text-[#6e6e73] dark:text-[#a1a1a6] text-sm font-semibold px-4 py-1 rounded-full text-center shadow-sm dark:shadow-none">
                {pub.type}
              </span>
            </div>

            {/* Right: Title + Authors + Venue + Links */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white">
                {pub.title}
              </h3>
              <p className="text-md text-[#424245] dark:text-[#d2d2d7]">
                {formatAuthors(pub.authors)}
              </p>
              <p className="text-md italic text-[#6e6e73] dark:text-[#a1a1a6]">
                {pub.venue}, {pub.date}
              </p>

              {pub.links.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {pub.links.map((link, idx) =>
                    !link.url ? (
                      <span
                        key={idx}
                        className="bg-[#e8e8ed] text-[#6e6e73] dark:bg-white/5 dark:text-[#a1a1a6] px-3 py-1 rounded-full text-sm font-medium cursor-default"
                      >
                        {link.label}
                      </span>
                    ) : (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="bg-[#1d1d1f] text-white hover:bg-[#0071e3] dark:bg-white/10 dark:text-[#2997ff] dark:hover:bg-[#2997ff] dark:hover:text-black px-3 py-1 rounded-full text-sm font-medium transition"
                    >
                      {link.label}
                    </a>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
