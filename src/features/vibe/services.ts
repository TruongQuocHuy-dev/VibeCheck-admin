import { api } from '../../shared/lib/api';
import type { VibeQueryParams, VibeResponse } from './types';

// TODO: Kiểm tra nếu backend dùng /admin/vibes thay vì /vibes
export const fetchVibes = async (params: VibeQueryParams): Promise<VibeResponse['data']> => {
  const { data } = await api.get<VibeResponse>('/vibes', { params });
  return data.data;
};

export const hideVibe = async (vibeId: string) => {
  const { data } = await api.patch(`/vibes/${vibeId}`, { status: 'hidden' });
  return data;
};

export const deleteVibe = async (vibeId: string) => {
  const { data } = await api.delete(`/vibes/${vibeId}`);
  return data;
};

export const fetchVibeReports = async (vibeId: string) => {
  const { data } = await api.get(`/vibes/${vibeId}/reports`);
  return data.data;
};
