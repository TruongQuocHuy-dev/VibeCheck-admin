import { useState } from 'react'
import { BlacklistStats } from '../components/BlacklistStats'
import { SearchFilter } from '../components/SearchFilter'
import { BlacklistTable } from '../components/BlacklistTable'
import { AddWordDialog } from '../components/AddWordDialog'
import { Button } from '../../../shared/ui/Button'
import { 
  useBlacklist, 
  useAddBlacklistWord, 
  useUpdateBlacklistWord, 
  useDeleteBlacklistWord, 
  useToggleBlacklistStatus 
} from '../hooks/useBlacklist'
import type { BlacklistFilters, BlacklistWord } from '../services'

export function BlacklistPage() {
  const [filters, setFilters] = useState<BlacklistFilters>({
    page: 1,
    limit: 10,
    search: '',
    type: 'all',
    status: 'all',
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingWord, setEditingWord] = useState<BlacklistWord | null>(null)

  const { data, isLoading } = useBlacklist(filters)
  const addMutation = useAddBlacklistWord()
  const updateMutation = useUpdateBlacklistWord()
  const deleteMutation = useDeleteBlacklistWord()
  const toggleMutation = useToggleBlacklistStatus()

  const handleFilterChange = (newFilters: Partial<BlacklistFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }))
  }

  const handleAddOrUpdate = (wordData: { word: string; type: string; isActive: boolean }) => {
    if (editingWord) {
      updateMutation.mutate(
        { id: editingWord._id, data: wordData as any },
        { onSuccess: () => {
          setIsDialogOpen(false)
          setEditingWord(null)
        }}
      )
    } else {
      addMutation.mutate(wordData as any, {
        onSuccess: () => setIsDialogOpen(false)
      })
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa từ khóa này khỏi blacklist? Hành động này không thể hoàn tác.')) {
      deleteMutation.mutate(id)
    }
  }

  const handleEdit = (word: BlacklistWord) => {
    setEditingWord(word)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Quản lý Blacklist</h1>
          <p className="mt-1 text-[#676767]">Cấu hình danh sách từ ngữ bị cấm hoặc cần kiểm duyệt tự động.</p>
        </div>
        <Button 
          onClick={() => {
            setEditingWord(null)
            setIsDialogOpen(true)
          }}
          className="flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm từ khóa
        </Button>
      </div>

      {/* Stats */}
      <BlacklistStats />

      {/* Filters & Table */}
      <div className="space-y-4">
        <SearchFilter onFilterChange={handleFilterChange} />
        
        <BlacklistTable 
          words={data?.words || []} 
          isLoading={isLoading}
          onToggle={(id, active) => toggleMutation.mutate({ id, isActive: !active })}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#262626] pt-4">
            <p className="text-sm text-[#676767]">
              Hiển thị <span className="font-medium text-white">{data.words.length}</span> trên <span className="font-medium text-white">{data.total}</span> kết quả
            </p>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                disabled={filters.page === 1}
                onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) - 1 }))}
              >
                Trước
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                disabled={filters.page === data.totalPages}
                onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
              >
                Sau
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialog */}
      <AddWordDialog 
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingWord(null)
        }}
        onAdd={handleAddOrUpdate}
        isSubmitting={addMutation.isPending || updateMutation.isPending}
        initialData={editingWord}
      />
    </div>
  )
}
