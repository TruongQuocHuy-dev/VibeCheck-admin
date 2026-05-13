import React from 'react';
import type { VibeTag } from '../types';
import ColorBadge from './ColorBadge';
import { Button } from '../../../shared/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';

interface VibeTagTableProps {
  tags: VibeTag[];
  isLoading: boolean;
  onEdit: (tag: VibeTag) => void;
  onDelete: (id: string) => void;
}

const VibeTagTable: React.FC<VibeTagTableProps> = ({ tags, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full rounded-2xl bg-[#171717]/50 border border-[#262626]" />
        ))}
      </div>
    );
  }

  if (tags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-[#262626] bg-[#171717]/30">
        <p className="text-[#676767]">Không tìm thấy vibe tag nào.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#262626] bg-[#171717]/50 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#262626] bg-[#0d0d0d]/50">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#676767]">Emoji</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#676767]">Nhãn</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#676767]">Màu sắc</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#676767]">Trạng thái</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#676767] text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#262626]">
          {tags.map((tag) => (
            <tr key={tag._id} className="group transition-colors hover:bg-white/[0.02]">
              <td className="px-6 py-4">
                <span className="text-2xl">{tag.emoji}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-medium text-white">{tag.label}</span>
              </td>
              <td className="px-6 py-4">
                <ColorBadge type={tag.colorType} />
              </td>
              <td className="px-6 py-4">
                {tag.isActive ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Hoạt động
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#676767]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#676767]" />
                    Tạm ẩn
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(tag)}
                    className="p-2 text-[#676767] hover:text-white hover:bg-[#262626] rounded-lg transition"
                    title="Chỉnh sửa"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(tag._id)}
                    className="p-2 text-[#676767] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
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

export default VibeTagTable;
