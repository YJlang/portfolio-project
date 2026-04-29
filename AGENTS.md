# Codex Agent Guide

이 저장소는 윤준하 개인 포트폴리오 웹사이트를 만들기 위한 자료 저장소다. 이후 Codex가 웹사이트를 설계하거나 구현할 때는 이 문서를 우선 읽고, `docs/portfolio-blueprint.md`와 `docs/portfolio-references.md`를 함께 참고한다.

## Portfolio Goal

- 지원자/연구 지망생/개발자로서의 정체성을 한 번에 전달한다.
- 핵심 포지션은 `AIX, CX, HCI, UX/UI, Web Security, Agentic Software Development에 관심 있는 백엔드 기반 제품 개발자`다.
- 단순 프로젝트 목록이 아니라 문제 정의, 사용자를 이해한 방식, 기술적 판단, 팀 기여, 결과물을 보여주는 case-study형 포트폴리오를 목표로 한다.
- 특정 연구실 하나에 고정되지 않고, HCI/CX/AIX/Business IT/Agentic Software Development 계열 연구실 지원 맥락에서 유연하게 읽히도록 UX, 고객 분석, AI/Agent, HCI 관심사를 전면에 둔다.
- 이 포트폴리오는 일회성 지원 자료가 아니라 평생 업데이트할 개인 작업 기반틀이다. 새 프로젝트, 연구 관심사, 경력, 수상, 글, 실험이 계속 누적될 것을 전제로 설계한다.

## Long-Term Portfolio Principles

- 현재 시점의 목표에 맞추되, 특정 학교/연구실/회사/프로젝트에 종속된 구조로 만들지 않는다.
- 홈은 항상 최신 정체성과 대표 작업을 보여주고, 오래된 작업은 아카이브/인덱스 구조로 자연스럽게 뒤로 이동시킨다.
- 모든 프로젝트는 나중에 상세 case study로 승격될 수 있게 `문제`, `역할`, `기술`, `사용자/비즈니스 맥락`, `결과`, `회고` 필드를 유지한다.
- 연구실 지원, 취업, 외주, 오픈소스, 개인 브랜딩처럼 목적이 달라져도 같은 원천 자료를 재조합할 수 있어야 한다.
- 시간이 지나도 유지 가능한 구현을 우선한다. 화려한 일회성 효과보다 콘텐츠 추가, 수정, 재분류가 쉬운 구조가 중요하다.
- 새 자료를 추가할 때는 파일명, 날짜, 출처, 공개 가능 여부를 함께 남겨 향후 정리 비용을 줄인다.

## Source Materials

- `default-info.MD`: 기본 인적 사항, 경력, 관심사, 연락처, 참고용 Figma 포트폴리오 링크.
- `projects.MD`: GitHub 프로젝트 목록과 간단한 설명.
- `target-labs.MD`: 관심 연구실 후보, 평가 기준, 연구 적합성 메모.
- `images/`: 프로필 사진, 수상/성적/인증 증빙 이미지.
- `.agents/skills/`: repo에 체크인되는 Codex용 skills. 다른 컴퓨터에서 clone해도 같은 작업 지침을 재사용하기 위한 공식 repo-scoped skill 위치.
- `docs/codex-skills.md`: 이 저장소에 포함된 Codex skills의 목적과 관리 규칙.

## Content Priorities

1. 첫 화면에서 이름, 방향성, 대표 프로젝트 2-3개, 연락 경로를 명확히 보여준다.
2. 대표 프로젝트는 PULSE, personaLab, BlogAuto를 우선 상세 케이스 스터디로 다룬다.
3. 팀 프로젝트는 역할과 의사결정 범위를 분명히 쓴다. 개인 프로젝트는 문제 발견부터 구현까지의 end-to-end 역량을 강조한다.
4. 증빙 이미지는 자랑 목록처럼 나열하지 말고 `성실성`, `전공 역량`, `대외 활동/수상`을 보강하는 근거로 사용한다.
5. 연락처는 공개 웹 배포 시 개인정보 노출 위험이 있으므로 이메일 중심 CTA를 기본으로 하고, 전화번호는 별도 공개 여부를 확인한다.
6. 시간이 지나며 대표성이 낮아진 항목은 삭제보다 아카이브로 이동한다. 포트폴리오는 성장의 흔적을 관리하되, 첫 화면은 늘 선명하게 유지한다.

## Design Direction

- Visual thesis: calm research-lab editorial meets practical full-stack product builder.
- Tone: 신뢰감, 정돈됨, 탐구적, 과장 없는 기술적 자신감.
- Layout: 불필요한 카드 남발보다 명확한 섹션, 넓은 여백, 프로젝트별 깊이 있는 상세 페이지.
- Color: 단색 계열 과다 사용을 피하고, 차분한 neutral 기반에 research/AI 느낌의 제한된 accent를 사용한다.
- Typography: 한국어와 영어가 섞이므로 가독성 좋은 sans-serif를 기본으로 하고, 숫자/기술 스택에는 tabular 또는 mono 계열을 제한적으로 사용한다.
- Motion: 스크롤 리빌, 프로젝트 hover, 섹션 전환 정도로 절제한다. 내용 이해를 방해하는 과한 3D/파티클 효과는 피한다.

## Web Implementation Defaults

- 새로 구현한다면 Vite + React + TypeScript를 기본 후보로 둔다. 정적 포트폴리오라면 Next.js보다 Vite가 단순하고 충분하다.
- 스타일은 Tailwind CSS 또는 CSS variables 기반의 plain CSS 중 저장소 상황에 맞게 선택한다.
- HTML landmark, heading hierarchy, keyboard focus, responsive layout, image width/height, lazy loading을 기본 품질 기준으로 둔다.
- 이미지 최적화가 중요하다. `images/상장*.png`는 원본이 크므로 웹 공개용 썸네일/최적화본을 별도로 생성하는 방향을 권장한다.
- 배포 전에는 desktop/mobile 시각 확인, Lighthouse, 링크 동작, 개인정보 노출 점검을 수행한다.
- 장기 운영을 위해 콘텐츠 데이터와 UI 컴포넌트를 분리한다. 프로젝트, 경력, 수상, 연구실 후보, 글 목록은 코드 안에 하드코딩하기보다 데이터 파일이나 Markdown/MDX로 관리하는 방향을 선호한다.

## SkillsMP References

다음 skillsmp 스킬을 참고 후보로 삼았다. MCP 설치 호출은 실패했지만 원문 조회는 성공했으므로 `docs/portfolio-references.md`에 적용 요약을 남겼고, 이 저장소에 맞게 재작성한 repo-scoped skills를 `.agents/skills/`에 추가했다.

- `senior-portfolio-architect`: 포트폴리오 정보 구조, 케이스 스터디, 전략적 스토리텔링.
- `frontend-web-design`: 비범용적인 웹 UI 방향, visual thesis, content plan, responsive QA.
- `beautiful-ui`: semantic HTML, accessibility, responsive, typography.
- `frontend-engineering`: React/Vite, 성능, 접근성, Core Web Vitals, QA 기준.

## Quality Bar

- 첫 5초 안에 `누구인지`, `무엇에 강한지`, `무엇을 만들었는지`, `어디로 연락하면 되는지`가 보여야 한다.
- 프로젝트 설명은 기능 목록보다 문제, 판단, 역할, 결과를 우선한다.
- 디자인은 실험적이어도 텍스트 가독성과 탐색성이 먼저다.
- 구현은 예쁘기만 한 목업이 아니라 배포 가능한 정적 웹사이트 수준이어야 한다.
- 1년 뒤, 5년 뒤에도 새 콘텐츠를 추가하면서 구조가 무너지지 않아야 한다.
