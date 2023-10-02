import Image from "next/image";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import { ArrowIcon } from "@/components/icon";
import AboutMe from "@/components/aboutMe";
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 sm:max-w-7xl">
      <Intro />
      <ArrowIcon
        styleParent="flex relative w-1/2 sm:h-[8rem] sm:m-auto sm:max-w-3xl mt-[3rem]"
        styleChild="absolute top-0 bottom-0 right-0"
        width="128px"
        height="128px"
      />
      {/* <AboutMe /> */}
      {/* <Projects /> */}
    </main>
  );
}
