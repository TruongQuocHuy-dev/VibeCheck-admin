import { useState, useEffect } from 'react'
import { Button } from '../../../shared/ui/Button'
import type { VibeTag, ColorType } from '../types'

interface VibeTagDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
  initialData?: VibeTag | null
}

export function VibeTagDialog({ isOpen, onClose, onSubmit, isSubmitting, initialData }: VibeTagDialogProps) {
  const [label, setLabel] = useState('')
  const [emoji, setEmoji] = useState('')
  const [colorType, setColorType] = useState<ColorType>('cyan')
  const [isActive, setIsActive] = useState(true)
  const [errors, setErrors] = useState<{ label?: string; emoji?: string }>({})

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label)
      setEmoji(initialData.emoji)
      setColorType(initialData.colorType)
      setIsActive(initialData.isActive)
    } else {
      setLabel('')
      setEmoji('')
      setColorType('cyan')
      setIsActive(true)
    }
    setErrors({})
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

  const validate = () => {
    const newErrors: { label?: string; emoji?: string } = {}
    if (label.trim().length < 2) {
      newErrors.label = 'Nhãn phải có ít nhất 2 ký tự'
    }
    if (!emoji.trim()) {
      newErrors.emoji = 'Emoji không được để trống'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ 
      label: label.trim(), 
      emoji: emoji.trim(), 
      colorType,
      isActive
    })
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
          {initialData ? 'Chỉnh sửa Vibe Tag' : 'Thêm Vibe Tag mới'}
        </h2>
        <p className="text-sm text-[#676767] mb-6">
          {initialData ? 'Cập nhật thông tin cho nhãn cảm xúc.' : 'Tạo một nhãn cảm xúc mới để hiển thị trên ứng dụng.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-[#b4b4b4] mb-1.5">Emoji</label>
              <input 
                type="text"
                value={emoji}
                onChange={(e) => {
                  setEmoji(e.target.value)
                  if (errors.emoji) setErrors({ ...errors, emoji: undefined })
                }}
                placeholder="⚽"
                className={`w-full text-center text-xl rounded-xl border ${errors.emoji ? 'border-red-500/50' : 'border-[#262626]'} bg-[#0d0d0d] px-2 py-2 placeholder-[#4d4d4d] outline-none focus:border-primary transition`}
              />
              {errors.emoji && <p className="mt-1.5 text-[10px] text-red-500">{errors.emoji}</p>}
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-[#b4b4b4] mb-1.5">Nhãn hiển thị</label>
              <input 
                autoFocus
                type="text"
                value={label}
                onChange={(e) => {
                  setLabel(e.target.value)
                  if (errors.label) setErrors({ ...errors, label: undefined })
                }}
                placeholder="Ví dụ: Yêu thể thao"
                className={`w-full rounded-xl border ${errors.label ? 'border-red-500/50' : 'border-[#262626]'} bg-[#0d0d0d] px-4 py-2.5 text-sm text-white placeholder-[#4d4d4d] outline-none focus:border-primary transition`}
              />
              {errors.label && <p className="mt-1.5 text-xs text-red-500">{errors.label}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#b4b4b4] mb-1.5">Màu sắc (Mobile Styling)</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setColorType('cyan')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm transition ${colorType === 'cyan' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-[#262626] bg-[#0d0d0d] text-[#676767]'}`}
              >
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Cyan
              </button>
              <button
                type="button"
                onClick={() => setColorType('pink')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm transition ${colorType === 'pink' ? 'border-pink-500 bg-pink-500/10 text-pink-400' : 'border-[#262626] bg-[#0d0d0d] text-[#676767]'}`}
              >
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                Pink
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActive ? 'bg-primary' : 'bg-[#262626]'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className="text-sm font-medium text-[#b4b4b4]">Trạng thái hoạt động</span>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose} type="button" disabled={isSubmitting}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : initialData ? 'Cập nhật' : 'Thêm Vibe Tag'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
