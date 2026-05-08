import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAdminRole } from '../services';

export const useUpdateAdminRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adminId, role }: { adminId: string; role: string }) => 
      updateAdminRole(adminId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      // TODO: Show success toast
    },
    onError: (error) => {
      console.error('Failed to update admin role:', error);
      // TODO: Show error toast
    },
  });
};
