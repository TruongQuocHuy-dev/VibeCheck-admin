interface ReportBadgeProps {
  count: number;
}

export function ReportBadge({ count }: ReportBadgeProps) {
  if (count === 0) return null;

  return (
    <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-full bg-status-banned/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
      {count} Reports
    </div>
  );
}
