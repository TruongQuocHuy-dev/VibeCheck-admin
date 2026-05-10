import { useEffect } from 'react';
import type { Story } from '../types';

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onDelete: (id: string) => void;
  onHide: (id: string) => void;
  onExtend: (id: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function StoryViewer({ story, onClose, onDelete, onHide, onExtend, onNext, onPrev }: StoryViewerProps) {
  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight': onNext?.(); break;
        case 'ArrowLeft': onPrev?.(); break;
        case 'Delete': 
        case 'Backspace': onDelete(story._id); break;
        case 'h': 
        case 'H': onHide(story._id); break;
        case 'e': 
        case 'E': onExtend(story._id); break;
        case 'Escape': onClose(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [story._id, onNext, onPrev, onDelete, onHide, onExtend, onClose]);

  // Calculate progress percentage
  const createdAt = new Date(story.createdAt).getTime();
  const expiresAt = new Date(story.expiresAt).getTime();
  const now = Date.now();
  const total = expiresAt - createdAt;
  const elapsed = now - createdAt;
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      {/* Navigation Buttons */}
      <button onClick={onPrev} className="absolute left-8 hidden lg:flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={onNext} className="absolute right-8 hidden lg:flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <button onClick={onClose} className="absolute top-6 right-6 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <div className="relative flex h-[90vh] w-full max-w-[450px] flex-col overflow-hidden rounded-[3rem] border border-[#262626] bg-black shadow-2xl">
        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex gap-1.5">
           <div className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden">
             <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }} />
           </div>
        </div>

        <div className="absolute top-8 left-6 z-20 flex items-center gap-3">
          <img src={story.user?.avatar || 'https://via.placeholder.com/40'} className="h-10 w-10 rounded-full border-2 border-white/20" alt="" />
          <div>
            <p className="text-sm font-bold text-white leading-tight">{story.user?.displayName || 'Unknown User'}</p>
            <p className="text-[10px] text-white/50">{story.remainingTime} còn lại</p>
          </div>
        </div>

        <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center">
          {story.mediaType === 'image' ? (
            <img src={story.mediaUrl} className="h-full w-full object-contain" alt="" />
          ) : story.mediaType === 'video' ? (
            <video src={story.mediaUrl} autoPlay loop muted playsInline className="h-full w-full object-contain" />
          ) : (
            <div className="p-10 text-center text-xl text-white italic">"{story.caption}"</div>
          )}
        </div>

        <div className="bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-12">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button onClick={() => onExtend(story._id)} className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-3 text-primary transition-all hover:bg-primary/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-[10px] font-bold">+24h</span>
            </button>
            <button onClick={() => onHide(story._id)} className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-3 text-white transition-all hover:bg-white/10">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
              <span className="text-[10px] font-bold">Ẩn</span>
            </button>
            <button onClick={() => onDelete(story._id)} className="flex flex-col items-center gap-2 rounded-2xl bg-status-banned/10 p-3 text-status-banned transition-all hover:bg-status-banned/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              <span className="text-[10px] font-bold">Xóa</span>
            </button>
          </div>

          <div className="space-y-3">
             <div className="flex items-center justify-between text-white/50 text-[10px] font-bold uppercase tracking-wider">
               <span>Báo cáo ({story.reports?.length || 0})</span>
               {story.location && <span>📍 {story.location.displayLabel}</span>}
             </div>
             <div className="max-h-[100px] overflow-y-auto custom-scrollbar space-y-2">
               {story.reports?.map((r) => (
                 <div key={r._id} className="rounded-lg bg-white/5 p-2 text-[11px] text-white/80">
                   <span className="font-bold text-primary">@{r.user?.displayName || 'user'}:</span> {r.reason}
                 </div>
               ))}
               {story.reports?.length === 0 && <p className="text-[11px] text-white/30 italic">Chưa có báo cáo nào.</p>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
