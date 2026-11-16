import type { Experience as ExperienceData } from "@/types/resume";
import Section from "./Section";

export default function Experience({ items }: { items: ExperienceData[] }) {
  return (
    <Section id="experience" title="Experience">
      <ol className="border-border space-y-10 border-l pl-6">
        {items.map((e) => (
          <li key={`${e.company}-${e.period}`} className="relative">
            <span className="bg-accent absolute top-2 -left-[29px] h-2.5 w-2.5 rounded-full" />
            <p className="text-muted font-mono text-sm">{e.period}</p>
            <h3 className="mt-1 text-lg font-semibold">
              {e.role ? `${e.role} · ${e.company}` : e.company}
            </h3>
            <p className="text-muted mt-2">{e.description}</p>
            {e.achievements.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {e.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
