import type { SkillGroup } from "@/types/resume";
import Section from "./Section";

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.category} className="border-border bg-card rounded-xl border p-5">
            <h3 className="mb-3 font-semibold">{g.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="border-border bg-background rounded-full border px-3 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
