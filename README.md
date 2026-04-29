# Junho Yoon Portfolio

윤준하의 개인 포트폴리오 웹사이트를 만들고, 앞으로 꾸준히 업데이트하기 위한 저장소다.

이 포트폴리오는 일회성 지원 자료가 아니라 평생 사용할 개인 작업 기반틀이다. 프로젝트, 연구 관심사, 글, 수상, 경력, 실험을 계속 누적하되, 첫 화면은 항상 현재의 나를 가장 선명하게 보여주는 방향으로 관리한다.

## Current Status

- 단계: `First website build ready`
- 현재 목표: 대표 프로젝트 case study 확장 준비
- 우선 방향: AIX, CX, HCI, UX/UI, Backend, Agentic Software Development가 연결되는 장기 포트폴리오
- 다음 큰 작업: PULSE, personaLab, BlogAuto case study 초안 작성

## Repository Map

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Codex가 이 저장소에서 작업할 때 따라야 할 상위 지침 |
| `.agents/skills/` | Git에 포함되는 repo-scoped Codex skills |
| `default-info.MD` | 기본 프로필, 경력, 관심사, 연락처 |
| `projects.MD` | 프로젝트 GitHub 링크와 간단한 설명 |
| `target-labs.MD` | 관심 연구실 후보와 연구 방향 확장 기준 |
| `images/` | 프로필, 수상, 성적, 인증 증빙 이미지 |
| `content/` | 웹사이트가 읽을 수 있는 구조화된 포트폴리오 데이터 |
| `docs/content-model.md` | 콘텐츠 데이터 구조와 업데이트 규칙 |
| `docs/portfolio-blueprint.md` | 포트폴리오 기획서와 장기 구조 |
| `docs/portfolio-references.md` | 디자인/웹/스킬 레퍼런스 조사 |
| `docs/codex-skills.md` | 이 저장소에 포함된 Codex skills 설명 |
| `docs/development-journal.md` | 일기형 작업 현황 기록 |

## Development Plan

### Phase 0. Foundation

목표: 개발 전에 포트폴리오의 방향과 작업 방식 고정.

- [x] 현재 자료 분석
- [x] 장기 포트폴리오 원칙 정리
- [x] 관심 연구실 후보 문서를 유연한 구조로 리팩토링
- [x] Codex repo-scoped skills 추가
- [x] 개발 계획 README와 작업 일지 문서 추가

완료 기준:

- Codex가 새 컴퓨터에서도 저장소 문서와 `.agents/skills`만 보고 같은 방향으로 작업할 수 있다.

### Phase 1. Content Modeling

목표: 웹사이트에 넣을 데이터를 코드와 분리해 장기 업데이트 가능한 구조로 만든다.

- [x] 프로젝트 데이터 구조 정의
- [x] 대표 프로젝트와 아카이브 프로젝트 구분
- [x] 프로필/경력/활동/수상 데이터 구조 정의
- [x] 연구 방향과 관심 연구실 후보 데이터 구조 정의
- [x] 공개 가능 정보와 비공개/주의 정보 분리

완료 기준:

- 프로젝트, 경력, 수상, 연구실 후보를 UI 코드 수정 없이 추가할 수 있는 방향이 정해진다.

### Phase 2. First Website Build

목표: 작지만 완성도 있는 첫 포트폴리오 웹사이트를 구현한다.

- [x] Vite + React + TypeScript 기반 프로젝트 세팅
- [x] 기본 라우팅 또는 섹션 구조 결정
- [x] 디자인 토큰 정의
- [x] Hero 구현
- [x] Featured Work 구현
- [x] Project Index 구현
- [x] Experience / Proof 구현
- [x] Research Direction 구현
- [x] Contact 구현

완료 기준:

- 로컬에서 실행 가능한 첫 웹사이트가 완성된다.
- 첫 화면에서 이름, 방향성, 대표 프로젝트, 연락 경로가 명확히 보인다.

### Phase 3. Case Study Expansion

목표: 대표 프로젝트를 깊이 있는 case study로 확장한다.

- [ ] PULSE case study 초안 작성
- [ ] personaLab case study 초안 작성
- [ ] BlogAuto case study 초안 작성
- [ ] 프로젝트별 문제, 역할, 시스템, UX/CX insight, 결과 정리
- [ ] 프로젝트별 이미지/데모/링크 정리

완료 기준:

- 대표 프로젝트가 단순 목록이 아니라 판단과 성장의 근거로 읽힌다.

### Phase 4. Quality & Deployment

목표: 배포 가능한 품질로 다듬고 공개한다.

- [ ] 이미지 최적화
- [ ] 모바일/태블릿/데스크톱 반응형 점검
- [ ] 접근성 기본 점검
- [ ] Lighthouse 점검
- [ ] 링크와 연락 CTA 점검
- [ ] 개인정보 공개 여부 점검
- [ ] Vercel, Netlify, GitHub Pages 중 배포 방식 결정
- [ ] 자동 배포 연결

완료 기준:

- 공개 링크를 공유할 수 있는 수준으로 배포된다.

### Phase 5. Long-Term Operation

목표: 포트폴리오를 계속 업데이트할 수 있는 운영 리듬을 만든다.

- [ ] 새 프로젝트 추가 템플릿 사용
- [ ] 분기별 대표 프로젝트 재검토
- [ ] 연간 아카이브 정리
- [ ] 연구실 후보 및 연구 방향 업데이트
- [ ] 글/회고/기술 메모 추가

완료 기준:

- 포트폴리오가 시간이 지나도 무너지지 않고, 현재의 나를 계속 반영한다.

## Working Routine

작업을 시작할 때:

1. `AGENTS.md`를 확인한다.
2. 필요한 경우 `.agents/skills`의 관련 skill을 사용한다.
3. `docs/development-journal.md`에 오늘 작업 목표를 남긴다.

작업 중:

1. 변경한 파일과 이유를 짧게 기록한다.
2. 막힌 점, 결정한 점, 다음에 확인할 점을 남긴다.

작업 후:

1. 실행한 검증 명령을 기록한다.
2. 완료한 항목과 남은 항목을 업데이트한다.
3. 다음 작업자가 바로 이어갈 수 있게 `Next`를 남긴다.

## Current Next Steps

1. PULSE case study 초안을 작성한다.
2. personaLab case study 초안을 작성한다.
3. BlogAuto case study 초안을 작성한다.
4. 대표 프로젝트별 이미지, 데모 링크, 본인 역할을 보강한다.
