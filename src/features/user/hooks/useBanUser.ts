import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserStatus } from '../services';

interface BanParams {
  userId: string;
  status: 'active' | 'banned';
  reason: string;
}

export const useBanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status, reason }: BanParams) =>
      updateUserStatus(userId, status, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
