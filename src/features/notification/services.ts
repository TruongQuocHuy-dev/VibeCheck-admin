import { api } from '../../shared/lib/api';
import type { AppNotification, NotificationQueryParams, NotificationResponse, NotificationSettings } from './types';

// Mock data generator
const generateMockNotifications = (count: number): AppNotification[] => {
  const types: AppNotification['type'][] = ['report', 'system', 'user_action', 'broadcast'];
  return Array.from({ length: count }).map((_, i) => ({
    _id: `notif_${Date.now()}_${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    title: `Thông báo ${i + 1}`,
    description: 'Chi tiết thông báo giả lập cho admin panel.',
    status: Math.random() > 0.5 ? 'unread' : 'read',
    targetPath: '/admin',
    createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
  }));
};

let MOCK_NOTIFICATIONS = generateMockNotifications(30);

export const fetchNotifications = async (params: NotificationQueryParams): Promise<NotificationResponse> => {
  // TODO: Implement actual API call
  // const { data } = await api.get<NotificationResponse>('/admin/notifications', { params });
  // return data;

  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  let filtered = [...MOCK_NOTIFICATIONS];
  
  if (params.unread) {
    filtered = filtered.filter(n => n.status === 'unread');
  }
  if (params.type && params.type !== 'all') {
    filtered = filtered.filter(n => n.type === params.type);
  }

  // Sort descending by date
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const page = params.page || 1;
  const limit = params.limit || 20;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    status: 'success',
    message: 'Notifications fetched',
    data: {
      notifications: paginated,
      total: filtered.length,
      unreadCount: MOCK_NOTIFICATIONS.filter(n => n.status === 'unread').length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    }
  };
};

export const markAsRead = async (id: string): Promise<void> => {
  // TODO: Implement actual API call
  // await api.patch(`/admin/notifications/${id}/read`);
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = MOCK_NOTIFICATIONS.findIndex(n => n._id === id);
  if (index !== -1) {
    MOCK_NOTIFICATIONS[index].status = 'read';
  }
};

export const markAllAsRead = async (): Promise<void> => {
  // TODO: Implement actual API call
  // await api.patch('/admin/notifications/mark-all-read');
  await new Promise(resolve => setTimeout(resolve, 500));
  MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(n => ({ ...n, status: 'read' }));
};

export const deleteNotification = async (id: string): Promise<void> => {
  // TODO: Implement actual API call
  // await api.delete(`/admin/notifications/${id}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.filter(n => n._id !== id);
};

export const getSettings = async (): Promise<NotificationSettings> => {
  // TODO: Implement actual API call
  // const { data } = await api.get('/admin/notifications/settings');
  // return data.data;
  await new Promise(resolve => setTimeout(resolve, 300));
  return { muteTypes: [] };
};

export const updateSettings = async (settings: Partial<NotificationSettings>): Promise<void> => {
  // TODO: Implement actual API call
  // await api.patch('/admin/notifications/settings', settings);
  await new Promise(resolve => setTimeout(resolve, 500));
};
