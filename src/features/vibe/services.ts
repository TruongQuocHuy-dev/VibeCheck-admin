import { api } from '../../shared/lib/api';
import type { Vibe, VibeResponse, VibeStats } from './types';

export const fetchVibesModeration = async (status: string = 'pending'): Promise<Vibe[]> => {
  const { data } = await api.get<VibeResponse>('/admin/vibes/moderation', { params: { status } });
  return data.data.vibes;
};

export const moderateVibe = async (id: string, status: 'active' | 'hidden') => {
  const { data } = await api.patch(`/admin/vibes/${id}/moderate`, { status });
  return data;
};

export const deleteVibe = async (id: string) => {
  const { data } = await api.delete(`/admin/vibes/${id}`);
  return data;
};

export const fetchVibeStats = async (): Promise<VibeStats> => {
  const { data } = await api.get<{ data: VibeStats }>('/admin/vibes/stats');
  return data.data;
};
