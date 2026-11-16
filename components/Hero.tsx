import type { Profile } from "@/types/resume";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-4 pt-14"
    >
      <p className="shine-text mb-3 font-mono text-sm font-bold">{profile.role}</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="text-muted mt-5 max-w-2xl text-lg sm:text-xl">{profile.tagline}</p>
      <div className="no-print mt-8 flex flex-wrap gap-3">
        {profile.email ? (
          <a
            href={`mailto:${profile.email}`}
            className="bg-accent rounded-md px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 dark:text-neutral-950"
          >
            연락하기
          </a>
        ) : null}
        {profile.resumePdf ? (
          <a
            href={profile.resumePdf}
            download
            className="border-border hover:bg-card rounded-md border px-5 py-2.5 text-sm font-semibold"
          >
            이력서 다운로드
          </a>
        ) : null}
      </div>
    </section>
  );
}
