"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
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
        {/* 이름 대신 홈 아이콘: 어느 페이지에서든 홈(최상단)으로 이동 */}
        <Link
          href="/"
          aria-label={`${name} 홈으로 가기`}
          title="홈으로"
          className="text-accent hover:bg-accent/10 focus-visible:ring-accent flex size-11 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110 focus-visible:ring-2 focus-visible:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-7"
            aria-hidden="true"
          >
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
          </svg>
        </Link>
        <nav aria-label="주요 메뉴" className="flex min-w-0 items-center gap-1 sm:gap-3">
          {/* 모바일에서는 가로 스크롤 메뉴로 표시 */}
          <ul className="flex min-w-0 [scrollbar-width:none] items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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
        </nav>
      </div>
    </header>
  );
}
