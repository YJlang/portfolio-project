# Content Model

작성일: 2026-04-29

Phase 1의 목표는 포트폴리오 웹사이트에 들어갈 정보를 UI 코드와 분리하는 것이다. 이 문서는 `content/` 아래 JSON 파일들의 역할과 업데이트 규칙을 설명한다.

## Directory

| File | Purpose |
| --- | --- |
| `content/site.json` | 사이트 전체 설정, 홈 섹션, route 계획, 공개 정책 |
| `content/profile.json` | 이름, 소개, 학력, 관심사, 연락처, 프로필 이미지 |
| `content/projects.json` | 프로젝트 목록, 대표/인덱스/아카이브 상태, case study 초안 |
| `content/experience.json` | 활동, 경력, 커뮤니티, 운영 경험 |
| `content/proof-assets.json` | 프로필/수상/성적/인증 이미지와 공개 여부 |
| `content/research.json` | 연구 방향, 관심 연구실 후보, 프로젝트 연결 |

## Status Model

### Project Status

- `featured`: 홈에 노출할 대표 프로젝트. 최대 3-4개를 유지한다.
- `index`: 전체 프로젝트 목록에 노출하되 홈의 핵심 카드로는 쓰지 않는다.
- `archive`: 오래되었지만 성장 기록으로 남길 프로젝트.

### Privacy Level

- `public`: 공개 웹사이트에 바로 노출 가능.
- `review`: 공개 전 확인 필요. 증빙 이미지, 수상 원본, 외부 링크가 여기에 해당한다.
- `private` 또는 `false`: 공개 사이트에 기본 노출하지 않는다.

현재 JSON에는 boolean `public`과 문자열 `"review"`가 함께 있다. 웹사이트 구현 시 helper 함수를 만들어 `true`만 공개하고, `"review"`와 `false`는 기본적으로 숨기는 정책을 추천한다.

## Featured Projects

현재 대표 프로젝트는 아래 3개다.

1. `pulse`
2. `persona-lab`
3. `blog-auto`

대표 프로젝트는 아래 기준 중 3개 이상을 만족해야 한다.

- 현재 진로 방향과 직접 연결된다.
- 문제 정의와 사용자 맥락이 분명하다.
- 본인의 역할과 판단이 뚜렷하다.
- 기술적 깊이 또는 제품적 완성도가 있다.
- 데모, 이미지, 문서, 성과 등 검증 가능한 자료가 있다.

## Update Rules

새 프로젝트를 추가할 때는 `content/projects.json`에 아래 필드를 기본으로 채운다.

```json
{
  "slug": "",
  "name": "",
  "status": "index",
  "type": "personal",
  "category": [],
  "summary": "",
  "repository": "",
  "stack": [],
  "role": {
    "label": "",
    "detail": ""
  },
  "agenticEngineering": {
    "summary": "",
    "mcpServers": [
      {
        "name": "",
        "usage": "",
        "scope": "project-runtime | portfolio-analysis | not-confirmed"
      }
    ],
    "agentSkills": [
      {
        "name": "",
        "usage": ""
      }
    ],
    "subAgentOrchestration": {
      "status": "used | partial | not-used | not-confirmed",
      "label": "",
      "detail": ""
    },
    "notes": []
  },
  "caseStudy": {
    "priority": null,
    "problem": "",
    "system": "",
    "uxCxInsight": "",
    "result": "",
    "reflection": ""
  },
  "public": true,
  "needsMoreDetail": true
}
```

## Implementation Notes

- Vite + React + TypeScript 구현 시 JSON import를 사용하거나, 나중에 MDX 기반으로 확장할 수 있다.
- 첫 구현에서는 JSON을 직접 import해도 충분하다.
- case study가 길어지면 `content/case-studies/<slug>.mdx`로 분리하는 방향을 고려한다.
- `content/proof-assets.json`의 `"review"` 또는 `false` 항목은 공개 UI에서 기본적으로 숨긴다.
- 전화번호는 `content/profile.json`에서 `public: false`이므로 공개 Contact 섹션에 기본 노출하지 않는다.
- `agenticEngineering`은 프로젝트 자체 런타임에서 확인되는 AI/MCP/Agent 구조와, 포트폴리오 분석 과정에서 사용한 도구를 구분해 적는다. 확인되지 않은 사용 이력은 과장하지 않고 `not-used` 또는 `not-confirmed`로 남긴다.
- `AI Harness Engineering`은 모델/API 호출 자체보다 입력 데이터, 프롬프트/평가 기준, 사람 검토, 실패 케이스, 자동화 경계를 설계하는 역량으로 관리한다.

## Proof Asset Model

`content/proof-assets.json`은 원본 증빙 경로와 공개용 썸네일 경로를 분리한다.

```json
{
  "slug": "",
  "title": "",
  "type": "award | academic-proof | profile",
  "src": "images/original.png",
  "thumbnailSrc": "images/optimized/public-thumbnail.webp",
  "public": "review",
  "needsOptimization": true,
  "issuer": "",
  "date": "YYYY-MM-DD",
  "award": "",
  "description": "",
  "proves": "",
  "privacyRisk": "",
  "recommendedUse": "",
  "note": ""
}
```

- 원본 상장에는 학번, 문서번호, 직인 등이 포함될 수 있으므로 `src`는 기록용 원본으로 유지한다.
- 공개 UI에는 가능한 한 `thumbnailSrc`의 마스킹/최적화본을 사용한다.
- 상장/성적/인증은 기본적으로 `review`로 두고, 배포 전 공개 범위를 다시 확인한다.

## Phase 1 Completion

- [x] 프로젝트 데이터 구조 정의
- [x] 대표 프로젝트와 아카이브 프로젝트 구분
- [x] 프로필/경력/활동/수상 데이터 구조 정의
- [x] 연구 방향과 관심 연구실 후보 데이터 구조 정의
- [x] 공개 가능 정보와 비공개/주의 정보 분리
