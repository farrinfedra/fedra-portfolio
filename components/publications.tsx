"use client";

import React from "react";
import { motion } from "framer-motion";

const publications = [
  {
    title: "Variational Control for Guidance in Diffusion Models",
    date: "2025",
    venue: "Preprint - Under Review",
    type: "Preprint",
    authors: "K. Pandey*, F. M. Sofian*, F. Draxler, T. Karaletsos, S. Mandt",
    links: [
      { label: "arXiv", url: "https://arxiv.org/pdf/2502.03686" },
      { label: "GitHub", url: "https://github.com/farrinfedra" },
    ],
  },
  {
    title: "SonicDiffusion: Audio-Driven Image Generation and Editing",
    date: "2024",
    venue: "ACM Transactions on Graphics (TOG)",
    type: "Conference",
    authors: "B. C. Biner, F. M. Sofian, U. B. Karakaş, D. Ceylan, E. Erdem, et al.",
    links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2405.00878" },
        { label: "GitHub", url: "https://github.com/BurakCanBiner/SonicDiffusion" }
    ],
  },
  {
    title: "GECTurk: Grammatical Error Correction Dataset for Turkish",
    date: "2023",
    venue: "IJCNLP-AACL",
    type: "Conference",
    authors: "A. Kara, F. M. Sofian, A. Bond, G. G. Sahin",
    links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2309.11346" },
        { label: "GitHub", url: "https://github.com/GGLAB-KU/gecturk" }
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
      className="flex flex-col w-full mt-40 mx-auto space-y-24 max-w-[65rem] px-4 md:px-0 mb-48"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <h2 className="text-center text-3xl font-bold">📚 Publications</h2>

      <div className="relative border-l-2 border-gray-300 pl-6 space-y-20 mx-auto">
        {publications.map((pub, index) => (
          <div key={index} className="ml-2 grid grid-cols-[120px_1fr] gap-6 items-start">
            {/* Left: Type Tag */}
            <div>
              <span className="inline-block bg-gray-200 dark:bg-white/20 text-gray-700 dark:text-gray-300 text-sm font-semibold px-4 py-1 rounded-full text-center">
                {pub.type}
              </span>
            </div>

            {/* Right: Title + Authors + Venue + Links */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {pub.title}
              </h3>
              <p className="text-md text-gray-700 dark:text-gray-300">
                {formatAuthors(pub.authors)}
              </p>
              <p className="text-md italic text-gray-500">
                {pub.venue}, {pub.date}
              </p>

              <div className="flex gap-2 mt-2 flex-wrap">
                {pub.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white hover:bg-[#89A8B2] dark:bg-white/10 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
