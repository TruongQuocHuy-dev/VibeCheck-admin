import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { hideVibe, unhideVibe, deleteVibe, bulkActionVibes } from '../services';
import { useSocket } from '../../notification/hooks/useSocket';

export const useModerateVibe = () => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleVibeUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ['vibes'] });
    };

    socket.on('vibe:hidden', handleVibeUpdate);
    socket.on('vibe:unhidden', handleVibeUpdate);
    socket.on('vibe:deleted', handleVibeUpdate);
    socket.on('vibe:reported', handleVibeUpdate);

    return () => {
      socket.off('vibe:hidden', handleVibeUpdate);
      socket.off('vibe:unhidden', handleVibeUpdate);
      socket.off('vibe:deleted', handleVibeUpdate);
      socket.off('vibe:reported', handleVibeUpdate);
    };
  }, [socket, queryClient]);

  const hideMutation = useMutation({
    mutationFn: (id: string) => hideVibe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vibes'] });
    },
  });

  const unhideMutation = useMutation({
    mutationFn: (id: string) => unhideVibe(id),
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

  const bulkMutation = useMutation({
    mutationFn: ({ ids, action }: { ids: string[]; action: 'hide' | 'delete' }) =>
      bulkActionVibes(ids, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vibes'] });
    },
  });

  return {
    hideVibe: hideMutation,
    unhideVibe: unhideMutation,
    deleteVibe: deleteMutation,
    bulkActionVibes: bulkMutation,
  };
};
