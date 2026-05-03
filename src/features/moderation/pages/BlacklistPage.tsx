import { useState } from 'react';
import { useBlacklist, useAddWord, useRemoveWord, useToggleWord } from '../hooks/useBlacklist';
import { BlacklistTable } from '../components/BlacklistTable';
import { AddWordDialog } from '../components/AddWordDialog';
import { Button } from '../../../shared/ui/Button';

export function BlacklistPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useBlacklist();
  const addMutation = useAddWord();
  const removeMutation = useRemoveWord();
  const toggleMutation = useToggleWord();

  const filteredWords = (data?.words || []).filter(w => 
    w.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Quản lý Blacklist</h1>
          <p className="mt-2 text-text-secondary">Cấu hình danh sách từ ngữ bị cấm hoặc cần cảnh báo tự động.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>Thêm từ khóa</Button>
      </div>

      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#4d4d4d]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm từ khóa..."
          className="w-full rounded-2xl border border-[#262626] bg-[#0d0d0d]/50 pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary transition shadow-inner"
        />
      </div>

      <BlacklistTable 
        words={filteredWords} 
        isLoading={isLoading} 
        onToggle={(id, active) => toggleMutation.mutate({ id, isActive: !active })}
        onRemove={(id) => {
          if (window.confirm('Xóa từ khóa này khỏi blacklist?')) {
            removeMutation.mutate(id);
          }
        }}
      />

      <AddWordDialog 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)}
        onAdd={(word, type) => addMutation.mutate({ word, type })}
        isSubmitting={addMutation.isPending}
      />
    </div>
  );
}
