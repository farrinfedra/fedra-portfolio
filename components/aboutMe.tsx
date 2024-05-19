"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { FaGraduationCap } from "react-icons/fa6";
import { SlUserFemale } from "react-icons/sl";

export default function AboutMe() {
  return (
    <motion.section
      className="mt-32 mb-28 max-w-[55rem] leading-8 sm:mb-40 scroll-mt-28 font-sans font-medium"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="aboutme"
    >
      <div className="bg-gradient-to-b from-gray-100 rounded-lg py-12">
      <SectionHeading>About</SectionHeading>

      {/* Removed flex-row to ensure single-column layout at all sizes */}
      <div className="space-y-12">
        <div className="flex w-full justify-center items-center flex-col">
          <div className="flex mt-4 mb-4 items-center justify-center space-x-2">
            <a
              className="mx-auto"
              href="#"
              target="_blank"
            >
              <SlUserFemale className="h-8 w-8" />
            </a>
            <span className="text-lg font-semibold">Me</span>
          </div>
          <p className="px-12 font-lg ">I currently work on Generative AI under the supervision
           of <a href="http://www.stephanmandt.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
              Prof. Stephan Mandt
            </a>. Previously, I worked on audio-based image generation, audio resynthesis and classification, 
           and creating the first extensive dataset for Grammatical Error Correction in Turkish. <br />

          Fun facts: My initial interest with AI started with the vision of creating a DJ AI, a passion I'm still pursuing. 
          So, if you share this interest, don't hesitate to reach out! <br />
          I'm fluent in English, Persian, and Turkish, and have been learning German for the past two years. 
          In my leisure time, I enjoy cooking, immersing myself in electronic music, swimming, and discovering new cuisines and restaurants.</p>
        </div>

        <div className="flex w-full justify-center items-center flex-col">
          <div className="mt-4 mb-4 flex items-center justify-center space-x-2">
            <a
              className="mx-auto"
              href="#"
              target="_blank"
            >
              <FaGraduationCap className="h-8 w-8" />
            </a>
            <span className="text-lg font-semibold ">Education</span>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li> <span className="font-bold">M.S.</span> in Computer Science from the University of California, Irvine <span className="italic">(September 2023 - Present)</span></li>
            <li><span className="font-bold">B.S.</span> in Computer Science and <span className="font-bold">minor</span> in Mathematics from Koç University, Istanbul, Turkey <span className="italic">(2019 - 2023)</span></li>
          </ul>
        </div>
      </div>
      </div>
    </motion.section>
  );
}
