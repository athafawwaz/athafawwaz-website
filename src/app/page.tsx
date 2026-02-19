import Navbar from "@/components/navbar";
import MouseGradient from "@/components/mouse-gradient";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Education from "@/components/education";
import Contact from "@/components/contact";

import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <>
      <MouseGradient />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        {/* <TechStack /> */}
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
