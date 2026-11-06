import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import profile from '../content/profile.json';
import projects from '../content/projects.json';
import experience from '../content/experience.json';
import proofAssets from '../content/proof-assets.json';
import research from '../content/research.json';
import profilePortrait from '../images/optimized/profile-portrait.webp';
import conferencePresentationVideo from '../images/학회발표영상.mp4';
import pulseDemoVideo from '../images/PULSE_demo.mp4';
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

// images/optimized/의 웹용 이미지 → 번들 URL. JSON의 src/thumbnailSrc 경로로 찾는다.
// 작은 썸네일은 같은 이름에 -sm.webp를 붙인 파일을 쓰고, 없으면 원래 파일을 쓴다.
const optimizedImages = import.meta.glob<string>('../images/optimized/*.{webp,jpg,png}', {
  eager: true,
  import: 'default',
});
const assetUrl = (src: string | undefined) => (src ? optimizedImages[`../${src}`] : undefined);
const smallVariant = (src: string) =>
  assetUrl(src.replace(/(-thumb)?\.(webp|jpe?g|png)$/, '-sm.webp')) ?? assetUrl(src);

// 프로젝트 시연 영상. projects.json의 demoVideo.src → 번들 URL·포스터·원본 크기.
const projectVideoMap: Record<string, { url: string; poster: string; width: number; height: number }> = {
  'images/PULSE_demo.mp4': {
    url: pulseDemoVideo,
    poster: 'images/optimized/pulse-demo-poster.webp',
    width: 1280,
    height: 578,
  },
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
// 대표작(featured) 첫 번째는 시연 영상과 함께 크게, 나머지 대표작은 나란히, 그 외는 목록 행으로 보인다.
const [leadProject, ...featuredProjects] = projectList.filter((project) => project.status === 'featured');
const otherProjects = projectList.filter((project) => project.status !== 'featured');

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

/** 리빌·등장 순서. CSS가 --i × 간격만큼 늦게 띄운다. */
const order = (index: number) => ({ '--i': index }) as CSSProperties;

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 화면 진입 감시. 페이지 전체에서 IntersectionObserver 하나만 쓴다.
 * - [data-reveal]: 처음 보일 때 .is-in을 붙인다(스크롤 리빌). index.html이 <html>에 .js를 붙였을 때만
 *   숨겼다가 보이게 하므로, 스크립트가 없어도 내용은 보인다.
 * - video[data-autopause]: 화면 밖으로 나가면 멈춘다.
 */
function useViewportObserver() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const videos = document.querySelectorAll<HTMLVideoElement>('video[data-autopause]');

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((target) => target.classList.add('is-in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target;

          if (target instanceof HTMLVideoElement) {
            if (!entry.isIntersecting && !target.paused) target.pause();
            continue;
          }

          if (entry.isIntersecting) {
            target.classList.add('is-in');
            observer.unobserve(target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    reveals.forEach((target) => observer.observe(target));
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);
}

/* ------------------------------------------------------------------
 * Lightbox: 썸네일을 누르면 큰 이미지를 <dialog>로 띄운다.
 * 스크립트가 없으면 썸네일 링크가 이미지 파일을 직접 연다.
 * ------------------------------------------------------------------ */

type LightboxImage = { src: string; alt: string; caption: string; width: number; height: number };

const LightboxContext = createContext<(image: LightboxImage, opener: HTMLElement) => void>(() => {});

function Lightbox({ image, onClosed }: { image: LightboxImage | null; onClosed: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (image && dialog && !dialog.open) dialog.showModal();
  }, [image]);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={image?.caption}
      onClose={onClosed}
      onClick={(event) => {
        // 이미지 바깥(배경)을 누르면 닫는다.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="lightbox-inner">
        <button type="button" className="btn btn--quiet lightbox-close" onClick={() => dialogRef.current?.close()}>
          닫기
        </button>
        {image ? (
          <figure className="lightbox-figure">
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} decoding="async" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ) : null}
      </div>
    </dialog>
  );
}

/** 작은 썸네일. 누르면 라이트박스로 큰 이미지를 연다. */
function ProofThumb({
  large,
  small,
  alt,
  caption,
  size,
  thumbSize,
  className,
}: {
  large: string;
  small: string;
  alt: string;
  caption: string;
  /** 큰 이미지의 가로·세로(비율용). */
  size: [number, number];
  /** 작은 썸네일 파일의 가로·세로. */
  thumbSize: [number, number];
  className: string;
}) {
  const openLightbox = useContext(LightboxContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    openLightbox({ src: large, alt, caption, width: size[0], height: size[1] }, event.currentTarget);
  };

  return (
    <a className={`thumb raised ${className}`} href={large} aria-haspopup="dialog" onClick={handleClick}>
      <img src={small} alt={alt} width={thumbSize[0]} height={thumbSize[1]} loading="lazy" decoding="async" />
    </a>
  );
}

function Section({
  id,
  className,
  children,
}: {
  id: SectionId;
  className: string;
  children: ReactNode;
}) {
  return (
    <section className={`section ${className}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container section-grid">{children}</div>
    </section>
  );
}

function SectionHead({ id, className }: { id: SectionId; className?: string }) {
  const section = sections.find((item) => item.id === id);

  return (
    <div className={className ? `section-head ${className}` : 'section-head'} data-reveal>
      <h2 id={`${id}-title`}>{section?.label}</h2>
    </div>
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
 * Chrome
 * ------------------------------------------------------------------ */

function SiteNav() {
  return (
    <header className="masthead">
      <div className="container masthead-inner">
        <a className="wordmark" href="#top">
          {person.name.ko}{' '}
          <span className="wordmark-en" lang="en">
            {person.name.en}
          </span>
        </a>
        <nav className="masthead-nav" aria-label="페이지 섹션">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{'navLabel' in section ? section.navLabel : section.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
 * Sections
 * ------------------------------------------------------------------ */

/* 첫 화면: 이름, 정체성 한 문장, 소속, 연락 경로, 관심 분야. */
function ProfileHero() {
  return (
    <section className="hero" id="top" aria-labelledby="profile-name">
      <div className="container intro-grid">
        <div className="intro-text">
          <h1 className="intro-name enter" id="profile-name" style={order(0)}>
            <span className="intro-name-ko">{person.name.ko}</span>{' '}
            <span className="intro-name-en" lang="en">
              {person.name.en}
            </span>
          </h1>
          <p className="intro-identity enter" style={order(1)}>
            {person.headline}
          </p>
          <p className="intro-affiliation enter" style={order(2)}>
            {person.affiliation.ko} ·{' '}
            <span className="nowrap">
              <ExternalLink href={person.affiliation.lab.url}>{person.affiliation.lab.name}</ExternalLink>
            </span>
          </p>
          <ul className="intro-actions enter" aria-label="연락처와 외부 링크" style={order(3)}>
            {primaryEmail ? (
              <li>
                <a className="btn btn--primary" href={contactHref(primaryEmail)}>
                  {primaryEmail.value}
                </a>
              </li>
            ) : null}
            {linkContacts.map((contact) => (
              <li key={contact.value}>
                <ExternalLink className="btn btn--quiet" href={contactHref(contact)}>
                  {contact.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
        <figure className="intro-photo enter" style={order(1)}>
          <img
            src={profilePortrait}
            alt={profile.profileImage.alt}
            width="376"
            height="470"
            decoding="async"
            fetchPriority="high"
          />
        </figure>
        <dl className="intro-interests enter" style={order(4)}>
          <dt>관심 분야</dt>
          <dd>
            <ul>
              {profile.researchInterests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" className="section--split">
      <SectionHead id="about" />
      <div className="section-body">
        <p className="about-text" data-reveal style={order(1)}>
          {person.about}
        </p>
      </div>
    </Section>
  );
}

function PublicationVenue({ paper }: { paper: ResearchPublication }) {
  if (paper.venueType === 'journal') {
    return (
      <>
        {paper.journal} ({paper.journalAbbr}), {paper.issue}
      </>
    );
  }

  return <>{[paper.venue, paper.venueDetail].filter(Boolean).join(', ')}</>;
}

/* 서명 요소: 옅은 인쇄 시트 위의 번호 붙은 논문 목록. 수상 논문 행만 마젠타로 짚는다. */
function Publications() {
  return (
    <Section id="publications" className="section--sheet">
      <div className="sheet">
        <SectionHead id="publications" className="sheet-head" />
        <ol className="pub-list" reversed>
          {publications.map((paper, index) => {
            const video = paper.presentationVideo;
            const videoUrl = video ? publicationMediaMap[video.src] : undefined;
            const hasLinks = Boolean(paper.doi || paper.kciUrl || paper.link || (video && videoUrl));
            const venueType = paper.venueType === 'journal' ? paper.journalRank : venueTypeLabel[paper.venueType];

            return (
              <li
                className={paper.award ? 'pub pub--award' : 'pub'}
                key={paper.slug}
                data-reveal
                style={order(index)}
              >
                <span className="pub-num" aria-hidden="true">
                  [{publications.length - index}]
                </span>
                <div className="pub-main">
                  <h3 className="pub-title" lang={/[가-힣]/.test(paper.title) ? undefined : 'en'}>
                    {paper.title}
                  </h3>
                  {paper.titleEn ? (
                    <p className="pub-title-en" lang="en">
                      {paper.titleEn}
                    </p>
                  ) : null}
                  <p className="pub-authors">
                    <AuthorList authors={paper.authors} />
                  </p>
                  <p className="pub-venue">
                    <PublicationVenue paper={paper} />
                  </p>
                  {hasLinks ? (
                    <ul className="link-row" aria-label={`${paper.title} 링크`}>
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
                </div>
                <p className="pub-type">
                  <span>{venueType}</span>
                  {paper.award ? <span className="pub-award">{paper.award}</span> : null}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

function ResearchProjects() {
  return (
    <Section id="research-projects" className="section--split">
      <SectionHead id="research-projects" className="section-head--pinned" />
      <ul className="section-body ledger">
        {labProjects.map((project, index) => (
          <li className="ledger-row" key={project.slug} data-reveal style={order(index)}>
            <div className="ledger-name">
              <h3 className="ledger-title">{project.title}</h3>
              <p className="ledger-meta">
                <span>{project.context}</span>
                <span className="num">{project.period}</span>
                <span>역할: {project.role}</span>
              </p>
            </div>
            <p className="ledger-summary">{project.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* 첫 링크(GitHub)가 칸 전체를 덮어 칸 어디를 눌러도 저장소로 간다. 나머지 링크는 그 위에 뜬다. */
function ProjectLinks({ project }: { project: Project }) {
  const links = [{ label: 'GitHub', url: project.repository }, ...(project.links ?? [])];

  return (
    <ul className="link-row" aria-label={`${project.name} 링크`}>
      {links.map((link, index) => (
        <li key={link.url}>
          <ExternalLink className={index === 0 ? 'stretched' : 'raised'} href={link.url}>
            {link.label}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

// 시연 영상: 마우스를 올리면 소리 없이 미리보기, 누르면 기본 컨트롤로 재생. 동작 줄이기 설정이면 미리보기를 하지 않는다.
const previewPlay = (event: PointerEvent<HTMLVideoElement>) => {
  const video = event.currentTarget;
  if (event.pointerType !== 'mouse' || prefersReducedMotion() || !video.paused) return;
  video.dataset.preview = 'on';
  video.play().catch(() => {
    delete video.dataset.preview;
  });
};

const previewStop = (event: PointerEvent<HTMLVideoElement>) => {
  const video = event.currentTarget;
  if (video.dataset.preview !== 'on') return;
  delete video.dataset.preview;
  video.pause();
};

function ProjectDemo({ project }: { project: Project }) {
  const demo = project.demoVideo;
  const media = demo ? projectVideoMap[demo.src] : undefined;
  if (!demo || !media) return null;

  return (
    <figure className="project-lead-media raised">
      <video
        className="project-lead-video"
        src={media.url}
        poster={assetUrl(media.poster)}
        width={media.width}
        height={media.height}
        preload="metadata"
        muted
        loop
        playsInline
        controls
        aria-label={demo.label}
        data-autopause
        onPointerEnter={previewPlay}
        onPointerLeave={previewStop}
        onPlay={(event) => {
          // 컨트롤로 직접 재생하면 미리보기 표시를 지워 마우스가 나가도 계속 재생한다.
          if (!event.currentTarget.matches(':hover')) delete event.currentTarget.dataset.preview;
        }}
      />
      <figcaption>{demo.caption}</figcaption>
    </figure>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const preview = project.previewImage;
  const large = assetUrl(preview?.src);
  if (!preview || !large) return null;

  return (
    <ProofThumb
      className="thumb--wide"
      large={large}
      small={smallVariant(preview.src) ?? large}
      alt={preview.alt}
      caption={preview.caption}
      size={[1200, 675]}
      thumbSize={[240, 136]}
    />
  );
}

function Projects() {
  return (
    <Section id="projects" className="section--stack">
      <SectionHead id="projects" />
      {leadProject ? (
        <article className="project-lead linked" data-reveal>
          <div className="project-lead-text">
            <h3 className="feature-title project-lead-title">{leadProject.name}</h3>
            <p className="feature-role">{leadProject.role.label}</p>
            <p className="feature-summary">{leadProject.oneLiner ?? leadProject.summary}</p>
            <ProjectLinks project={leadProject} />
          </div>
          <ProjectDemo project={leadProject} />
        </article>
      ) : null}
      {featuredProjects.length ? (
        <ul className="features">
          {featuredProjects.map((project, index) => (
            <li className="feature linked" key={project.slug} data-reveal style={order(index)}>
              <h3 className="feature-title">{project.name}</h3>
              <p className="feature-role">{project.role.label}</p>
              <p className="feature-summary">{project.oneLiner ?? project.summary}</p>
              <ProjectLinks project={project} />
            </li>
          ))}
        </ul>
      ) : null}
      <ul className="index-rows">
        {otherProjects.map((project, index) => (
          <li className="index-row linked" key={project.slug} data-reveal style={order(index)}>
            <div className="index-name">
              <h3 className="index-title">{project.name}</h3>
              <p className="index-role">{project.role.label}</p>
            </div>
            <div className="index-body">
              <p className="index-summary">{project.oneLiner ?? project.summary}</p>
              <ProjectPreview project={project} />
            </div>
            <ProjectLinks project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ExperienceAndAwards() {
  return (
    <Section id="experience" className="section--band">
      <SectionHead id="experience" />
      <div className="band-block">
        <h3 className="band-label">Experience</h3>
        <ul className="band-list band-list--experience">
          {experienceList.map((item, index) => {
            const showOrganization = item.organization !== item.title;
            const showRole = !item.title.includes(item.role);

            return (
              <li className="dated" key={item.slug} data-reveal style={order(index)}>
                <span className="dated-when num">{item.period}</span>
                <p className="dated-title">{item.title}</p>
                {showOrganization ? <p className="dated-detail">{item.organization}</p> : null}
                {showRole ? <p className="dated-detail">{item.role}</p> : null}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="band-block">
        <h3 className="band-label">Awards</h3>
        <ul className="band-list band-list--awards">
          {awardList.map((award, index) => {
            // 상장 이미지는 개인정보를 가린 웹용본(thumbnailSrc)만 쓴다. 원본(src)은 링크하지 않는다.
            const large = assetUrl(award.thumbnailSrc);

            return (
              <li className="dated dated--proof" key={award.slug} data-reveal style={order(index)}>
                {large && award.thumbnailSrc ? (
                  <ProofThumb
                    className="dated-thumb"
                    large={large}
                    small={smallVariant(award.thumbnailSrc) ?? large}
                    alt={`${award.title} 상장`}
                    caption={award.title}
                    size={[600, 800]}
                    thumbSize={[120, 160]}
                  />
                ) : null}
                <div className="dated-text">
                  <span className="dated-when num">
                    <time dateTime={award.date}>{award.date?.slice(0, 4)}</time>
                  </span>
                  <p className="dated-title">{award.title}</p>
                  {award.paper ? <p className="dated-detail">{award.paper}</p> : null}
                  {award.issuer ? <p className="dated-detail">{award.issuer}</p> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" className="section--split">
      <SectionHead id="skills" />
      <dl className="section-body skills">
        {profile.technicalStack.map((group, index) => (
          <div className="skill-row" key={group.title} data-reveal style={order(index)}>
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
    <Section id="contact" className="section--close">
      <SectionHead id="contact" />
      <div className="section-body">
        <p className="contact-line" data-reveal style={order(1)}>
          연구 협업이나 프로젝트 이야기는 이메일로 편하게 연락 주세요.
        </p>
        <p className="contact-emails" data-reveal style={order(2)}>
          {emailContacts.map((contact, index) => (
            <Fragment key={contact.value}>
              {index > 0 ? <span className="contact-or"> 또는 </span> : null}
              <a href={contactHref(contact)}>{contact.value}</a>
            </Fragment>
          ))}
        </p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------ */

function App() {
  useViewportObserver();

  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openLightbox = useCallback((image: LightboxImage, opener: HTMLElement) => {
    openerRef.current = opener;
    setLightboxImage(image);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    openerRef.current?.focus();
  }, []);

  return (
    <LightboxContext.Provider value={openLightbox}>
      <a className="skip-link" href="#main-content">
        본문으로 바로가기
      </a>
      <SiteNav />
      <main id="main-content">
        <ProfileHero />
        <About />
        <Publications />
        <ResearchProjects />
        <Projects />
        <ExperienceAndAwards />
        <Skills />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {person.name.ko} <span lang="en">{person.name.en}</span>
          </p>
        </div>
      </footer>
      <Lightbox image={lightboxImage} onClosed={closeLightbox} />
    </LightboxContext.Provider>
  );
}

export default App;
