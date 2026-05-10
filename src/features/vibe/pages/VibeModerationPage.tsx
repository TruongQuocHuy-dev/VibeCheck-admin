import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVibes } from '../hooks/useVibes';
import { useModerateVibe, useApproveVibe, useRejectVibe } from '../hooks/useModerateVibe';
import { VibeGrid } from '../components/VibeGrid';
import { VibeCardViewer } from '../components/VibeCardViewer';
import { MediaPreview } from '../components/MediaPreview';
import type { Vibe, VibeStatus } from '../types';

export function VibeModerationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [previewVibe, setPreviewVibe] = useState<Vibe | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');

  const status = (searchParams.get('status') || 'pending') as VibeStatus | 'all' | 'reported' | 'pending';
  const page = Number(searchParams.get('page') || '1');

  const { data, isLoading } = useVibes({ status, page, limit: viewMode === 'card' ? 20 : 12 });
  const { hideVibe, deleteVibe } = useModerateVibe();
  const approveVibe = useApproveVibe();
  const rejectVibe = useRejectVibe();

  const handleStatusChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('status', newStatus);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleAction = async (vibe: Vibe, action: 'hide' | 'delete' | 'reports') => {
    if (action === 'hide') {
      if (window.confirm('Bạn có chắc chắn muốn ẩn vibe này khỏi feed?')) {
        await hideVibe.mutateAsync(vibe._id);
      }
    } else if (action === 'delete') {
      if (window.confirm('Xóa vĩnh viễn vibe này? Hành động này không thể hoàn tác.')) {
        await deleteVibe.mutateAsync(vibe._id);
      }
    } else if (action === 'reports') {
      setPreviewVibe(vibe); // Show preview which includes reports
    }
  };

  const handleApprove = async (id: string) => {
    await approveVibe.mutateAsync(id);
  };

  const handleReject = async (id: string, reason?: string) => {
    await rejectVibe.mutateAsync({ id, reason });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Kiểm duyệt nội dung</h1>
          <p className="mt-2 text-text-secondary">Quản lý các bài đăng (Vibes) trong hệ thống.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* View Toggle */}
          <div className="flex rounded-xl bg-[#171717] p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === 'card' ? 'bg-primary text-white shadow-lg' : 'text-[#676767] hover:text-[#b4b4b4]'
              }`}
            >
              🎴 Card View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === 'grid' ? 'bg-[#262626] text-white shadow-lg' : 'text-[#676767] hover:text-[#b4b4b4]'
              }`}
            >
              📊 Grid View
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex rounded-xl bg-[#171717] p-1">
          {['pending', 'all', 'reported', 'hidden'].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                status === s 
                  ? 'bg-[#262626] text-white shadow-lg' 
                  : 'text-[#676767] hover:text-[#b4b4b4]'
              }`}
            >
              {s === 'pending' ? 'Chờ duyệt' : s === 'all' ? 'Tất cả' : s === 'reported' ? 'Bị báo cáo' : 'Đã ẩn'}
            </button>
          ))}
          </div>
        </div>
      </div>

      {isLoading && viewMode === 'card' ? (
        <div className="flex h-[600px] w-full items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#262626] border-t-primary" />
        </div>
      ) : viewMode === 'card' ? (
        <VibeCardViewer 
          vibes={data?.vibes || []} 
          onApprove={handleApprove} 
          onReject={handleReject} 
        />
      ) : (
        <VibeGrid 
          vibes={data?.vibes || []} 
          isLoading={isLoading} 
          onPreview={setPreviewVibe}
          onAction={handleAction}
        />
      )}

      {/* Pagination Simple - only for grid view to avoid confusion with swipe cards */}
      {viewMode === 'grid' && (data?.totalPages || 0) > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          <button
            disabled={page <= 1}
            onClick={() => {
              const p = new URLSearchParams(searchParams);
              p.set('page', String(page - 1));
              setSearchParams(p);
            }}
            className="rounded-xl border border-[#262626] px-4 py-2 text-sm font-medium disabled:opacity-30"
          >
            Trước
          </button>
          <span className="flex items-center px-4 text-sm font-medium text-text-muted">
            Trang {page} / {data?.totalPages}
          </span>
          <button
            disabled={page >= (data?.totalPages || 0)}
            onClick={() => {
              const p = new URLSearchParams(searchParams);
              p.set('page', String(page + 1));
              setSearchParams(p);
            }}
            className="rounded-xl border border-[#262626] px-4 py-2 text-sm font-medium disabled:opacity-30"
          >
            Sau
          </button>
        </div>
      )}

      {previewVibe && (
        <MediaPreview 
          vibe={previewVibe} 
          onClose={() => setPreviewVibe(null)} 
        />
      )}
    </div>
  );
}
