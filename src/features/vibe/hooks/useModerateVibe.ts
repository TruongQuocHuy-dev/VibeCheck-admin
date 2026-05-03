import { useMutation, useQueryClient } from '@tanstack/react-query';
import { hideVibe, deleteVibe } from '../services';

export const useModerateVibe = () => {
  const queryClient = useQueryClient();

  const hideMutation = useMutation({
    mutationFn: (id: string) => hideVibe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vibes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteVibe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vibes'] });
    },
  });

  return {
    hideVibe: hideMutation,
    deleteVibe: deleteMutation,
  };
};
