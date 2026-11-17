import type { Profile } from "@/types/resume";
import LiveCalendar from "./LiveCalendar";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center gap-12 px-4 pt-20 pb-10 lg:flex-row lg:items-center lg:justify-between lg:pt-14 lg:pb-0"
    >
      <div className="min-w-0">
        <p className="shine-text mb-3 font-mono text-sm font-bold">{profile.role}</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
        <p className="text-muted mt-5 max-w-2xl text-lg sm:text-xl">{profile.tagline}</p>
        {profile.motto ? (
          <p className="shine-text mt-8 max-w-2xl text-2xl font-extrabold tracking-tight sm:text-4xl">
            {profile.motto}
          </p>
        ) : null}
        <div className="no-print mt-8 flex flex-wrap gap-3">
          {profile.resumePdf ? (
            <a
              href={profile.resumePdf}
              download
              className="border-border hover:bg-card rounded-md border px-5 py-2.5 text-sm font-semibold"
            >
              이력서 PDF 다운로드
            </a>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 justify-center lg:justify-end">
        <LiveCalendar />
      </div>
    </section>
  );
}
