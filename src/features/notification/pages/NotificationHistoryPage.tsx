import React, { useState, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { useNotificationActions } from '../hooks/useNotificationActions';
import { getSettings, updateSettings } from '../services';
import { NotificationHistoryTable } from '../components/NotificationHistoryTable';
import { NotificationSettings } from '../components/NotificationSettings';
import type { NotificationType, NotificationQueryParams } from '../types';
import { Button } from '../../../shared/ui/Button';
import { Check, Download, RefreshCw } from 'lucide-react';
import { Skeleton } from '../../../shared/ui/Skeleton';

export const NotificationHistoryPage: React.FC = () => {
  const [params, setParams] = useState<NotificationQueryParams>({ page: 1, limit: 20 });
  const [mutedTypes, setMutedTypes] = useState<NotificationType[]>([]);
  const [view, setView] = useState<'history' | 'settings'>('history');
  
  const { notifications, isLoading, total, refetch } = useNotifications(params);
  const { markAsRead, markAllAsRead, deleteNotification, isMarkingAllRead } = useNotificationActions();

  useEffect(() => {
    getSettings().then(res => setMutedTypes(res.muteTypes));
  }, []);

  const handleToggleMute = async (type: NotificationType) => {
    const newMuted = mutedTypes.includes(type)
      ? mutedTypes.filter(t => t !== type)
      : [...mutedTypes, type];
    
    setMutedTypes(newMuted);
    await updateSettings({ muteTypes: newMuted });
  };

  const handleExport = () => {
    // Basic CSV export
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Type,Title,Status,CreatedAt\n"
      + notifications.map(n => `${n.type},"${n.title}",${n.status},${n.createdAt}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "notifications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Trung tâm thông báo</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Quản lý tất cả thông báo hệ thống và tương tác người dùng
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {view === 'history' && (
            <>
              <Button variant="secondary" className="gap-2" onClick={() => refetch()}>
                <RefreshCw size={16} /> Làm mới
              </Button>
              <Button variant="secondary" className="gap-2" onClick={handleExport}>
                <Download size={16} /> Xuất CSV
              </Button>
              <Button 
                variant="primary" 
                className="gap-2" 
                onClick={() => markAllAsRead()}
                isLoading={isMarkingAllRead}
              >
                <Check size={16} /> Đánh dấu tất cả đã đọc
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[#262626] pb-px">
        <button
          onClick={() => setView('history')}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            view === 'history' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          Lịch sử thông báo
        </button>
        <button
          onClick={() => setView('settings')}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            view === 'settings' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          Cài đặt
        </button>
      </div>

      {/* Content */}
      {view === 'history' && (
        <div className="space-y-4">
          <div className="flex gap-2">
             <select 
               className="rounded-lg border border-[#262626] bg-[#171717] px-4 py-2 text-sm text-white outline-none focus:border-primary"
               value={params.type || 'all'}
               onChange={(e) => setParams({ ...params, type: e.target.value as NotificationType | 'all', page: 1 })}
             >
               <option value="all">Tất cả loại</option>
               <option value="report">Báo cáo</option>
               <option value="system">Hệ thống</option>
               <option value="user_action">Người dùng</option>
               <option value="broadcast">Chung</option>
             </select>

             <select 
               className="rounded-lg border border-[#262626] bg-[#171717] px-4 py-2 text-sm text-white outline-none focus:border-primary"
               value={params.unread ? 'unread' : 'all'}
               onChange={(e) => setParams({ ...params, unread: e.target.value === 'unread' ? true : undefined, page: 1 })}
             >
               <option value="all">Tất cả trạng thái</option>
               <option value="unread">Chưa đọc</option>
             </select>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-16 w-full rounded-2xl" />)}
            </div>
          ) : (
            <NotificationHistoryTable 
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          )}

          {/* Pagination */}
          {total > (params.limit || 20) && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="secondary" 
                onClick={() => setParams({ ...params, page: (params.page || 1) + 1 })}
              >
                Tải thêm
              </Button>
            </div>
          )}
        </div>
      )}

      {view === 'settings' && (
        <div className="max-w-2xl">
          <NotificationSettings mutedTypes={mutedTypes} onToggleMute={handleToggleMute} />
        </div>
      )}
    </div>
  );
};
