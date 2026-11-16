# 개발자 웹 이력서

JSON 데이터만 수정해 갱신하는 개인 웹 이력서(포트폴리오) 사이트입니다.
Next.js(App Router, TypeScript) + Tailwind CSS v4 기반이며 Vercel에 배포합니다.

## 실행 방법

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
npm run lint     # ESLint
npx prettier --write app components data lib styles types   # 포맷
```

Node.js 20 이상을 권장합니다.

## 콘텐츠 수정 방법

모든 이력서 내용은 [`data/resume.json`](data/resume.json)에서 관리합니다. 코드는 수정하지 않아도 됩니다.
필드 구조는 [`types/resume.ts`](types/resume.ts)를 참고하세요.

| 키 | 설명 |
| --- | --- |
| `profile` | 이름, 직무, 한 줄 소개, 이메일, 외부 링크, 이력서 PDF 경로(`resumePdf`) |
| `about` | 자기소개, 개발 철학, 강점 |
| `skills` | 분야별 기술 스택 |
| `experience` | 경력 (회사, 기간, 역할, 성과) |
| `projects` | 프로젝트 (설명, 기술, `demoUrl`, `githubUrl`, `image`) |
| `education` / `certifications` | 학력 / 자격증 |
| `lastUpdated` | 푸터에 표시되는 최종 업데이트 일자 (`YYYY-MM-DD`) |

- **PDF 이력서**: 파일을 `public/`에 두고 `profile.resumePdf`에 `/resume.pdf`처럼 경로를 적으면 다운로드 버튼이 나타납니다. 브라우저 인쇄(`Ctrl+P`)로 PDF 저장도 가능합니다.
- **프로젝트 이미지**: `public/projects/`에 두고 `image`에 `/projects/xxx.webp`처럼 적습니다.

## 환경변수

| 이름 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 사이트 주소 (예: `https://example.com`). sitemap, robots, canonical, Open Graph에 사용. 미설정 시 Vercel 프로덕션 도메인, 그것도 없으면 `http://localhost:3000` |

## 배포 (Vercel)

1. 이 저장소를 GitHub에 푸시합니다.
2. [Vercel](https://vercel.com)에서 **Add New → Project**로 저장소를 가져옵니다. (프레임워크는 Next.js로 자동 인식)
3. **Settings → Environment Variables**에 `NEXT_PUBLIC_SITE_URL`을 등록합니다.
4. 이후 `main`에 푸시하면 프로덕션이 자동 배포되고, 브랜치/PR은 프리뷰 URL이 생성됩니다.
5. 커스텀 도메인은 **Settings → Domains**에서 추가하고 안내된 DNS 레코드를 설정합니다. HTTPS 인증서는 자동 발급됩니다.

## 폴더 구조

```
app/          라우트, 레이아웃, sitemap/robots/아이콘
components/   섹션 UI 컴포넌트
data/         resume.json (콘텐츠)
lib/          공통 상수 (사이트 URL)
public/       정적 파일 (PDF, 이미지)
styles/       globals.css (테마 변수, 인쇄 스타일)
types/        resume.ts (데이터 스키마)
```
