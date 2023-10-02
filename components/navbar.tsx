"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FIcon } from "@/components/icon";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBeer } from "react-icons/fa";
import Link from "next/link";
import { links } from "@/lib/data";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem]
        w-full rounded-none border border-white 
        border-opacity-40 bg-white bg-opacity-80 shadow-lg 
        shadow-black/[0.08] backdrop-blur-[0.5rem] 
        sm:top-3 sm:h-[4rem] sm:w-full sm:rounded-full sm:left-4/5 dark:bg-gray-950
        dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", scale: 0 }}
        animate={{ y: 0, x: "-50%", scale: 1 }}
      ></motion.div>
      <nav className="fixed top-[1.3rem] w-full max-h-fit sm:rounded-full">
        <div className="flex flex-row mx-6 items-center justify-between ">
          {/* Logo goes here */}
          <div className="hidden sm:flex">
            <Link href="#">
              <FIcon />
            </Link>
          </div>

          {/* Primary Navbar goes here */}
          <ul className="hidden sm:flex flex-row space-x-12 items-center text-gray-600 font-medium">
            {links.map((link) => (
              <motion.li
                key={link.hash}
                className="hover:text-gray-950"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link href={link.hash}>{link.name}</Link>
              </motion.li>
            ))}
          </ul>
          {/* mobile logo */}
          <div className="sm:hidden w-full flex justify-center">
            <button onClick={() => setMenuOpen(!isMenuOpen)}>
              <FIcon />
            </button>
          </div>
          {/* mobile menue here */}
        </div>

        {isMenuOpen && (
          <ul className="sm:hidden block flex flex-col gap-y-8 items-center pt-6 pb-6 bg-white">
            {links.map((link) => (
              <li key={link.hash} className=" hover:text-gray-950">
                <Link href={link.hash}>{link.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
