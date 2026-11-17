import type { CoinTicker, TickerResponse } from "@/types/market";

// 표시할 주요 가상화폐 (업비트 원화 마켓). 순서대로 화면에 표시된다
const COINS = [
  { market: "KRW-BTC", symbol: "BTC", name: "비트코인" },
  { market: "KRW-ETH", symbol: "ETH", name: "이더리움" },
  { market: "KRW-XRP", symbol: "XRP", name: "리플" },
  { market: "KRW-SOL", symbol: "SOL", name: "솔라나" },
  { market: "KRW-DOGE", symbol: "DOGE", name: "도지코인" },
  { market: "KRW-ADA", symbol: "ADA", name: "에이다" },
  { market: "KRW-USDT", symbol: "USDT", name: "테더" },
  { market: "KRW-TRX", symbol: "TRX", name: "트론" },
  { market: "KRW-LINK", symbol: "LINK", name: "체인링크" },
  { market: "KRW-AVAX", symbol: "AVAX", name: "아발란체" },
  { market: "KRW-DOT", symbol: "DOT", name: "폴카닷" },
  { market: "KRW-BCH", symbol: "BCH", name: "비트코인캐시" },
  { market: "KRW-ETC", symbol: "ETC", name: "이더리움클래식" },
  { market: "KRW-XLM", symbol: "XLM", name: "스텔라루멘" },
  { market: "KRW-ATOM", symbol: "ATOM", name: "코스모스" },
  { market: "KRW-NEAR", symbol: "NEAR", name: "니어프로토콜" },
  { market: "KRW-SUI", symbol: "SUI", name: "수이" },
  { market: "KRW-APT", symbol: "APT", name: "앱토스" },
  { market: "KRW-HBAR", symbol: "HBAR", name: "헤데라" },
  { market: "KRW-SHIB", symbol: "SHIB", name: "시바이누" },
  { market: "KRW-AAVE", symbol: "AAVE", name: "에이브" },
  { market: "KRW-UNI", symbol: "UNI", name: "유니스왑" },
  { market: "KRW-ARB", symbol: "ARB", name: "아비트럼" },
  { market: "KRW-ONDO", symbol: "ONDO", name: "온도파이낸스" },
  { market: "KRW-PEPE", symbol: "PEPE", name: "페페" },
  { market: "KRW-STX", symbol: "STX", name: "스택스" },
] as const;

interface UpbitTicker {
  market: string;
  trade_price: number;
  signed_change_rate: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
}

// 업비트 공개 시세 API는 브라우저에서 직접 호출할 수 없어 서버에서 대신 가져온다 (인증 키 불필요).
// 원화 마켓 전체를 받아 목록만 걸러 쓰므로, 상장폐지된 종목이 섞여도 나머지는 정상 표시된다
export async function GET() {
  try {
    const res = await fetch("https://api.upbit.com/v1/ticker/all?quote_currencies=KRW", {
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
