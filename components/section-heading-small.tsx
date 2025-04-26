import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SmallSectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-2xl text-gray-900 font-semibold capitalize mb-8 text-center dark:text-white">
      {children}
    </h2>
  );
}