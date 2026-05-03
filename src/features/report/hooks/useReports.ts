import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getReports } from '../services';
import type { ReportQueryParams } from '../types';

export const useReports = (params: ReportQueryParams) => {
  return useQuery({
    queryKey: ['reports', params],
    queryFn: () => getReports(params),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
};
