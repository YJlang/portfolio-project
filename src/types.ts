export type PublicState = boolean | 'review';

export interface Contact {
  type: 'email' | 'phone' | 'github' | string;
  label: string;
  value: string;
  public: boolean;
  note?: string;
}

export interface Project {
  slug: string;
  name: string;
  status: 'featured' | 'index' | 'archive';
  type: 'team' | 'personal' | string;
  category: string[];
  summary: string;
  /** 홈 프로젝트 목록에 쓰는 한 줄 요약. 없으면 summary를 쓴다. */
  oneLiner?: string;
  intent?: string;
  repository: string;
  demoVideo?: {
    src: string;
    label: string;
    caption: string;
  };
  previewImage?: {
    src: string;
    alt: string;
    caption: string;
  };
  links?: Array<{
    label: string;
    url: string;
    type?: string;
  }>;
  stack: string[];
  role: {
    label: string;
    detail: string;
  };
  agenticEngineering?: {
    summary: string;
    mcpServers: Array<{
      name: string;
      usage: string;
      scope?: string;
    }>;
    agentSkills: Array<{
      name: string;
      usage: string;
    }>;
    subAgentOrchestration: {
      status: 'used' | 'partial' | 'not-used' | 'not-confirmed';
      label: string;
      detail: string;
    };
    notes?: string[];
  };
  caseStudy: {
    priority: number | null;
    problem: string;
    system: string;
    uxCxInsight: string;
    result: string;
    reflection: string;
  };
  highlights?: string[];
  evidence?: string[];
  public: boolean;
  needsMoreDetail: boolean;
}

export interface ProofAsset {
  slug: string;
  title: string;
  type: string;
  evidenceGroup?: string;
  /** 증빙 이미지가 없는 텍스트 전용 기록은 생략한다. */
  src?: string;
  thumbnailSrc?: string;
  public: PublicState;
  needsOptimization: boolean;
  issuer?: string;
  date?: string;
  award?: string;
  metric?: string;
  highlights?: string[];
  keywords?: string[];
  paper?: string;
  conference?: string;
  location?: string;
  coauthors?: string[];
  description?: string;
  proves?: string;
  privacyRisk?: string;
  recommendedUse?: string;
  note: string;
}

export interface ExperienceItem {
  slug: string;
  title: string;
  organization: string;
  period: string;
  role: string;
  category: string[];
  summary: string;
  media?: {
    src: string;
    alt: string;
    caption: string;
  };
  public: boolean;
  needsMoreDetail: boolean;
}

export interface ResearchDirection {
  slug: string;
  name: string;
  question: string;
  relatedProjects: string[];
  portfolioEmphasis: string;
}

export type PublicationVenueType =
  | 'journal'
  | 'international-conference'
  | 'international-workshop'
  | 'domestic-conference';

export interface ResearchPublication {
  slug: string;
  venueType: PublicationVenueType;
  title: string;
  authors: string[];
  publishedAt: string;
  /** 학회·워크숍 등 비저널 발표처. 저널은 journal 계열 필드를 쓴다. */
  venue?: string;
  /** 발표처 뒤에 붙는 부가 표기 (proceedings 쪽수, 발표 방식·날짜 등). */
  venueDetail?: string;
  award?: string;
  link?: string;
  linkLabel?: string;
  /* 아래는 저널(KCI) 논문 전용 필드 */
  titleEn?: string;
  journal?: string;
  journalEn?: string;
  journalAbbr?: string;
  journalRank?: string;
  publisher?: string;
  field?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  kciUrl?: string;
  imageSrc?: string;
  presentationVideo?: {
    src: string;
    conference: string;
    label: string;
    caption: string;
    fileSize?: string;
  };
  summary?: string;
  researchQuestion?: string;
  problem?: string;
  method?: string;
  validation?: string;
  contribution?: string;
  outputs?: string[];
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  keywords?: string[];
  portfolioFit?: string;
}

export interface LabProject {
  slug: string;
  title: string;
  /** 발주·협력·소속 맥락을 비식별 표기로 쓴다. 기관·과제 실명은 넣지 않는다. */
  context: string;
  period: string;
  role: string;
  summary: string;
}
