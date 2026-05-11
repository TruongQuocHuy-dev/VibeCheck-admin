import { useState, useEffect } from 'react'

interface SearchFilterProps {
  onFilterChange: (filters: { search: string; type: string; status: string }) => void
}

export function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search, type, status })
    }, 300)
    return () => clearTimeout(timer)
  }, [search, type, status, onFilterChange])

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#4d4d4d]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm từ khóa..."
          className="w-full rounded-xl border border-[#262626] bg-[#171717] pl-10 pr-4 py-2 text-sm text-white placeholder-[#4d4d4d] outline-none focus:border-primary transition"
        />
      </div>

      <div className="flex items-center gap-3">
        <select 
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-[#262626] bg-[#171717] px-3 py-2 text-sm text-white outline-none focus:border-primary transition cursor-pointer"
        >
          <option value="all">Tất cả loại</option>
          <option value="exact">Khớp hoàn toàn</option>
          <option value="contains">Chứa cụm từ</option>
          <option value="regex">Regex</option>
        </select>

        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-[#262626] bg-[#171717] px-3 py-2 text-sm text-white outline-none focus:border-primary transition cursor-pointer"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Tạm dừng</option>
        </select>
      </div>
    </div>
  )
}
