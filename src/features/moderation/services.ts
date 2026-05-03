import { api } from '../../shared/lib/api';
import type { BlacklistWord, BlacklistResponse, BlacklistType } from './types';

// TODO: Cần endpoint /admin/blacklist trên Backend
export const fetchBlacklist = async (): Promise<BlacklistResponse['data']> => {
  const { data } = await api.get<BlacklistResponse>('/admin/blacklist');
  return data.data;
};

export const addBlacklistWord = async (word: string, type: BlacklistType) => {
  const { data } = await api.post('/admin/blacklist', { word, type });
  return data;
};

export const removeBlacklistWord = async (id: string) => {
  const { data } = await api.delete(`/admin/blacklist/${id}`);
  return data;
};

export const toggleBlacklistWord = async (id: string, isActive: boolean) => {
  const { data } = await api.patch(`/admin/blacklist/${id}`, { isActive });
  return data;
};
