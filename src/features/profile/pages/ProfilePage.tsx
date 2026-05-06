import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { ProfileHeader } from '../components/ProfileHeader';
import { EditProfileForm } from '../components/EditProfileForm';
import { ChangePasswordForm } from '../components/ChangePasswordForm';
import { SecuritySettings } from '../components/SecuritySettings';
import { PersonalActivityLog } from '../components/PersonalActivityLog';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { User, Shield, History } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { data: profile, isLoading } = useProfile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'activity'>('info');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'security' || tab === 'activity' || tab === 'info') {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'info' | 'security' | 'activity') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-96 w-full lg:col-span-2 rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!profile) return <div>Error loading profile</div>;

  return (
    <div className="space-y-8 pb-20">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Tài khoản của tôi</h1>
        <p className="mt-2 text-text-secondary">Quản lý thông tin cá nhân và cài đặt bảo mật hệ thống</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#262626] pb-px overflow-x-auto no-scrollbar">
        {[
          { id: 'info', label: 'Thông tin cá nhân', icon: User },
          { id: 'security', label: 'Bảo mật & Phiên', icon: Shield },
          { id: 'activity', label: 'Nhật ký hoạt động', icon: History },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as any)}
            className={`flex items-center gap-2.5 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-primary text-primary bg-primary/5' 
                : 'border-transparent text-[#676767] hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Sticky info) */}
        <div className="lg:col-span-4 space-y-8">
          <ProfileHeader profile={profile} />
          {activeTab !== 'security' && <SecuritySettings />}
        </div>

        {/* Right Column (Dynamic content based on tab) */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'info' && (
            <>
              <EditProfileForm profile={profile} />
              <ChangePasswordForm />
            </>
          )}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <SecuritySettings />
              <ChangePasswordForm />
            </div>
          )}
          {activeTab === 'activity' && <PersonalActivityLog />}
        </div>
      </div>
    </div>
  );
};
