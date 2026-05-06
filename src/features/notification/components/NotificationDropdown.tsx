import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Check, BellOff, ArrowRight } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from '../hooks/useNotifications';
import { useNotificationActions } from '../hooks/useNotificationActions';
import { Skeleton } from '../../../shared/ui/Skeleton';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose, anchorRef }) => {
  const [activeTab, setActiveTab] = useState<'unread' | 'all'>('unread');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { notifications, isLoading, unreadCount } = useNotifications({
    limit: 20,
    unread: activeTab === 'unread' ? true : undefined,
  });

  const { markAsRead, markAllAsRead, isMarkingAllRead } = useNotificationActions();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate position relative to anchor
  let top = 60;
  let right = 24;
  if (anchorRef.current) {
    const rect = anchorRef.current.getBoundingClientRect();
    top = rect.bottom + 8;
    right = window.innerWidth - rect.right;
  }

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleViewAll = () => {
    navigate('/admin/notifications');
    onClose();
  };

  const content = (
    <div 
      ref={dropdownRef}
      style={{ top, right }}
      className="fixed z-[100] w-[380px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-[#262626] bg-[#121212] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
      role="dialog"
      aria-label="Notifications"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#262626] p-4 bg-[#0d0d0d]">
        <h3 className="text-lg font-bold text-text-primary">Thông báo</h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              disabled={isMarkingAllRead}
              className="flex items-center gap-1.5 rounded-lg p-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              <Check size={14} />
              Đánh dấu đã đọc
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#262626] px-4">
        <button
          onClick={() => setActiveTab('unread')}
          className={`relative border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'unread' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Chưa đọc
          {unreadCount > 0 && (
            <span className="ml-1.5 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`relative border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Tất cả
        </button>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-[#262626]">
            {notifications.map((notif) => (
              <NotificationItem 
                key={notif._id} 
                notification={notif} 
                onMarkAsRead={markAsRead}
                onCloseDropdown={onClose}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-3 rounded-full bg-[#171717] p-3 text-text-muted">
              <BellOff size={24} />
            </div>
            <p className="text-sm font-medium text-text-primary">Không có thông báo nào</p>
            <p className="text-xs text-text-secondary mt-1">
              Bạn đã xem hết tất cả thông báo {activeTab === 'unread' ? 'mới' : ''}.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#262626] bg-[#0d0d0d] p-2">
        <button 
          onClick={handleViewAll}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-text-primary transition-colors hover:bg-[#171717]"
        >
          Xem tất cả lịch sử
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
