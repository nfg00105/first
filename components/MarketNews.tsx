"use client";

import type { CoinTicker } from "@/types/market";
import {
  changeColor,
  formatPrice,
  formatRate,
  formatTime,
  formatValue,
  formatVolume,
} from "@/lib/marketFormat";
import { useMarket } from "./MarketData";
import { PanelHeader, panelClass } from "./MarketPanel";

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

// 업비트 주요 코인 시세 (소개 섹션 오른쪽 열). 데이터는 MarketDataProvider에서 공유
export default function MarketNews() {
  const { data, error } = useMarket();
  const updated = data ? formatTime(data.updatedAt) : undefined;

  return (
    <section aria-label="업비트 주요 코인 실시간 시세" className={`no-print mt-8 ${panelClass}`}>
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
