"use client";

import React from "react";
import { motion } from "framer-motion";
import SmallSectionHeading from "./section-heading-small";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactMe = () => {
  return (
    <section id="contact" className="flex flex-col w-[65rem] mb-12">
      <motion.div
        className="bg-gradient-to-b from-gray-100 rounded-lg py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-2 mb-8">
          <SmallSectionHeading>Contact</SmallSectionHeading>
        </div>

        <motion.div
          className="flex w-full justify-center items-center space-x-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { icon: FaLinkedin, text: "", href: "https://www.linkedin.com/in/farrin-marouf-sofian/",},
            { icon: FaEnvelope, text: "farrinsofian@gmail.com", href: "mailto:farrinsofian@gmail.com"},
            { icon: FaGithub, text: "", href: "https://github.com/farrinfedra", color: "text-gray-800" },
            { icon: FaXTwitter, text: "", href: "https://twitter.com/farrinsofian", },
          ].map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-gray-400">|</span>}
              <motion.div
                className="flex items-center space-x-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline`}
                >
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </a>
                {item.text && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-lg font-semibold ${item.color} hover:underline`}
                  >
                    {item.text}
                  </a>
                )}
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactMe;
