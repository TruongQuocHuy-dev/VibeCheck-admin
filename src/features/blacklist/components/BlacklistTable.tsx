import { WordBadge } from './WordBadge'
import type { BlacklistWord } from '../services'

interface BlacklistTableProps {
  words: BlacklistWord[]
  isLoading: boolean
  onToggle: (id: string, active: boolean) => void
  onDelete: (id: string) => void
  onEdit: (word: BlacklistWord) => void
}

export function BlacklistTable({ words, isLoading, onToggle, onDelete, onEdit }: BlacklistTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#262626] bg-[#171717]/50">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#171717] text-xs font-semibold uppercase tracking-wider text-[#676767]">
            <tr>
              <th className="px-6 py-4">Từ khóa</th>
              <th className="px-6 py-4">Loại</th>
              <th className="px-6 py-4">Người tạo</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-t border-[#262626]">
                <td colSpan={6} className="px-6 py-4">
                  <div className="h-4 w-full animate-pulse rounded bg-[#262626]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#262626] bg-[#0d0d0d] py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#171717] text-2xl">🔍</div>
        <h3 className="text-lg font-semibold text-white">Chưa có từ khóa nào</h3>
        <p className="mt-1 text-sm text-[#676767]">Thử thay đổi bộ lọc hoặc thêm từ khóa mới.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#262626] bg-[#171717]/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#171717] text-xs font-semibold uppercase tracking-wider text-[#676767]">
          <tr>
            <th className="px-6 py-4">Từ khóa</th>
            <th className="px-6 py-4">Loại</th>
            <th className="px-6 py-4">Người tạo</th>
            <th className="px-6 py-4">Ngày tạo</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#262626]">
          {words.map((word) => (
            <tr key={word._id} className="group hover:bg-[#262626]/30 transition-colors">
              <td className="px-6 py-4">
                <span className="font-medium text-white">{word.word}</span>
              </td>
              <td className="px-6 py-4">
                <WordBadge type={word.type} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {word.createdBy?.fullName?.charAt(0) || 'A'}
                  </div>
                  <span className="text-sm text-[#b4b4b4]">{word.createdBy?.fullName || 'Admin'}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-[#676767]">{new Date(word.createdAt).toLocaleDateString('vi-VN')}</span>
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => onToggle(word._id, word.isActive)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                    word.isActive 
                      ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                      : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${word.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                  {word.isActive ? 'Hoạt động' : 'Tạm dừng'}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(word)}
                    className="p-1 text-[#676767] hover:text-white transition-colors"
                    title="Sửa"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => onDelete(word._id)}
                    className="p-1 text-[#676767] hover:text-red-500 transition-colors"
                    title="Xóa"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
