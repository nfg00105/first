"use client";

import type { CoinTicker } from "@/types/market";
import { changeColor, formatRate, formatValue } from "@/lib/marketFormat";
import { useMarket } from "./MarketData";
import { PanelHeader, panelClass } from "./MarketPanel";

function Stat({
  label,
  name,
  sub,
  subClass,
}: {
  label: string;
  name: string;
  sub: string;
  subClass?: string;
}) {
  return (
    <div className="bg-background/40 min-w-0 rounded-xl px-3 py-2.5">
      <p className="text-muted text-xs">{label}</p>
      <p className="mt-1 truncate font-semibold">{name}</p>
      <p className={`text-sm font-bold tabular-nums ${subClass ?? ""}`}>{sub}</p>
    </div>
  );
}

function summarize(tickers: CoinTicker[]) {
  const up = tickers.filter((t) => t.changeRate > 0).length;
  const down = tickers.filter((t) => t.changeRate < 0).length;
  const flat = tickers.length - up - down;
  const byRate = [...tickers].sort((a, b) => b.changeRate - a.changeRate);
  const topValue = tickers.reduce((a, b) => (b.value24h > a.value24h ? b : a));
  const total = tickers.reduce((sum, t) => sum + t.value24h, 0);
  return { up, down, flat, best: byRate[0], worst: byRate[byRate.length - 1], topValue, total };
}

// 시세표와 같은 데이터로 만든 오늘의 시장 요약 (소개 섹션 왼쪽 열)
export default function MarketSummary() {
  const { data, error } = useMarket();
  const tickers = data?.tickers ?? [];
  const s = tickers.length > 0 ? summarize(tickers) : null;

  return (
    <section aria-label="오늘의 시장 요약" className={`no-print ${panelClass}`}>
      <PanelHeader
        title="오늘의 시장 요약"
        note={s ? `${tickers.length}개 종목 기준` : undefined}
      />
      {s ? (
        <>
          <div
            role="img"
            aria-label={`상승 ${s.up}개, 보합 ${s.flat}개, 하락 ${s.down}개`}
            className="flex h-2.5 overflow-hidden rounded-full"
          >
            <span className="bg-rose-400" style={{ flexGrow: s.up }} />
            <span className="bg-neutral-500" style={{ flexGrow: s.flat }} />
            <span className="bg-sky-400" style={{ flexGrow: s.down }} />
          </div>
          <p className="mt-2 flex justify-between text-sm font-semibold tabular-nums">
            <span className="text-rose-400">상승 {s.up}</span>
            <span className="text-muted">보합 {s.flat}</span>
            <span className="text-sky-400">하락 {s.down}</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Stat
              label="최대 상승"
              name={s.best.name}
              sub={formatRate(s.best.changeRate)}
              subClass={changeColor(s.best.changeRate)}
            />
            <Stat
              label="최대 하락"
              name={s.worst.name}
              sub={formatRate(s.worst.changeRate)}
              subClass={changeColor(s.worst.changeRate)}
            />
            <Stat
              label="거래대금 1위"
              name={s.topValue.name}
              sub={formatValue(s.topValue.value24h)}
            />
            <Stat label="표시 종목 합계" name="거래대금" sub={formatValue(s.total)} />
          </div>
        </>
      ) : (
        <p className="text-muted py-6 text-center text-sm">
          {error ? "시세를 불러오지 못했습니다." : "불러오는 중…"}
        </p>
      )}
      <p className="text-muted mt-2 text-right text-[11px]">
        전일 대비 · 24시간 누적 · 출처 업비트
      </p>
    </section>
  );
}
