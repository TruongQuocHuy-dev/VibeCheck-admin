import { api } from '../../shared/lib/api';
import type { 
  AdminProfile, 
  UpdateProfilePayload, 
  ChangePasswordPayload, 
  AdminSession, 
  ActivityLog 
} from './types';

export const getProfile = async (): Promise<AdminProfile> => {
  const { data } = await api.get('/users/profile');
  return data.data?.user ?? data.user ?? data;
};

export const updateProfile = async (payload: UpdateProfilePayload): Promise<AdminProfile> => {
  const { data } = await api.patch('/users/profile', payload);
  return data.data?.user ?? data.user ?? data;
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<void> => {
  await api.post('/users/change-password', payload);
};

export const getSessions = async (): Promise<AdminSession[]> => {
  const { data } = await api.get('/admin/sessions');
  return data.data;
};

export const revokeSession = async (sessionId: string): Promise<void> => {
  await api.delete(`/admin/sessions/${sessionId}`);
};

export const getActivityLog = async (days: number = 7): Promise<ActivityLog[]> => {
  const { data } = await api.get(`/admin/activity?days=${days}`);
  return data.data;
};

export const uploadAvatar = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data.url;
};
