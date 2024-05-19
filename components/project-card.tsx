import React from "react";
import SmallSectionHeading from "./section-heading-small";

interface Tag {
  text: string;
  size: 'small' | 'medium' | 'large';
}

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  paperUrl?: string;
  githubUrl?: string;
  latest?: boolean; // Adjusted to boolean for more intuitive handling
  citation?: string;
  tags: Tag[];
  noShadow?: boolean; // Added to control the shadow on the image
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  paperUrl,
  githubUrl,
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
    <div className="items-center flex flex-wrap  my-16 bg-stone-100 border border-cream-100 rounded-lg shadow-lg overflow-hidden">
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
            {latest && (
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">Latest</span>
            )}
          </div>
          <p className="mt-4 text-lg leading-relaxed text-gray-800">
            {description}
          </p>
          {citation && (
            <blockquote className="mt-4 italic text-gray-500">
              {citation}
            </blockquote>
          )}
          <div className="mt-4">
            {paperUrl && (
              <a href={paperUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-2">
                Read Paper
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                View on GitHub
              </a>
            )}
          </div>
          <div className="mt-4 flex flex-wrap">
            {tags.map((tag, index) => (
              <span key={index} className={`${tagSizeClass(tag.size)} font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 bg-gray-200 text-gray-700`}>
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
