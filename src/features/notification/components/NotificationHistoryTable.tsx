import React from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATION_CONFIG } from '../constants';
import type { AppNotification } from '../types';
import { Check, Trash2, ExternalLink } from 'lucide-react';

interface NotificationHistoryTableProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationHistoryTable: React.FC<NotificationHistoryTableProps> = ({
  notifications,
  onMarkAsRead,
  onDelete
}) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-3xl border border-[#262626] bg-[#0d0d0d]/50 shadow-2xl backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#262626] bg-[#171717]/50 text-[10px] font-bold uppercase tracking-[0.2em] text-[#676767]">
            <th className="px-6 py-5">Loại</th>
            <th className="px-6 py-5">Nội dung</th>
            <th className="px-6 py-5">Thời gian</th>
            <th className="px-6 py-5">Trạng thái</th>
            <th className="px-6 py-5 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#262626]">
          {notifications.map((notif) => {
            const config = NOTIFICATION_CONFIG[notif.type] || NOTIFICATION_CONFIG.system;
            const Icon = config.icon;
            const isUnread = notif.status === 'unread';

            return (
              <tr 
                key={notif._id} 
                className={`group transition-all duration-200 hover:bg-[#171717]/80 ${isUnread ? 'bg-primary/5' : ''}`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${config.color}/10 text-${config.color}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-xs font-semibold text-text-secondary">{config.label}</span>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-md">
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isUnread ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-text-muted line-clamp-1">{notif.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-[11px] font-mono text-text-muted">
                  {format(new Date(notif.createdAt), 'HH:mm dd/MM/yyyy', { locale: vi })}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    isUnread ? 'bg-primary/20 text-primary' : 'bg-[#262626] text-text-muted'
                  }`}>
                    {isUnread ? 'Chưa đọc' : 'Đã đọc'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {notif.targetPath && (
                      <button 
                        onClick={() => navigate(notif.targetPath!)}
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="Đi đến liên kết"
                      >
                        <ExternalLink size={16} />
                      </button>
                    )}
                    {isUnread && (
                      <button 
                        onClick={() => onMarkAsRead(notif._id)}
                        className="p-1.5 text-text-secondary hover:text-status-active hover:bg-status-active/10 rounded-lg transition-all"
                        title="Đánh dấu đã đọc"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => onDelete(notif._id)}
                      className="p-1.5 text-text-secondary hover:text-status-banned hover:bg-status-banned/10 rounded-lg transition-all"
                      title="Xóa thông báo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {notifications.length === 0 && (
        <div className="p-12 text-center text-text-muted">
          Không có thông báo nào phù hợp.
        </div>
      )}
    </div>
  );
};
