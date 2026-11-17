// 업비트 시세 API 응답 타입 (서버 라우트와 클라이언트가 공유)

export interface CoinTicker {
  /** 업비트 마켓 코드 (예: KRW-BTC) */
  market: string;
  /** 심볼 (예: BTC) */
  symbol: string;
  /** 한글 이름 (예: 비트코인) */
  name: string;
  /** 현재가 (원) */
  price: number;
  /** 전일 대비 등락률 (0.01 = 1%) */
  changeRate: number;
  /** 24시간 누적 거래대금 (원) */
  value24h: number;
  /** 24시간 누적 거래량 (코인 개수) */
  volume24h: number;
}

export interface TickerResponse {
  tickers: CoinTicker[];
  /** 서버가 업비트에서 받아온 시각 (ms) */
  updatedAt: number;
}
