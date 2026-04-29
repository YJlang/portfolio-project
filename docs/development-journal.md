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
