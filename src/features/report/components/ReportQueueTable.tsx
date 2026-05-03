import { useSearchParams } from 'react-router-dom';
import { useReports } from '../hooks/useReports';
import { PriorityBadge } from './PriorityBadge';
import { TargetPreview } from './TargetPreview';
import { Skeleton } from '../../../shared/ui/Skeleton';
import type { Report } from '../types';

interface ReportQueueTableProps {
  onSelect: (report: Report) => void;
}

export function ReportQueueTable({ onSelect }: ReportQueueTableProps) {
  const [searchParams] = useSearchParams();
  
  const params = {
    status: (searchParams.get('status') as any) || 'pending',
    type: (searchParams.get('type') as any) || 'all',
    page: Number(searchParams.get('page') || '1'),
    limit: 15
  };

  const { data, isLoading } = useReports(params);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (data?.reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-[#0d0d0d]/30 rounded-3xl border border-dashed border-[#262626]">
        <div className="mb-4 rounded-full bg-status-active/10 p-6 text-status-active">
           <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
           </svg>
        </div>
        <p className="text-lg font-medium text-text-primary">Tuyệt vời! Không có báo cáo nào</p>
        <p className="text-sm text-text-secondary">Hệ thống của bạn đang rất "sạch" và an toàn.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#262626] bg-[#0d0d0d]/50 shadow-2xl backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#262626] bg-[#171717]/50 text-[10px] font-bold uppercase tracking-[0.2em] text-[#676767]">
            <th className="px-6 py-5">Reporter</th>
            <th className="px-6 py-5">Đối tượng bị báo cáo</th>
            <th className="px-6 py-5">Lý do</th>
            <th className="px-6 py-5">Độ ưu tiên</th>
            <th className="px-6 py-5">Thời gian</th>
            <th className="px-6 py-5 text-right">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#262626]">
          {data?.reports.map((report) => (
            <tr 
              key={report._id} 
              onClick={() => onSelect(report)}
              className={`group cursor-pointer transition-all duration-200 hover:bg-[#171717]/80 ${
                report.priority === 'high' ? 'border-l-4 border-l-status-reported' : ''
              }`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-[#262626] overflow-hidden border border-[#333]">
                    <img src={report.reporter.avatar || 'https://via.placeholder.com/32'} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-xs font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {report.reporter.fullName}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <TargetPreview type={report.targetType} data={report.targetData} />
              </td>
              <td className="px-6 py-4">
                <span className="text-xs text-text-secondary line-clamp-1 max-w-[200px] font-medium">{report.reason}</span>
              </td>
              <td className="px-6 py-4">
                <PriorityBadge priority={report.priority} />
              </td>
              <td className="px-6 py-4 text-[11px] font-mono text-text-muted">
                {new Date(report.createdAt).toLocaleString('vi-VN')}
              </td>
              <td className="px-6 py-4 text-right">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  report.status === 'pending' ? 'text-status-pending bg-status-pending/10 border border-status-pending/20' : 
                  report.status === 'resolved' ? 'text-status-active bg-status-active/10 border border-status-active/20' :
                  'text-[#676767] bg-[#171717] border border-[#262626]'
                }`}>
                  {report.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
