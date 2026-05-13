import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useVibeTags, useCreateVibeTag, useUpdateVibeTag, useDeleteVibeTag } from '../hooks/useVibeTags'
import VibeTagTable from '../components/VibeTagTable'
import { VibeTagDialog } from '../components/VibeTagDialogs'
import { Button } from '../../../shared/ui/Button'
import type { VibeTag, VibeTagQueryParams } from '../types'

export default function VibeTagPage() {
  const [params, setParams] = useState<VibeTagQueryParams>({
    page: 1,
    limit: 10,
    search: '',
    status: 'all'
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<VibeTag | null>(null)

  const { data, isLoading } = useVibeTags(params)
  const createMutation = useCreateVibeTag()
  const updateMutation = useUpdateVibeTag()
  const deleteMutation = useDeleteVibeTag()

  const handleOpenAdd = () => {
    setEditingTag(null)
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (tag: VibeTag) => {
    setEditingTag(tag)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingTag(null)
  }

  const handleSubmit = (formData: any) => {
    if (editingTag) {
      updateMutation.mutate(
        { id: editingTag._id, payload: formData },
        { onSuccess: handleCloseDialog }
      )
    } else {
      createMutation.mutate(formData, { onSuccess: handleCloseDialog })
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vibe tag này? Nếu có người dùng đang sử dụng, hệ thống sẽ chỉ tạm ẩn nhãn này.')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="flex flex-col gap-8 p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Quản lý VibeTag</h1>
          <p className="mt-1.5 text-[#676767]">Quản lý danh sách các nhãn cảm xúc hiển thị trên ứng dụng mobile.</p>
        </div>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2 px-5 py-6 rounded-2xl shadow-lg shadow-primary/20">
          <Plus size={20} />
          Thêm Vibe Tag
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 rounded-2xl border border-[#262626] bg-[#171717]/30 backdrop-blur-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4d4d4d]" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm nhãn..."
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#262626] bg-[#0d0d0d] text-sm text-white placeholder-[#4d4d4d] outline-none focus:border-primary/50 transition"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setParams({ ...params, status, page: 1 })}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                params.status === status
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-[#676767] hover:text-[#b4b4b4]'
              }`}
            >
              {status === 'all' ? 'Tất cả' : status === 'active' ? 'Hoạt động' : 'Tạm ẩn'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <VibeTagTable 
        tags={data?.tags || []} 
        isLoading={isLoading} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete}
      />

      {/* Pagination (Simplified) */}
      {data && data.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {[...Array(data.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setParams({ ...params, page: i + 1 })}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                params.page === i + 1
                  ? 'bg-primary text-white'
                  : 'bg-[#171717] text-[#676767] hover:bg-[#262626]'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Dialog */}
      <VibeTagDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        initialData={editingTag}
      />
    </div>
  )
}
