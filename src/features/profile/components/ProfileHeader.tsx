import React from 'react';
import type { AdminProfile } from '../types';
import { Shield, BadgeCheck, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ProfileHeaderProps {
  profile: AdminProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="bg-background-card border border-background-muted rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 p-1 group-hover:border-primary/40 transition-all">
            {profile.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={profile.fullName} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary uppercase">
                {profile.fullName.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-status-active border-4 border-[#121212] flex items-center justify-center" title="Đang hoạt động">
            <BadgeCheck size={14} className="text-white" />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h1 className="text-2xl font-bold text-text-primary flex items-center justify-center gap-2">
            {profile.fullName}
            {profile.role === 'admin' && (
              <span title="Quản trị viên">
                <Shield size={18} className="text-primary" />
              </span>
            )}
          </h1>
          <p className="text-text-secondary font-medium tracking-wide uppercase text-xs">
            {profile.role === 'admin' ? 'Quản trị viên hệ thống' : 'Kiểm duyệt viên'}
          </p>
          <p className="text-text-muted text-sm">{profile.email}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 w-full pt-8 border-t border-[#262626]">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest text-[#676767] font-bold mb-1">Ngày tham gia</span>
            <span className="text-xs font-medium text-text-secondary">
              {format(new Date(profile.createdAt), 'dd MMMM, yyyy', { locale: vi })}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest text-[#676767] font-bold mb-1">Đăng nhập cuối</span>
            <span className="text-xs font-medium text-text-secondary flex items-center gap-1.5">
              <Clock size={12} />
              {profile.lastLogin ? format(new Date(profile.lastLogin.time), 'HH:mm dd/MM', { locale: vi }) : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
