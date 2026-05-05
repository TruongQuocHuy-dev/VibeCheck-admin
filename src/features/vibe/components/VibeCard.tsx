import { ReportBadge } from './ReportBadge';
import type { Vibe } from '../types';

interface VibeCardProps {
  vibe: Vibe;
  onPreview: (vibe: Vibe) => void;
  onAction: (vibe: Vibe, action: 'hide' | 'delete' | 'reports') => void;
}

export function VibeCard({ vibe, onPreview, onAction }: VibeCardProps) {
  const thumbnail = vibe.media?.[0]?.url || 'https://via.placeholder.com/300?text=No+Media';
  const isVideo = vibe.media?.[0]?.type === 'video';

  return (
    <div className={`group relative overflow-hidden rounded-2xl border bg-background-card transition-all duration-300 hover:shadow-2xl ${
      (vibe.reports?.length || 0) > 0 ? 'border-status-banned/50 shadow-status-banned/10' : 'border-[#262626]'
    }`}>
      {/* Media Thumbnail */}
      <div 
        className="relative aspect-square cursor-pointer overflow-hidden"
        onClick={() => onPreview(vibe)}
      >
        <img 
          src={thumbnail} 
          alt={vibe.caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <svg className="h-10 w-10 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Quick Actions on Hover */}
        <div className="absolute bottom-3 left-3 right-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button 
            onClick={(e) => { e.stopPropagation(); onAction(vibe, 'hide'); }}
            className="flex-1 rounded-lg bg-white/10 px-2 py-1.5 text-[10px] font-bold uppercase text-white backdrop-blur-md hover:bg-white/20"
          >
            Ẩn
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAction(vibe, 'delete'); }}
            className="flex-1 rounded-lg bg-status-banned/80 px-2 py-1.5 text-[10px] font-bold uppercase text-white backdrop-blur-md hover:bg-status-banned"
          >
            Xóa
          </button>
        </div>
      </div>

      <ReportBadge count={vibe.reports?.length || 0} />

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <img 
            src={vibe.user?.avatar || 'https://via.placeholder.com/32'} 
            className="h-6 w-6 rounded-full border border-[#262626]"
            alt=""
          />
          <span className="text-xs font-semibold text-text-primary truncate">
            {vibe.user?.fullName || vibe.user?.displayName || 'Unknown User'}
          </span>
          <span className="ml-auto text-[10px] text-text-muted">
            {new Date(vibe.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-text-secondary">
          {vibe.caption || 'No caption'}
        </p>
      </div>
    </div>
  );
}
