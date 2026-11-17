// 시세 표시용 포맷 함수 (시세표와 시장 요약이 함께 사용)

const krw = new Intl.NumberFormat("ko-KR");

export function formatPrice(price: number) {
  // 저가 코인은 소수점까지 보여줘야 변동이 보임
  const digits = price < 0.1 ? 6 : price < 1 ? 4 : price < 100 ? 2 : 0;
  return `${price.toLocaleString("ko-KR", { maximumFractionDigits: digits })}원`;
}

// 큰 금액은 한국식 단위(조/억)로 표시
export function formatValue(won: number) {
  if (won >= 1e12) return `${(won / 1e12).toFixed(2)}조원`;
  return `${krw.format(Math.round(won / 1e8))}억원`;
}

export function formatVolume(volume: number, symbol: string) {
  let text: string;
  if (volume >= 1e8) text = `${(volume / 1e8).toFixed(1)}억`;
  else if (volume >= 1e4) text = `${krw.format(Math.round(volume / 1e4))}만`;
  else text = volume.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
  return `${text} ${symbol}`;
}

// 한국 시세 관례: 상승은 빨강, 하락은 파랑
export function changeColor(rate: number) {
  if (rate > 0) return "text-rose-400";
  if (rate < 0) return "text-sky-400";
  return "text-muted";
}

export function formatRate(rate: number) {
  const pct = (rate * 100).toFixed(2);
  return `${rate > 0 ? "+" : ""}${pct}%`;
}

const timeFormat = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

export function formatTime(ms: number) {
  return timeFormat.format(new Date(ms));
}
