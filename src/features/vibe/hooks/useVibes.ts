import { useQuery } from '@tanstack/react-query';
import { fetchVibesModeration, fetchVibeStats } from '../services';

export const useVibesModeration = (status: string = 'pending') => {
  return useQuery({
    queryKey: ['admin-vibes', status],
    queryFn: () => fetchVibesModeration(status),
    staleTime: 30000,
  });
};

export const useVibeStats = () => {
  return useQuery({
    queryKey: ['admin-vibes-stats'],
    queryFn: fetchVibeStats,
    staleTime: 60000,
  });
};
