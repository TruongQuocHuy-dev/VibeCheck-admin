import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppVersions } from '../hooks/useAppVersions';
import { useBroadcast } from '../hooks/useBroadcast';
import { useMatchingConfig } from '../hooks/useMatchingConfig';
import { VersionTable } from '../components/VersionControl/VersionTable';
import { AddVersionDialog } from '../components/VersionControl/AddVersionDialog';
import { BroadcastForm } from '../components/Broadcast/BroadcastForm';
import { ConfigCard } from '../components/Matching/ConfigCard';
import { ConfigHistory } from '../components/Shared/ConfigHistory';
import type { AppVersion, BroadcastTarget, MatchingConfig } from '../types';
import { Button } from '../../../shared/ui/Button';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { Plus, Smartphone, Megaphone, Settings2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../../shared/hooks/useAuth';

export const SettingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'version';
  const { user } = useAuth();
  
  const { versions, isLoading: loadingVersions, addVersion, isAdding } = useAppVersions();
  const { send, isSending } = useBroadcast();
  const { config, isLoading: loadingConfig, updateConfig, isUpdating, history } = useMatchingConfig();

  const [showAddVersion, setShowAddVersion] = useState(false);

  const setTab = (tab: string) => {
    searchParams.set('tab', tab);
    setSearchParams(searchParams);
  };

  const isSuperAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Cài đặt hệ thống</h1>
          <p className="text-text-secondary text-sm mt-1">Cấu hình các tham số vận hành toàn hệ thống</p>
        </div>

        <div className="flex bg-[#171717] border border-[#262626] rounded-2xl p-1.5 shadow-inner">
          <button
            onClick={() => setTab('version')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
              currentTab === 'version' ? 'bg-[#262626] text-white shadow-lg border border-[#333]' : 'text-[#676767] hover:text-[#b4b4b4]'
            }`}
          >
            <Smartphone size={14} />
            App Version
          </button>
          <button
            onClick={() => setTab('broadcast')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
              currentTab === 'broadcast' ? 'bg-[#262626] text-white shadow-lg border border-[#333]' : 'text-[#676767] hover:text-[#b4b4b4]'
            }`}
          >
            <Megaphone size={14} />
            Broadcast
          </button>
          <button
            onClick={() => setTab('matching')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
              currentTab === 'matching' ? 'bg-[#262626] text-white shadow-lg border border-[#333]' : 'text-[#676767] hover:text-[#b4b4b4]'
            }`}
          >
            <Settings2 size={14} />
            Matching
          </button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {currentTab === 'version' && (
          <div className="space-y-6">
            {!isSuperAdmin && (
              <div className="bg-status-banned/10 border border-status-banned/20 rounded-2xl p-4 flex items-center gap-3 text-text-error">
                <ShieldAlert size={20} />
                <p className="text-sm font-medium">Bạn không có quyền quản lý App Version. Vui lòng liên hệ Super Admin.</p>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Quản lý phiên bản</h2>
                <p className="text-sm text-text-secondary">Kiểm soát các bản cập nhật trên App Store & Play Store</p>
              </div>
              {isSuperAdmin && (
                <Button variant="primary" className="gap-2" onClick={() => setShowAddVersion(true)}>
                  <Plus size={18} />
                  Thêm bản mới
                </Button>
              )}
            </div>

            {loadingVersions ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
              </div>
            ) : (
              <VersionTable 
                versions={versions} 
                onDelete={(id) => console.log('Delete', id)} 
                onEdit={(v) => console.log('Edit', v)} 
              />
            )}

            {showAddVersion && (
              <AddVersionDialog 
                onClose={() => setShowAddVersion(false)} 
                onSubmit={addVersion}
                isSubmitting={isAdding}
              />
            )}
          </div>
        )}

        {currentTab === 'broadcast' && (
          <div className="space-y-6">
             <div className="mb-4">
                <h2 className="text-xl font-bold text-text-primary">Gửi thông báo quảng bá</h2>
                <p className="text-sm text-text-secondary">Push notification đến toàn bộ hoặc nhóm người dùng mục tiêu</p>
              </div>
              <BroadcastForm onSend={send} isSending={isSending} />
          </div>
        )}

        {currentTab === 'matching' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {loadingConfig ? (
                <Skeleton className="h-[500px] w-full rounded-2xl" />
              ) : config ? (
                <ConfigCard 
                  config={config} 
                  onSave={updateConfig} 
                  isUpdating={isUpdating} 
                />
              ) : null}
            </div>
            <div className="lg:col-span-1">
               <ConfigHistory history={history} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
