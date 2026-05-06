import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAsRead, markAllAsRead, deleteNotification } from '../services';

export const useNotificationActions = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-notifications'] });
  };

  const markReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: invalidateQueries,
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: invalidateQueries,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: invalidateQueries,
  });

  return {
    markAsRead: markReadMutation.mutate,
    markAllAsRead: markAllReadMutation.mutate,
    deleteNotification: deleteMutation.mutate,
    isMarkingRead: markReadMutation.isPending,
    isMarkingAllRead: markAllReadMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
