import { useQuery } from '@tanstack/react-query';
import { getReportDetail } from '../services';

export const useReportDetail = (id: string | null) => {
  return useQuery({
    queryKey: ['report-detail', id],
    queryFn: () => (id ? getReportDetail(id) : null),
    enabled: !!id,
  });
};
