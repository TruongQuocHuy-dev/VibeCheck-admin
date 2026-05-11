import { useState, useEffect } from 'react'
import { Button } from '../../../shared/ui/Button'

interface AddWordDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: { word: string; type: string; isActive: boolean }) => void
  isSubmitting: boolean
  initialData?: any // For editing
}

export function AddWordDialog({ isOpen, onClose, onAdd, isSubmitting, initialData }: AddWordDialogProps) {
  const [word, setWord] = useState('')
  const [type, setType] = useState('contains')
  const [isActive, setIsActive] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setWord(initialData.word)
      setType(initialData.type)
      setIsActive(initialData.isActive)
    } else {
      setWord('')
      setType('contains')
      setIsActive(true)
    }
    setError('')
  }, [initialData, isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (word.trim().length < 2) {
      setError('Từ khóa phải có ít nhất 2 ký tự')
      return
    }
    onAdd({ word: word.trim(), type, isActive })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md scale-100 rounded-2xl border border-[#262626] bg-[#171717] p-6 shadow-2xl transition-all animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-white mb-1">
          {initialData ? 'Chỉnh sửa từ khóa' : 'Thêm từ khóa mới'}
        </h2>
        <p className="text-sm text-[#676767] mb-6">
          {initialData ? 'Cập nhật cấu hình cho từ khóa trong blacklist.' : 'Thêm một từ khóa hoặc biểu thức mới để chặn nội dung.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#b4b4b4] mb-1.5">Từ khóa / Cụm từ / Regex</label>
            <input 
              autoFocus
              type="text"
              value={word}
              onChange={(e) => {
                setWord(e.target.value)
                if (error) setError('')
              }}
              placeholder={type === 'regex' ? '^badword.*' : 'Nhập từ khóa...'}
              className={`w-full rounded-xl border ${error ? 'border-red-500/50' : 'border-[#262626]'} bg-[#0d0d0d] px-4 py-2.5 text-sm text-white placeholder-[#4d4d4d] outline-none focus:border-primary transition`}
            />
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#b4b4b4] mb-1.5">Loại đối khớp</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-[#262626] bg-[#0d0d0d] px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition cursor-pointer"
            >
              <option value="exact">Khớp hoàn toàn (Exact)</option>
              <option value="contains">Chứa cụm từ (Contains)</option>
              <option value="regex">Biểu thức chính quy (Regex)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 py-2">
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActive ? 'bg-primary' : 'bg-[#262626]'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className="text-sm font-medium text-[#b4b4b4]">Kích hoạt ngay</span>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose} type="button" disabled={isSubmitting}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : initialData ? 'Cập nhật' : 'Thêm từ khóa'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
