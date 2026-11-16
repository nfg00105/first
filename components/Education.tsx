import type { Certification, Education as EducationData } from "@/types/resume";
import Section from "./Section";

export default function Education({
  education,
  certifications,
}: {
  education: EducationData[];
  certifications: Certification[];
}) {
  return (
    <Section id="education" title="Education & Certifications">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-3 font-semibold">학력</h3>
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.school}>
                <p className="font-medium">{e.school}</p>
                <p className="text-muted text-sm">
                  {e.major} · {e.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">자격증</h3>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.name}>
                <p className="font-medium">{c.name}</p>
                <p className="text-muted text-sm">
                  {c.issuer} · {c.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
