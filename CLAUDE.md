# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 작성 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**(README, 설계 문서 등): 한국어로 작성
- **변수명/함수명**: 영어로 작성 (코드 표준 준수)

## 프로젝트 현황

- 개발자 웹 이력서(포트폴리오) 사이트를 만드는 프로젝트이며, 스택은 Next.js(App Router, TypeScript) + Tailwind CSS v4로 확정되어 Phase 1~2 및 Phase 3 일부가 구현되었습니다.
- 개발 계획은 `roadmap.md`에 정리되어 있습니다. 제안된 기술 스택은 Next.js(TypeScript) + Tailwind CSS + Vercel 배포이며, 이력서 콘텐츠는 코드와 분리해 JSON/MDX로 관리하는 구조를 목표로 합니다. 스택이 확정되면 이 파일에 명령어와 아키텍처를 갱신하세요.

## 명령어

- `npm run dev` 개발 서버 / `npm run build` 프로덕션 빌드 / `npm run lint` ESLint / `npx prettier --write app components data styles types` 포맷
- 이 Next.js 버전은 기존 지식과 다를 수 있으므로 `AGENTS.md` 안내대로 `node_modules/next/dist/docs/`를 참고합니다.
- 배포 URL은 `NEXT_PUBLIC_SITE_URL` 환경변수로 지정합니다(sitemap/robots/OG/canonical에 사용, `lib/site.ts`).
- `LayoutProps` 같은 타입은 빌드/dev 시 생성되므로 `tsc --noEmit`은 한 번 빌드한 뒤 실행합니다.

## 아키텍처 원칙

- **콘텐츠와 코드 분리**: 이력서 콘텐츠(경력, 프로젝트, 기술 등)는 `data/`의 JSON/MDX로 관리하고, UI 컴포넌트에 하드코딩하지 않습니다.
- **폴더 구조**: `app/`(라우트), `components/`, `data/resume.json`(콘텐츠), `types/resume.ts`(스키마), `public/`, `styles/globals.css`(테마 변수; 다크 모드는 `html.dark` 클래스)
- **프로그램 목록(`/programs`)**: Supabase(`vaultnote` 프로젝트 재사용, 테이블 `resume_programs`)에 저장하는 유일한 동적 데이터. 조회는 공개, 쓰기는 Auth 사용자의 `app_metadata.role = 'admin'`만 가능(RLS). 접근 제어는 반드시 DB 정책으로 하고, 클라이언트의 isAdmin 판단은 UI 표시용이다. 같은 프로젝트의 vaultnote 테이블(`notes`, `folders` 등)은 다른 앱 소유이므로 수정하지 않는다.
- **시세 패널(소개 섹션)**: `components/MarketData.tsx`(Provider)가 서버 라우트 `app/api/upbit`(업비트 공개 시세, 키 불필요)를 한 번만 폴링해 시세표(`MarketNews`)와 시장 요약(`MarketSummary`)이 공유한다. 외부 API는 항상 서버 라우트를 거치고, 비밀키는 클라이언트에 노출하지 않는다.
- 환경변수 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`가 필요(Vercel과 `.env.local`). service_role 키는 절대 코드/환경변수에 넣지 않는다.

## 완료 기준 (Definition of Done)

- 모든 섹션이 모바일/데스크톱에서 정상 표시된다
- Lighthouse 4개 항목(Performance / Accessibility / Best Practices / SEO) 모두 90점 이상
- 이력서 콘텐츠를 JSON 수정만으로 갱신할 수 있다
- 공개 URL로 접속 가능하며 링크가 프로필에 반영되어 있다

## 로드맵 진행 규칙

- 작업을 마치면 `roadmap.md`의 해당 체크박스(`- [ ]` → `- [x]`)를 갱신합니다.
