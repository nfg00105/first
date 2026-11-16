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
  // 내용이 없는 섹션은 본문과 메뉴에서 숨김
  const hasEducation = resume.education.length > 0 || resume.certifications.length > 0;
  const hasContact = Boolean(resume.profile.email) || resume.profile.links.length > 0;
  const hiddenSections = [
    ...(hasEducation ? [] : ["education"]),
    ...(hasContact ? [] : ["contact"]),
  ];

  return (
    <>
      <Header name={resume.profile.name} hiddenSections={hiddenSections} />
      <main id="main">
        <Hero profile={resume.profile} />
        <About data={resume.about} />
        <Skills groups={resume.skills} />
        <Experience items={resume.experience} />
        <Projects items={resume.projects} />
        {hasEducation ? (
          <Education education={resume.education} certifications={resume.certifications} />
        ) : null}
        {hasContact ? <Contact profile={resume.profile} /> : null}
      </main>
      <Footer name={resume.profile.name} lastUpdated={resume.lastUpdated} />
    </>
  );
}
