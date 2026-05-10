import { api } from '../../shared/lib/api';
import type { CMSPage, PageVersion } from './types';

const mapBackendToFrontend = (page: any): CMSPage => ({
  id: page._id,
  title: page.title,
  slug: page.slug,
  content: page.content,
  language: page.language,
  status: page.status,
  metadata: page.metadata,
  lastUpdated: page.updatedAt,
  publishedAt: page.publishedAt,
});

export const fetchPages = async (): Promise<CMSPage[]> => {
  const { data } = await api.get('/admin/cms/pages');
  return data.data.pages.map(mapBackendToFrontend);
};

export const fetchPageById = async (id: string): Promise<CMSPage> => {
  const { data } = await api.get(`/admin/cms/pages/${id}`);
  return mapBackendToFrontend(data.data.page);
};

export const savePage = async (page: Partial<CMSPage>): Promise<CMSPage> => {
  if (page.id) {
    const { data } = await api.patch(`/admin/cms/pages/${page.id}`, page);
    return mapBackendToFrontend(data.data.page);
  } else {
    const { data } = await api.post('/admin/cms/pages', page);
    return mapBackendToFrontend(data.data.page);
  }
};

export const deletePage = async (id: string): Promise<void> => {
  await api.delete(`/admin/cms/pages/${id}`);
};

export const fetchPageVersions = async (pageId: string): Promise<PageVersion[]> => {
  const { data } = await api.get(`/admin/cms/pages/${pageId}/versions`);
  return data.data.versions.map((v: any) => ({
    id: v._id,
    versionNumber: v.versionNumber,
    content: v.content,
    authorName: v.authorId?.fullName || v.authorId?.displayName || 'Unknown',
    createdAt: v.createdAt,
    changeSummary: v.changeSummary,
  }));
};

export const uploadCmsImage = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return { url: data.data.url };
};
