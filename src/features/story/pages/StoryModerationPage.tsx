import { useState } from 'react';
import { useAdminStories, useStoryStats, useModerateStory } from '../hooks/useAdminStories';
import { useStoryModeration } from '../hooks/useStoryModeration';
import { StoryCarousel } from '../components/StoryCarousel';
import { StoryViewer } from '../components/StoryViewer';
import { StoryStats } from '../components/StoryStats';
import type { Story, StoryStatus } from '../types';

export function StoryModerationPage() {
  const [filter, setFilter] = useState<StoryStatus | 'all' | 'reported' | 'expiring-soon'>('all');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const { data, isLoading } = useAdminStories({
    status: filter === 'reported' ? 'reported' : filter === 'expiring-soon' ? 'expiring-soon' : filter === 'all' ? 'all' : (filter as any)
  });

  const { data: stats } = useStoryStats();
  const { deleteStory, hideStory, extendStory } = useModerateStory();
  
  // Real-time socket events
  useStoryModeration();

  const handleNext = () => {
    if (!selectedStory || !data?.stories) return;
    const idx = data.stories.findIndex(s => s._id === selectedStory._id);
    if (idx < data.stories.length - 1) setSelectedStory(data.stories[idx + 1]);
  };

  const handlePrev = () => {
    if (!selectedStory || !data?.stories) return;
    const idx = data.stories.findIndex(s => s._id === selectedStory._id);
    if (idx > 0) setSelectedStory(data.stories[idx - 1]);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Kiểm duyệt Stories</h1>
          <p className="mt-2 text-text-secondary">Quản lý nội dung 24h và xử lý báo cáo vi phạm.</p>
        </div>

        <div className="flex rounded-xl bg-[#171717] p-1">
          {(['all', 'reported', 'expiring-soon', 'hidden'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === s 
                  ? 'bg-[#262626] text-white shadow-lg' 
                  : 'text-[#676767] hover:text-[#b4b4b4]'
              }`}
            >
              {s === 'all' ? 'Tất cả' : s === 'reported' ? 'Bị báo cáo' : s === 'expiring-soon' ? 'Sắp hết hạn' : 'Đã ẩn'}
            </button>
          ))}
        </div>
      </div>

      <StoryStats stats={stats} />

      <div className="rounded-3xl border border-[#262626] bg-[#0d0d0d] p-6 shadow-xl">
        <h3 className="mb-6 text-lg font-bold text-white">Danh sách Stories ({data?.total || 0})</h3>
        <StoryCarousel 
          stories={data?.stories || []} 
          onSelect={setSelectedStory} 
          selectedId={selectedStory?._id}
        />
        
        {isLoading && (
          <div className="flex h-32 w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-primary" />
          </div>
        )}
      </div>

      {selectedStory && (
        <StoryViewer 
          story={selectedStory} 
          onClose={() => setSelectedStory(null)}
          onDelete={(id) => deleteStory.mutate(id)}
          onHide={(id) => hideStory.mutate(id)}
          onExtend={(id) => extendStory.mutate(id)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}
