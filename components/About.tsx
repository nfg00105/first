import type { About as AboutData } from "@/types/resume";
import { MarketDataProvider } from "./MarketData";
import MarketNews from "./MarketNews";
import MarketSummary from "./MarketSummary";
import SiteLink from "./SiteLink";
import Section from "./Section";

export default function About({ data }: { data: AboutData }) {
  return (
    <Section id="about" title="About">
      <MarketDataProvider>
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
            {data.featuredSite ? (
              <div className="pt-4">
                <SiteLink site={data.featuredSite} />
              </div>
            ) : null}
            <div className="pt-2">
              <MarketSummary />
            </div>
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
          </div>
        </div>
      </MarketDataProvider>
    </Section>
  );
}
