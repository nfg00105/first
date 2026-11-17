import type { FeaturedSite } from "@/types/resume";

// 시세표 아래에 표시하는 외부 웹사이트 바로가기 카드 (새 탭으로 열림)
export default function SiteLink({ site }: { site: FeaturedSite }) {
  const host = new URL(site.url).host;

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.title} 새 탭에서 열기`}
      className="no-print border-border bg-card/70 hover:border-accent group mt-6 block rounded-2xl border p-4 backdrop-blur-md transition-shadow hover:shadow-[0_0_30px_-12px_var(--accent)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="group-hover:text-accent text-sm leading-snug font-bold">{site.title}</h3>
        <span aria-hidden="true" className="text-accent shrink-0 text-lg leading-none">
          ↗
        </span>
      </div>
      <p className="text-muted mt-2 text-xs leading-relaxed">{site.description}</p>
      <p className="text-accent mt-3 font-mono text-xs break-all">{host}</p>
    </a>
  );
}
