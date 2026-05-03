import type { ReportPriority } from '../types';

export function PriorityBadge({ priority }: { priority: ReportPriority }) {
  const isHigh = priority === 'high';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ${
      isHigh 
        ? 'bg-status-reported/10 text-status-reported border border-status-reported/20' 
        : 'bg-[#171717] text-[#676767] border border-[#262626]'
    }`}>
      {isHigh && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-reported" />}
      {priority}
    </span>
  );
}
