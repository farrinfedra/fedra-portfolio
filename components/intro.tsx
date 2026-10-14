"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

export default function Intro() {
  return (
    <section
      // ref={ref}
      id="home"
      className="mx-auto flex max-w-4xl flex-col items-center text-center pt-6 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <Image
              src="/avatar.jpg"
              alt="Farrin portrait"
              width={300}
              height={300}
              quality="95"
              className="h-44 w-44 rounded-full shadow-2xl object-cover border-[0.20rem] border-white md:h-52 md:w-52 dark:border-white/90"
            />
          </motion.div>

          <motion.span
            className="absolute bottom-1 right-2 text-3xl"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.12, ease: "easeOut" }}
          >
            💻
          </motion.span>
        </div>
      </div>

      <motion.div
        className="flex max-w-3xl flex-col items-center gap-y-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, delay: 0.08, ease: "easeOut" }}
      >
        <motion.h1 className="text-4xl font-bold mt-6 md:text-6xl text-[#1d1d1f] dark:text-white">
          <span>Farrin Sofian</span>
        </motion.h1>
        <p className="text-base leading-7 tracking-tight text-[#424245] mt-2 md:text-lg md:leading-8 dark:text-[#a1a1a6]">
          Hey there! 👋 I'm a third-year Ph.D. student in Computer Science at
          UC Irvine, advised by{" "}
          <a
            href="https://sites.uci.edu/mandt/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0071e3] dark:text-[#2997ff]"
          >
            Prof. Stephan Mandt
          </a>
          .
          <br />
          <br />
          My research focuses on controllable and scalable generative AI across
          audio, text, image, and video, including diffusion models,
          reward-guided generation, editable systems, and efficient
          language-model decoding.
          <br />
          <br />I have publications at ICML, ICLR, and NeurIPS, and have worked
          on scientific diffusion applications at the{" "}
          <a
            href="https://chanzuckerberg.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0071e3] dark:text-[#2997ff]"
          >
            Chan Zuckerberg Initiative
          </a>
          , large-scale ML systems at Adobe, and Turkey's first bird-song
          identification mobile application.
        </p>

        <motion.div
          className="flex mt-5 sm:flex-row items-center justify-center gap-2 text-lg font-medium
                      md:gap-4 md:mt-6 md:text-lg"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.18, ease: "easeOut" }}
        >
          <a
            className="group bg-[#1d1d1f] text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-[#0071e3] active:scale-105 transition cursor-pointer border border-transparent dark:!bg-white dark:!text-black dark:hover:!bg-[#2997ff]"
            href="/Farrin_CV.pdf"
            download
          >
            Download CV{" "}
            <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
          </a>

          <a
            className="bg-white p-4 text-[#424245] hover:bg-[#0071e3] hover:text-white flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer border border-[#d2d2d7] shadow-sm dark:!border-white/10 dark:!bg-white/10 dark:!text-white/70 dark:hover:!border-[#2997ff]/60 dark:hover:!bg-[#2997ff] dark:hover:!text-black"
            href="https://www.linkedin.com/in/farrin-marouf-sofian/"
            target="_blank"
          >
            <BsLinkedin />
          </a>

          <a
            className="bg-white p-4 text-[#424245] flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:bg-[#0071e3] hover:text-white active:scale-105 transition cursor-pointer border border-[#d2d2d7] shadow-sm dark:!border-white/10 dark:!bg-white/10 dark:!text-white/70 dark:hover:!border-[#2997ff]/60 dark:hover:!bg-[#2997ff] dark:hover:!text-black"
            href="https://github.com/farrinfedra"
            target="_blank"
          >
            <FaGithubSquare />
          </a>

          <a
            className="bg-white p-4 text-[#424245] flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:bg-[#0071e3] hover:text-white active:scale-105 transition cursor-pointer border border-[#d2d2d7] shadow-sm dark:!border-white/10 dark:!bg-white/10 dark:!text-white/70 dark:hover:!border-[#2997ff]/60 dark:hover:!bg-[#2997ff] dark:hover:!text-black"
            href="https://scholar.google.com/citations?user=5tljxLMAAAAJ&hl=en"
            target="_blank"
          >
            <SiGooglescholar />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
