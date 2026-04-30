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
  intent?: string;
  repository: string;
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
