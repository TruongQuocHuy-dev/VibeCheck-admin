import React, { useState, useEffect } from 'react';
import { getActivityLog } from '../services';
import type { ActivityLog } from '../types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { History } from 'lucide-react';
import { Skeleton } from '../../../shared/ui/Skeleton';

export const PersonalActivityLog: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [days, setDays] = useState(7);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, [days]);

  const loadLogs = async () => {
    try {
      setIsLoading(true);
      const data = await getActivityLog(days);
      setLogs(data);
    } catch (err) {
      // Mock data if BE not ready
      setLogs([
        { _id: '1', timestamp: new Date().toISOString(), action: 'UPDATE_USER', target: 'User #123', ip: '192.168.1.1', details: 'Khóa tài khoản do vi phạm' },
        { _id: '2', timestamp: new Date(Date.now() - 86400000).toISOString(), action: 'DELETE_VIBE', target: 'Vibe #555', ip: '192.168.1.1', details: 'Nội dung nhạy cảm' },
        { _id: '3', timestamp: new Date(Date.now() - 172800000).toISOString(), action: 'LOGIN', target: 'Hệ thống', ip: '1.1.1.1', details: 'Đăng nhập thành công' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-card border border-background-muted rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-[#262626] bg-[#0d0d0d]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <History size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">Nhật ký hoạt động</h4>
            <p className="text-[11px] text-text-muted mt-0.5">Lịch sử thao tác của bạn trên hệ thống</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select 
            className="bg-[#171717] border border-[#262626] rounded-xl px-4 py-2 text-xs font-bold text-text-primary outline-none focus:border-primary transition-all cursor-pointer"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={7}>7 ngày qua</option>
            <option value={30}>30 ngày qua</option>
            <option value={90}>90 ngày qua</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#121212] text-[10px] uppercase tracking-widest text-[#4d4d4d] font-black border-b border-[#262626]">
              <th className="px-6 py-4">Thời gian</th>
              <th className="px-6 py-4">Hành động</th>
              <th className="px-6 py-4">Đối tượng</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <tr key={i}>
                  <td colSpan={5} className="px-6 py-4">
                    <Skeleton className="h-6 w-full rounded-lg" />
                  </td>
                </tr>
              ))
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log._id} className="hover:bg-[#171717] transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-mono text-text-muted">
                    {format(new Date(log.timestamp), 'HH:mm dd/MM/yyyy', { locale: vi })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded bg-[#262626] text-[#b4b4b4] group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-text-secondary">
                    {log.target}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-text-muted">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 text-xs text-text-muted">
                    {log.details || '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-text-muted italic text-xs">
                   Chưa có dữ liệu hoạt động trong thời gian này.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
