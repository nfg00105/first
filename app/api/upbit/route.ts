import type { CoinTicker, TickerResponse } from "@/types/market";

// 표시할 주요 가상화폐 (업비트 원화 마켓)
const COINS = [
  { market: "KRW-BTC", symbol: "BTC", name: "비트코인" },
  { market: "KRW-ETH", symbol: "ETH", name: "이더리움" },
  { market: "KRW-XRP", symbol: "XRP", name: "리플" },
  { market: "KRW-SOL", symbol: "SOL", name: "솔라나" },
  { market: "KRW-DOGE", symbol: "DOGE", name: "도지코인" },
  { market: "KRW-ADA", symbol: "ADA", name: "에이다" },
] as const;

interface UpbitTicker {
  market: string;
  trade_price: number;
  signed_change_rate: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
}

// 업비트 공개 시세 API는 브라우저에서 직접 호출할 수 없어 서버에서 대신 가져온다 (인증 키 불필요)
export async function GET() {
  try {
    const markets = COINS.map((c) => c.market).join(",");
    const res = await fetch(`https://api.upbit.com/v1/ticker?markets=${markets}`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`upbit ${res.status}`);

    const raw = (await res.json()) as UpbitTicker[];
    const byMarket = new Map(raw.map((t) => [t.market, t]));

    const tickers: CoinTicker[] = COINS.flatMap((coin) => {
      const t = byMarket.get(coin.market);
      if (!t) return [];
      return {
        ...coin,
        price: t.trade_price,
        changeRate: t.signed_change_rate,
        value24h: t.acc_trade_price_24h,
        volume24h: t.acc_trade_volume_24h,
      };
    });

    const body: TickerResponse = { tickers, updatedAt: Date.now() };
    return Response.json(body, {
      // 접속자가 많아도 업비트 호출이 몰리지 않도록 CDN에서 잠깐 캐시
      headers: { "Cache-Control": "public, s-maxage=3, stale-while-revalidate=5" },
    });
  } catch {
    return Response.json({ error: "upbit_unavailable" }, { status: 502 });
  }
}
