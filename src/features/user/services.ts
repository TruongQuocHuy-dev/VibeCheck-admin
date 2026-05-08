import { api } from '../../shared/lib/api';
import type { UserQueryParams, UserResponse } from './types';

export const fetchUsers = async (params: UserQueryParams): Promise<UserResponse['data']> => {
  // Normalize params for API
  const queryParams = { ...params };
  if (queryParams.status === 'all') delete queryParams.status;
  
  const { data } = await api.get<UserResponse>('/admin/users', { params: queryParams });
  return data.data;
};

export const updateUserStatus = async (userId: string, status: string, reason: string) => {
  const { data } = await api.patch(`/admin/users/${userId}`, {
    status,
    banReason: reason,
  });
  return data;
};
