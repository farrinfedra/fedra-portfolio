import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const skillsData = [
  "Python",
  "Pytorch",
  "High Performance Computing",
  "Java",
  "React",
  "Next.js",
  "Tailwind CSS",
] as const;

export const RexperiencesData = [
  {
        title: "Mandt Lab",
        date: "University of California, Irvine. March 2024",
        description: "Working Under Supervision of Prof. Stephan Mandt on intersection of VAEs and Diffusion models.",
        website: "http://www.stephanmandt.com/",
  },
  {
        title: "KUIS AI Lab",
        date: "İş Bank and Koç University. Sept 2021 - Jan 2024",
        description: "Worked on a variaty of projects such as Bird songs classification,audio re-synthesis, and audio-based image editing under the supervision of Prof. Aykut Erdem and Dr. Duygu Ceylan from Adobe Research.",
         paper: "https://arxiv.org/abs/2209.00000",
         github: "",
         more: true,
  },
  
  {
        title: "GGLab",
        date: "Koç University. Oct 2022 - June 2023",
        description: "Worked on creating the first extensive dataset and training SOTA models and baselines for Grammatical Error Correction in Turkish under the supervision of Prof. Gözde Gül Sahin.",
        paper: "https://arxiv.org/abs/2309.11346",
        github: "https://github.com/GGLAB-KU/gecturk",
  },

] as const;

export const PexperiencesData = [
  {
        title: "Incomming Machine Learning Engineering Intern at Adobe",
        date: "San Jose, CA. June 2024 - Sept 2024",
        description: "",
  },
  {
        title: "Machine Learning Engineering Intern at RadiusAI",
        date: "Tempe, AZ. June 2022 - Oct 2022",
        description: "Worked on camera calibration based on scene geometry. Co-created the company's first fully automated camera calibration system, significantly reducing the company's reliance on expensive annotators.",
  },
  
  {
        title: "Software Engineer at Digitopia",
        date: "Istanbul, Turkey. June 2021 - Sept 2021",
        description: "Designed the company's main product to provide marketing analytics for large enterprises, which included creating a dynamic PDF generator from user dashboard results using JavaScript, Node.js, and Handlebars.",

  },

] as const;

export const projectData = [
  {
    title: "GECTurk: Grammatical Error Correction in Turkish",
    description: "The first extensive dataset for Grammatical Error Correction in Turkish along with baseline and .",
    imageUrl: "/gekturk2.png",
    paperUrl: "https://arxiv.org/pdf/2309.11346.pdf",
    githubUrl: "https://github.com/GGLAB-KU/gecturk",
    citation: "A. Kara, F. M. Sofian, A. Bond, and G. G. Şahin, GECTurk: Grammatical Error Correction and Detection Dataset for Turkish. 2023.",
    tags: [
      { text: "NLP", size: "small" },
      { text: "Pytorch", size: "small" },
      // { text: "", size: "small" },
      // { text: "Audio Processing", size: "large" },
      // { text: "Image Editing", size: "medium" },
    ]
  },
  {
    title: "Audio-based Image Editing",
    description: "Generating and editing images using nature, emotions or material sounds.",
    imageUrl: "/audio-image2.png",
    paperUrl: "https://arxiv.org/abs/2405.00878",
    githubUrl: "https://github.com/yourproject/repo",
    latest: "true",
    tags: [
      { text: "GenAI", size: "small" },
      { text: "Pytorch", size: "small" },
      // { text: "Audio Processing", size: "large" },
      // { text: "Image Editing", size: "medium" },
    ]
  },
  
  {
    title: "Birds of Istanbul App",
    description: "The first extensive dataset for Grammatical Error Correction in Turkish along with baseline and .",
    imageUrl: "/boicomb2.png",
    // paperUrl: "https://arxiv.org/pdf/2309.11346.pdf",
    githubUrl: "https://github.com/farrinfedra/BirdsOfIstanbul",
    noShadow: true,
    tags: [
      // { text: "GenAI", size: "small" },
      { text: "iOS", size: "small" },
      { text: "Audio Processing", size: "small" },
      { text: "Pytorch", size: "small" },
      { text: "Transformers", size: "small" },
    ]
  },
  


] as const;

