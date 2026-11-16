import type { Profile } from "@/types/resume";
import Section from "./Section";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <Section id="contact" title="Contact">
      <p className="text-muted mb-6">협업 제안이나 문의는 언제든 환영합니다.</p>
      <ul className="flex flex-wrap gap-3">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="border-border hover:bg-card rounded-md border px-4 py-2 text-sm font-medium"
          >
            {profile.email}
          </a>
        </li>
        {profile.links.map((l) => (
          <li key={l.label}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:bg-card rounded-md border px-4 py-2 text-sm font-medium"
            >
              {l.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
