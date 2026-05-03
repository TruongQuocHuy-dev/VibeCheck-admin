import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReportQueueTable } from '../components/ReportQueueTable';
import { ResolveDialog } from '../components/ResolveDialog';
import type { Report } from '../types';

export function ReportManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  const status = searchParams.get('status') || 'pending';

  const setStatus = (val: string) => {
    searchParams.set('status', val);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-10 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Hàng đợi báo cáo</h1>
          <p className="mt-3 text-lg text-text-secondary font-medium">Bảo vệ cộng đồng bằng cách xử lý các nội dung vi phạm.</p>
        </div>

        <div className="flex rounded-2xl bg-[#171717] p-1.5 shadow-inner border border-[#262626]">
          {[
            { id: 'pending', label: 'Chờ xử lý' },
            { id: 'resolved', label: 'Đã xử lý' },
            { id: 'dismissed', label: 'Đã bỏ qua' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStatus(s.id)}
              className={`rounded-xl px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                status === s.id 
                  ? 'bg-[#262626] text-white shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-[#333]' 
                  : 'text-[#676767] hover:text-[#b4b4b4]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ReportQueueTable onSelect={(report) => {
          setSelectedReport(report);
          setIsResolving(true);
        }} />
      </div>

      {isResolving && selectedReport && (
        <ResolveDialog 
          report={selectedReport} 
          onClose={() => {
            setIsResolving(false);
            setSelectedReport(null);
          }} 
        />
      )}
    </div>
  );
}
