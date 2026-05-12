import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moderateVibe, deleteVibe } from '../services';
import { toast } from 'react-hot-toast';

export const useModerateVibeAction = () => {
  const queryClient = useQueryClient();

  const moderateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'active' | 'hidden' }) => 
      moderateVibe(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-vibes'] });
      queryClient.invalidateQueries({ queryKey: ['admin-vibes-stats'] });
      toast.success(`Đã ${variables.status === 'active' ? 'duyệt' : 'ẩn'} vibe thành công`);
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi cập nhật vibe');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteVibe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vibes'] });
      queryClient.invalidateQueries({ queryKey: ['admin-vibes-stats'] });
      toast.success('Đã xóa vibe vĩnh viễn');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xóa vibe');
    }
  });

  return {
    moderateVibe: moderateMutation,
    deleteVibe: deleteMutation,
  };
};
