import React from 'react';
import { Button } from '../../../shared/ui/Button';
import { Calendar, ChevronDown } from 'lucide-react';
import type { Granularity } from '../types';

interface DateRangePickerProps {
  from: string;
  to: string;
  granularity: Granularity;
  onPresetChange: (preset: 'today' | '7days' | '30days' | 'thisMonth') => void;
  onGranularityChange: (granularity: Granularity) => void;
  onCustomRangeChange: (from: string, to: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  from,
  to,
  granularity,
  onPresetChange,
  onGranularityChange,
  onCustomRangeChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex bg-background-card border border-background-muted rounded-lg p-1">
        <button
          onClick={() => onPresetChange('today')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            // Simplified logic for preset detection
            false ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'
          }`}
        >
          Hôm nay
        </button>
        <button
          onClick={() => onPresetChange('7days')}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-text-secondary hover:text-white"
        >
          7 ngày
        </button>
        <button
          onClick={() => onPresetChange('30days')}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-text-secondary hover:text-white"
        >
          30 ngày
        </button>
        <button
          onClick={() => onPresetChange('thisMonth')}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-text-secondary hover:text-white"
        >
          Tháng này
        </button>
      </div>

      <div className="flex items-center gap-2 bg-background-card border border-background-muted rounded-lg px-3 py-1.5">
        <Calendar size={14} className="text-text-muted" />
        <input
          type="date"
          value={from}
          onChange={(e) => onCustomRangeChange(e.target.value, to)}
          className="bg-transparent border-none text-xs text-text-primary focus:ring-0 cursor-pointer"
        />
        <span className="text-text-muted">-</span>
        <input
          type="date"
          value={to}
          onChange={(e) => onCustomRangeChange(from, e.target.value)}
          className="bg-transparent border-none text-xs text-text-primary focus:ring-0 cursor-pointer"
        />
      </div>

      <div className="relative group">
        <Button variant="secondary" size="sm" className="gap-2 h-[38px] text-xs">
          <span>{granularity === 'day' ? 'Theo ngày' : granularity === 'week' ? 'Theo tuần' : 'Theo tháng'}</span>
          <ChevronDown size={14} />
        </Button>
        <div className="absolute right-0 mt-1 w-32 bg-background-card border border-background-muted rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-1">
          {(['day', 'week', 'month'] as Granularity[]).map((g) => (
            <button
              key={g}
              onClick={() => onGranularityChange(g)}
              className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors ${
                granularity === g ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-background-muted hover:text-white'
              }`}
            >
              {g === 'day' ? 'Theo ngày' : g === 'week' ? 'Theo tuần' : 'Theo tháng'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
