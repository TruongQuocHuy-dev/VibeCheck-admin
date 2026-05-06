import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications } from '../services';
import { useSocket } from './useSocket';
import { WEBSOCKET_EVENTS } from '../constants';
import type { AppNotification, NotificationQueryParams, NotificationResponse } from '../types';

export const useNotifications = (params: NotificationQueryParams) => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  const queryKey = ['admin-notifications', params];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchNotifications(params),
    staleTime: 60000, // 1 minute
  });

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification: AppNotification) => {
      // Optimistically update the cache
      queryClient.setQueryData<NotificationResponse>(queryKey, (oldData) => {
        if (!oldData) return oldData;

        // If filtering by type and the new notification doesn't match, ignore
        if (params.type && params.type !== 'all' && params.type !== notification.type) {
          return oldData;
        }

        // If filtering by unread and the new notification isn't unread, ignore
        if (params.unread && notification.status !== 'unread') {
          return oldData;
        }

        const newNotifications = [notification, ...oldData.data.notifications];
        // Keep list size reasonable if paginated
        if (newNotifications.length > oldData.data.limit) {
          newNotifications.pop();
        }

        return {
          ...oldData,
          data: {
            ...oldData.data,
            notifications: newNotifications,
            total: oldData.data.total + 1,
            unreadCount: oldData.data.unreadCount + (notification.status === 'unread' ? 1 : 0),
          },
        };
      });

      // Also update the 'all' unread count query if we are currently looking at a filtered view
      // This ensures the bell icon is always accurate if it relies on a separate global query
      queryClient.invalidateQueries({ queryKey: ['admin-notifications'] });
    };

    socket.on(WEBSOCKET_EVENTS.ADMIN_NEW_REPORT, handleNewNotification);
    socket.on(WEBSOCKET_EVENTS.ADMIN_USER_BANNED, handleNewNotification);
    socket.on(WEBSOCKET_EVENTS.ADMIN_SYSTEM_ALERT, handleNewNotification);
    socket.on(WEBSOCKET_EVENTS.ADMIN_BROADCAST, handleNewNotification);

    return () => {
      socket.off(WEBSOCKET_EVENTS.ADMIN_NEW_REPORT, handleNewNotification);
      socket.off(WEBSOCKET_EVENTS.ADMIN_USER_BANNED, handleNewNotification);
      socket.off(WEBSOCKET_EVENTS.ADMIN_SYSTEM_ALERT, handleNewNotification);
      socket.off(WEBSOCKET_EVENTS.ADMIN_BROADCAST, handleNewNotification);
    };
  }, [socket, queryClient, queryKey, params]);

  return {
    ...query,
    notifications: query.data?.data.notifications || [],
    unreadCount: query.data?.data.unreadCount || 0,
    total: query.data?.data.total || 0,
    totalPages: query.data?.data.totalPages || 0,
  };
};
