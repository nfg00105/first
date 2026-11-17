import type { About as AboutData } from "@/types/resume";
import MarketNews from "./MarketNews";
import SiteLink from "./SiteLink";
import Section from "./Section";

export default function About({ data }: { data: AboutData }) {
  return (
    <Section id="about" title="About">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          {data.summary.map((p) => (
            <p key={p} className="text-muted leading-relaxed">
              {p}
            </p>
          ))}
          <blockquote className="border-accent border-l-4 pl-4 italic">
            {data.philosophy}
          </blockquote>
        </div>
        <div className="lg:col-span-2">
          <ul className="space-y-2">
            {data.strengths.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-blue-900 bg-blue-900 px-5 py-4 text-lg font-semibold text-white"
              >
                {s}
              </li>
            ))}
          </ul>
          <MarketNews />
          {data.featuredSite ? <SiteLink site={data.featuredSite} /> : null}
        </div>
      </div>
    </Section>
  );
}
