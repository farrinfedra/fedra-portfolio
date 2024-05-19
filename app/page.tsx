import Image from "next/image";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import { ArrowIcon } from "@/components/icon";
import AboutMe from "@/components/aboutMe";
import Experience from "@/components/experience";

export default function Home() {
  return (
    <main className="flex flex-col items-center mx-auto max-w-3xl px-4 sm:px-6 sm:max-w-7xl">
      <Intro />
      <ArrowIcon
        styleParent="md:w-full hidden md:block"
        styleChild="float-right mr-48"
        width="128px"
        height="128px"
      />
      <AboutMe />
      <Experience />
      <Projects />
    </main>
  );
}
