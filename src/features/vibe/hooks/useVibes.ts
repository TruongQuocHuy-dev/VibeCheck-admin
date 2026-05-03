import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchVibes } from '../services';
import type { VibeQueryParams } from '../types';

export const useVibes = (params: VibeQueryParams) => {
  return useQuery({
    queryKey: ['vibes', params],
    queryFn: () => fetchVibes(params),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};
