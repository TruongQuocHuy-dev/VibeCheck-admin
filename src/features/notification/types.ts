export type NotificationType = 'report' | 'system' | 'user_action' | 'broadcast';
export type NotificationStatus = 'unread' | 'read';

export interface AppNotification {
  _id: string;
  type: NotificationType;
  title: string;
  description: string;
  status: NotificationStatus;
  targetId?: string; // ID of the report, user, etc.
  targetPath?: string; // e.g. /admin/reports/123
  createdAt: string;
}

export interface NotificationQueryParams {
  page?: number;
  limit?: number;
  unread?: boolean;
  type?: NotificationType | 'all';
}

export interface NotificationResponse {
  status: string;
  message: string;
  data: {
    notifications: AppNotification[];
    total: number;
    unreadCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface NotificationSettings {
  muteTypes: NotificationType[];
}
