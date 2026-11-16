import type { ReactNode } from "react";

// 공통 섹션 래퍼 (제목 + 컨테이너)
export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-5xl px-4 py-16">
      <h2 id={`${id}-title`} className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
