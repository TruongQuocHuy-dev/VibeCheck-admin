import { api } from '../../shared/lib/api';
import type { 
  VibeTag, 
  VibeTagResponse, 
  VibeTagQueryParams, 
  CreateVibeTagDTO, 
  UpdateVibeTagDTO 
} from './types';

export const fetchVibeTags = async (params: VibeTagQueryParams): Promise<VibeTagResponse['data']> => {
  const { data } = await api.get<VibeTagResponse>('/admin/vibe-tags', { params });
  return data.data;
};

export const createVibeTag = async (payload: CreateVibeTagDTO): Promise<VibeTag> => {
  const { data } = await api.post<{ data: VibeTag }>('/admin/vibe-tags', payload);
  return data.data;
};

export const updateVibeTag = async (id: string, payload: UpdateVibeTagDTO): Promise<VibeTag> => {
  const { data } = await api.patch<{ data: VibeTag }>(`/admin/vibe-tags/${id}`, payload);
  return data.data;
};

export const deleteVibeTag = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/admin/vibe-tags/${id}`);
  return data;
};
