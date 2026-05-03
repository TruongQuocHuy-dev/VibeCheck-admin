import { VibeCard } from './VibeCard';
import { Skeleton } from '../../../shared/ui/Skeleton';
import type { Vibe } from '../types';

interface VibeGridProps {
  vibes: Vibe[];
  isLoading: boolean;
  onPreview: (vibe: Vibe) => void;
  onAction: (vibe: Vibe, action: 'hide' | 'delete' | 'reports') => void;
}

export function VibeGrid({ vibes, isLoading, onPreview, onAction }: VibeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-[#262626] p-4 bg-background-card">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 flex-1 rounded" />
            </div>
            <Skeleton className="h-10 w-full rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (vibes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-[#171717] p-6 text-[#4d4d4d]">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-lg font-medium text-text-primary">Không tìm thấy nội dung nào</p>
        <p className="text-sm text-text-secondary">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {vibes.map((vibe) => (
        <VibeCard 
          key={vibe._id} 
          vibe={vibe} 
          onPreview={onPreview} 
          onAction={onAction}
        />
      ))}
    </div>
  );
}
