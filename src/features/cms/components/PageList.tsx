import React from 'react';
import type { CMSPage } from '../types';
import { Badge } from '../../../shared/ui/Badge';
import { STATUS_COLORS } from '../constants';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Edit3, Eye, History, Trash2, Globe, Languages } from 'lucide-react';

interface PageListProps {
  pages: CMSPage[];
  onEdit: (page: CMSPage) => void;
  onPreview: (page: CMSPage) => void;
  onViewHistory: (page: CMSPage) => void;
  onDelete: (id: string) => void;
}

export const PageList: React.FC<PageListProps> = ({ 
  pages, onEdit, onPreview, onViewHistory, onDelete 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-text-muted text-xs uppercase tracking-wider">
            <th className="px-4 py-3 font-medium">Trang</th>
            <th className="px-4 py-3 font-medium">Đường dẫn (Slug)</th>
            <th className="px-4 py-3 font-medium">Ngôn ngữ</th>
            <th className="px-4 py-3 font-medium">Trạng thái</th>
            <th className="px-4 py-3 font-medium text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id} className="bg-background-card hover:bg-background-muted/50 transition-colors group">
              <td className="px-4 py-4 rounded-l-xl border-y border-l border-background-muted">
                <div className="flex flex-col">
                  <span className="font-bold text-text-primary">{p.title}</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-tighter">
                    Cập nhật: {format(new Date(p.lastUpdated), 'HH:mm dd/MM/yyyy', { locale: vi })}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 border-y border-background-muted">
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <Globe size={12} className="text-primary" />
                  <span>/{p.slug}</span>
                </div>
              </td>
              <td className="px-4 py-4 border-y border-background-muted">
                <div className="flex items-center gap-1.5">
                  <Languages size={14} className="text-text-muted" />
                  <span className="text-xs font-bold text-text-secondary uppercase">{p.language}</span>
                </div>
              </td>
              <td className="px-4 py-4 border-y border-background-muted">
                <Badge variant={STATUS_COLORS[p.status]}>
                  {p.status === 'published' ? 'Đã xuất bản' : p.status === 'draft' ? 'Bản nháp' : 'Đã gỡ'}
                </Badge>
              </td>
              <td className="px-4 py-4 rounded-r-xl border-y border-r border-background-muted text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onPreview(p)}
                    className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    title="Xem trước"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => onEdit(p)}
                    className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    title="Chỉnh sửa"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => onViewHistory(p)}
                    className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    title="Lịch sử"
                  >
                    <History size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(p.id)}
                    className="p-1.5 text-text-secondary hover:text-status-banned hover:bg-status-banned/10 rounded-lg transition-all"
                    title="Xóa"
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
