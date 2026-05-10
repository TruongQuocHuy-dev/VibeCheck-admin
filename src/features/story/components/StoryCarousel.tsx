import type { Story } from '../types';

interface StoryCarouselProps {
  stories: Story[];
  onSelect: (story: Story) => void;
  selectedId?: string;
}

export function StoryCarousel({ stories, onSelect, selectedId }: StoryCarouselProps) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto pb-4 custom-scrollbar">
      {stories.map((story) => {
        const statusColor = 
          story.status === 'hidden' ? 'border-status-banned' : 
          story.reportCount > 0 ? 'border-red-500' : 
          story.isExpiringSoon ? 'border-yellow-500' : 'border-primary';

        return (
          <button
            key={story._id}
            onClick={() => onSelect(story)}
            className={`flex flex-col items-center gap-2 transition-transform hover:scale-105 ${
              selectedId === story._id ? 'scale-110' : ''
            }`}
          >
            <div className={`relative h-20 w-20 rounded-full border-4 p-1 ${statusColor}`}>
              <img
                src={story.user?.avatar || 'https://via.placeholder.com/64'}
                className="h-full w-full rounded-full object-cover"
                alt=""
              />
              {story.isExpiringSoon && (
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-black shadow-lg">
                  !
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <span className="max-w-[80px] truncate text-[10px] font-semibold text-white">
                {story.user?.displayName || 'User'}
              </span>
              <span className="text-[9px] text-text-muted">{story.remainingTime}</span>
            </div>
          </button>
        );
      })}
      
      {stories.length === 0 && (
        <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-dashed border-[#262626] text-sm text-text-muted">
          Không có story nào trong mục này
        </div>
      )}
    </div>
  );
}
