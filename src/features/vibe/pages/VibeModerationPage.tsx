import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVibes } from '../hooks/useVibes';
import { useModerateVibe } from '../hooks/useModerateVibe';
import { VibeGrid } from '../components/VibeGrid';
import { MediaPreview } from '../components/MediaPreview';
import type { Vibe, VibeStatus } from '../types';

export function VibeModerationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [previewVibe, setPreviewVibe] = useState<Vibe | null>(null);

  const status = (searchParams.get('status') || 'all') as VibeStatus | 'all' | 'reported';
  const page = Number(searchParams.get('page') || '1');

  const { data, isLoading } = useVibes({ status, page, limit: 12 });
  const { hideVibe, deleteVibe } = useModerateVibe();

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

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Kiểm duyệt nội dung</h1>
          <p className="mt-2 text-text-secondary">Quản lý các bài đăng (Vibes) trong hệ thống.</p>
        </div>

        <div className="flex rounded-xl bg-[#171717] p-1">
          {['all', 'reported', 'hidden'].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                status === s 
                  ? 'bg-[#262626] text-white shadow-lg' 
                  : 'text-[#676767] hover:text-[#b4b4b4]'
              }`}
            >
              {s === 'all' ? 'Tất cả' : s === 'reported' ? 'Bị báo cáo' : 'Đã ẩn'}
            </button>
          ))}
        </div>
      </div>

      <VibeGrid 
        vibes={data?.vibes || []} 
        isLoading={isLoading} 
        onPreview={setPreviewVibe}
        onAction={handleAction}
      />

      {/* Pagination Simple */}
      {(data?.totalPages || 0) > 1 && (
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
