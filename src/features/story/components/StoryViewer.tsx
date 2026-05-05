import type { Story } from '../types';

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function StoryViewer({ story, onClose, onDelete }: StoryViewerProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative flex h-[90vh] w-full max-w-[450px] flex-col overflow-hidden rounded-[40px] border border-[#262626] bg-black shadow-2xl">
        {/* Progress Bar Placeholder */}
        <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
           <div className="h-1 flex-1 rounded-full bg-white/40 overflow-hidden">
             <div className="h-full w-1/2 bg-white" />
           </div>
        </div>

        <div className="absolute top-8 left-6 z-10 flex items-center gap-3">
          <img src={story.user?.avatar || 'https://via.placeholder.com/40'} className="h-10 w-10 rounded-full border-2 border-primary" alt="" />
          <div>
            <p className="text-sm font-bold text-white">{story.user?.displayName || 'Unknown User'}</p>
            <p className="text-[10px] text-white/60">{new Date(story.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="flex-1">
          {story.mediaType === 'image' ? (
            <img src={story.mediaUrl} className="h-full w-full object-contain" alt="" />
          ) : (
            <video src={story.mediaUrl} controls autoPlay className="h-full w-full" />
          )}
        </div>

        <div className="bg-gradient-to-t from-black p-8 pt-12">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Reports</p>
              <p className="text-xl font-bold">{story.reports?.length || 0} Báo cáo</p>
            </div>
            <button 
              onClick={() => {
                if (window.confirm('Xóa story này vĩnh viễn?')) {
                  onDelete(story._id);
                  onClose();
                }
              }}
              className="rounded-2xl bg-status-banned px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Xóa Story
            </button>
          </div>
          
          {(story.reports?.length || 0) > 0 && (
            <div className="mt-6 space-y-2 max-h-[120px] overflow-y-auto custom-scrollbar">
              {story.reports?.map((r) => (
                <div key={r._id} className="rounded-xl bg-white/5 p-3 text-xs text-white/80">
                  {r.reason}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
