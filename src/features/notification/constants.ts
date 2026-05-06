import { Flag, ShieldAlert, UserX, Radio } from 'lucide-react';
import type { NotificationType } from './types';

export const NOTIFICATION_CONFIG: Record<NotificationType, {
  color: string;
  icon: any;
  label: string;
}> = {
  report: {
    color: 'status-reported', // #F97316 (orange)
    icon: Flag,
    label: 'Báo cáo vi phạm',
  },
  user_action: {
    color: 'primary', // #7C3AED (purple)
    icon: UserX,
    label: 'Hành động người dùng',
  },
  system: {
    color: 'text-secondary', // #A1A1AA (gray)
    icon: ShieldAlert,
    label: 'Hệ thống',
  },
  broadcast: {
    color: 'status-active', // #22C55E (green)
    icon: Radio,
    label: 'Thông báo chung',
  },
};

export const WEBSOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ADMIN_NEW_REPORT: 'admin:new_report',
  ADMIN_USER_BANNED: 'admin:user_banned',
  ADMIN_SYSTEM_ALERT: 'admin:system_alert',
  ADMIN_BROADCAST: 'admin:broadcast',
};
