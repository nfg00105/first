// 배포 URL (Vercel 환경변수 NEXT_PUBLIC_SITE_URL로 지정, 없으면 로컬 주소)
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
