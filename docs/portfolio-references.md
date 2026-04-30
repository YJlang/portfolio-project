# 포트폴리오 제작 참고 자료

작성일: 2026-04-29

## 1. SkillsMP 조사 결과

아래 스킬들은 skillsmp MCP로 검색 및 원문 조회했다. 설치 호출은 MCP 내부 CLI 포워딩 단계에서 실패했지만, 원문은 확인했으므로 포트폴리오 제작 지침으로 반영한다.

| 스킬 | GitHub | 사용 목적 |
| --- | --- | --- |
| `senior-portfolio-architect` | https://github.com/KarezP/Portfolio-Karez/tree/main/skills/senior-portfolio-architect | 포트폴리오를 갤러리가 아니라 전략적 제품으로 다루기. 홈 구조, case study, copy hierarchy 설계. |
| `frontend-web-design` | https://github.com/lc0rp/luke-agent-scripts/tree/main/skills/frontend-web-design | visual thesis, content plan, interaction thesis를 먼저 정하고 비범용적 UI 구현. |
| `beautiful-ui` | https://github.com/sailscastshq/boring-stack/tree/main/skills/beautiful-ui | semantic HTML, 접근성, responsive layout, typography 기본기. |
| `engineering-frontend-developer` | https://github.com/PeterHdd/agent-skills/tree/main/skills/engineering-frontend-developer | React/Vite 구현, 성능 최적화, Core Web Vitals, 테스트/QA 기준. |

### 적용 방식

- 기획 단계: `senior-portfolio-architect` 기준으로 대표 프로젝트와 내러티브를 먼저 정한다.
- 디자인 단계: `frontend-web-design` 기준으로 visual thesis, section narrative, motion policy를 고정한다.
- 구현 단계: `beautiful-ui`와 `engineering-frontend-developer` 기준으로 semantic HTML, responsive, 성능, 접근성을 검증한다.

## 2. 웹 포트폴리오 레퍼런스

### Framer Personal Website Examples

링크: https://www.framer.com/blog/personal-website-examples/

관찰:

- 개인 웹사이트는 단순 이력서보다 프로젝트 맥락과 직업적 정체성을 통합하는 허브로 작동해야 한다.
- 좋은 개인 사이트의 최소 조건으로 on-brand visual, 논리적 hierarchy, 결과 중심 work example, niche SEO, responsive design, 빠른 로딩, 일관된 typography, 의도적 animation을 제시한다.
- 윤준하 포트폴리오에 적용하면 `AIX/CX/HCI + backend/product implementation`이라는 niche SEO와 정체성을 명확히 가져가야 한다.

### Framer UX Portfolio Examples

링크: https://www.framer.com/blog/portfolio-website-examples/

관찰:

- Meris Imamovic 사례처럼 미니멀한 구조와 부드러운 인터랙션만으로도 탐색성이 강해질 수 있다.
- Claudio Guglieri 사례처럼 대표 작업을 첫 화면에서 강하게 보여주되, 전체 레이아웃은 정돈될수록 작업 자체가 돋보인다.
- 윤준하 포트폴리오는 UX 디자이너 포트폴리오처럼 `문제 해결 과정`을 보여주되, 개발자 포트폴리오답게 시스템 구조와 구현 판단을 함께 보여주는 혼합형이 적합하다.

### Awwwards Portfolio Collection

링크: https://www.awwwards.com/websites/winner_category_portfolio/

관찰:

- Portfolio 카테고리에서 Interaction Design, Microinteractions, Minimal, Responsive Design, Storytelling, Typography, React, Next.js, Vite, WebGL 같은 필터가 함께 쓰인다.
- 최신 포트폴리오 사례들은 Site of the Day, Developer Award 등 시각적 완성도와 개발 완성도를 함께 평가받는다.
- 적용 시 과한 award-style 효과보다 typography, responsive, storytelling, microinteraction을 제한적으로 가져오는 것이 안전하다.

### A1 Gallery: Framer Portfolio Websites 2026

링크: https://www.a1.gallery/blog/best-framer-portfolio-websites-2026

관찰:

- Arnaldo Petrazzini 사례처럼 장식 없이 프로젝트 목록과 copy-email 버튼만으로도 강한 인상을 줄 수 있다.
- Daniel Sun 사례처럼 연도순 프로젝트 목록과 태그만으로도 실무 범위가 읽힌다.
- Bajgart Design Office 사례처럼 가장 중요한 정보, 예를 들어 예약 가능 여부나 핵심 offer를 hero에 놓는 방식은 매우 직접적이다.
- 윤준하 포트폴리오는 `대표 프로젝트 3개 + 전체 프로젝트 index` 구조로 정보 과밀을 피하는 것이 좋다.

### Tech Glean Developer Portfolio Examples 2025

링크: https://techglean.com/22-best-developer-portfolios-examples-2025/

관찰:

- Brittany Chiang 사례처럼 one-page layout, 어두운 미니멀 디자인, 명확한 CTA는 개발자 포트폴리오에서 여전히 강력하다.
- Gift Egwuenu 사례처럼 프로필 이미지나 색상 포인트 하나가 과도한 장식 없이 개인성을 만든다.
- 윤준하 포트폴리오는 프로필 사진과 프로젝트 성격을 시각 앵커로 쓰고, 나머지는 텍스트 위계를 깔끔하게 잡는 쪽이 적합하다.

## 3. 추천 레퍼런스 해석

윤준하 포트폴리오는 `화려한 수상작형`보다 `명확한 연구/제품형`이 적합하다.

추천 패턴:

- 첫 화면: 이름, 정체성, 대표 프로젝트 3개로 바로 진입.
- 프로젝트: 큰 썸네일 카드보다 문제/역할/기술/결과가 보이는 editorial index.
- About: 학과, 군필, 조교장, 멋쟁이사자처럼, IAAI 학생회원 등 신뢰 정보.
- Research Fit: 특정 연구실 하나가 아니라 HCI/CX/AIX/Business IT/Agentic Software Development 축으로 관심 질문을 명시하고, 지원 대상에 따라 강조점을 조정.
- Proof: 수상과 성적 증빙은 별도 섹션에서 compact하게.

## 4. 다음 구현 때의 기술 후보

### 단순하고 빠른 정적 사이트

- Vite + React + TypeScript
- Tailwind CSS 또는 CSS variables + plain CSS
- GitHub Pages, Vercel, Netlify 중 하나로 배포

### 콘텐츠 확장형 사이트

- Astro 또는 Next.js
- Markdown/MDX 기반 case study
- 프로젝트별 상세 페이지와 블로그/연구 노트 확장

현재 자료량에서는 Vite + React + TypeScript로 먼저 완성하고, 이후 case study가 늘어나면 Astro/Next.js로 확장하는 흐름을 추천한다.

## 5. 장기 운영 관점의 선택 기준

이 포트폴리오는 평생 업데이트할 기반틀이므로, 기술 선택은 첫 출시 속도뿐 아니라 3년 이상 유지할 때의 편의성을 기준으로 판단한다.

- 콘텐츠가 계속 늘어날 경우 Markdown/MDX 기반 관리가 유리하다.
- 프로젝트 목록, 수상, 활동, 연구실 후보는 UI 코드와 분리된 데이터로 관리하는 것이 좋다.
- 디자인 시스템은 색상, 타이포그래피, spacing token을 작게 시작하고 필요할 때 확장한다.
- 애니메이션과 특수 효과는 유지보수 비용을 만든다. 대표성을 높이는 효과만 남긴다.
- 배포는 자동화한다. GitHub push 이후 Vercel/Netlify/GitHub Pages로 자동 배포되는 구조가 장기 운영에 적합하다.
- 공개 정보와 비공개 정보는 처음부터 분리한다. 전화번호, 성적표 원본, 민감한 증빙 이미지는 공개 여부를 매번 점검한다.

## 6. CDG Portfolio Reference 적용 메모

링크: https://cdg-portfolio.com/?utm_source=boottent&utm_medium=referral

관찰:

- 첫 화면에서 이름과 직무 방향을 짧고 강하게 보여준다.
- `About me`, `Skills`, `Archiving`, `Projects`, `Career`처럼 채용자가 익숙하게 훑을 수 있는 섹션 구조를 사용한다.
- About 섹션은 이름, 생년월일, 위치, 연락처, 이메일, 학력처럼 빠른 확인 항목을 제공한다.
- Projects 섹션에는 `주요 프로젝트만 보기` 필터가 있어 프로젝트가 많아져도 대표 작업과 전체 아카이브를 분리할 수 있다.
- 각 프로젝트는 기간, 한 줄 설명, 핵심 bullet, 링크, 기술 스택을 반복 구조로 보여준다.

적용 방향:

- 그대로 복제하지 않고, 우리 포트폴리오의 장기 확장 구조에 맞춰 `About`, `Skills`, `Archiving` 섹션을 추가했다.
- `Projects` 섹션에는 대표 프로젝트 필터를 추가하되, 데이터 소스는 계속 `content/projects.json`을 사용한다.
- About의 전화번호 직접 노출 방식은 따르지 않는다. 기존 공개 정책대로 전화번호와 민감 증빙은 기본 비노출이다.
- `Career`는 현재 경력보다 활동/운영/학업 근거가 더 중요하므로 `Experience / Proof`로 유지한다.

## 7. Interaction Design Redesign Pass

작성일: 2026-04-30

### 참고한 최근 레퍼런스

- Everyday UX, `What a UX design portfolio looks like in 2026`: AI 시대의 포트폴리오는 결과 화면보다 문제 해결 방식, AI stack, 실험 방식, 의사결정 과정을 분명히 보여줘야 한다는 관점을 참고했다.
- Creative Bloq, `15 brilliant design portfolio examples, and why they work`: 좋은 포트폴리오는 화려한 장식보다 명확한 구조, 프로젝트 맥락, 고유한 art direction, 작업이 돋보이는 방식을 갖춰야 한다는 점을 참고했다.
- Designlab, `10 UX/UI Design Portfolio Examples to Inspire You`: UX/UI 포트폴리오도 visual design과 UX best practice를 함께 갖춰야 하며, 역할에 맞는 프로젝트 선택과 case study 구성이 중요하다는 점을 참고했다.
- UX Engineer, `Top 10 UX Engineer Portfolios`: UX Engineer 포트폴리오는 디자인과 개발 역량이 함께 드러나야 하며, project examples, case studies, social proof를 균형 있게 보여줘야 한다는 관점을 참고했다.
- Webflow made-in-webflow microinteraction examples: smooth scroll, hover, transition, project interaction 같은 미세 상호작용을 과하지 않게 적용하는 방향만 참고했다.

### 이번 디자인 적용 방향

- 본문 톤은 존댓말로 통일한다.
- 첫 화면은 이름, 방향성, 대표 프로젝트, 연락 CTA를 유지하되 프로젝트 진입점을 더 선명하게 둔다.
- 카드 나열 느낌을 줄이고, 프로젝트는 `Problem / System / UX-CX` 판단 구조가 보이는 case-study rail로 바꾼다.
- Interaction은 hover lift, anchor jump, details disclosure, nav pill hover 정도로 제한한다.
- 컬러는 beige 일변도에서 벗어나 neutral + ink + teal + warm accent 조합으로 정리한다.
- 과한 3D, 파티클, 장식용 애니메이션은 쓰지 않는다.

## 8. 3D Developer Portfolio Reference Pass

작성일: 2026-04-30

### 참고한 레퍼런스

- GitHub: `syedharif/project_3D_developer_portfolio`
- 링크: https://github.com/syedharif/project_3D_developer_portfolio

### 레퍼런스에서 읽은 패턴

- 첫 화면을 단순 소개가 아니라 interactive stage처럼 구성한다.
- 배경, hero, skills, projects, contact가 하나의 몰입형 흐름으로 이어진다.
- 3D/Spline, particle, smooth reveal, project modal 같은 장치를 사용해 개발자 포트폴리오의 기술적 인상을 강화한다.
- 단, 시각 효과가 강한 만큼 콘텐츠가 약하면 포트폴리오가 템플릿처럼 보일 위험이 있다.

### 현재 포트폴리오 적용 원칙

- 원천 콘텐츠와 연락처 데이터는 유지한다. 변경 범위는 `src/App.tsx`, `src/styles.css` 중심의 UI 표현이다.
- Spline/Three.js 의존성을 즉시 추가하지 않고, CSS 3D perspective, pointer-reactive background, hover lift로 가볍게 적용한다.
- 첫 화면에는 이름, 방향성, 연락 CTA, 대표 프로젝트 진입점을 유지한다.
- 한글 제목에는 `word-break: keep-all`, `line-break: strict`, 안정적인 한국어 폰트 스택을 적용해 음절 단위 줄바꿈을 막는다.
- 모바일에서는 3D overlay를 세로 흐름으로 풀어 겹침과 가독성 문제를 줄인다.
