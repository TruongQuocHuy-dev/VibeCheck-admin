import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchAdmins } from '../services';
import type { AdminQueryParams } from '../types';

export const useAdmins = (params: AdminQueryParams) => {
  return useQuery({
    queryKey: ['admins', params],
    queryFn: () => fetchAdmins(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000,
  });
};
