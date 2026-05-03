import { useState, useEffect } from 'react';
import type { UserStatus } from '../types';

interface SearchFilterProps {
  search: string;
  status: UserStatus | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: UserStatus | 'all') => void;
}

export function SearchFilter({ search, status, onSearchChange, onStatusChange }: SearchFilterProps) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, onSearchChange]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="relative flex-1 max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Tìm kiếm theo tên, email, phone..."
          className="w-full rounded-2xl border border-background-muted bg-background-card/50 pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-text-secondary">Trạng thái:</span>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as UserStatus | 'all')}
          className="rounded-xl border border-background-muted bg-background-card/50 px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition"
        >
          <option value="all">Tất cả</option>
          <option value="active">Hoạt động</option>
          <option value="banned">Đã khóa</option>
        </select>
      </div>
    </div>
  );
}
