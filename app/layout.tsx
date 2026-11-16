import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import resume from "@/data/resume.json";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const { name, role, tagline } = resume.profile;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${name} | ${role}`,
  description: tagline,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${name} | ${role}`,
    description: tagline,
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: `${name} 포트폴리오`,
  },
  twitter: { card: "summary", title: `${name} | ${role}`, description: tagline },
};

// 검색 엔진용 구조화 데이터 (schema.org Person)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  jobTitle: role,
  description: tagline,
  url: SITE_URL,
  sameAs: resume.profile.links.map((l) => l.url),
};

// 첫 페인트 전에 저장된 테마를 적용해 깜빡임을 방지
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="bg-accent sr-only z-[60] rounded-md px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 dark:text-neutral-950"
        >
          본문 바로가기
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
