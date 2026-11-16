"use client";

import { useEffect, useRef } from "react";

// 배경 불꽃놀이 효과 (canvas). 콘텐츠 뒤에 고정되며 클릭을 가로채지 않는다.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
  decay: number;
  hue: number;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  hue: number;
}

const GRAVITY = 0.035;
const MAX_PARTICLES = 900; // 성능 보호용 상한

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 모션 감소 설정 사용자에게는 애니메이션을 표시하지 않음
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastLaunch = 0;
    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const launch = () => {
      rockets.push({
        x: width * (0.1 + Math.random() * 0.8),
        y: height,
        vy: -(5 + Math.random() * 2.5),
        targetY: height * (0.12 + Math.random() * 0.4),
        hue: Math.floor(Math.random() * 360),
      });
    };

    const explode = (r: Rocket) => {
      const count = 70 + Math.floor(Math.random() * 50);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1.5 + Math.random() * 3.4;
        particles.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.006 + Math.random() * 0.008,
          hue: r.hue + Math.random() * 30 - 15,
          size: 1.8 + Math.random() * 1.8,
        });
      }
      // 입자 수 상한 유지 (오래된 것부터 제거)
      if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
    };

    const frame = (time: number) => {
      const isDark = document.documentElement.classList.contains("dark");
      // 완전히 지우지 않고 서서히 투명하게 만들어 꼬리(잔상)를 남김
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, width, height);
      // 다크 모드는 빛이 겹치는 가산 합성, 라이트 모드는 채도 높은 색을 그대로 사용
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      const lightness = isDark ? 62 : 48;

      if (time - lastLaunch > 550 + Math.random() * 900 && rockets.length < 4) {
        launch();
        lastLaunch = time;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy += 0.02;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${r.hue}, 100%, ${lightness + 15}%, 0.9)`;
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, ${lightness}%, ${Math.min(1, p.life * 1.4) * (isDark ? 0.95 : 0.85)})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(rafId);
      if (!document.hidden) rafId = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    // 첫 화면 렌더링(LCP)에 영향을 주지 않도록 약간 늦게 시작
    const startTimer = window.setTimeout(() => {
      rafId = requestAnimationFrame(frame);
    }, 800);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
