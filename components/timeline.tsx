import React from 'react';
import { SiArxiv } from "react-icons/si"; // Icon for the Paper button
import { FaGithub } from "react-icons/fa"; // Icon for the GitHub button
import { LuBookMarked } from "react-icons/lu";

type TimelineItemProps = {
  title: string;
  date: string;
  description: string;
  paper?: string; 
  github?: string; 
  more?: boolean;
};

interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  paper?: string;
  github?: string;
  more?: boolean;
}

interface TimelineProps {
  data: ExperienceItem[];
}


const TimelineItem: React.FC<TimelineItemProps> = ({ title, date, description, paper, github, more }) => {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
      <LuBookMarked />
      </span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date}</time>
      <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400">{description}</p>
      {/* Conditional rendering for paper, GitHub, and more buttons */}
      {paper && (
        <a href={paper} className="inline-flex items-center mr-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700" target="_blank" rel="noopener noreferrer">
        <SiArxiv className="mr-2 text-current" /> Paper
      </a>
      )}
      {github && (
        <a href={github} className="inline-flex items-center mr-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700" target="_blank" rel="noopener noreferrer">
        <FaGithub className="mr-2 text-current" /> GitHub
      </a>
      )}
      {more && (
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
          More
        </button>
      )}
    </li>
  );
};


const Timeline: React.FC<TimelineProps> = ({ data }) => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {data.map((item, index) => (
        <TimelineItem
          key={index}
          title={item.title}
          date={item.date}
          description={item.description}
          paper={item.paper}
          github={item.github}
          more={item.more}
        />
      ))}
    </ol>
  );
};

export default Timeline;