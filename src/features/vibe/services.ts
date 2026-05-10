import { api } from '../../shared/lib/api';
import type { VibeQueryParams, VibeResponse } from './types';

export const fetchVibes = async (params: VibeQueryParams): Promise<VibeResponse['data']> => {
  const { data } = await api.get<VibeResponse>('/admin/vibes', { params });
  return data.data;
};

export const hideVibe = async (vibeId: string) => {
  const { data } = await api.patch(`/admin/vibes/${vibeId}/hide`);
  return data;
};

export const unhideVibe = async (vibeId: string) => {
  const { data } = await api.patch(`/admin/vibes/${vibeId}/unhide`);
  return data;
};

export const approveVibe = async (vibeId: string) => {
  const { data } = await api.patch(`/admin/vibes/${vibeId}/approve`);
  return data;
};

export const rejectVibe = async (vibeId: string, reason?: string, notifyUser?: boolean) => {
  const { data } = await api.patch(`/admin/vibes/${vibeId}/reject`, { reason, notifyUser });
  return data;
};

export const deleteVibe = async (vibeId: string) => {
  const { data } = await api.delete(`/admin/vibes/${vibeId}`);
  return data;
};

export const fetchVibeReports = async (vibeId: string) => {
  const { data } = await api.get(`/admin/vibes/${vibeId}`);
  return data.data?.reports || [];
};

export const bulkActionVibes = async (vibeIds: string[], action: 'hide' | 'delete') => {
  const { data } = await api.post(`/admin/vibes/bulk-action`, { vibeIds, action });
  return data;
};
