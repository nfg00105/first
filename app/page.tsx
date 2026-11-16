import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import resumeData from "@/data/resume.json";
import type { Resume } from "@/types/resume";

const resume: Resume = resumeData;

export default function Home() {
  return (
    <>
      <Header name={resume.profile.name} />
      <main>
        <Hero profile={resume.profile} />
        <About data={resume.about} />
        <Skills groups={resume.skills} />
        <Experience items={resume.experience} />
        <Projects items={resume.projects} />
        <Education education={resume.education} certifications={resume.certifications} />
        <Contact profile={resume.profile} />
      </main>
      <Footer name={resume.profile.name} lastUpdated={resume.lastUpdated} />
    </>
  );
}
