import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMatchingConfig, updateMatchingConfig, fetchConfigHistory } from '../services';

export const useMatchingConfig = () => {
  const queryClient = useQueryClient();

  const configQuery = useQuery({
    queryKey: ['matching-config'],
    queryFn: fetchMatchingConfig,
  });

  const historyQuery = useQuery({
    queryKey: ['matching-history'],
    queryFn: fetchConfigHistory,
  });

  const updateConfigMutation = useMutation({
    mutationFn: updateMatchingConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matching-config'] });
      queryClient.invalidateQueries({ queryKey: ['matching-history'] });
    },
  });

  return {
    config: configQuery.data,
    isLoading: configQuery.isLoading,
    history: historyQuery.data || [],
    isLoadingHistory: historyQuery.isLoading,
    updateConfig: updateConfigMutation.mutateAsync,
    isUpdating: updateConfigMutation.isPending,
  };
};
