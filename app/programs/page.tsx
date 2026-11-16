import type { Metadata } from "next";
import Link from "next/link";
import Fireworks from "@/components/Fireworks";
import Footer from "@/components/Footer";
import ProgramsManager from "@/components/ProgramsManager";
import resumeData from "@/data/resume.json";
import type { Resume } from "@/types/resume";

const resume: Resume = resumeData;

export const metadata: Metadata = {
  title: `어플 개발 프로그램 목록 | ${resume.profile.name}`,
  description: "어플 개발 프로젝트로 만든 프로그램 목록입니다.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <Fireworks />
      <header className="no-print border-border bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/#projects" className="text-muted hover:text-foreground text-sm font-medium">
            ← 초기화면으로 돌아가기
          </Link>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-4 pt-28 pb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">어플 개발 프로그램 목록</h1>
        <p className="text-muted mt-3">
          {resume.profile.name}의 어플 개발 프로젝트에서 만든 프로그램입니다.
        </p>
        <div className="mt-10">
          <ProgramsManager />
        </div>
      </main>
      <Footer name={resume.profile.name} lastUpdated={resume.lastUpdated} />
    </>
  );
}
