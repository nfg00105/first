import type { ReactNode } from "react";

// 시세표와 시장 요약이 함께 쓰는 패널 공통 틀
export const panelClass =
  "border-border bg-card/70 rounded-2xl border p-4 shadow-[0_0_30px_-12px_var(--accent)] backdrop-blur-md";

export function PanelHeader({ title, note }: { title: string; note?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h3 className="flex items-center gap-2 text-sm font-bold">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
        {title}
      </h3>
      {note ? <span className="text-muted text-xs tabular-nums">{note}</span> : null}
    </div>
  );
}
