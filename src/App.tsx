import { Fragment, type ReactNode } from 'react';
import profile from '../content/profile.json';
import projects from '../content/projects.json';
import experience from '../content/experience.json';
import proofAssets from '../content/proof-assets.json';
import research from '../content/research.json';
import profilePhoto from '../images/프로필사진.png';
import conferencePresentationVideo from '../images/학회발표영상.mp4';
import type {
  Contact,
  ExperienceItem,
  LabProject,
  Project,
  ProofAsset,
  PublicationVenueType,
  ResearchPublication,
} from './types';

/* ------------------------------------------------------------------
 * Content
 * 화면은 content/*.json만 읽는다. 새 논문·프로젝트·수상은 JSON에 추가하면
 * 아래 정렬 규칙에 따라 자동으로 제자리에 들어간다.
 * ------------------------------------------------------------------ */

const person = profile.person;
const publicContacts = (profile.contacts as Contact[]).filter((contact) => contact.public);
const emailContacts = publicContacts.filter((contact) => contact.type === 'email');
const linkContacts = publicContacts.filter((contact) => contact.type !== 'email');
const primaryEmail = emailContacts[0];

// research.json의 미디어 경로 → 번들 URL. 영상은 임베드하지 않고 링크로만 쓴다.
const publicationMediaMap: Record<string, string> = {
  'images/학회발표영상.mp4': conferencePresentationVideo,
};

// 최신순. publishedAt은 'YYYY-MM' 또는 'YYYY-MM-DD'라 문자열 비교로 충분하다.
const publications = [...(research.publications as ResearchPublication[])].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);
const labProjects = research.labProjects as LabProject[];

const venueTypeLabel: Record<Exclude<PublicationVenueType, 'journal'>, string> = {
  'international-conference': '국제학술대회',
  'international-workshop': '국제 워크숍 발표',
  'domestic-conference': '국내학술대회',
};

// featured → index → archive 순, featured 안에서는 caseStudy.priority 순. 동순위는 JSON 순서 유지.
const projectStatusOrder: Record<Project['status'], number> = { featured: 0, index: 1, archive: 2 };
const projectList = (projects as Project[])
  .filter((project) => project.public)
  .sort(
    (a, b) =>
      projectStatusOrder[a.status] - projectStatusOrder[b.status] ||
      (a.caseStudy.priority ?? 99) - (b.caseStudy.priority ?? 99),
  );

const experienceList = (experience as ExperienceItem[]).filter((item) => item.public);

// 증빙 이미지는 쓰지 않고 수상 기록만 텍스트로 쓴다. 최신순.
const isListedAsset = (asset: ProofAsset) => asset.public === true || asset.public === 'review';
const awardList = (proofAssets as ProofAsset[])
  .filter((asset) => isListedAsset(asset) && (asset.type === 'award' || asset.type === 'research-award'))
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

const sections = [
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Publications' },
  { id: 'research-projects', label: 'Research Projects', navLabel: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience & Awards', navLabel: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

type SectionId = (typeof sections)[number]['id'];

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */

const contactHref = (contact: Contact) =>
  contact.type === 'email' ? `mailto:${contact.value}` : contact.value;

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const section = sections.find((item) => item.id === id);
  const headingId = `${id}-title`;

  return (
    <section className="section" id={id} aria-labelledby={headingId}>
      <h2 id={headingId}>{section?.label}</h2>
      {children}
    </section>
  );
}

function AuthorList({ authors }: { authors: string[] }) {
  return (
    <>
      {/* 좁은 화면에서도 이름 하나가 두 줄로 갈라지지 않게 저자 단위로 묶는다. */}
      {authors.map((author, index) => (
        <Fragment key={author}>
          {index > 0 ? ', ' : null}
          {author === person.name.ko || author === person.name.en ? (
            <strong className="nowrap">{author}</strong>
          ) : (
            <span className="nowrap">{author}</span>
          )}
        </Fragment>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------
 * Sections
 * ------------------------------------------------------------------ */

/* 데스크톱에서는 왼쪽 sticky 사이드바, 1024px 미만에서는 본문 위 헤더로 접힌다. */
function ProfileSidebar() {
  return (
    <header className="sidebar">
      <img
        className="sidebar-photo"
        src={profilePhoto}
        alt={profile.profileImage.alt}
        width="620"
        height="616"
        decoding="async"
      />
      <h1 className="sidebar-name">
        {person.name.ko} <span lang="en">{person.name.en}</span>
      </h1>
      <p className="sidebar-identity">{person.headline}</p>
      <p className="sidebar-affiliation">
        {person.affiliation.ko} ·{' '}
        <span className="nowrap">
          <ExternalLink href={person.affiliation.lab.url}>{person.affiliation.lab.name}</ExternalLink>
        </span>
      </p>
      <dl className="sidebar-interests">
        <dt>관심 분야</dt>
        <dd>
          {/* 항목 하나가 두 줄로 갈라지지 않도록 묶고, 가운뎃점은 앞 항목 안에 붙인다. */}
          {profile.researchInterests.map((interest, index, list) => (
            <Fragment key={interest}>
              {index > 0 ? ' ' : null}
              <span className="nowrap">
                {interest}
                {index < list.length - 1 ? ' ·' : null}
              </span>
            </Fragment>
          ))}
        </dd>
      </dl>
      <ul className="sidebar-links" aria-label="연락처와 외부 링크">
        {primaryEmail ? (
          <li>
            <a href={contactHref(primaryEmail)}>{primaryEmail.value}</a>
          </li>
        ) : null}
        {linkContacts.map((contact) => (
          <li key={contact.value}>
            <ExternalLink href={contactHref(contact)}>{contact.label}</ExternalLink>
          </li>
        ))}
      </ul>
      <nav className="sidebar-nav" aria-label="페이지 섹션">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{'navLabel' in section ? section.navLabel : section.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function About() {
  return (
    <Section id="about">
      <p className="about-text">{person.about}</p>
    </Section>
  );
}

function PublicationVenue({ paper }: { paper: ResearchPublication }) {
  if (paper.venueType === 'journal') {
    return (
      <>
        {paper.journal} ({paper.journalAbbr}), {paper.issue} · {paper.journalRank}
      </>
    );
  }

  return (
    <>
      {[paper.venue, paper.venueDetail].filter(Boolean).join(', ')} · {venueTypeLabel[paper.venueType]}
    </>
  );
}

function Publications() {
  return (
    <Section id="publications">
      <ol className="entry-list">
        {publications.map((paper) => {
          const video = paper.presentationVideo;
          const videoUrl = video ? publicationMediaMap[video.src] : undefined;
          const hasLinks = Boolean(paper.doi || paper.kciUrl || paper.link || (video && videoUrl));

          return (
            <li className="publication" key={paper.slug}>
              <h3 className="entry-title" lang={/[가-힣]/.test(paper.title) ? undefined : 'en'}>
                {paper.title}
              </h3>
              {paper.titleEn ? (
                <p className="publication-title-en" lang="en">
                  {paper.titleEn}
                </p>
              ) : null}
              <p className="publication-authors">
                <AuthorList authors={paper.authors} />
              </p>
              <p className="publication-venue">
                <PublicationVenue paper={paper} />
                {paper.award ? (
                  <>
                    {' · '}
                    <span className="publication-award">{paper.award}</span>
                  </>
                ) : null}
              </p>
              {hasLinks ? (
                <ul className="inline-links entry-links" aria-label={`${paper.title} 링크`}>
                  {paper.doi ? (
                    <li>
                      <ExternalLink href={`https://doi.org/${paper.doi}`}>DOI {paper.doi}</ExternalLink>
                    </li>
                  ) : null}
                  {paper.kciUrl ? (
                    <li>
                      <ExternalLink href={paper.kciUrl}>KCI</ExternalLink>
                    </li>
                  ) : null}
                  {paper.link ? (
                    <li>
                      <ExternalLink href={paper.link}>{paper.linkLabel ?? 'Link'}</ExternalLink>
                    </li>
                  ) : null}
                  {video && videoUrl ? (
                    <li>
                      <ExternalLink href={videoUrl}>{video.label}</ExternalLink>{' '}
                      <span className="link-note">
                        ({[video.conference, video.fileSize ? `mp4 ${video.fileSize}` : 'mp4'].join(', ')})
                      </span>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function ResearchProjects() {
  return (
    <Section id="research-projects">
      <ul className="entry-list project-list">
        {labProjects.map((project) => (
          <li className="project" key={project.slug}>
            <div className="project-head">
              <h3 className="entry-title">{project.title}</h3>
              <span className="project-role">
                {project.context} · {project.period} · 역할: {project.role}
              </span>
            </div>
            <p className="project-summary">{project.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <ul className="entry-list project-list">
        {projectList.map((project) => {
          const links = [{ label: 'GitHub', url: project.repository }, ...(project.links ?? [])];

          return (
            <li className="project" key={project.slug}>
              <div className="project-head">
                <h3 className="entry-title">{project.name}</h3>
                <span className="project-role">{project.role.label}</span>
              </div>
              <p className="project-summary">{project.oneLiner ?? project.summary}</p>
              <ul className="inline-links project-links" aria-label={`${project.name} 링크`}>
                {links.map((link) => (
                  <li key={link.url}>
                    <ExternalLink href={link.url}>{link.label}</ExternalLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function ExperienceAndAwards() {
  return (
    <Section id="experience">
      <h3 className="subsection-title">Experience</h3>
      <ul className="dated-list">
        {experienceList.map((item) => {
          const showOrganization = item.organization !== item.title;
          const showRole = !item.title.includes(item.role);

          return (
            <li key={item.slug}>
              <span className="dated-when">{item.period}</span>
              <div>
                <p className="dated-title">
                  {item.title}
                  {showOrganization ? <span className="dated-org"> · {item.organization}</span> : null}
                </p>
                {showRole ? <p className="dated-detail">{item.role}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>

      <h3 className="subsection-title">Awards</h3>
      <ul className="dated-list">
        {awardList.map((award) => (
          <li key={award.slug}>
            <span className="dated-when">
              <time dateTime={award.date}>{award.date?.slice(0, 4)}</time>
            </span>
            <div>
              <p className="dated-title">{award.title}</p>
              <p className="dated-detail">{[award.paper, award.issuer].filter(Boolean).join(' · ')}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <dl className="kv-list">
        {profile.technicalStack.map((group) => (
          <div key={group.title}>
            <dt>{group.title}</dt>
            <dd>{group.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section id="contact">
      <p className="contact-line">
        연구 협업이나 프로젝트 이야기는 이메일로 편하게 연락 주세요.{' '}
        {emailContacts.map((contact, index) => (
          <Fragment key={contact.value}>
            {index > 0 ? ' 또는 ' : null}
            <a href={contactHref(contact)}>{contact.value}</a>
          </Fragment>
        ))}
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------ */

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        본문으로 바로가기
      </a>
      <div className="page">
        <ProfileSidebar />

        <div className="content">
          <main id="main-content">
            <About />
            <Publications />
            <ResearchProjects />
            <Projects />
            <ExperienceAndAwards />
            <Skills />
            <ContactSection />
          </main>

          <footer className="site-footer">
            <p>
              © {new Date().getFullYear()} {person.name.ko} <span lang="en">{person.name.en}</span>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
