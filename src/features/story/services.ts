import { api } from '../../shared/lib/api';
import type { StoryQueryParams, StoryResponse } from './types';

export const fetchStories = async (params: StoryQueryParams): Promise<StoryResponse['data']> => {
  const { data } = await api.get<StoryResponse>('/vibe-stories', { params });
  return data.data;
};

export const deleteStory = async (storyId: string) => {
  const { data } = await api.delete(`/vibe-stories/${storyId}`);
  return data;
};
