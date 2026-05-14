import { useNavigate } from 'react-router-dom'
import { FileText, ImagePlay, Users, Send } from 'lucide-react'
import { Card } from '../../../shared/ui/Card'

const ACTIONS = [
  { label: 'Xem báo cáo mới', icon: FileText, path: '/admin/reports', color: 'text-primary bg-primary/10 hover:bg-primary/20' },
  { label: 'Duyệt Vibes', icon: ImagePlay, path: '/admin/vibes', color: 'text-status-active bg-status-active/10 hover:bg-status-active/20' },
  { label: 'Quản lý Users', icon: Users, path: '/admin/users', color: 'text-status-pending bg-status-pending/10 hover:bg-status-pending/20' },
  { label: 'Gửi Broadcast', icon: Send, path: '/admin/notifications', color: 'text-status-banned bg-status-banned/10 hover:bg-status-banned/20' },
]

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <Card className="p-6 bg-background-card border border-background-muted shadow-sm h-full">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Thao tác nhanh</h2>
      <div className="grid grid-cols-2 gap-4">
        {ACTIONS.map((action, idx) => {
          const Icon = action.icon
          return (
            <button
              key={idx}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all duration-200 border border-transparent hover:scale-[1.03] hover:shadow-sm ${action.color}`}
            >
              <Icon size={24} />
              <span className="text-sm font-medium text-text-primary">{action.label}</span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
