import { useMutation } from '@tanstack/react-query';
import { sendBroadcast } from '../services';

export const useBroadcast = () => {
  const broadcastMutation = useMutation({
    mutationFn: sendBroadcast,
  });

  return {
    send: broadcastMutation.mutateAsync,
    isSending: broadcastMutation.isPending,
    isSuccess: broadcastMutation.isSuccess,
    error: broadcastMutation.error,
  };
};
