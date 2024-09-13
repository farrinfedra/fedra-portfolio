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
    name: "Experience",
    hash: "#experience",
  },
  { 
    name: "Projects",
    hash: "#projects",
  },
  // {
  //   name: "Skills",
  //   hash: "#skills",
  // },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;



export const RexperiencesData = [
  {
        title: "Mandt Lab",
        date: "University of California, Irvine. March 2024",
        description: "Working Under Supervision of Prof. Stephan Mandt on Generative Models.",
        website: "http://www.stephanmandt.com/",
  },
  {
        title: "KUIS AI Lab",
        date: "İş Bank and Koç University. Sept 2021 - Jan 2024",
        description: "Worked on a variaty of projects such as Bird songs classification, audio re-synthesis, and audio-based image editing under the supervision of Prof. Aykut Erdem, Prof. Erkut Erdem and Dr. Duygu Ceylan from Adobe Research.",
         paper: "https://arxiv.org/abs/2405.00878",
         github: "https://github.com/BurakCanBiner/SonicDiffusion",
        //  more: true,
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
        title: "Machine Learning Engineering Intern at Adobe",
        date: "San Jose, CA. June 2024 - Sept 2024",
        description: "Worked on improving the AI Assistant in Adobe Acrobat.",
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
    title: "Audio-based Image Editing",
    description: "Enhancing image Generation and Editing through audio cues. Discover how audio can influence and control image editing.",
    imageUrl: "/audio-image2.png",
    paperUrl: "https://arxiv.org/abs/2405.00878",
    githubUrl: "https://github.com/BurakCanBiner/SonicDiffusion",
    videoUrl: "https://drive.google.com/file/d/17cXXBVrG9vdjvq1qPPgTJIgA5-Oyt2WY/view?usp=sharing",
    latest: true,
    tags: [
      { text: "Huggingface", size: "small" },
      { text: "GenAI", size: "small" },
      { text: "Multimodal", size: "small" },
      { text: "Pytorch", size: "small" },
      // { text: "Audio Processing", size: "large" },
      // { text: "Image Editing", size: "medium" },
    ]
  },
  {
    title: "GECTurk: Grammatical Error Correction in Turkish",
    description: "The first extensive dataset for Grammatical Error Correction in Turkish along with baseline and .",
    imageUrl: "/gekturk2.png",
    paperUrl: "https://arxiv.org/pdf/2309.11346.pdf",
    githubUrl: "https://github.com/GGLAB-KU/gecturk",
    citation: "A. Kara, F. M. Sofian, A. Bond, and G. G. Şahin, GECTurk: Grammatical Error Correction and Detection Dataset for Turkish. 2023.",
    tags: [
      { text: "NLP", size: "small" },
      { text: "GEC", size: "small" },
      { text: "Pytorch", size: "small" },
      // { text: "", size: "small" },
      // { text: "Audio Processing", size: "large" },
      // { text: "Image Editing", size: "medium" },
    ]
  },
  
  {
    title: "Birds of Istanbul App",
    description: "The first bird songs classification iOS app in Turkey developed for ornithologists, bird watcher, or those who are curious and want to explore birds in their surroundings.",
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

