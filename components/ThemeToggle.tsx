"use client";

// 다크/라이트 모드 토글 (html 요소의 dark 클래스 + localStorage)
export default function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // 저장소 접근 불가 시 무시
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="다크/라이트 모드 전환"
      className="border-border hover:bg-card rounded-md border px-2.5 py-1 text-sm"
    >
      <span className="dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  );
}
