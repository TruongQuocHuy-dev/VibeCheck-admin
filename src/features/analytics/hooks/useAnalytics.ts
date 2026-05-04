import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics } from '../services';
import type { AnalyticsParams } from '../types';

export const useAnalytics = (params: AnalyticsParams) => {
  return useQuery({
    queryKey: ['analytics', params],
    queryFn: () => fetchAnalytics(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: (previousData) => previousData, // Keep old data during transition
    retry: 3,
  });
};
