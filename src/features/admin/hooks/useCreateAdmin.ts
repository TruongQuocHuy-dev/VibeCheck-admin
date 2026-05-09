import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAdmin } from '../services';
import type { CreateAdminData } from '../types';

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminData: CreateAdminData) => createAdmin(adminData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    onError: (error) => {
      console.error('Failed to create admin:', error);
    },
  });
};
