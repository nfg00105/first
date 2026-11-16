"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
// 항상 6주(42칸)로 그려서 달이 바뀌어도 높이가 흔들리지 않게 함
const CELL_COUNT = 42;

const pad = (n: number) => String(n).padStart(2, "0");

function subscribeEverySecond(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}
const getSecond = () => Math.floor(Date.now() / 1000);
const getServerSecond = () => 0;

// 마우스 세로 위치를 따라 움직일 때의 최대 이동 거리(px)와 따라가는 부드러움(0~1)
const FOLLOW_RANGE = 60;
const FOLLOW_EASING = 0.08;

// 실시간 달력: 1초마다 시계가 갱신되고 오늘 날짜가 강조되며, 마우스의 세로 위치를 따라 움직임
export default function LiveCalendar() {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    // 마우스를 움직일 때만 반응하는 사용자 주도 움직임이라 모션 감소 설정과 무관하게 동작시킴
    // (스스로 반복하는 애니메이션만 모션 감소 설정에서 멈춤)

    let target = 0;
    let current = 0;
    let frame = 0;

    const step = () => {
      current += (target - current) * FOLLOW_EASING;
      card.style.transform = `translateY(${current.toFixed(2)}px)`;
      // 목표에 충분히 가까워지면 루프를 멈춰 불필요한 렌더링을 피함
      frame = Math.abs(target - current) > 0.1 ? requestAnimationFrame(step) : 0;
    };

    const onMove = (e: PointerEvent) => {
      // 화면 위쪽 끝 = -FOLLOW_RANGE, 아래쪽 끝 = +FOLLOW_RANGE
      target = (e.clientY / window.innerHeight - 0.5) * 2 * FOLLOW_RANGE;
      if (!frame) frame = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  // 1초 단위 현재 시각 구독. 서버 렌더/하이드레이션 중에는 0을 반환해 불일치를 피함
  const second = useSyncExternalStore(subscribeEverySecond, getSecond, getServerSecond);
  const now = second ? new Date(second * 1000) : null;

  const year = now?.getFullYear() ?? 0;
  const month = now?.getMonth() ?? 0;
  const today = now?.getDate() ?? 0;
  const firstDay = now ? new Date(year, month, 1).getDay() : 0;
  const daysInMonth = now ? new Date(year, month + 1, 0).getDate() : 0;

  const cells = Array.from({ length: CELL_COUNT }, (_, i) => {
    const day = i - firstDay + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });

  return (
    <section
      ref={cardRef}
      aria-label="실시간 달력"
      className="no-print border-accent/30 bg-card/70 w-full max-w-sm rounded-2xl border p-5 shadow-[0_0_40px_-8px_var(--accent)] backdrop-blur-md will-change-transform sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
        <div>
          <p className="shine-text text-2xl font-extrabold tracking-tight sm:text-3xl">
            {now ? `${year}년 ${month + 1}월` : " "}
          </p>
          <p className="text-muted mt-1 text-sm">
            {now ? `${today}일 ${WEEKDAYS[now.getDay()]}요일` : " "}
          </p>
        </div>
        <p className="text-accent font-mono text-xl font-bold tabular-nums sm:text-2xl">
          {now
            ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
            : "--:--:--"}
        </p>
      </div>

      <div className="text-muted grid grid-cols-7 gap-1 text-center text-xs font-semibold">
        {WEEKDAYS.map((w, i) => (
          <span
            key={w}
            className={i === 0 ? "text-rose-400" : i === 6 ? "text-sky-400" : undefined}
          >
            {w}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-sm">
        {cells.map((day, i) => {
          const isToday = day !== null && day === today;
          const col = i % 7;
          return (
            <span
              key={i}
              className={`flex aspect-square items-center justify-center rounded-full tabular-nums ${
                isToday
                  ? "bg-accent animate-pulse font-bold text-neutral-950"
                  : col === 0
                    ? "text-rose-400/90"
                    : col === 6
                      ? "text-sky-400/90"
                      : "text-foreground/90"
              }`}
            >
              {day ?? ""}
            </span>
          );
        })}
      </div>
    </section>
  );
}
