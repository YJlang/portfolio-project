# Development Journal

포트폴리오 제작 과정을 일기처럼 남기는 문서다. 완벽한 보고서보다 “다음에 이어서 작업할 수 있는 기록”을 목표로 한다.

## How To Use

- 작업을 시작할 때 오늘 목표를 먼저 쓴다.
- 작업 중 결정, 고민, 막힌 점을 짧게 남긴다.
- 작업 후 변경 파일, 검증 결과, 다음 작업을 정리한다.
- 날짜는 `YYYY-MM-DD` 형식을 사용한다.

## Entry Template

```md
## YYYY-MM-DD

### Goal

- 

### Work

- 

### Decisions

- 

### Changed Files

- 

### Verification

- 

### Blockers / Questions

- 

### Next

- 
```

## 2026-04-29

### Goal

- 포트폴리오 웹사이트 개발 전, 장기 운영 가능한 문서 기반을 만든다.

### Work

- 현재 디렉토리의 기본 정보, 프로젝트 목록, 관심 연구실 문서를 분석했다.
- 포트폴리오가 특정 연구실에 고정되지 않도록 `target-labs.MD`를 관심 연구실 후보 관리 문서로 리팩토링했다.
- Codex가 다른 컴퓨터에서도 같은 작업 기억을 사용할 수 있도록 repo-scoped skills를 `.agents/skills`에 추가했다.
- 개발 계획과 작업 현황을 관리하기 위해 `README.md`와 이 작업 일지 문서를 추가했다.

### Decisions

- 포트폴리오는 일회성 지원 페이지가 아니라 평생 업데이트하는 개인 작업 기반틀로 관리한다.
- 첫 출시는 작게 시작하되, 구조는 `/work`, `/writing`, `/research-fit`, `/archive`로 확장 가능하게 설계한다.
- Codex 공식 repo-scoped skill 위치인 `.agents/skills`를 사용한다.

### Changed Files

- `AGENTS.md`
- `target-labs.MD`
- `docs/portfolio-blueprint.md`
- `docs/portfolio-references.md`
- `docs/codex-skills.md`
- `.agents/skills/portfolio-architect/SKILL.md`
- `.agents/skills/frontend-web-design/SKILL.md`
- `.agents/skills/beautiful-ui/SKILL.md`
- `.agents/skills/frontend-engineering/SKILL.md`
- `README.md`
- `docs/development-journal.md`

### Verification

- 문서 검색으로 고정형 연구실 표현을 확인하고 유연한 표현으로 정리했다.
- `.agents/skills/*/SKILL.md`에 `name`과 `description` frontmatter가 있는지 확인했다.
- README에 개발 단계와 작업 루틴을 추가했다.

### Blockers / Questions

- 실제 웹사이트 기술 스택은 아직 확정 전이다. 현재 기본 후보는 Vite + React + TypeScript다.
- 전화번호와 성적/수상 증빙 이미지의 공개 범위는 배포 전에 다시 결정해야 한다.

### Next

- 프로젝트/수상/경력/연구실 후보를 위한 콘텐츠 데이터 구조를 정한다.
- Vite + React + TypeScript 프로젝트 초기 세팅을 진행한다.
- Hero와 Featured Work의 실제 카피를 확정한다.

## 2026-04-29 Phase 1

### Goal

- 웹사이트 구현 전에 프로젝트, 프로필, 경력, 증빙, 연구 방향 데이터를 UI 코드와 분리한다.

### Work

- `content/` 디렉토리를 추가하고 포트폴리오 데이터 JSON 초안을 만들었다.
- 프로젝트를 `featured`, `index`, `archive` 상태로 나누었다.
- 공개 가능한 정보와 공개 전 검토가 필요한 정보를 `public`, `"review"`, `false` 기준으로 표시했다.
- 콘텐츠 데이터 구조와 업데이트 규칙을 `docs/content-model.md`에 문서화했다.
- README의 Phase 1 체크리스트를 완료 상태로 업데이트했다.

### Decisions

- 첫 구현에서는 JSON 파일을 직접 import하는 단순한 구조를 사용한다.
- case study가 길어지면 나중에 `content/case-studies/<slug>.mdx`로 분리한다.
- 전화번호와 성적 관련 증빙은 공개 사이트에 기본 노출하지 않는다.
- 대표 프로젝트는 `pulse`, `persona-lab`, `blog-auto`로 시작한다.

### Changed Files

- `README.md`
- `docs/development-journal.md`
- `docs/content-model.md`
- `content/site.json`
- `content/profile.json`
- `content/projects.json`
- `content/experience.json`
- `content/proof-assets.json`
- `content/research.json`

### Verification

- PowerShell `ConvertFrom-Json`으로 `content/*.json` 전체 파싱을 확인했다.
- README Phase 1 체크리스트가 모두 완료 상태인지 확인했다.

### Blockers / Questions

- 각 대표 프로젝트의 실제 역할, 결과, 데모 이미지, 배포 링크는 추가 조사가 필요하다.
- 수상 이미지의 정확한 수상명과 공개 가능 여부는 아직 확인 필요하다.

### Next

- Phase 2로 넘어가 Vite + React + TypeScript 프로젝트를 세팅한다.
- `content/*.json`을 앱에서 import하는 구조를 만든다.
- Hero와 Featured Work 섹션을 우선 구현한다.

## 2026-04-29 Phase 2

### Goal

- Vite + React + TypeScript 기반 첫 포트폴리오 웹사이트를 구현한다.

### Work

- Vite, React, TypeScript 프로젝트 골격을 직접 추가했다.
- `content/*.json`을 import해서 Hero, Featured Work, Project Index, Experience / Proof, Research Direction, Contact 섹션을 구현했다.
- 프로필 이미지는 Vite asset import로 번들링되도록 연결했다.
- 공개 연락처는 `public: true`인 이메일/GitHub만 보여주고, 전화번호는 기본 비노출 정책을 유지했다.
- CSS variables 기반 디자인 토큰과 반응형 레이아웃을 추가했다.
- Vite dev server를 `http://127.0.0.1:5173/`에서 실행했다.

### Decisions

- 첫 버전은 별도 라우터 없이 단일 페이지 섹션 구조로 구현한다.
- 장기 route 계획은 `content/site.json`과 README에 유지한다.
- 증빙 이미지는 공개 검토 전이므로 원본 이미지를 직접 노출하지 않고 텍스트 proof strip으로만 보여준다.
- 디자인은 calm research/product editorial 방향으로 잡고, 과한 3D/애니메이션 없이 타이포그래피와 목록 구조 중심으로 구현한다.

### Changed Files

- `.gitignore`
- `package.json`
- `package-lock.json`
- `index.html`
- `tsconfig.json`
- `tsconfig.app.json`
- `vite.config.ts`
- `src/main.tsx`
- `src/App.tsx`
- `src/types.ts`
- `src/styles.css`
- `src/vite-env.d.ts`
- `README.md`
- `docs/development-journal.md`

### Verification

- `npm install` 완료, 취약점 0개 확인.
- `npm run build` 성공.
- `Invoke-WebRequest http://127.0.0.1:5173/` 응답 코드 200 확인.

### Blockers / Questions

- 대표 프로젝트별 실제 역할, 데모 이미지, 결과 지표가 아직 부족하다.
- 프로필 사진 원본이 약 488KB로 빌드에 포함된다. 추후 이미지 최적화가 필요하다.
- 브라우저 시각 QA와 Lighthouse 점검은 Phase 4에서 더 정밀하게 수행한다.

### Next

- Phase 3로 넘어가 PULSE, personaLab, BlogAuto case study 초안을 작성한다.
- 대표 프로젝트별 스크린샷, 데모 링크, 본인 기여 범위를 보강한다.

## 2026-04-30 Interaction Design Refinement

### Goal

- 포트폴리오 본문 톤을 존댓말로 통일한다.
- Interaction Design 레퍼런스를 검색하고, 현재 웹사이트의 시각 구조와 프로젝트 섹션을 리팩토링한다.
- 이후 작업 순서를 `증빙 이미지 및 논문 등록` -> `PULSE case study 완성`으로 이어갈 수 있게 정리한다.

### Work

- 2026년 UX/UI 포트폴리오와 interaction design 레퍼런스를 검색했다.
- `content/profile.json`, `content/projects.json`, `content/experience.json`, `content/research.json`의 화면 노출 문장을 존댓말로 정리했다.
- Hero에 대표 프로젝트 진입 strip을 추가했다.
- Projects 섹션을 `Problem / System / UX-CX` 판단 구조가 보이는 case-study rail 형태로 바꿨다.
- 프로젝트 분석 근거는 `details/summary`로 접어둘 수 있게 만들어 정보 밀도를 조절했다.
- CSS visual system을 neutral + ink + teal + warm accent 조합으로 정리하고 hover/focus interaction을 추가했다.

### Decisions

- 과한 3D/파티클/scroll hijacking은 쓰지 않고, hover, anchor, disclosure 중심의 절제된 interaction을 사용한다.
- 프로젝트 텍스트는 단정한 설명체를 유지하되, 사용자가 보는 본문 문장은 존댓말로 맞춘다.
- 다음 큰 작업은 증빙 이미지/논문 등록을 먼저 하고, 이후 PULSE case study를 깊게 완성한다.

### Changed Files

- `content/profile.json`
- `content/projects.json`
- `content/experience.json`
- `content/research.json`
- `content/site.json`
- `src/App.tsx`
- `src/styles.css`
- `docs/portfolio-references.md`
- `docs/development-journal.md`

### Verification

- `content/*.json` 파싱 성공.
- `npm run build` 성공.
- 로컬 dev server 응답 200 확인.
- Chrome DevTools 모바일 viewport 390x844에서 screenshot 확인.
- 브라우저 콘솔 error/warn 없음 확인.

### Next

- 증빙 이미지와 논문 정보를 등록한다.
- KCI 논문 링크를 근거 자료로 연결한다.
- PULSE case study에서 본인 담당 범위, 데모 화면, 결과 자료를 보강한다.

## 2026-04-30 SkillsMP Agent Capability Search

### Goal

- PowerShell 한글 출력과 UTF-8/CP949 인코딩 문제를 더 자연스럽게 다루는 Codex skill 후보를 찾는다.
- 사진, 증빙 이미지, 스크린샷, OCR 판독을 돕는 Codex skill 후보를 찾고 저장소에 등록한다.

### Work

- SkillsMP MCP로 Korean/PowerShell/encoding 관련 skill을 검색했다.
- SkillsMP MCP로 image/photo/OCR/vision 관련 skill을 검색하고 `vision-analysis`, `vision-reader`, `ocr`, `image-ocr` 후보 원문을 확인했다.
- `image-ocr`는 참고 가치가 높았지만 MCP 설치 호출이 deprecation 메시지로 실패했다.
- 외부 후보를 그대로 설치하기보다 이 저장소에 맞는 repo-scoped skill 두 개를 추가했다.

### Decisions

- PowerShell 한글/CP949/UTF-8 문제는 딱 맞는 공개 skill이 없어 `windows-korean-powershell`을 직접 만들었다.
- 이미지 판독은 특정 유료 MCP나 macOS 전용 OCR에 고정되지 않도록 `visual-asset-reader`로 재작성했다.
- 두 skill 모두 `.agents/skills`에 둬서 다른 컴퓨터에서 clone해도 함께 따라가도록 했다.

### Changed Files

- `.agents/skills/windows-korean-powershell/SKILL.md`
- `.agents/skills/visual-asset-reader/SKILL.md`
- `docs/codex-skills.md`
- `docs/development-journal.md`

### Verification

- 새 skill 두 개 모두 `SKILL.md` frontmatter에 `name`과 `description`을 포함한다.

### Next

- 새 Codex 세션에서 skill 목록에 `windows-korean-powershell`, `visual-asset-reader`가 잡히는지 확인한다.
- 증빙 이미지 정리 작업을 시작할 때 `visual-asset-reader`를 실제로 사용해 판독 품질을 점검한다.

## 2026-04-30 Project Repository Research

### Goal

- `projects.MD`의 GitHub 레포를 직접 읽고, 포트폴리오 프로젝트 설명을 기술 스택/의도/시스템 구조 중심으로 보강한다.
- 개인 블로그 Velog 링크를 공개 아카이빙 경로에 추가한다.

### Work

- PULSE 루트 레포와 `pulse_FE`, `pulse_python`, `pulse_spring` 서브모듈/관련 레포를 확인했다.
- personaLab, BlogAuto, SKUSKU_Back, gacha, KeyBaeGG, 함께줍줍 레포의 README, 설정 파일, 주요 코드 경로를 읽었다.
- 분석 결과를 `content/projects.json`의 `intent`, `highlights`, `evidence`, `caseStudy` 필드에 반영했다.
- 프로젝트 화면을 레포 링크, 프로젝트 의도, 핵심 포인트, 스택 태그가 더 잘 보이는 구조로 리팩토링했다.
- 레포별 분석 메모를 `docs/project-research.md`에 추가했다.

### Decisions

- PULSE, personaLab, BlogAuto를 계속 대표 프로젝트로 유지한다.
- 나머지 프로젝트는 삭제하지 않고 index/archive로 보존해 장기 포트폴리오 확장성을 유지한다.
- 실제 개인 담당 범위가 아직 더 확인되어야 하는 부분은 단정하지 않고, 추후 보강 대상으로 남긴다.

### Changed Files

- `content/profile.json`
- `content/projects.json`
- `content/site.json`
- `src/App.tsx`
- `src/styles.css`
- `src/types.ts`
- `docs/project-research.md`
- `docs/development-journal.md`

### Verification

- `content/projects.json` JSON 파싱을 확인했다.
- `content/profile.json`에 Velog 공개 링크가 추가된 것을 확인했다.

### Next

- `npm run build`로 TypeScript/Vite 빌드를 검증한다.
- PULSE 중심으로 데모 화면, 실제 담당 범위, 결과 자료를 추가해 case study를 더 깊게 확장한다.

## 2026-04-30 Reference Design Pass

### Goal

- CDG 포트폴리오 레퍼런스를 참고해 현재 사이트의 정보 구조와 섹션 탐색성을 개선한다.

### Work

- 레퍼런스 사이트의 `About me`, `Skills`, `Archiving`, `Projects`, `Career` 흐름을 분석했다.
- 우리 포트폴리오에 `About`, `Skills`, `Archiving` 섹션을 추가했다.
- Projects 섹션에 `주요 프로젝트만 보기` 토글을 추가했다.
- 프로젝트 상세 표시를 문제, 시스템, 결과 bullet이 드러나는 구조로 개선했다.
- 네비게이션에 About, Skills, Archiving 링크를 추가했다.
- `content/site.json`의 현재 phase를 `reference-informed-design`으로 업데이트했다.

### Decisions

- 레퍼런스의 익숙한 포트폴리오 섹션 문법은 가져오되, 우리 포트폴리오의 장기 확장성과 데이터 기반 구조는 유지한다.
- 전화번호 직접 노출 방식은 따르지 않는다. 공개 연락처는 이메일/GitHub 중심으로 유지한다.
- 증빙 이미지는 아직 직접 노출하지 않고, 공개 검토가 필요한 proof item으로만 다룬다.

### Changed Files

- `src/App.tsx`
- `src/styles.css`
- `content/site.json`
- `docs/portfolio-references.md`
- `docs/development-journal.md`

### Verification

- `npm run build` 성공.
- `content/site.json` JSON 파싱 성공.

### Blockers / Questions

- 실제 브라우저 시각 QA는 추가 확인이 필요하다.
- 프로젝트별 기간, 데모 이미지, README/영상 링크가 아직 부족하다.

### Next

- 로컬 브라우저에서 320px, 768px, 1280px 기준으로 레이아웃을 확인한다.
- Phase 3에서 대표 프로젝트 case study의 기간, 역할, 결과, 링크를 보강한다.

## 2026-04-30 Immersive Interaction Redesign

### Goal

- 3D 개발자 포트폴리오 레퍼런스를 참고해 현재 사이트를 더 고급스러운 interaction 중심 UI로 재설계한다.
- 프로젝트, 연락처, 블로그, 프로필 같은 원천 콘텐츠는 유지하고 디자인 표현만 크게 바꾼다.
- 한글 제목이 음절 단위로 끊기는 문제를 우선 해결한다.

### Work

- `syedharif/project_3D_developer_portfolio` 레포를 로컬로 확인하고, immersive hero, particle background, project interaction, section flow 패턴을 분석했다.
- 무거운 Spline/Three.js 의존성을 바로 추가하지 않고, CSS 3D perspective와 pointer-reactive ambient layer로 현재 Vite 구조에 맞게 적용했다.
- Hero를 `copy + interactive stage` 구조로 바꾸고, 대표 프로젝트를 stage 안에서 바로 탐색할 수 있게 했다.
- About, Skills, Archiving, Projects, Experience/Proof, Research, Contact의 기존 콘텐츠 흐름은 유지했다.
- `word-break: keep-all`, `line-break: strict`, Pretendard/Noto Sans KR 기반 폰트 스택을 적용해 한글 줄바꿈을 개선했다.
- 모바일에서는 stage 내부 overlay를 세로 흐름으로 풀어 텍스트와 패널 겹침을 줄였다.

### Decisions

- 레퍼런스를 복제하지 않고, 장기적으로 업데이트 가능한 데이터 기반 구조를 유지한다.
- 지금 단계에서는 실제 3D 라이브러리보다 CSS transform 중심의 가벼운 상호작용을 우선한다.
- 콘텐츠는 `content/*.json`에서 계속 공급하고, UI는 표현 계층으로 분리한다.

### Changed Files

- `src/App.tsx`
- `src/styles.css`
- `content/site.json`
- `docs/portfolio-references.md`
- `docs/development-journal.md`

### Verification

- `npm run build` 성공.
- `content/profile.json`, `content/projects.json`, `content/site.json` JSON 파싱 성공.
- Chrome DevTools로 1440px desktop, 390px mobile viewport를 확인했다.
- 브라우저 console error/warning 없음.

### Next

- 증빙 이미지와 KCI 등재 논문 정보를 공개 가능 범위에 맞춰 등록한다.
- PULSE case study를 실제 화면, 역할, 기술 판단, 결과 중심으로 더 깊게 완성한다.

## 2026-04-30 Agentic Engineering Metadata Pass

### Goal

- Engineering Stack에 AI 활용 하네스 엔지니어링 관점을 추가한다.
- 각 프로젝트별 MCP/Tooling, Agent Skill, SubAgent 오케스트레이션 여부를 분리해 기록한다.

### Work

- `Project.agenticEngineering` 타입을 추가했다.
- `content/projects.json`의 7개 프로젝트에 `summary`, `mcpServers`, `agentSkills`, `subAgentOrchestration`, `notes`를 추가했다.
- 확인되지 않은 MCP/SubAgent 사용은 과장하지 않고 `not-used` 또는 `not-confirmed`가 가능한 구조로 관리하도록 했다.
- 화면의 프로젝트 상세에 `Agentic Engineering` 블록을 추가했다.
- Skills의 Engineering Stack에 `AI Harness Engineering`, `MCP Server Integration`, `Agent Skill Design`, `SubAgent Orchestration`을 우선 노출했다.

### Decisions

- 프로젝트 런타임에서 실제 확인되는 AI/Agent 구조와, 포트폴리오 분석 과정에서 사용한 MCP/Tooling은 `scope`로 구분한다.
- `SubAgent`는 Codex SubAgent만 의미하지 않고, 프로젝트 도메인에서 분리 실행되는 agent worker/pipeline까지 설명할 수 있게 `used`, `partial`, `not-used`, `not-confirmed`로 나눈다.
- gacha, KeyBaeGG처럼 현재 AI/Agent 사용 근거가 없는 프로젝트는 억지로 AI 프로젝트로 포장하지 않는다.

### Changed Files

- `content/projects.json`
- `src/types.ts`
- `src/App.tsx`
- `src/styles.css`
- `docs/content-model.md`
- `docs/development-journal.md`

### Verification

- `content/projects.json` JSON 파싱 성공.
- 각 프로젝트의 `subAgentOrchestration.status` 값을 확인했다.

## 2026-04-30 Proof Asset Registration Pass

### Goal

- 상장 이미지를 직접 확인하고, 어떤 상인지 포트폴리오 데이터에 등록한다.
- 원본 증빙은 보존하되 공개 UI에는 개인정보 리스크를 줄인 썸네일을 사용한다.

### Work

- `images/상장2020.png`, `images/상장2021.png`, `images/상장2025.png`, `images/상장2026.png`를 시각적으로 확인했다.
- 2020 교내 SW개발 아이디어 대회 장려상, 2021 사용자 조사 기반 웹/앱서비스 기획 경진대회 최우수상, 2025-1 VR/AR/Game 경진대회 최우수상, 2025-2 사용자 경험 디자인 소논문 경진대회 최우수상으로 정리했다.
- `content/proof-assets.json`에 발급기관, 날짜, 수상명, 증명 가치, 개인정보 리스크, 추천 사용처를 추가했다.
- `images/optimized/`에 공개 검토용 WebP 썸네일을 생성했다.
- 문서번호, 학번/학급 등 민감한 영역은 썸네일에서 마스킹했다.
- Experience / Proof 섹션에서 증빙 썸네일과 메타데이터가 보이도록 UI를 연결했다.

### Decisions

- 상장 원본은 `src`로 보존하고, 공개 UI에는 `thumbnailSrc` 역할의 최적화 이미지를 사용한다.
- 상장류는 모두 `public: "review"` 상태로 둔다. 실제 배포 전에는 공개 가능 여부와 마스킹 상태를 다시 확인한다.
- 2026 사용자 경험 디자인 소논문 경진대회 최우수상은 HCI/UX/CX 연구 적합성 증빙으로 우선도가 높다.

### Changed Files

- `content/proof-assets.json`
- `src/App.tsx`
- `src/styles.css`
- `src/types.ts`
- `content/site.json`
- `docs/content-model.md`
- `docs/development-journal.md`
- `images/optimized/*.webp`

### Verification

- `content/proof-assets.json` JSON 파싱 성공.
- `npm run build` 성공.
- 원본 상장 대비 공개용 썸네일 용량이 약 18-31KB 수준으로 줄어든 것을 확인했다.

## 2026-05-06 Academic Proof and Stack Refinement

### Goal

- `images/성적장학금.png`, `images/전선성적.png`, `images/전필성적.png`, `images/전공역량인증.png`를 포트폴리오 학업 증빙으로 정돈한다.
- 공개용 기술스택에 사용자가 명시한 백엔드, 클라우드, AI/Harness, 런타임 기술을 반영하고 React/Vite 표기는 제거한다.

### Work

- 네 개의 학업 증빙 이미지를 직접 확인하고, `content/proof-assets.json`에 `evidenceGroup`, `metric`, `highlights` 필드를 추가했다.
- 성적 우수 장학금, 전공역량인증, 전공 선택 과목 성적, 전공 필수 과목 성적을 `Academic Evidence` 카드로 화면에 표시했다.
- 공개용 기술스택을 `content/profile.json`의 `technicalStack`으로 분리했다.
- 프로젝트별 stack과 설명문에서 React/Vite 중심 표현을 제거하고, 화면 계층 또는 앱 UI처럼 더 넓은 표현으로 조정했다.
- `src/App.tsx`, `src/styles.css`, `src/types.ts`를 업데이트해 학업 증빙 카드와 새 기술스택 구조를 렌더링했다.

### Decisions

- 성적 이미지는 과목별 등급이 포함되므로 `public: "review"` 상태로 유지한다.
- 원본 성적 이미지를 크게 전시하기보다, 전공 기반성과 성실성을 설명하는 보조 증빙 카드로 사용한다.
- 기술스택은 프로젝트 데이터에서 자동 추출하지 않고, 공개용 자기소개 데이터로 관리한다.

### Changed Files

- `content/profile.json`
- `content/projects.json`
- `content/proof-assets.json`
- `content/site.json`
- `src/App.tsx`
- `src/styles.css`
- `src/types.ts`
- `README.md`
- `docs/development-journal.md`

### Verification

- `content/profile.json`, `content/projects.json`, `content/proof-assets.json` JSON 파싱을 확인했다.
- `npm run build`를 실행해 TypeScript/Vite 빌드 성공을 확인했다.
- `rg -n "React|Vite" content/projects.json src/App.tsx content/profile.json`로 공개용 프로젝트/프로필/화면 코드의 React/Vite 표기 제거를 확인했다.

### Next

- PULSE case study를 먼저 완성한다.
- PULSE, personaLab, BlogAuto의 스크린샷, 데모 링크, 본인 담당 범위, 결과 자료를 보강한다.
- 이후 모바일/데스크톱 시각 QA, Lighthouse, 개인정보 공개 범위 점검으로 공개 품질을 마감한다.

## 2026-05-06 PULSE Demo and Copy Polish

### Goal

- `images/PULSE_demo.mp4`를 PULSE 대표 프로젝트 카드에 자동재생 데모로 삽입한다.
- 화면에 보이는 내부 작업용 문구를 자연스러운 포트폴리오 문장으로 바꾼다.
- 변경사항을 커밋하고 `main`에 푸시해 GitHub Pages 배포가 다시 돌도록 한다.

### Work

- `content/projects.json`의 PULSE 항목에 `demoVideo` 필드를 추가했다.
- `src/App.tsx`에서 PULSE 데모 영상을 `autoPlay`, `muted`, `loop`, `playsInline`, `controls`, `preload="metadata"` 설정으로 렌더링했다.
- 프로젝트 카드 안에서 요약 문장 아래, 문제/시스템/UX-CX 카드 위에 영상 프리뷰를 배치했다.
- `공개 검토 필요`, `분석 근거 보기`, `Experience / Proof`, `Academic Evidence` 같은 화면 문구를 `요약본`, `참고 자료`, `Experience / Records`, `Academic Record`로 다듬었다.
- `src/styles.css`에 데모 영상 프레임과 캡션 스타일을 추가했다.

### Decisions

- PULSE 영상은 사용자가 프로젝트 흐름을 바로 파악할 수 있도록 카드 내부에서 조용히 자동재생한다.
- 자동재생을 위해 영상은 음소거 상태를 기본으로 두고, 사용자가 직접 조작할 수 있게 controls를 유지한다.
- 내부 검수 상태를 드러내는 문구는 공개 포트폴리오 화면에서 숨기고, 보는 사람에게 의미 있는 표현만 남긴다.

### Changed Files

- `content/projects.json`
- `src/App.tsx`
- `src/styles.css`
- `src/types.ts`
- `README.md`
- `docs/development-journal.md`
- `images/PULSE_demo.mp4`

### Verification

- JSON 파싱을 확인했다.
- `npm run build`로 TypeScript/Vite 빌드 성공을 확인했다.
- Playwright로 데스크톱에서 PULSE 영상이 자동재생되는 것을 확인했다.
- Playwright 모바일 390px에서 영상 프레임이 화면 폭을 넘지 않고, 영상이 뷰포트에 들어오면 재생되는 것을 확인했다.
- 화면 본문에서 `공개 검토 필요`, `분석 근거 보기`, `Academic Evidence`, `Experience / Proof` 문구가 보이지 않는 것을 확인했다.

### Next

- PULSE case study 본문을 담당 범위, 데모 장면, 결과 중심으로 확장한다.
- 이후 personaLab, BlogAuto case study를 같은 밀도로 보강한다.

## 2026-05-06 SKUSKU Operations Evidence

### Goal

- SKUSKU_Back을 코드 기여 프로젝트가 아니라 실제 서비스 운영/관리/유지보수 경험으로 다시 포지셔닝한다.
- `https://sku-sku.com` 메인 화면을 확인하고 포트폴리오용 스크린샷으로 프로젝트 카드에 연결한다.

### Work

- `https://sku-sku.com`에 직접 접속해 메인 화면을 확인했다.
- 데스크톱 히어로 화면을 캡처하고 `images/optimized/skusku-home-preview.jpg`로 1200x675 프리뷰 이미지를 생성했다.
- `content/projects.json`의 `skusku-back` 항목을 `SKUSKU 운영`으로 재정리했다.
- SKUSKU 설명에 성결대학교 멋쟁이사자처럼 아기사자들이 실제로 이용하는 서비스라는 점을 반영했다.
- 역할 문구를 `운영 관리 / 유지보수`로 바꾸고, 직접 코드 구현 기여로 소개하지 않도록 조정했다.
- 프로젝트 카드에 `Live Service` 링크와 메인 화면 프리뷰 이미지를 표시할 수 있도록 `previewImage` 필드를 추가했다.

### Decisions

- SKUSKU는 구현 역량보다 실사용 서비스 운영 경험, 사용자 대상 서비스 관리, 유지보수 커뮤니케이션 경험으로 보여준다.
- 운영 중인 서비스 화면은 외부 사용자가 서비스 실재성을 바로 이해할 수 있는 시각 자료로 사용한다.
- 스크린샷은 원본 그대로 크게 쓰지 않고 카드형 프리뷰에 맞춰 경량화한 이미지를 사용한다.

### Changed Files

- `content/projects.json`
- `content/site.json`
- `src/App.tsx`
- `src/styles.css`
- `src/types.ts`
- `README.md`
- `docs/development-journal.md`
- `images/optimized/skusku-home-preview.jpg`

### Verification

- `content/projects.json`, `content/site.json` JSON 파싱을 확인했다.
- `npm run build`로 TypeScript/Vite 빌드 성공을 확인했다.
- Playwright 데스크톱에서 SKUSKU 카드 제목, 프리뷰 이미지, `Live Service` 링크가 표시되는 것을 확인했다.
- Playwright 모바일 390px에서 SKUSKU 프리뷰 이미지가 화면 폭을 넘지 않는 것을 확인했다.

### Next

- SKUSKU 운영 중 실제로 맡은 정기 업무, 이슈 대응, 사용자 안내 사례를 기록한다.
- PULSE case study 본문을 데모 영상 장면과 연결해 확장한다.

## 2026-05-06 Research Publication Section

### Goal

- `images/논문.png`와 KCI 논문 상세 페이지를 바탕으로 논문/연구 섹션을 별도로 만든다.
- 단순 논문 링크가 아니라 연구 질문, 데이터, 방법, 검증, 기여가 읽히는 포트폴리오 섹션으로 구성한다.

### Work

- KCI 페이지에서 논문 등재 정보, 저널, 발행기관, 연구 분야, 초록, 키워드, 서지 정보를 확인했다.
- `images/논문.png`를 확인하고, 웹용 미리보기 이미지 `images/optimized/research-paper-review-framework.jpg`를 생성했다.
- `content/research.json`에 `publications` 배열을 추가하고 논문 메타데이터와 연구 내용을 구조화했다.
- `src/types.ts`에 `ResearchPublication` 타입을 추가했다.
- `src/App.tsx`에 `Publication` 섹션을 추가해 논문 이미지, KCI/DOI 링크, 연구 질문, 데이터/방법, 검증, 기여, 주요 지표를 렌더링했다.
- `src/styles.css`에 논문 섹션 전용 레이아웃과 반응형 스타일을 추가했다.

### Decisions

- 저널 급지는 KCI 페이지 기준 `KCI 등재`로 표기한다.
- 논문은 AIX/CX/HCI 관심사와 PULSE/personaLab의 문제의식을 연결하는 연구 성과로 배치한다.
- 논문 이미지는 원본을 직접 축소하지 않고, 최적화된 미리보기 이미지를 별도 생성해 사용한다.

### Changed Files

- `content/research.json`
- `content/site.json`
- `src/App.tsx`
- `src/styles.css`
- `src/types.ts`
- `README.md`
- `docs/development-journal.md`
- `images/optimized/research-paper-review-framework.jpg`

### Verification

- JSON 파싱을 확인할 예정이다.
- `npm run build`로 TypeScript/Vite 빌드를 확인할 예정이다.
- Playwright로 데스크톱/모바일에서 논문 이미지, KCI 링크, DOI 링크, 지표 카드가 보이는지 확인할 예정이다.

### Next

- PULSE case study에서 이 논문의 프레임워크가 제품 문제와 어떻게 연결되는지 서사를 보강한다.
- 논문 원문 PDF 또는 DOI 접근성이 안정적인지 배포 전 다시 확인한다.

## 2026-05-06 Human Voice Copy Refactor

### Goal

- 화면 본문, 카드 코멘트, 연구/증빙 설명에서 AI가 만든 설명서 같은 말투를 줄인다.
- `~보여줍니다`, `~확인됩니다`, `~하는 편이 좋습니다`처럼 포트폴리오 주인보다 해설자가 앞에 나오는 문장을 걷어낸다.
- 작업이 끝나면 README와 phase를 최신화하고 GitHub Pages까지 반영한다.

### Work

- Hero, About, Skills, Projects, Academic Record, Research, Publication, Contact 섹션의 고정 문구를 더 개인적인 기록 톤으로 바꿨다.
- `content/proof-assets.json`의 수상/성적/전공역량 카드 설명을 “증빙 자료” 말투에서 “내가 어떤 맥락으로 남긴 기록인지”가 보이는 문장으로 고쳤다.
- `content/research.json`의 KCI 논문 설명을 연구 보고서 요약보다 PULSE, personaLab, AIX/CX/HCI 관심사와 이어지는 개인 연구 서사에 가깝게 다듬었다.
- `content/projects.json`의 대표 프로젝트와 SKUSKU 운영 경험 문구를 일부 정리해 직접 기여 범위와 실제 사용자 맥락이 더 자연스럽게 읽히도록 했다.
- `content/site.json` phase를 `human-voice-copy-refactor`로 업데이트했다.

### Decisions

- 모든 문장을 억지로 반말이나 구어체로 바꾸지는 않았다. 포트폴리오의 신뢰감은 유지하되, 화면에 보이는 설명은 “윤준하가 자기 작업을 정리한 말”처럼 읽히는 쪽을 선택했다.
- 성적/수상 이미지는 계속 요약본 중심으로 쓰고, 민감한 원본은 크게 노출하지 않는 방향을 유지한다.
- 개발 저널의 과거 항목에 남아 있는 `공개 검토 필요`, `분석 근거` 같은 표현은 당시 작업 기록이라 그대로 둔다. 실제 웹 화면과 현재 콘텐츠 데이터에서는 노출되지 않게 관리한다.

### Changed Files

- `src/App.tsx`
- `content/profile.json`
- `content/projects.json`
- `content/proof-assets.json`
- `content/research.json`
- `content/site.json`
- `README.md`
- `docs/development-journal.md`

### Verification

- `content/*.json` 파싱 성공.
- `npm run build`로 TypeScript/Vite 빌드 성공.
- 화면 노출 대상 파일(`src`, `content`, `README.md`)에서 `보여줍니다`, `확인됩니다`, `좋습니다`, `공개 검토 필요`, `분석 근거 보기`, `원본은 보관 중` 표현이 남아 있지 않은 것을 확인했다.

### Next

- PULSE case study를 데모 영상 장면, 담당 범위, 졸업작품 결과 중심으로 완성한다.
- personaLab과 BlogAuto의 실제 화면/데모/본인 담당 범위를 보강한다.
- 논문 섹션과 PULSE 리뷰 분석 서사를 더 직접적으로 연결한다.
