# Codex Repo Skills

작성일: 2026-04-29

이 저장소는 Codex 공식 Agent Skills 구조에 맞춰 repo-scoped skills를 포함한다.

공식 문서 기준:

- Codex skill은 `SKILL.md`를 가진 디렉터리다.
- repo에서 공유할 skill은 `.agents/skills` 아래에 둔다.
- Codex는 현재 작업 디렉터리부터 repo root까지 `.agents/skills`를 스캔한다.
- `SKILL.md`에는 최소한 `name`과 `description` frontmatter가 필요하다.

참고 공식 문서:

- https://developers.openai.com/codex/skills

## Included Skills

| Skill | Path | Purpose |
| --- | --- | --- |
| `portfolio-architect` | `.agents/skills/portfolio-architect/SKILL.md` | 평생 업데이트할 포트폴리오 정보 구조, 케이스 스터디, 연구 방향, 아카이브 전략. |
| `frontend-web-design` | `.agents/skills/frontend-web-design/SKILL.md` | 포트폴리오 웹 UI의 시각 방향, 레이아웃, 반응형 디자인, 상호작용. |
| `beautiful-ui` | `.agents/skills/beautiful-ui/SKILL.md` | semantic HTML, 접근성, 타이포그래피, 모바일 레이아웃 품질 기준. |
| `frontend-engineering` | `.agents/skills/frontend-engineering/SKILL.md` | React/Vite/TypeScript 구현, 콘텐츠 데이터 분리, 성능, 배포, 장기 유지보수. |
| `windows-korean-powershell` | `.agents/skills/windows-korean-powershell/SKILL.md` | Windows PowerShell에서 한글/UTF-8/CP949 출력, 한국어 파일명, JSON/Markdown 검증을 안정적으로 다루는 지침. |
| `visual-asset-reader` | `.agents/skills/visual-asset-reader/SKILL.md` | 증빙 이미지, 스크린샷, 프로필 사진, UI 레퍼런스, 문서 사진을 읽고 OCR/판독/공개 위험을 정리하는 지침. |

## SkillsMP Search Notes

2026-04-30에 SkillsMP MCP로 관련 skill을 검색했다.

- 이미지/OCR 후보는 `image-ocr`, `vision-analysis`, `vision-reader`, `ocr` 등이 있었다.
- `vision-analysis`는 MiniMax MCP와 API 키 의존성이 있어 현재 저장소 기본 skill로는 부적합했다.
- `vision-reader`는 OpenClaw/중국어 중심 지침과 macOS OCR 의존성이 섞여 있어 그대로 쓰기보다 저장소용 지침으로 재작성했다.
- `image-ocr`는 OCR 도구 선택 기준이 좋아 참고했지만, MCP 설치 호출이 deprecation 메시지로 실패해 repo-scoped skill로 직접 등록했다.
- PowerShell 한글/CP949/UTF-8을 정면으로 다루는 적합한 공개 skill은 찾지 못해 `windows-korean-powershell`을 새로 작성했다.

## Why `.agents/skills` Instead Of `.codex/skills`

처음에는 `.codex/...` 형태를 떠올릴 수 있지만, Codex 공식 문서의 repo-scoped skill 위치는 `.agents/skills`다. 그래서 이 저장소는 다른 컴퓨터에서 clone해도 Codex가 공식 경로를 통해 같은 skill들을 발견할 수 있도록 `.agents/skills`를 사용한다.

## Maintenance Rule

새로운 반복 작업이 생기면 먼저 `AGENTS.md`에 일반 지침으로 충분한지 확인한다. 여러 번 반복될 명확한 workflow라면 `.agents/skills/<skill-name>/SKILL.md`로 승격한다.
