# Project Research Notes

포트폴리오 프로젝트 섹션을 보강하기 위해 `projects.MD`의 GitHub 링크를 기준으로 README, 주요 설정 파일, 일부 핵심 코드 경로를 읽고 정리한 메모다. 이 문서는 향후 case study를 더 깊게 쓸 때 원천 자료 인덱스로 사용한다.

## 2026-04-30 GitHub Repository Pass

### PULSE

- Repository: https://github.com/YJlang/PULSE
- Related submodules:
  - `pulse_FE`: React/Vite 프론트엔드
  - `pulse_spring`: Spring Boot 비즈니스 API 서버
  - `pulse_python`: FastAPI AI/크롤링 서버
- Checked materials:
  - `README.md`
  - `.gitmodules`
  - `pulse_FE/package.json`
  - `pulse_FE/MD/tech.md`
  - `pulse_python/README.md`
  - `pulse_python/requirements.txt`
  - `pulse_python/app/api/endpoints.py`
  - `pulse_python/app/services/analysis_service.py`
  - `pulse_spring/build.gradle`
  - `pulse_spring/src/main/java/.../controller`
- Portfolio interpretation:
  - 외식업 자영업자의 리뷰 분석과 마케팅 실행을 줄여주는 AI 마케팅 자동화 SaaS.
  - React, Spring Boot, FastAPI가 분리된 3-tier 구조.
  - FastAPI는 Playwright 리뷰 수집, Kiwi 형태소 분석, BERTopic/임베딩 기반 토픽 분석, LLM 인사이트 생성을 담당.
  - Spring Boot는 회원/매장/리뷰 관리, FastAPI 연동, 리뷰 답변 생성 요청 같은 제품 API 경계를 담당.
  - 프론트엔드는 분석 대시보드, 리뷰 관리, 홍보 콘텐츠 생성 흐름을 통해 사장님의 업무 루틴을 화면으로 묶는다.

### personaLab

- Repository: https://github.com/YJlang/personaLab
- Checked materials:
  - `README.md`
  - `agent-worker/main.py`
  - `agent-worker/dspy_modules.py`
  - `personalab/build.gradle`
  - `personalab-frontend/package.json`
- Portfolio interpretation:
  - AI 페르소나가 실제 웹사이트를 탐색하고 UX 리포트를 생성하는 synthetic user research 플랫폼.
  - Spring Boot 백엔드, React 프론트엔드, Python Agent Worker가 분리된 구조.
  - Redis 큐, Playwright 브라우저 조작, GPT-4o Vision/DSPy 기반 행동 결정, CJM/히트맵/감정 타임라인 리포트 방향이 확인된다.

### BlogAuto

- Repository: https://github.com/YJlang/BlogAuto
- Checked materials:
  - `PLAN.MD`
  - `package.json`
  - `src-tauri/Cargo.toml`
  - `worker/index.mjs`
  - `worker/openai-draft.mjs`
  - `worker/velog-publisher.mjs`
- Portfolio interpretation:
  - 사진과 짧은 기록을 바탕으로 블로그 초안을 만들고 Velog/Tistory 게시 흐름을 자동화하는 Windows 데스크톱 앱.
  - Tauri/React 앱 셸, Node worker, OpenAI 초안 생성, Playwright 기반 Velog publisher가 분리되어 있다.
  - 자동 게시 전 최종 확인은 사용자에게 남겨 생산성 자동화와 사용자 통제 사이의 경계를 둔다.

### SKUSKU_Back

- Repository: https://github.com/SKU-LikeLion14th/SKUSKU_Back
- Checked materials:
  - `README.md`
  - `WALKTHROUGH.md`
  - `build.gradle`
- Portfolio interpretation:
  - 대학 멋쟁이사자처럼 운영을 위한 Spring Boot 백엔드 플랫폼.
  - 강의 자료, 과제, 제출, 피드백, 퀴즈, 프로젝트 갤러리, 일정, 파일 업로드 도메인을 포함.
  - OAuth2 + JWT, Redis state, AWS S3/CloudFront, Google Gemini AI 채점 흐름이 강점.

### gacha

- Repository: https://github.com/YJlang/gacha
- Checked materials:
  - `README.md`
  - API 문서
  - `build.gradle`
  - `src/main/resources/*.csv`
- Portfolio interpretation:
  - 공공데이터 기반 농어촌 체험마을 추천 백엔드.
  - CSV 기반 여행지 데이터, 가챠 추첨, 컬렉션, 추억 기록, 이미지 업로드, JWT 인증 API를 제공.

### KeyBaeGG

- Repository: https://github.com/YJlang/keybaegg
- Checked materials:
  - `README.md`
  - `build.gradle`
  - `frontend/package.json`
- Portfolio interpretation:
  - 키보드 배틀 성과를 티어, 랭킹, 전적, 업적으로 관리하는 게임화된 풀스택 웹 서비스.
  - React/Spring Boot/JWT/MySQL 기반이며 GCP VM, Nginx, Let's Encrypt 운영 기록이 있다.

### 함께줍줍

- Repository: https://github.com/YJlang/hamkae
- Checked materials:
  - `README.md`
  - DBML
  - `build.gradle`
- Portfolio interpretation:
  - 쓰레기 위치 제보, 수거 인증, AI 이미지 검증, 포인트 보상을 연결하는 환경 보호 해커톤 서비스.
  - README 기준 담당 역할은 백엔드, AI 검증, AWS 서버/배포, PM.
  - GPT-4o Vision, Kakao Maps, Spring Boot, React, AWS/Nginx 배포 경험을 함께 보여줄 수 있다.

## Follow-Up Questions

- PULSE, SKUSKU_Back, gacha의 실제 개인 담당 범위를 커밋/이슈/팀 기록 기준으로 더 세밀하게 확인하면 case study 신뢰도가 올라간다.
- 각 프로젝트의 배포 URL, 데모 영상, 스크린샷이 있으면 `content/projects.json`에 `links` 또는 `media` 필드를 추가한다.
- 오래된 해커톤 프로젝트는 삭제하지 않고 archive로 유지하되, 첫 화면에서는 PULSE, personaLab, BlogAuto를 계속 대표 작업으로 둔다.
