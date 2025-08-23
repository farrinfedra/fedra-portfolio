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
      className="flex flex-col text-center items-center pt-12 md:flex-row md:text-left scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center md:mt-2 md:w-1/2">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src="/avatar.jpg"
              alt="Farrin portrait"
              width={300}
              height={300}
              quality="95"
              className="h-64 w-64 rounded-full shadow-2xl object-cover border-[0.20rem] border-white"
            />
          </motion.div>

          <motion.span
            className="absolute bottom-1 right-2 text-3xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            💻
          </motion.span>
        </div>
      </div>

      <motion.div
        className="flex flex-col md:w-3/5 md:mt-2 gap-y-5"
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          delay: 0.1,
          duration: 0.7,
        }}
      >
        <motion.h1 className="text-5xl font-bold mt-8 md:text-6xl  text-gray-800 dark:text-white">
          <span>Farrin Sofian</span>
        </motion.h1>
        <p className="text-2xl leading-10 tracking-tight text-slate-900 mt-4 md:text-xl space-y-4 dark:text-white">
          Hey there! 👋 I'm a second-year Ph.D. student in Computer Science at
          UC Irvine, advised by{" "}
          <a
            href="https://sites.uci.edu/mandt/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#579BB1]"
          >
            Prof. Stephan Mandt
          </a>
          .
          <br />
          <br />
          My research is supported by the{" "}
          <a
            href="https://chanzuckerberg.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#579BB1]"
          >
            Chan Zuckerberg Initiative
          </a>{" "}
          and focuses on generative models, specifically on developing efficient
          guidance methods across different modalities with diffusion models.
        </p>

        <motion.div
          className="flex mt-5 sm:flex-row items-center justify-center gap-2 text-lg font-medium
                      md:justify-start md:gap-4 md:mt-10 md:text-lg"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
          }}
        >
          <a
            className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
            href="/Farrin_CV.pdf"
            download
          >
            Download CV{" "}
            <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
          </a>

          <a
            className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://www.linkedin.com/in/farrin-marouf-sofian/"
            target="_blank"
          >
            <BsLinkedin />
          </a>

          <a
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://github.com/farrinfedra"
            target="_blank"
          >
            <FaGithubSquare />
          </a>

          <a
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://github.com/farrinfedra"
            target="_blank"
          >
            <SiGooglescholar />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
