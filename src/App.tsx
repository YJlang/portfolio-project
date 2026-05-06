import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import profile from '../content/profile.json';
import projects from '../content/projects.json';
import experience from '../content/experience.json';
import proofAssets from '../content/proof-assets.json';
import research from '../content/research.json';
import site from '../content/site.json';
import profilePhoto from '../images/프로필사진.png';
import award2020Thumb from '../images/optimized/award-2020-sw-idea-thumb.webp';
import award2021Thumb from '../images/optimized/award-2021-service-planning-thumb.webp';
import award2025Thumb from '../images/optimized/award-2025-vr-ar-game-thumb.webp';
import award2026Thumb from '../images/optimized/award-2026-ux-paper-thumb.webp';
import scholarshipGrade from '../images/성적장학금.png';
import majorCompetencyCertification from '../images/전공역량인증.png';
import majorElectiveGrades from '../images/전선성적.png';
import majorRequiredGrades from '../images/전필성적.png';
import pulseDemoVideo from '../images/PULSE_demo.mp4';
import skuskuHomePreview from '../images/optimized/skusku-home-preview.jpg';
import researchPaperPreview from '../images/optimized/research-paper-review-framework.jpg';
import type { Contact, Project, ProofAsset, ResearchDirection, ResearchPublication } from './types';

const typedProjects = projects as Project[];
const typedProofAssets = proofAssets as ProofAsset[];
const typedResearchPublications = research.publications as ResearchPublication[];
const typedResearchDirections = research.directions as ResearchDirection[];
const publicContacts = (profile.contacts as Contact[]).filter((contact) => contact.public);
const proofImageMap: Record<string, string> = {
  'profile-photo': profilePhoto,
  'award-2020-sw-idea': award2020Thumb,
  'award-2021-service-planning': award2021Thumb,
  'award-2025-vr-ar-game': award2025Thumb,
  'award-2026-ux-paper': award2026Thumb,
  'scholarship-grade': scholarshipGrade,
  'major-competency-certification': majorCompetencyCertification,
  'major-elective-grades': majorElectiveGrades,
  'major-required-grades': majorRequiredGrades,
};
const projectVideoMap: Record<string, string> = {
  'images/PULSE_demo.mp4': pulseDemoVideo,
};
const projectImageMap: Record<string, string> = {
  'images/optimized/skusku-home-preview.jpg': skuskuHomePreview,
};
const publicationImageMap: Record<string, string> = {
  'images/optimized/research-paper-review-framework.jpg': researchPaperPreview,
};
const featuredProjects = typedProjects
  .filter((project) => site.homepage.featuredProjectSlugs.includes(project.slug))
  .sort((a, b) => (a.caseStudy.priority ?? 99) - (b.caseStudy.priority ?? 99));
const indexProjects = typedProjects.filter((project) => project.status !== 'featured');
const visibleProofs = typedProofAssets.filter((asset) => asset.public === true || asset.public === 'review');
const awardProofs = visibleProofs.filter((asset) => asset.type === 'award');
const academicProofs = visibleProofs.filter((asset) => asset.type === 'academic-proof');

const aboutFacts = [
  { label: '이름', value: profile.person.name.ko },
  { label: '출생', value: `${profile.person.birthYear}년생` },
  {
    label: '학력',
    value: `${profile.person.education[0].school} ${profile.person.education[0].department}`,
  },
  { label: '병역', value: profile.person.militaryService.status },
  { label: '관심', value: 'AIX / CX / HCI / Agentic SW' },
  { label: '연락', value: publicContacts[0]?.value ?? 'Email' },
];

const contactHref = (contact: Contact) =>
  contact.type === 'email' ? `mailto:${contact.value}` : contact.value;

const isExternalContact = (contact: Contact) => contact.type !== 'email' && contact.value.startsWith('http');

type ShellStyle = CSSProperties & {
  '--mx': string;
  '--my': string;
};

interface SkillGroup {
  title: string;
  items: string[];
}

function App() {
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 28 });
  const projectDisplay = showFeaturedOnly ? featuredProjects : typedProjects;

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      setPointer({
        x: Math.round((event.clientX / window.innerWidth) * 100),
        y: Math.round((event.clientY / window.innerHeight) * 100),
      });
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  useEffect(() => {
    const previewVideos = Array.from(
      document.querySelectorAll<HTMLVideoElement>('video[data-autoplay-preview="true"]'),
    );

    if (!previewVideos.length) {
      return undefined;
    }

    const playVideo = (video: HTMLVideoElement) => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            playVideo(video);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.36 },
    );

    previewVideos.forEach((video) => {
      observer.observe(video);
      if (video.getBoundingClientRect().top < window.innerHeight) {
        playVideo(video);
      }
    });

    return () => observer.disconnect();
  }, []);

  const shellStyle = {
    '--mx': `${pointer.x}%`,
    '--my': `${pointer.y}%`,
  } as ShellStyle;

  const skillGroups = useMemo(() => {
    return [
      {
        title: 'Research / Product',
        items: profile.interests.slice(0, 5),
      },
      ...(profile.technicalStack as SkillGroup[]),
      {
        title: 'Working Mode',
        items: ['Team Project', 'Open Source', 'DevOps', 'Automation', 'Case Study'],
      },
    ];
  }, []);

  return (
    <div className="site-shell" style={shellStyle}>
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-grid" />
        <span className="ambient-wire wire-one" />
        <span className="ambient-wire wire-two" />
        <span className="ambient-scan" />
      </div>

      <a className="skip-link" href="#main-content">
        본문으로 바로가기
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Junha Yoon portfolio home">
          <span>JY</span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#archiving">Archive</a>
          <a href="#work">Work</a>
          <a href="#experience">Records</a>
          <a href="#research">Research</a>
          <a href="#publication">Paper</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">AIX / CX / HCI / Backend</p>
            <h1 id="hero-title">{profile.person.name.ko}</h1>
            <p className="hero-headline">{profile.person.headline}</p>
            <p className="hero-summary">{profile.person.summary}</p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button primary" href="#work">
                대표 프로젝트 보기
              </a>
              <a className="button secondary" href="#about">
                프로필 살펴보기
              </a>
              <a className="button secondary" href={`mailto:${publicContacts[0]?.value ?? ''}`}>
                이메일로 연락하기
              </a>
            </div>
          </div>

          <aside className="hero-stage" aria-label="Portfolio interaction stage">
            <div className="stage-frame">
              <figure className="portrait-card">
                <img src={profilePhoto} alt={profile.profileImage.alt} width="620" height="616" />
                <figcaption>
                  <span>{profile.person.name.en}</span>
                  <strong>Product-minded backend developer</strong>
                </figcaption>
              </figure>

              <div className="stage-panel status-panel">
                <span>Current Focus</span>
                <strong>AI-assisted product systems</strong>
                <small>Backend / HCI / CX</small>
              </div>

              <div className="stage-panel project-radar" aria-label="Featured projects">
                <span>Featured Work</span>
                {featuredProjects.map((project, index) => (
                  <a className={`radar-node node-${index + 1}`} href={`#project-${project.slug}`} key={project.slug}>
                    <strong>{project.name}</strong>
                    <small>{project.category.slice(0, 2).join(' / ')}</small>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="section-heading with-anchor">
            <span className="section-mark" aria-hidden="true">
              01
            </span>
            <div>
              <p className="eyebrow">About Me</p>
              <h2 id="about-title">목표가 바뀌어도 남는 기준</h2>
              <p>
                한 번 쓰고 버리는 자기소개보다, 연구실 지원과 취업, 개인 브랜딩, 외주 경험까지
                필요할 때 다시 꺼내 쓸 수 있는 기록으로 모아두고 있습니다.
              </p>
            </div>
          </div>
          <dl className="fact-grid">
            {aboutFacts.map((fact) => (
              <div className="fact-item interactive-panel" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading with-anchor">
            <span className="section-mark" aria-hidden="true">
              02
            </span>
            <div>
              <p className="eyebrow">Skills</p>
              <h2 id="skills-title">기술 이름보다 먼저, 내가 푸는 문제</h2>
              <p>
                백엔드에서 시작했지만 관심은 늘 사용자와 의사결정 쪽으로 이어졌습니다.
                그래서 스택도 연구 관심, 구현 경험, 작업 방식이 같이 읽히도록 묶어두었습니다.
              </p>
            </div>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card interactive-panel" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section archiving-section" id="archiving" aria-labelledby="archiving-title">
          <div className="section-heading with-anchor">
            <span className="section-mark" aria-hidden="true">
              03
            </span>
            <div>
              <p className="eyebrow">Archiving</p>
              <h2 id="archiving-title">작업과 학습이 쌓이는 곳</h2>
              <p>
                GitHub에는 코드와 실험을, Velog에는 공부와 회고를 남깁니다. 연락은 공개 가능한
                이메일과 링크만 이곳에 모아두었습니다.
              </p>
            </div>
          </div>
          <div className="archive-grid">
            {publicContacts.map((contact) => (
              <a
                className="archive-card interactive-panel"
                key={`archive-${contact.type}-${contact.value}`}
                href={contactHref(contact)}
                target={isExternalContact(contact) ? '_blank' : undefined}
                rel={isExternalContact(contact) ? 'noreferrer' : undefined}
              >
                <span>{contact.type}</span>
                <strong>{contact.label}</strong>
                <small>{contact.value}</small>
              </a>
            ))}
          </div>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Projects</p>
              <h2 id="work-title">무엇을 만들었는지보다, 왜 그렇게 만들었는지</h2>
              <p>
                PULSE는 서브모듈까지 직접 열어 흐름을 다시 잡았고, 다른 프로젝트도 README와 코드 구조를
                기준으로 문제, 시스템, UX/CX 판단을 다시 써 내려갔습니다.
              </p>
            </div>
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(event) => setShowFeaturedOnly(event.target.checked)}
              />
              <span>주요 프로젝트만 보기</span>
            </label>
          </div>

          <div className="featured-list">
            {projectDisplay.map((project, index) => {
              const projectPoints =
                project.highlights?.length
                  ? project.highlights
                  : [project.caseStudy.problem, project.caseStudy.system, project.caseStudy.result].filter(Boolean);
              return (
                <article className="project-feature" id={`project-${project.slug}`} key={project.slug}>
                  <div className="project-rank" aria-hidden="true">
                    {String(project.caseStudy.priority ?? index + 1).padStart(2, '0')}
                  </div>
                  <div className="project-body">
                    <div className="project-title-row">
                      <div>
                        <h3>{project.name}</h3>
                        <div className="project-labels" aria-label={`${project.name} labels`}>
                          <span>{project.type}</span>
                          <span>{project.status}</span>
                          {project.category.slice(0, 3).map((category) => (
                            <span key={category}>{category}</span>
                          ))}
                        </div>
                      </div>
                      <div className="project-actions" aria-label={`${project.name} links`}>
                        <a className="repo-link" href={project.repository} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                        {project.links?.map((link) => (
                          <a
                            className="repo-link accent-link"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            key={link.url}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <p className="project-summary">{project.summary}</p>
                    {project.intent && <p className="project-intent">{project.intent}</p>}

                    {project.demoVideo ? (
                      <figure className="project-demo">
                        <div className="project-demo-frame">
                          <video
                            src={projectVideoMap[project.demoVideo.src]}
                            aria-label={project.demoVideo.label}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            preload="metadata"
                            data-autoplay-preview="true"
                          />
                        </div>
                        <figcaption>{project.demoVideo.caption}</figcaption>
                      </figure>
                    ) : null}

                    {project.previewImage ? (
                      <figure className="project-preview">
                        <div className="project-preview-frame">
                          <img
                            src={projectImageMap[project.previewImage.src]}
                            alt={project.previewImage.alt}
                            loading="lazy"
                          />
                        </div>
                        <figcaption>{project.previewImage.caption}</figcaption>
                      </figure>
                    ) : null}

                    <div className="project-decision-grid" aria-label={`${project.name} case study summary`}>
                      <section>
                        <span>Problem</span>
                        <p>{project.caseStudy.problem}</p>
                      </section>
                      <section>
                        <span>System</span>
                        <p>{project.caseStudy.system}</p>
                      </section>
                      <section>
                        <span>UX / CX</span>
                        <p>{project.caseStudy.uxCxInsight}</p>
                      </section>
                    </div>

                    {project.agenticEngineering ? (
                      <section className="agentic-block" aria-label={`${project.name} agentic engineering`}>
                        <div className="agentic-heading">
                          <span>Agentic Engineering</span>
                          <p>{project.agenticEngineering.summary}</p>
                        </div>
                        <div className="agentic-grid">
                          <div>
                            <strong>MCP / Tooling</strong>
                            <ul>
                              {project.agenticEngineering.mcpServers.map((server) => (
                                <li key={`${project.slug}-${server.name}`}>
                                  <b>{server.name}</b>
                                  <span>{server.usage}</span>
                                  {server.scope ? <small>{server.scope}</small> : null}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Agent Skills</strong>
                            <ul>
                              {project.agenticEngineering.agentSkills.map((skill) => (
                                <li key={`${project.slug}-${skill.name}`}>
                                  <b>{skill.name}</b>
                                  <span>{skill.usage}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>SubAgent / Pipeline</strong>
                            <p>
                              <b>{project.agenticEngineering.subAgentOrchestration.label}</b>
                              {project.agenticEngineering.subAgentOrchestration.detail}
                            </p>
                          </div>
                        </div>
                      </section>
                    ) : null}

                    <ul className="project-points">
                      {projectPoints.slice(0, 5).map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="stack-tags" aria-label={`${project.name} stack`}>
                      {project.stack.slice(0, 12).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    {project.evidence?.length ? (
                      <details className="project-details">
                        <summary>참고 자료</summary>
                        <ul>
                          {project.evidence.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </details>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section compact" aria-labelledby="project-index-title">
          <div className="section-heading">
            <p className="eyebrow">Project Index</p>
            <h2 id="project-index-title">계속 늘어나는 작업 목록</h2>
          </div>
          <div className="index-table" role="list">
            {indexProjects.map((project) => (
              <article className="index-row" key={project.slug} role="listitem">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="stack-tags compact-tags" aria-label={`${project.name} compact stack`}>
                    {project.stack.slice(0, 6).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <a href={project.repository} target="_blank" rel="noreferrer">
                  {project.status}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section two-column" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="eyebrow">Experience / Records</p>
            <h2 id="experience-title">활동과 학업 기록</h2>
            <p>
              첫 화면을 상장 모음처럼 만들고 싶지는 않았습니다. 대신 내 관심사와 역량을 설명하는 데
              필요한 기록만 골라 맥락을 붙였습니다.
            </p>
          </div>
          <div className="stack-list">
            {experience.map((item) => (
              <article className="quiet-card interactive-panel" key={item.slug}>
                <p className="card-kicker">{item.organization}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span>{item.period || item.role}</span>
              </article>
            ))}
          </div>
          <aside className="proof-strip" aria-label="Portfolio records">
            {awardProofs.map((asset) => (
              <div className="proof-item" key={asset.slug}>
                {proofImageMap[asset.slug] ? (
                  <img src={proofImageMap[asset.slug]} alt={`${asset.title} 증빙 이미지`} loading="lazy" />
                ) : null}
                <span>{asset.type}</span>
                <strong>{asset.title}</strong>
                {asset.award || asset.date ? (
                  <p className="proof-meta">
                    {[asset.award, asset.date].filter(Boolean).join(' · ')}
                  </p>
                ) : null}
                {asset.issuer ? <p>{asset.issuer}</p> : null}
                <small>{asset.public === 'review' ? '요약본' : '공개 자료'}</small>
              </div>
            ))}
          </aside>
          <section className="academic-proof-section" aria-labelledby="academic-proof-title">
            <div className="academic-proof-heading">
              <p className="eyebrow">Academic Record</p>
              <h3 id="academic-proof-title">전공을 어떻게 쌓아왔는지 남긴 기록</h3>
              <p>
                성적 원본을 크게 펼치기보다, 백엔드와 HCI 관심사가 어디서 쌓였는지 읽히는 부분만
                골라 카드로 남겼습니다.
              </p>
            </div>
            <div className="academic-proof-grid">
              {academicProofs.map((asset) => (
                <article className="academic-proof-card interactive-panel" key={asset.slug}>
                  {proofImageMap[asset.slug] ? (
                    <figure>
                      <img src={proofImageMap[asset.slug]} alt={`${asset.title} 증빙 이미지`} loading="lazy" />
                    </figure>
                  ) : null}
                  <div>
                    <span>{asset.metric ?? asset.type}</span>
                    <h4>{asset.title}</h4>
                    {asset.proves ? <p>{asset.proves}</p> : null}
                    {asset.highlights?.length ? (
                      <ul>
                        {asset.highlights.slice(0, 2).map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                    <small>{asset.public === 'review' ? '원본 보관' : '공개 자료'}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="section" id="research" aria-labelledby="research-title">
          <div className="section-heading">
            <p className="eyebrow">Research Direction</p>
            <h2 id="research-title">지금 계속 붙잡고 있는 연구 질문</h2>
            <p>
              연구실 후보는 바뀔 수 있습니다. 그래도 사용자 이해, AI/Agent, HCI, 제품 개발이라는 축은
              계속 남기고 싶어 이 기준으로 정리했습니다.
            </p>
          </div>
          <div className="research-grid">
            {typedResearchDirections.map((direction) => (
              <article className="research-card interactive-panel" key={direction.slug}>
                <h3>{direction.name}</h3>
                <p>{direction.question}</p>
                <small>{direction.portfolioEmphasis}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="section publication-section" id="publication" aria-labelledby="publication-title">
          <div className="section-heading">
            <p className="eyebrow">Publication</p>
            <h2 id="publication-title">온라인 리뷰를 고객 인사이트로 바꿔본 연구</h2>
            <p>
              소상공인이 리뷰를 읽고도 바로 움직이기 어려운 지점을 문제로 봤고, 리뷰 문장을 고객 세분화,
              페르소나, 고객여정지도로 바꾸는 과정을 논문으로 정리했습니다.
            </p>
          </div>

          {typedResearchPublications.map((paper) => (
            <article className="publication-card" key={paper.slug}>
              <figure className="publication-visual">
                <img src={publicationImageMap[paper.imageSrc]} alt={`${paper.title} 논문 첫 페이지`} loading="lazy" />
              </figure>

              <div className="publication-body">
                <div className="publication-kicker">
                  <span>{paper.journalRank}</span>
                  <span>{paper.journalAbbr}</span>
                  <span>{paper.issue}</span>
                </div>
                <h3>{paper.title}</h3>
                <p className="publication-title-en">{paper.titleEn}</p>
                <p className="publication-summary">{paper.summary}</p>

                <dl className="publication-meta">
                  <div>
                    <dt>Journal</dt>
                    <dd>
                      {paper.journal} / {paper.journalEn}
                    </dd>
                  </div>
                  <div>
                    <dt>Authors</dt>
                    <dd>{paper.authors.join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Publisher</dt>
                    <dd>{paper.publisher}</dd>
                  </div>
                  <div>
                    <dt>Field</dt>
                    <dd>{paper.field}</dd>
                  </div>
                </dl>

                <div className="publication-actions" aria-label={`${paper.title} links`}>
                  <a className="repo-link accent-link" href={paper.kciUrl} target="_blank" rel="noreferrer">
                    KCI 상세 보기
                  </a>
                  <a className="repo-link" href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">
                    DOI
                  </a>
                </div>
              </div>

              <div className="publication-analysis">
                <section>
                  <span>Question</span>
                  <p>{paper.researchQuestion}</p>
                </section>
                <section>
                  <span>Data / Method</span>
                  <p>{paper.method}</p>
                </section>
                <section>
                  <span>Validation</span>
                  <p>{paper.validation}</p>
                </section>
                <section>
                  <span>Contribution</span>
                  <p>{paper.contribution}</p>
                </section>
              </div>

              <div className="publication-metrics" aria-label={`${paper.title} metrics`}>
                {paper.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="publication-bottom">
                <div>
                  <strong>Portfolio Fit</strong>
                  <p>{paper.portfolioFit}</p>
                </div>
                <div className="stack-tags" aria-label={`${paper.title} keywords`}>
                  {paper.keywords.map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">다음 이야기는 여기서 이어질 수 있습니다</h2>
            <p>
              공개 포트폴리오에는 이메일과 공개 링크만 남겼습니다. 연구, 제품, 팀 프로젝트 이야기는
              언제든 편하게 이어갈 수 있습니다.
            </p>
          </div>
          <div className="contact-links">
            {publicContacts.map((contact) => (
              <a
                key={`${contact.type}-${contact.value}`}
                href={contactHref(contact)}
                target={isExternalContact(contact) ? '_blank' : undefined}
                rel={isExternalContact(contact) ? 'noreferrer' : undefined}
              >
                {contact.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>계속 고쳐 쓰는 포트폴리오. 현재 단계: {site.phase}.</p>
      </footer>
    </div>
  );
}

export default App;
