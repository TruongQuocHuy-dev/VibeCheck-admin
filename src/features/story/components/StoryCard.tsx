import type { Story } from '../types';

interface StoryCardProps {
  story: Story;
  onClick: (story: Story) => void;
}

export function StoryCard({ story, onClick }: StoryCardProps) {
  const isReported = (story.reports?.length || 0) > 0;

  return (
    <div 
      onClick={() => onClick(story)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#171717] transition-all hover:ring-2 hover:ring-primary/50"
    >
      <div className="aspect-[9/16] w-full">
        {story.mediaType === 'image' ? (
          <img src={story.mediaUrl} className="h-full w-full object-cover" alt="" />
        ) : (
          <div className="h-full w-full bg-black flex items-center justify-center">
             <svg className="h-10 w-10 text-white/50" fill="currentColor" viewBox="0 0 20 20">
               <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
             </svg>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full border-2 border-primary p-0.5">
          <img src={story.user?.avatar || 'https://via.placeholder.com/32'} className="h-full w-full rounded-full object-cover" alt="" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-[10px] font-bold text-white">{story.user?.displayName || 'Unknown User'}</p>
          <p className="text-[8px] text-white/60">
            {new Date(story.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {isReported && (
        <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-status-banned shadow-lg">
          <span className="text-[10px] font-bold text-white">{story.reports?.length || 0}</span>
        </div>
      )}

      {story.isFeatured && (
        <div className="absolute top-3 left-3 rounded-md bg-primary/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">
          Featured
        </div>
      )}
    </div>
  );
}
