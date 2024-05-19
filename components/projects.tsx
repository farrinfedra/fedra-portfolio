import React from "react";
import ProjectCard from "./project-card";
import SectionHeading from "./section-heading";
import { projectData } from "@/lib/data"; // Import your project data

export default function Projects() {
  return (
    <section className="flex flex-col space-y-28 max-w-[65rem] mb-48 bg-stone-200">
      <SectionHeading>Papers & Projects</SectionHeading>
      {projectData.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
      <div className="mt-10 p-4 border-2 border-gray-200 rounded-lg text-center">
        <p className="text-lg mb-4">If you want to see more projects, visit GitHub:</p>
        <a
          href="ww.github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Visit GitHub
        </a>
      </div>
    </section>
  );
}
