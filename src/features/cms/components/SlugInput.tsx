import React from 'react';
import { Link2 } from 'lucide-react';

interface SlugInputProps {
  value: string;
  onChange: (value: string) => void;
  baseUrl?: string;
}

export const SlugInput: React.FC<SlugInputProps> = ({ value, onChange, baseUrl = 'vibecheck.app/p/' }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
        URL Slug
      </label>
      <div className="flex items-center gap-2 px-4 py-3 bg-background-muted border border-background-muted rounded-xl focus-within:ring-2 focus-within:ring-primary/50 transition-all">
        <Link2 size={16} className="text-text-muted shrink-0" />
        <span className="text-sm text-text-muted whitespace-nowrap">{baseUrl}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
          className="flex-1 bg-transparent text-sm text-text-primary focus:outline-none"
          placeholder="terms-of-service"
        />
      </div>
      <p className="text-[10px] text-text-muted italic">Slug được dùng để tạo đường dẫn truy cập trực tiếp cho trang này.</p>
    </div>
  );
};
