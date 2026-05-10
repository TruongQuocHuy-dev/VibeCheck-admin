export type PageLanguage = 'vi' | 'en';
export type PageStatus = 'draft' | 'published' | 'unpublished';

export interface PageMetadata {
  description: string;
  tags?: string[];
}

export interface PageVersion {
  id: string;
  versionNumber: number;
  content: string;
  authorName: string;
  createdAt: string;
  changeSummary?: string;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  language: PageLanguage;
  status: PageStatus;
  metadata: PageMetadata;
  lastUpdated: string;
  publishedAt?: string;
  changeSummary?: string;
}
