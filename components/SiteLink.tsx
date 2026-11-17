import type { FeaturedSite } from "@/types/resume";

// 소개 섹션에 표시하는 외부 웹사이트 바로가기 카드 (새 탭으로 열림)
export default function SiteLink({ site }: { site: FeaturedSite }) {
  const host = new URL(site.url).host;

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.title} 새 탭에서 열기`}
      className="no-print border-border bg-card/70 hover:border-accent group block rounded-2xl border p-5 backdrop-blur-md transition-shadow hover:shadow-[0_0_30px_-12px_var(--accent)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="group-hover:text-accent text-lg leading-snug font-bold sm:text-xl">
          {site.title}
        </h3>
        <span aria-hidden="true" className="text-accent shrink-0 text-2xl leading-none">
          ↗
        </span>
      </div>
      <p className="text-muted mt-2 text-sm leading-relaxed">{site.description}</p>
      {site.features && site.features.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {site.features.map((f) => (
            <li
              key={f}
              className="border-accent/40 text-accent rounded-full border px-3 py-1 text-xs font-semibold"
            >
              {f}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className="text-accent font-mono text-xs break-all">{host}</span>
        <span className="shrink-0 font-semibold">사이트 열기 →</span>
      </p>
    </a>
  );
}
