import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-center text-3xl font-bold capitalize mb-8">
      {children}
    </h2>
  );
}
