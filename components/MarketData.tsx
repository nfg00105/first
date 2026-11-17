"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { TickerResponse } from "@/types/market";

const TICKER_INTERVAL_MS = 5_000;

interface MarketState {
  data: TickerResponse | null;
  /** 서버가 내려준 오류 코드 (없으면 정상) */
  error: string | null;
}

const MarketContext = createContext<MarketState>({ data: null, error: null });

// 업비트 시세를 한 번만 주기적으로 불러와 시세표와 시장 요약이 함께 쓰도록 공유한다.
// 탭이 숨겨져 있으면 건너뛰고, 다시 보이면 즉시 갱신
export function MarketDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MarketState>({ data: null, error: null });

  useEffect(() => {
    let alive = true;

    const load = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch("/api/upbit");
        const body = await res.json();
        if (!alive) return;
        if (res.ok) setState({ data: body as TickerResponse, error: null });
        else setState((prev) => ({ data: prev.data, error: body?.error ?? "error" }));
      } catch {
        if (alive) setState((prev) => ({ data: prev.data, error: "network" }));
      }
    };

    load();
    const id = setInterval(load, TICKER_INTERVAL_MS);
    document.addEventListener("visibilitychange", load);
    return () => {
      alive = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", load);
    };
  }, []);

  return <MarketContext.Provider value={state}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  return useContext(MarketContext);
}
