"use client";

import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Header({
  name,
  hiddenSections = [],
}: {
  name: string;
  hiddenSections?: string[];
}) {
  const [active, setActive] = useState("");
  // 배열 참조가 바뀌어도 내용이 같으면 옵저버를 다시 만들지 않도록 문자열 키 사용
  const hiddenKey = hiddenSections.join(",");
  const navItems = useMemo(
    () => NAV_ITEMS.filter(({ id }) => !hiddenKey.split(",").includes(id)),
    [hiddenKey],
  );

  // 스크롤 위치에 따라 활성 섹션 표시
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <header className="no-print border-border bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="#top" className="hidden shrink-0 pr-2 font-semibold sm:block">
          {name}
        </a>
        <nav aria-label="주요 메뉴" className="flex min-w-0 items-center gap-1 sm:gap-3">
          {/* 모바일에서는 가로 스크롤 메뉴로 표시 */}
          <ul className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active === id ? "text-accent font-semibold" : "text-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
