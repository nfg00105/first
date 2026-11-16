// 배포 URL 결정 순서:
// 1) NEXT_PUBLIC_SITE_URL (커스텀 도메인 등 직접 지정)
// 2) VERCEL_PROJECT_PRODUCTION_URL (Vercel이 자동 제공하는 프로덕션 도메인)
// 3) 로컬 개발 주소
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  vercelUrl ??
  "http://localhost:3000"
).replace(/\/$/, "");
