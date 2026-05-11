import { api } from '../../shared/lib/api';

export interface BlacklistWord {
  _id: string;
  word: string;
  type: 'exact' | 'contains' | 'regex';
  isActive: boolean;
  createdBy: {
    _id: string;
    fullName: string;
    displayName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlacklistFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}

export interface BlacklistResponse {
  status: string;
  data: {
    words: BlacklistWord[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BlacklistStats {
  total: number;
  active: number;
  inactive: number;
  exact: number;
  contains: number;
  regex: number;
}

export interface BlacklistStatsResponse {
  status: string;
  data: BlacklistStats;
}

export const fetchBlacklist = async (params: BlacklistFilters): Promise<BlacklistResponse['data']> => {
  const { data } = await api.get<BlacklistResponse>('/admin/blacklist', { params });
  return data.data;
};

export const fetchBlacklistStats = async (): Promise<BlacklistStats> => {
  const { data } = await api.get<BlacklistStatsResponse>('/admin/blacklist/stats');
  return data.data;
};

export const addBlacklistWord = async (wordData: Partial<BlacklistWord>) => {
  const { data } = await api.post('/admin/blacklist', wordData);
  return data;
};

export const updateBlacklistWord = async (id: string, wordData: Partial<BlacklistWord>) => {
  const { data } = await api.patch(`/admin/blacklist/${id}`, wordData);
  return data;
};

export const deleteBlacklistWord = async (id: string) => {
  const { data } = await api.delete(`/admin/blacklist/${id}`);
  return data;
};
