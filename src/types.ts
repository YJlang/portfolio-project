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
  repository: string;
  stack: string[];
  role: {
    label: string;
    detail: string;
  };
  caseStudy: {
    priority: number | null;
    problem: string;
    system: string;
    uxCxInsight: string;
    result: string;
    reflection: string;
  };
  public: boolean;
  needsMoreDetail: boolean;
}

export interface ProofAsset {
  slug: string;
  title: string;
  type: string;
  src: string;
  public: PublicState;
  needsOptimization: boolean;
  note: string;
}

export interface ResearchDirection {
  slug: string;
  name: string;
  question: string;
  relatedProjects: string[];
  portfolioEmphasis: string;
}
