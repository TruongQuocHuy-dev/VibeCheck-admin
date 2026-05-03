import { useState } from 'react';
import { useStories, useDeleteStory } from '../hooks/useStories';
import { StoryList } from '../components/StoryList';
import { StoryViewer } from '../components/StoryViewer';
import type { Story } from '../types';

export function StoryModerationPage() {
  const [filter, setFilter] = useState<'all' | 'reported' | 'featured'>('all');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const { data, isLoading } = useStories({
    reported: filter === 'reported' ? true : undefined,
    featured: filter === 'featured' ? true : undefined,
  });

  const deleteMutation = useDeleteStory();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Kiểm duyệt Stories</h1>
          <p className="mt-2 text-text-secondary">Quản lý các tin nhắn 24h (Stories) trong hệ thống.</p>
        </div>

        <div className="flex rounded-xl bg-[#171717] p-1">
          {(['all', 'reported', 'featured'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === s 
                  ? 'bg-[#262626] text-white shadow-lg' 
                  : 'text-[#676767] hover:text-[#b4b4b4]'
              }`}
            >
              {s === 'all' ? 'Tất cả' : s === 'reported' ? 'Bị báo cáo' : 'Nổi bật'}
            </button>
          ))}
        </div>
      </div>

      <StoryList 
        stories={data?.stories || []} 
        isLoading={isLoading} 
        onView={setSelectedStory} 
      />

      {selectedStory && (
        <StoryViewer 
          story={selectedStory} 
          onClose={() => setSelectedStory(null)}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}
    </div>
  );
}
