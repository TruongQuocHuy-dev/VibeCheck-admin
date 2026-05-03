import type { ReportType } from '../types';

interface TargetPreviewProps {
  type: ReportType;
  data: any;
  onClick?: () => void;
}

export function TargetPreview({ type, data, onClick }: TargetPreviewProps) {
  if (!data) return <span className="text-text-muted italic">N/A</span>;

  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer group hover:bg-[#171717] p-1 rounded-lg transition-colors"
    >
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#262626]">
        {type === 'user' ? (
          <img src={data.avatar || 'https://via.placeholder.com/32'} className="h-full w-full object-cover" />
        ) : (
          <img src={data.media?.[0]?.url || data.thumbnail || 'https://via.placeholder.com/32'} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-text-primary truncate group-hover:text-primary transition-colors">
          {data.fullName || data.caption || 'Nội dung'}
        </span>
        <span className="text-[10px] text-text-muted uppercase tracking-tighter">{type}</span>
      </div>
    </div>
  );
}
