import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATION_CONFIG } from '../constants';
import type { AppNotification } from '../types';

interface NotificationItemProps {
  notification: AppNotification;
  onMarkAsRead: (id: string) => void;
  onCloseDropdown?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead,
  onCloseDropdown
}) => {
  const navigate = useNavigate();
  const config = NOTIFICATION_CONFIG[notification.type] || NOTIFICATION_CONFIG.system;
  const Icon = config.icon;
  const isUnread = notification.status === 'unread';

  const handleClick = () => {
    if (isUnread) {
      onMarkAsRead(notification._id);
    }
    
    if (notification.targetPath) {
      navigate(notification.targetPath);
      if (onCloseDropdown) {
        onCloseDropdown();
      }
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`group relative flex cursor-pointer gap-4 p-4 transition-colors hover:bg-background-muted/50 ${
        isUnread ? 'bg-primary/5' : 'bg-transparent'
      }`}
    >
      <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-${config.color}/10 text-${config.color}`}>
        <Icon size={18} />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-medium ${isUnread ? 'text-text-primary' : 'text-text-secondary'}`}>
            {notification.title}
          </p>
          <span className="shrink-0 text-xs text-text-muted">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: vi })}
          </span>
        </div>
        <p className={`text-xs line-clamp-2 ${isUnread ? 'text-text-secondary font-medium' : 'text-text-muted'}`}>
          {notification.description}
        </p>
      </div>

      {isUnread && (
        <div className="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
      )}
    </div>
  );
};
