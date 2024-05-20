import React from "react";
import ProjectCard from "./project-card";
import SectionHeading from "./section-heading";
import { projectData } from "@/lib/data"; // Import your project data
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col space-y-24 max-w-[65rem] mb-48">
      <SectionHeading>Papers & Projects</SectionHeading>
      {projectData.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
      <div className="mt-5 p-2 max-w-min rounded-lg mx-auto text-center">
        <a
          href="https://github.com/farrinfedra"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
        >
          More
          <BsBoxArrowUpRight className="ml-1" />
        </a>
      </div>
    </section>
  );
}
