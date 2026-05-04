import React from 'react';
import type { AppVersion } from '../../types';
import { Badge } from '../../../../shared/ui/Badge';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Smartphone, Apple, Globe, Trash2, Edit3, AlertTriangle } from 'lucide-react';

interface VersionTableProps {
  versions: AppVersion[];
  onDelete: (id: string) => void;
  onEdit: (version: AppVersion) => void;
}

export const VersionTable: React.FC<VersionTableProps> = ({ versions, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-text-muted text-xs uppercase tracking-wider">
            <th className="px-4 py-3 font-medium">Phiên bản</th>
            <th className="px-4 py-3 font-medium">Nền tảng</th>
            <th className="px-4 py-3 font-medium">Bắt buộc</th>
            <th className="px-4 py-3 font-medium">Trạng thái</th>
            <th className="px-4 py-3 font-medium">Ngày tạo</th>
            <th className="px-4 py-3 font-medium text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {versions.map((v) => (
            <tr key={v.id} className="bg-background-card hover:bg-background-muted/50 transition-colors group">
              <td className="px-4 py-4 rounded-l-xl border-y border-l border-background-muted">
                <span className="font-bold text-text-primary">{v.version}</span>
              </td>
              <td className="px-4 py-4 border-y border-background-muted">
                <div className="flex items-center gap-2">
                  {v.platform === 'ios' && <Apple size={14} className="text-text-secondary" />}
                  {v.platform === 'android' && <Smartphone size={14} className="text-text-secondary" />}
                  {v.platform === 'both' && <Globe size={14} className="text-text-secondary" />}
                  <span className="text-sm text-text-secondary capitalize">{v.platform}</span>
                </div>
              </td>
              <td className="px-4 py-4 border-y border-background-muted">
                {v.minRequired ? (
                  <div className="flex items-center gap-1.5 text-warning font-medium text-xs">
                    <AlertTriangle size={12} />
                    <span>Có</span>
                  </div>
                ) : (
                  <span className="text-text-muted text-xs">Không</span>
                )}
              </td>
              <td className="px-4 py-4 border-y border-background-muted">
                <Badge variant={v.status === 'active' ? 'success' : 'secondary'}>
                  {v.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
                </Badge>
              </td>
              <td className="px-4 py-4 border-y border-background-muted text-sm text-text-secondary">
                {format(new Date(v.createdAt), 'dd/MM/yyyy', { locale: vi })}
              </td>
              <td className="px-4 py-4 rounded-r-xl border-y border-r border-background-muted text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(v)}
                    className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(v.id)}
                    className="p-1.5 text-text-secondary hover:text-status-banned hover:bg-status-banned/10 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
