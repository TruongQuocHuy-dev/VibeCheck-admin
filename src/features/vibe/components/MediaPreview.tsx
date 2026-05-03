import type { Vibe } from '../types';

interface MediaPreviewProps {
  vibe: Vibe;
  onClose: () => void;
}

export function MediaPreview({ vibe, onClose }: MediaPreviewProps) {
  const media = vibe.media[0]; // Chỉ xem file đầu tiên để demo, có thể mở rộng slider sau

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:rotate-90"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative flex max-h-[90vh] max-w-[90vw] flex-col overflow-hidden rounded-3xl border border-[#262626] bg-[#0d0d0d] shadow-2xl">
        <div className="flex-1 overflow-hidden bg-black flex items-center justify-center min-h-[300px]">
          {media.type === 'image' ? (
            <img 
              src={media.url} 
              className="max-h-full max-w-full object-contain"
              alt=""
            />
          ) : (
            <video 
              src={media.url} 
              controls 
              autoPlay 
              className="max-h-full max-w-full"
            />
          )}
        </div>

        <div className="p-6 bg-background-card">
          <div className="flex items-center gap-4 mb-4">
            <img src={vibe.user.avatar} className="h-10 w-10 rounded-full border border-[#262626]" alt="" />
            <div>
              <p className="font-semibold text-text-primary">{vibe.user.fullName || vibe.user.displayName}</p>
              <p className="text-xs text-text-muted">{new Date(vibe.createdAt).toLocaleString('vi-VN')}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary whitespace-pre-wrap">
            {vibe.caption || 'No caption provided.'}
          </p>

          {vibe.reports.length > 0 && (
            <div className="mt-6 rounded-2xl bg-status-banned/10 p-4 border border-status-banned/20">
              <p className="text-xs font-bold uppercase tracking-wider text-status-banned mb-2">Báo cáo vi phạm ({vibe.reports.length})</p>
              <div className="space-y-3 max-h-[150px] overflow-y-auto custom-scrollbar">
                {vibe.reports.map((report) => (
                  <div key={report._id} className="text-xs">
                    <span className="font-semibold text-text-primary">@{report.user.displayName}: </span>
                    <span className="text-text-secondary">{report.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
