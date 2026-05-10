import { api } from '../../shared/lib/api';
import type { StoryQueryParams, StoryResponse, StoryStats } from './types';

export const fetchAdminStories = async (params: StoryQueryParams): Promise<StoryResponse['data']> => {
  const { data } = await api.get<StoryResponse>('/admin/stories', { params });
  return data.data;
};

export const fetchStory = async (storyId: string) => {
  const { data } = await api.get(`/admin/stories/${storyId}`);
  return data.data;
};

export const deleteStory = async (storyId: string) => {
  const { data } = await api.delete(`/admin/stories/${storyId}`);
  return data;
};

export const hideStory = async (storyId: string) => {
  const { data } = await api.patch(`/admin/stories/${storyId}/visibility`);
  return data;
};

export const extendStory = async (storyId: string) => {
  const { data } = await api.patch(`/admin/stories/${storyId}/extend`);
  return data;
};

export const bulkDeleteStories = async (storyIds: string[]) => {
  const { data } = await api.post(`/admin/stories/bulk-delete`, { storyIds });
  return data;
};

export const fetchStoryStats = async (): Promise<StoryStats> => {
  const { data } = await api.get<{ data: StoryStats }>('/admin/stories/stats');
  return data.data;
};
