import { useBlacklistStats } from '../hooks/useBlacklist'

export function BlacklistStats() {
  const { data: stats, isLoading } = useBlacklistStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-[#171717] border border-[#262626]" />
        ))}
      </div>
    )
  }

  const items = [
    { label: 'Tổng từ khóa', value: stats?.total || 0, icon: '📋', color: 'text-white' },
    { label: 'Đang hoạt động', value: stats?.active || 0, icon: '✅', color: 'text-green-500' },
    { label: 'Khớp chính xác', value: stats?.exact || 0, icon: '🎯', color: 'text-blue-500' },
    { label: 'Biểu thức (Regex)', value: stats?.regex || 0, icon: '🧬', color: 'text-purple-500' },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div 
          key={item.label}
          className="rounded-2xl border border-[#262626] bg-[#171717] p-5 shadow-sm transition-all hover:border-[#333]"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#676767] uppercase tracking-wider">{item.label}</span>
            <span className="text-lg">{item.icon}</span>
          </div>
          <p className={`mt-2 text-3xl font-bold ${item.color}`}>
            {item.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}
