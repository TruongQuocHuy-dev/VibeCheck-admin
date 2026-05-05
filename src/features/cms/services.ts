import { api } from '../../shared/lib/api';
import type { CMSPage, PageVersion } from './types';

export const fetchPages = async (): Promise<CMSPage[]> => {
  // TODO: GET /admin/cms/pages
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: '1',
      title: 'Terms of Service',
      slug: 'terms-of-service',
      content: '<h1>Terms of Service</h1><p>Welcome to VibeCheck...</p>',
      language: 'vi',
      status: 'published',
      metadata: { description: 'Điều khoản sử dụng VibeCheck', tags: ['legal', 'terms'] },
      lastUpdated: '2024-05-01T10:00:00Z',
      publishedAt: '2024-05-01T10:00:00Z',
    },
    {
      id: '2',
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: '<h1>Privacy Policy</h1><p>We value your privacy...</p>',
      language: 'en',
      status: 'published',
      metadata: { description: 'Privacy policy for VibeCheck', tags: ['legal', 'privacy'] },
      lastUpdated: '2024-05-02T14:30:00Z',
      publishedAt: '2024-05-02T14:30:00Z',
    },
    {
      id: '3',
      title: 'FAQ - Câu hỏi thường gặp',
      slug: 'faq',
      content: '<h1>FAQ</h1><h3>Làm sao để tạo Vibe?</h3><p>...</p>',
      language: 'vi',
      status: 'draft',
      metadata: { description: 'Các câu hỏi thường gặp', tags: ['help', 'faq'] },
      lastUpdated: '2024-05-05T09:00:00Z',
    }
  ];
};

export const fetchPageById = async (id: string): Promise<CMSPage> => {
  // TODO: GET /admin/cms/pages/:id
  const pages = await fetchPages();
  const page = pages.find(p => p.id === id);
  if (!page) throw new Error('Page not found');
  return page;
};

export const savePage = async (page: Partial<CMSPage>): Promise<CMSPage> => {
  // TODO: POST or PATCH /admin/cms/pages
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    ...page,
    id: page.id || Math.random().toString(36).substr(2, 9),
    lastUpdated: new Date().toISOString(),
  } as CMSPage;
};

export const fetchPageVersions = async (pageId: string): Promise<PageVersion[]> => {
  // TODO: GET /admin/cms/pages/:id/versions
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: 'v1',
      versionNumber: 2,
      content: '<h1>Updated Content</h1>',
      authorName: 'Admin Huy',
      createdAt: '2024-05-01T10:00:00Z',
      changeSummary: 'Update terms for GDPR compliance'
    },
    {
      id: 'v2',
      versionNumber: 1,
      content: '<h1>Initial Content</h1>',
      authorName: 'Admin Huy',
      createdAt: '2024-01-01T00:00:00Z',
      changeSummary: 'Initial release'
    }
  ];
};

export const uploadCmsImage = async (file: File): Promise<{ url: string }> => {
  // TODO: POST /media/upload
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { url: 'https://picsum.photos/seed/cms/800/600' };
};
