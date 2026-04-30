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
