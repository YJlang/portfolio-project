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

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        본문으로 바로가기
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Junho Yoon portfolio home">
          JY
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#research">Research</a>
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
              <a className="button secondary" href={`mailto:${publicContacts[0]?.value ?? ''}`}>
                이메일로 연락하기
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Portfolio snapshot">
            <figure className="portrait">
              <img src={profilePhoto} alt={profile.profileImage.alt} width="620" height="616" />
            </figure>
            <dl className="snapshot-grid">
              <div>
                <dt>Education</dt>
                <dd>{profile.person.education[0].school}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>AI-assisted product systems</dd>
              </div>
              <div>
                <dt>Featured</dt>
                <dd>{featuredProjects.length} case studies</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Featured Work</p>
            <h2 id="work-title">문제, 사용자, 시스템을 함께 보여주는 프로젝트</h2>
            <p>
              첫 버전은 대표 프로젝트 3개를 중심으로 시작하고, 나머지 작업은 인덱스와
              아카이브로 확장합니다.
            </p>
          </div>

          <div className="featured-list">
            {featuredProjects.map((project) => (
              <article className="project-feature" key={project.slug}>
                <div className="project-rank" aria-hidden="true">
                  {String(project.caseStudy.priority).padStart(2, '0')}
                </div>
                <div className="project-body">
                  <div className="project-title-row">
                    <h3>{project.name}</h3>
                    <span className="project-type">{project.type}</span>
                  </div>
                  <p>{project.summary}</p>
                  <dl className="project-meta">
                    <div>
                      <dt>Role</dt>
                      <dd>{project.role.label}</dd>
                    </div>
                    <div>
                      <dt>System</dt>
                      <dd>{project.stack.join(' / ')}</dd>
                    </div>
                  </dl>
                  <p className="project-insight">{project.caseStudy.uxCxInsight}</p>
                  <a href={project.repository} target="_blank" rel="noreferrer">
                    GitHub repository
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section compact" aria-labelledby="project-index-title">
          <div className="section-heading">
            <p className="eyebrow">Project Index</p>
            <h2 id="project-index-title">계속 확장되는 작업 목록</h2>
          </div>
          <div className="index-table" role="list">
            {indexProjects.map((project) => (
              <article className="index-row" key={project.slug} role="listitem">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
                <span>{project.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section two-column" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="eyebrow">Experience / Proof</p>
            <h2 id="experience-title">협업, 운영, 학업의 근거</h2>
            <p>
              활동과 증빙은 첫 화면을 무겁게 만들지 않되, 신뢰를 보강하는 근거로
              정돈합니다.
            </p>
          </div>
          <div className="stack-list">
            {experience.map((item) => (
              <article className="quiet-card" key={item.slug}>
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
            <h2 id="research-title">특정 연구실에 고정되지 않는 관심 축</h2>
            <p>
              AIMS Lab은 현재 관심 후보 중 하나로 관리하고, 포트폴리오는 더 넓은
              연구 방향에 맞춰 재조합할 수 있게 둡니다.
            </p>
          </div>
          <div className="research-grid">
            {typedResearchDirections.map((direction) => (
              <article className="research-card" key={direction.slug}>
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
            <h2 id="contact-title">새 프로젝트와 연구 이야기로 이어가기</h2>
            <p>
              공개 포트폴리오에서는 이메일 중심으로 연락 경로를 열어두고, 민감한 정보는
              배포 전 다시 확인합니다.
            </p>
          </div>
          <div className="contact-links">
            {publicContacts.map((contact) => (
              <a
                key={`${contact.type}-${contact.value}`}
                href={contact.type === 'email' ? `mailto:${contact.value}` : contact.value}
                target={contact.type === 'github' ? '_blank' : undefined}
                rel={contact.type === 'github' ? 'noreferrer' : undefined}
              >
                {contact.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Built as a long-term portfolio system. Last content model phase: {site.phase}.</p>
      </footer>
    </div>
  );
}

export default App;
