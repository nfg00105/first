"use client";

import { useEffect, useState } from "react";
import type { CoinTicker, TickerResponse } from "@/types/market";

const TICKER_INTERVAL_MS = 5_000;

interface PollState<T> {
  data: T | null;
  /** 서버가 내려준 오류 코드 (없으면 정상) */
  error: string | null;
}

// 일정 간격으로 API를 다시 불러오는 훅. 탭이 숨겨져 있으면 건너뛰고, 다시 보이면 즉시 갱신
function usePolling<T>(url: string, intervalMs: number): PollState<T> {
  const [state, setState] = useState<PollState<T>>({ data: null, error: null });

  useEffect(() => {
    let alive = true;

    const load = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch(url);
        const body = await res.json();
        if (!alive) return;
        if (res.ok) setState({ data: body as T, error: null });
        else setState((prev) => ({ data: prev.data, error: body?.error ?? "error" }));
      } catch {
        if (alive) setState((prev) => ({ data: prev.data, error: "network" }));
      }
    };

    load();
    const id = setInterval(load, intervalMs);
    document.addEventListener("visibilitychange", load);
    return () => {
      alive = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", load);
    };
  }, [url, intervalMs]);

  return state;
}

const krw = new Intl.NumberFormat("ko-KR");

function formatPrice(price: number) {
  // 저가 코인은 소수점까지 보여줘야 변동이 보임
  const digits = price < 0.1 ? 6 : price < 1 ? 4 : price < 100 ? 2 : 0;
  return `${price.toLocaleString("ko-KR", { maximumFractionDigits: digits })}원`;
}

// 큰 금액은 한국식 단위(조/억)로 표시
function formatValue(won: number) {
  if (won >= 1e12) return `${(won / 1e12).toFixed(2)}조원`;
  return `${krw.format(Math.round(won / 1e8))}억원`;
}

function formatVolume(volume: number, symbol: string) {
  let text: string;
  if (volume >= 1e8) text = `${(volume / 1e8).toFixed(1)}억`;
  else if (volume >= 1e4) text = `${krw.format(Math.round(volume / 1e4))}만`;
  else text = volume.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
  return `${text} ${symbol}`;
}

// 한국 시세 관례: 상승은 빨강, 하락은 파랑
function changeColor(rate: number) {
  if (rate > 0) return "text-rose-400";
  if (rate < 0) return "text-sky-400";
  return "text-muted";
}

function formatRate(rate: number) {
  const pct = (rate * 100).toFixed(2);
  return `${rate > 0 ? "+" : ""}${pct}%`;
}

const timeFormat = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

const panel =
  "border-border bg-card/70 rounded-2xl border p-4 shadow-[0_0_30px_-12px_var(--accent)] backdrop-blur-md";

function PanelHeader({ title, note }: { title: string; note?: string }) {
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

function TickerRow({ coin }: { coin: CoinTicker }) {
  return (
    <li className="py-2.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="min-w-0 truncate">
          <span className="font-semibold">{coin.name}</span>
          <span className="text-muted ml-1.5 text-xs">{coin.symbol}</span>
        </span>
        <span className="shrink-0 font-bold tabular-nums">{formatPrice(coin.price)}</span>
      </div>
      <div className="text-muted mt-1 flex items-baseline justify-between gap-2 text-xs">
        <span className="flex min-w-0 flex-wrap gap-x-2 tabular-nums">
          <span>거래대금 {formatValue(coin.value24h)}</span>
          <span>거래량 {formatVolume(coin.volume24h, coin.symbol)}</span>
        </span>
        <span className={`shrink-0 font-semibold tabular-nums ${changeColor(coin.changeRate)}`}>
          {formatRate(coin.changeRate)}
        </span>
      </div>
    </li>
  );
}

function UpbitPanel() {
  const { data, error } = usePolling<TickerResponse>("/api/upbit", TICKER_INTERVAL_MS);
  const updated = data ? timeFormat.format(new Date(data.updatedAt)) : undefined;

  return (
    <section aria-label="업비트 주요 코인 실시간 시세" className={panel}>
      <PanelHeader title="업비트 실시간 시세" note={updated ? `${updated} 기준` : undefined} />
      {data ? (
        <ul
          tabIndex={0}
          aria-label="코인 목록 (스크롤 가능)"
          className="divide-border max-h-[32rem] divide-y overflow-y-auto overscroll-contain pr-1"
        >
          {data.tickers.map((coin) => (
            <TickerRow key={coin.market} coin={coin} />
          ))}
        </ul>
      ) : (
        <p className="text-muted py-6 text-center text-sm">
          {error ? "시세를 불러오지 못했습니다." : "불러오는 중…"}
        </p>
      )}
      <p className="text-muted mt-2 text-right text-[11px]">
        원화 마켓 · 24시간 누적 · 출처 업비트
      </p>
    </section>
  );
}

// 업비트 주요 코인 시세 (소개 섹션 오른쪽 열)
export default function MarketNews() {
  return (
    <div className="no-print mt-8">
      <UpbitPanel />
    </div>
  );
}
