import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchUsers } from '../services';
import type { UserQueryParams } from '../types';

export const useUsers = (params: UserQueryParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000,
  });
};
