# 개발자 웹 이력서 로드맵

개발자 개인 웹 이력서(포트폴리오) 사이트를 단계별로 개발하기 위한 로드맵입니다.

## 목표

- 방문자(채용 담당자, 동료 개발자)가 1분 안에 나의 역량을 파악할 수 있는 이력서 사이트
- 모바일/데스크톱 모두 대응하는 반응형 디자인
- 빠른 로딩 속도와 SEO 최적화
- 무료 호스팅으로 배포하고 지속적으로 업데이트 가능한 구조

## 기술 스택 (제안)

| 영역       | 선택                         | 비고                         |
| ---------- | ---------------------------- | ---------------------------- |
| 프레임워크 | Next.js (React, TypeScript)  | 정적 export 가능, SEO 유리   |
| 스타일링   | Tailwind CSS                 | 빠른 UI 개발, 다크 모드 지원 |
| 콘텐츠     | JSON / Markdown(MDX)         | 코드와 콘텐츠 분리           |
| 애니메이션 | Framer Motion (선택)         | 과하지 않게 적용             |
| 배포       | Vercel                       | Git push 시 자동 배포        |
| 품질       | ESLint, Prettier, Lighthouse | 코드 및 성능 점검            |

> 기술 스택은 변경 가능하며, 단순한 사이트를 원하면 HTML/CSS/JS만으로도 충분합니다.

## 페이지 구성

1. **Hero** – 이름, 직무, 한 줄 소개, 연락/이력서 다운로드 버튼
2. **About** – 자기소개, 개발 철학, 강점
3. **Skills** – 기술 스택 (분야별: Frontend / Backend / DevOps / Tools)
4. **Experience** – 경력 (회사, 기간, 역할, 주요 성과)
5. **Projects** – 대표 프로젝트 (설명, 사용 기술, 데모/GitHub 링크, 스크린샷)
6. **Education & Certifications** – 학력, 자격증, 교육 이수
7. **Contact** – 이메일, GitHub, LinkedIn, 블로그 링크
8. **Footer** – 저작권, 최종 업데이트 일자

## 단계별 로드맵

### Phase 0. 기획 및 준비

- [ ] 사이트 목적과 타겟 독자 정의
- [ ] 이력서에 들어갈 콘텐츠 정리 (경력, 프로젝트, 기술, 성과 수치)
- [ ] 레퍼런스 사이트 3~5개 수집 및 디자인 방향 결정
- [ ] 와이어프레임 작성 (종이, Figma 등)
- [ ] 컬러, 폰트, 톤앤매너 결정

### Phase 1. 프로젝트 세팅

- [ ] Git 저장소 구성 및 브랜치 전략 결정
- [x] 프레임워크 초기화 (TypeScript, Tailwind CSS)
- [x] ESLint / Prettier 설정
- [x] 폴더 구조 설계 (`components/`, `data/`, `public/`, `styles/`)
- [x] 이력서 데이터(JSON) 스키마 정의

### Phase 2. 핵심 UI 구현

- [x] 공통 레이아웃 (헤더/내비게이션/푸터)
- [x] Hero, About 섹션
- [x] Skills, Experience 섹션
- [x] Projects 섹션 (카드 UI, 상세 모달 또는 상세 페이지)
- [x] Education, Contact 섹션
- [ ] 반응형 대응 (모바일 → 태블릿 → 데스크톱)

### Phase 3. 기능 및 UX 개선

- [x] 다크/라이트 모드 토글
- [x] 스크롤 내비게이션 및 활성 섹션 표시
- [x] PDF 이력서 다운로드 (또는 인쇄용 스타일 `@media print`)
- [x] 연락 폼 (선택: Formspree, Resend 등) 또는 mailto 링크
- [ ] 다국어 지원 (한국어/영어, 선택)
- [ ] 적절한 애니메이션 및 마이크로 인터랙션

### Phase 4. 품질 및 최적화

- [ ] 접근성 점검 (시맨틱 태그, alt 텍스트, 키보드 탐색, 명도 대비)
- [ ] SEO (메타 태그, Open Graph, sitemap, robots.txt, 파비콘)
- [ ] 이미지 최적화 (next/image, WebP)
- [ ] Lighthouse 점수 90+ 달성 (Performance / Accessibility / Best Practices / SEO)
- [ ] 크로스 브라우저 및 실제 모바일 기기 테스트

### Phase 5. 배포 및 운영

- [ ] Vercel에 배포 및 프리뷰 환경 확인
- [ ] 커스텀 도메인 연결 및 HTTPS 확인
- [ ] 방문 분석 도입 (Vercel Analytics, Google Analytics 등, 선택)
- [ ] README 작성 (실행 방법, 콘텐츠 수정 방법)
- [ ] 이력서 링크를 GitHub, LinkedIn, 채용 플랫폼 프로필에 반영

### Phase 6. 지속 개선

- [ ] 새 프로젝트/경력 정기 업데이트 (분기별)
- [ ] 블로그 섹션 추가 (MDX 기반, 선택)
- [ ] 방문 통계와 피드백 기반 개선
- [ ] 의존성 업데이트 및 보안 점검

## 마일스톤 (예시 일정)

| 주차  | 목표                                        |
| ----- | ------------------------------------------- |
| 1주차 | Phase 0~1: 기획, 콘텐츠 정리, 프로젝트 세팅 |
| 2주차 | Phase 2: 핵심 섹션 UI 구현                  |
| 3주차 | Phase 3~4: 기능 추가, 최적화, 접근성/SEO    |
| 4주차 | Phase 5: 배포, 도메인 연결, 마무리          |

## 완료 기준 (Definition of Done)

- 모든 섹션이 모바일/데스크톱에서 정상 표시된다
- Lighthouse 4개 항목 모두 90점 이상
- 이력서 콘텐츠를 JSON 수정만으로 갱신할 수 있다
- 공개 URL로 접속 가능하며 링크가 프로필에 반영되어 있다
