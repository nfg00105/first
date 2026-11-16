import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/resume";
import Section from "./Section";

export default function Projects({ items }: { items: Project[] }) {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <article
            key={p.title}
            className="border-border bg-card flex flex-col rounded-xl border p-5 transition-shadow hover:shadow-md"
          >
            {p.image ? (
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <Image
                  src={p.image}
                  alt={`${p.title} 스크린샷`}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">{p.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li key={t} className="text-accent font-mono text-xs">
                  #{t}
                </li>
              ))}
            </ul>
            {p.href ? (
              <Link
                href={p.href}
                className="bg-accent mt-4 inline-flex w-fit items-center rounded-md px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:text-neutral-950"
              >
                프로그램 목록 보기 →
              </Link>
            ) : null}
            {p.demoUrl || p.githubUrl ? (
              <div className="mt-4 flex gap-4 text-sm font-medium">
                {p.demoUrl ? (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Demo ↗
                  </a>
                ) : null}
                {p.githubUrl ? (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub ↗
                  </a>
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
