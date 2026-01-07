
export interface GroundingSource {
  title: string;
  uri: string;
}

export interface InterviewQuestion {
  category: string;
  question: string;
  context?: string;
  sourceTitle: string;
  sourceUrl: string;
}

export interface ResearchResult {
  role: string;
  company: string;
  questions: InterviewQuestion[];
  sources: GroundingSource[];
  rawText: string;
}

export interface JDData {
  company: string;
  role: string;
  description: string;
}
