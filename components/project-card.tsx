import React from "react";
import SmallSectionHeading from "./section-heading-small";
import { FaGithub, FaVideo } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai"; // Import Paper icon
import { SiArxiv } from "react-icons/si";
interface Tag {
  text: string;
  size: 'small' | 'medium' | 'large';
}

interface ProjectCardProps {
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly paperUrl?: string;
  readonly githubUrl?: string;
  readonly videoUrl?: string; // New video prop for demo link
  readonly latest?: boolean; // Adjusted to boolean for more intuitive handling
  readonly citation?: string;
  readonly tags: readonly Tag[];
  readonly noShadow?: boolean; // Added to control the shadow on the image
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  paperUrl,
  githubUrl,
  videoUrl,
  latest,
  citation,
  tags,
  noShadow,
}) => {
  const tagSizeClass = (size: Tag['size']) => {
    switch (size) {
      case 'small': return 'text-xs';
      case 'medium': return 'text-sm';
      case 'large': return 'text-md';
      default: return 'text-xs';
    }
  };

  const imageClassName = `max-w-full max-h-96 rounded-lg ${!noShadow ? 'shadow-lg' : ''}`;

  return (
    <div className="relative items-center flex flex-wrap my-16 bg-stone-100 border border-cream-100 rounded-lg shadow-lg overflow-hidden">
      {latest && (
        <span className="bg-gradient-to-r from-pink-500 hover:to-yellow-500 absolute top-0 right-0 m-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Latest
        </span>
      )}
      <div className="w-full md:w-4/12 ml-auto mr-auto px-4 py-4">
        <img
          alt={title}
          className={imageClassName}
          src={imageUrl}
        />
      </div>
      <div className="w-full md:w-5/12 ml-auto mr-auto px-4 py-4">
        <div className="md:pr-12">
          <div className="flex items-center justify-between">
            <SmallSectionHeading>{title}</SmallSectionHeading>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-gray-800">
            {description}
          </p>
          {citation && (
            <blockquote className="mt-4 italic text-gray-500">
              {citation}
            </blockquote>
          )}
          <div className="mt-4 flex space-x-3">
            {paperUrl && (
              <a href={paperUrl} target="_blank" rel="noopener noreferrer"
                className="group bg-white p-2 text-gray-700 hover:text-gray-950 flex items-center gap-1 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer border border-gray-300 shadow-sm dark:bg-white/10 dark:text-white/60">
                <SiArxiv className="h-4 w-4" />
                <span className=" text-sm opacity-60 group-hover:opacity-100 transition">Paper</span>
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="group bg-white p-2 text-gray-700 flex items-center gap-1 text-sm rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border border-gray-300 shadow-sm dark:bg-white/10 dark:text-white/60">
                <FaGithub className="h-4 w-4" />
                <span className="text-sm opacity-60 group-hover:opacity-100 transition">GitHub</span>
              </a>
            )}
            {videoUrl && (
              <a href={videoUrl} target="_blank" rel="noopener noreferrer"
                className="group bg-white p-2 text-gray-700 flex items-center gap-1 text-sm rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border border-gray-300 shadow-sm dark:bg-white/10 dark:text-white/60">
                <FaVideo className="h-4 w-4" />
                <span className="text-sm opacity-60 group-hover:opacity-100 transition">Demo</span>
              </a>
            )}
          </div>
          <div className="mt-4 flex flex-wrap">
            {tags.map((tag, index) => (
              <span key={index} className={`${tagSizeClass(tag.size)} font-semibold mr-2 mb-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-gray-300 bg-gray-200 text-gray-700`}>
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
