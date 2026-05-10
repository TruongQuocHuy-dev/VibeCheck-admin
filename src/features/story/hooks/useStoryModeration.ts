import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from '../../notification/hooks/useSocket';
import { toast } from 'react-hot-toast';

export const useStoryModeration = () => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (_storyId: string, message: string) => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
      queryClient.invalidateQueries({ queryKey: ['story-stats'] });
      if (message) toast.success(message);
    };

    socket.on('story:deleted', (id: string) => handleUpdate(id, 'Một story đã bị xóa.'));
    socket.on('story:hidden', (id: string) => handleUpdate(id, 'Một story đã bị ẩn.'));
    socket.on('story:extended', (id: string) => handleUpdate(id, 'Thời gian story đã được kéo dài.'));
    socket.on('story:expired', (id: string) => handleUpdate(id, 'Một story vừa hết hạn.'));
    socket.on('story:reported', () => handleUpdate('', 'Phát hiện báo cáo story mới!'));

    return () => {
      socket.off('story:deleted');
      socket.off('story:hidden');
      socket.off('story:extended');
      socket.off('story:expired');
      socket.off('story:reported');
    };
  }, [socket, queryClient]);
};
