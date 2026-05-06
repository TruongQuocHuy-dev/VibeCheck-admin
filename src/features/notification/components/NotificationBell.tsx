import React, { useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationDropdown } from './NotificationDropdown';

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const { unreadCount } = useNotifications({ limit: 1 }); // Just to get the count quickly

  const displayCount = unreadCount > 99 ? '99+' : unreadCount;

  return (
    <>
      <button 
        ref={bellRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
          isOpen ? 'bg-[#262626] text-white' : 'text-[#b4b4b4] hover:bg-[#171717] hover:text-white'
        }`}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-status-banned px-1 text-[9px] font-bold text-white border-2 border-[#0d0d0d] animate-in zoom-in">
            {displayCount}
          </span>
        )}
      </button>

      <NotificationDropdown 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        anchorRef={bellRef} 
      />
    </>
  );
};
