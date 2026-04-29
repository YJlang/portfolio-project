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

## Why `.agents/skills` Instead Of `.codex/skills`

처음에는 `.codex/...` 형태를 떠올릴 수 있지만, Codex 공식 문서의 repo-scoped skill 위치는 `.agents/skills`다. 그래서 이 저장소는 다른 컴퓨터에서 clone해도 Codex가 공식 경로를 통해 같은 skill들을 발견할 수 있도록 `.agents/skills`를 사용한다.

## Maintenance Rule

새로운 반복 작업이 생기면 먼저 `AGENTS.md`에 일반 지침으로 충분한지 확인한다. 여러 번 반복될 명확한 workflow라면 `.agents/skills/<skill-name>/SKILL.md`로 승격한다.
