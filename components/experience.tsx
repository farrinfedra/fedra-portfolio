// "use client";

import React from "react";
import SectionHeading from "./section-heading";
import SmallSectionHeading from "./section-heading-small";
import "react-vertical-timeline-component/style.min.css";
import Timeline from "./timeline";
import LatestNews from "./news";
import { RexperiencesData, PexperiencesData } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="leading-8 scroll-mt-44 max-w-[55rem] mx-auto my-20 sm:mb-40">
      <SectionHeading>Experience</SectionHeading>
      <div className="flex flex-wrap md:flex-nowrap gap-10 justify-center">
        <div className="flex-1">
          <SmallSectionHeading>Research</SmallSectionHeading>
          <Timeline data={RexperiencesData} />
          
        </div>

        <div className="flex-1">
          <SmallSectionHeading>Professional</SmallSectionHeading>
          <Timeline data={PexperiencesData} />
        </div>
      </div>
    </section>
  );
}

