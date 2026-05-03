import type { BlacklistWord } from '../types';

interface BlacklistTableProps {
  words: BlacklistWord[];
  isLoading: boolean;
  onToggle: (id: string, currentStatus: boolean) => void;
  onRemove: (id: string) => void;
}

export function BlacklistTable({ words, isLoading, onToggle, onRemove }: BlacklistTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#262626] bg-[#0d0d0d]/50">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#262626] bg-[#171717]/50 text-[10px] font-bold uppercase tracking-widest text-[#676767]">
            <th className="px-6 py-4">Từ khóa</th>
            <th className="px-6 py-4">Loại</th>
            <th className="px-6 py-4">Ngày tạo</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#262626]">
          {isLoading ? (
             Array.from({ length: 5 }).map((_, i) => (
               <tr key={i} className="animate-pulse">
                 <td colSpan={5} className="px-6 py-4">
                   <div className="h-8 w-full rounded bg-[#171717]" />
                 </td>
               </tr>
             ))
          ) : words.length > 0 ? (
            words.map((word) => (
              <tr key={word._id} className="group transition-colors hover:bg-[#171717]/30">
                <td className="px-6 py-4 font-mono text-sm text-text-primary">{word.word}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${
                    word.type === 'strict' 
                      ? 'bg-status-banned/10 text-status-banned border border-status-banned/20' 
                      : 'bg-status-pending/10 text-status-pending border border-status-pending/20'
                  }`}>
                    {word.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-text-muted">
                  {new Date(word.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => onToggle(word._id, word.isActive)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      word.isActive ? 'bg-primary' : 'bg-[#262626]'
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      word.isActive ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onRemove(word._id)}
                    className="rounded-lg p-2 text-text-muted transition-colors hover:bg-status-banned/10 hover:text-status-banned"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-text-muted">Danh sách từ cấm đang trống.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
