import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import profile from '../content/profile.json';
import projects from '../content/projects.json';
import experience from '../content/experience.json';
import proofAssets from '../content/proof-assets.json';
import research from '../content/research.json';
import site from '../content/site.json';
import profilePhoto from '../images/프로필사진.png';
import type { Contact, Project, ProofAsset, ResearchDirection } from './types';

const typedProjects = projects as Project[];
const typedProofAssets = proofAssets as ProofAsset[];
const typedResearchDirections = research.directions as ResearchDirection[];
const publicContacts = (profile.contacts as Contact[]).filter((contact) => contact.public);
const featuredProjects = typedProjects
  .filter((project) => site.homepage.featuredProjectSlugs.includes(project.slug))
  .sort((a, b) => (a.caseStudy.priority ?? 99) - (b.caseStudy.priority ?? 99));
const indexProjects = typedProjects.filter((project) => project.status !== 'featured');
const visibleProofs = typedProofAssets.filter((asset) => asset.public === true || asset.public === 'review');

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

  const shellStyle = {
    '--mx': `${pointer.x}%`,
    '--my': `${pointer.y}%`,
  } as ShellStyle;

  const skillGroups = useMemo(() => {
    const stacks = Array.from(new Set(typedProjects.flatMap((project) => project.stack).filter(Boolean)));
    const agenticStack = [
      'AI Harness Engineering',
      'MCP Server Integration',
      'Agent Skill Design',
      'SubAgent Orchestration',
    ];

    return [
      {
        title: 'Research / Product',
        items: profile.interests.slice(0, 5),
      },
      {
        title: 'Engineering Stack',
        items: Array.from(new Set([...agenticStack, ...stacks])).slice(0, 14),
      },
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
          <a href="#experience">Proof</a>
          <a href="#research">Research</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">AIX / CX / HCI / Backend</p>
            <h1 id="hero-title">{profile.person.name.ko}</h1>
            <p className="hero-headline">{profile.person.headline}입니다.</p>
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
              <h2 id="about-title">지금의 목표가 바뀌어도 유지되는 기본 프로필입니다.</h2>
              <p>
                한 번 쓰고 버리는 자기소개가 아니라, 연구실 지원, 취업, 개인 브랜딩, 외주 경험까지
                계속 재조합할 수 있는 장기 포트폴리오 기반으로 정리하고 있습니다.
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
              <h2 id="skills-title">기술 스택보다 먼저 사고의 방향이 보이도록 구성했습니다.</h2>
              <p>
                단순한 기술 나열을 넘어서 연구 관심, 구현 스택, 작업 방식을 함께 보여드리도록
                정리했습니다.
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
              <h2 id="archiving-title">작업과 학습이 계속 쌓이는 공개 경로입니다.</h2>
              <p>
                GitHub, Velog, 이메일을 중심으로 공개 가능한 기록과 연락 경로를 연결했습니다.
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
              <h2 id="work-title">프로젝트는 결과물보다 판단의 흐름이 먼저 보이도록 재구성했습니다.</h2>
              <p>
                PULSE는 서브모듈까지 풀스택으로 분석했고, 개인/팀 프로젝트는 README와 코드 구조를
                바탕으로 의도, 시스템, UX/CX 포인트를 보강했습니다.
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
                        <summary>분석 근거 보기</summary>
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
            <h2 id="project-index-title">계속 확장되는 작업 목록입니다.</h2>
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
            <p className="eyebrow">Experience / Proof</p>
            <h2 id="experience-title">작업, 운영, 학업의 근거를 정돈했습니다.</h2>
            <p>
              활동과 증빙은 첫 화면을 무겁게 만들지 않되, 신뢰를 보강하는 근거로 보여드리겠습니다.
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
          <aside className="proof-strip" aria-label="Proof assets">
            {visibleProofs.slice(0, 5).map((asset) => (
              <div className="proof-item" key={asset.slug}>
                <span>{asset.type}</span>
                <strong>{asset.title}</strong>
                <small>{asset.public === 'review' ? '공개 검토 필요' : '공개 가능'}</small>
              </div>
            ))}
          </aside>
        </section>

        <section className="section" id="research" aria-labelledby="research-title">
          <div className="section-heading">
            <p className="eyebrow">Research Direction</p>
            <h2 id="research-title">특정 연구실에 고정되지 않는 관심 축입니다.</h2>
            <p>
              연구실 후보는 바뀔 수 있지만, 포트폴리오는 사용자 이해, AI/Agent, HCI, 제품 개발이라는
              큰 축을 중심으로 재조합되도록 설계했습니다.
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

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">다음 프로젝트와 연구 이야기로 이어가겠습니다.</h2>
            <p>
              공개 포트폴리오에서는 이메일과 공개 링크 중심으로 연락 경로를 열어두고, 민감한 정보는
              배포 전 다시 확인하겠습니다.
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
        <p>장기적으로 업데이트되는 포트폴리오 시스템입니다. 현재 단계: {site.phase}.</p>
      </footer>
    </div>
  );
}

export default App;
