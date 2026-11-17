import type { NewsItem, NewsResponse } from "@/types/market";

// 네이버 검색 API(뉴스)로 최신순 기사를 가져온다. 검색어를 바꾸면 주제가 바뀐다.
const NEWS_QUERY = "속보";
const NEWS_COUNT = 6;

interface NaverNewsItem {
  title: string;
  originallink?: string;
  link: string;
  pubDate: string;
}

const ENTITIES: Record<string, string> = {
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
};

// 네이버는 제목에 <b> 태그와 HTML 엔티티를 섞어 보낸다 → 순수 텍스트로 변환
function cleanTitle(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&(quot|apos|#39|amp|lt|gt);/g, (m) => ENTITIES[m] ?? m);
}

// 링크는 http(s)만 허용 (javascript: 같은 주소 차단)
function safeUrl(url: string | undefined) {
  return url && /^https?:\/\//i.test(url) ? url : null;
}

// NAVER_CLIENT_ID / NAVER_CLIENT_SECRET은 서버 전용 환경변수 (NEXT_PUBLIC_ 금지)
export async function GET() {
  const id = process.env.NAVER_CLIENT_ID;
  const secret = process.env.NAVER_CLIENT_SECRET;
  if (!id || !secret) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const url = new URL("https://openapi.naver.com/v1/search/news.json");
    url.searchParams.set("query", NEWS_QUERY);
    url.searchParams.set("display", String(NEWS_COUNT));
    url.searchParams.set("sort", "date");

    const res = await fetch(url, {
      headers: { "X-Naver-Client-Id": id, "X-Naver-Client-Secret": secret },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`naver ${res.status}`);

    const data = (await res.json()) as { items?: NaverNewsItem[] };
    const items: NewsItem[] = (data.items ?? []).flatMap((n) => {
      const link = safeUrl(n.link) ?? safeUrl(n.originallink);
      const time = new Date(n.pubDate);
      if (!link || Number.isNaN(time.getTime())) return [];
      return { title: cleanTitle(n.title), url: link, publishedAt: time.toISOString() };
    });

    const body: NewsResponse = { items };
    return Response.json(body, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch {
    return Response.json({ error: "news_unavailable" }, { status: 502 });
  }
}
