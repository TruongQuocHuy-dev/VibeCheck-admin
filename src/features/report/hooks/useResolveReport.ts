import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resolveReport } from '../services';
import type { ResolveReportPayload } from '../types';

export const useResolveReport = (reportId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ResolveReportPayload) => resolveReport(reportId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['report-detail', reportId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['vibes'] });
    },
  });
};
