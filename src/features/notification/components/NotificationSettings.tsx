import React from 'react';
import { NOTIFICATION_CONFIG } from '../constants';
import type { NotificationType } from '../types';

interface NotificationSettingsProps {
  mutedTypes: NotificationType[];
  onToggleMute: (type: NotificationType) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ mutedTypes, onToggleMute }) => {
  const types: NotificationType[] = ['report', 'user_action', 'system', 'broadcast'];

  return (
    <div className="rounded-3xl border border-[#262626] bg-[#0d0d0d]/50 p-6 shadow-2xl backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-bold text-text-primary">Tùy chỉnh thông báo</h3>
      <p className="mb-6 text-sm text-text-secondary">
        Chọn các loại thông báo bạn muốn nhận. Các thông báo bị tắt sẽ không hiển thị trên chuông báo, nhưng vẫn được lưu trong lịch sử.
      </p>

      <div className="space-y-4">
        {types.map((type) => {
          const config = NOTIFICATION_CONFIG[type];
          const Icon = config.icon;
          const isMuted = mutedTypes.includes(type);

          return (
            <div key={type} className="flex items-center justify-between rounded-xl bg-[#171717] p-4 border border-[#262626]">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${config.color}/10 text-${config.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{config.label}</p>
                  <p className="text-xs text-text-muted">Nhận thông báo push cho sự kiện này</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button 
                onClick={() => onToggleMute(type)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  !isMuted ? 'bg-primary' : 'bg-[#262626]'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  !isMuted ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
