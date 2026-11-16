import type { About as AboutData } from "@/types/resume";
import Section from "./Section";

export default function About({ data }: { data: AboutData }) {
  return (
    <Section id="about" title="About">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {data.summary.map((p) => (
            <p key={p} className="text-muted leading-relaxed">
              {p}
            </p>
          ))}
          <blockquote className="border-accent border-l-4 pl-4 italic">
            {data.philosophy}
          </blockquote>
        </div>
        <ul className="space-y-2">
          {data.strengths.map((s) => (
            <li key={s} className="border-border bg-card rounded-lg border px-4 py-3 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
