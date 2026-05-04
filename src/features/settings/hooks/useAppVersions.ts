import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAppVersions, addAppVersion } from '../services';

export const useAppVersions = () => {
  const queryClient = useQueryClient();

  const versionsQuery = useQuery({
    queryKey: ['app-versions'],
    queryFn: fetchAppVersions,
  });

  const addVersionMutation = useMutation({
    mutationFn: addAppVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['app-versions'] });
    },
  });

  return {
    versions: versionsQuery.data || [],
    isLoading: versionsQuery.isLoading,
    isError: versionsQuery.isError,
    addVersion: addVersionMutation.mutateAsync,
    isAdding: addVersionMutation.isPending,
  };
};
