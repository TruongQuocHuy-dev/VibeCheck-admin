import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../services';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      // Update the main profile cache
      queryClient.setQueryData(['admin-profile'], data);
      // Also invalidate the general auth user query if it's used elsewhere
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
  });
};
