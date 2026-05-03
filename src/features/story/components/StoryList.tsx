import { StoryCard } from './StoryCard';
import { Skeleton } from '../../../shared/ui/Skeleton';
import type { Story } from '../types';

interface StoryListProps {
  stories: Story[];
  isLoading: boolean;
  onView: (story: Story) => void;
}

export function StoryList({ stories, isLoading, onView }: StoryListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[9/16] w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-text-secondary">Không có story nào đang hoạt động</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} onClick={onView} />
      ))}
    </div>
  );
}
