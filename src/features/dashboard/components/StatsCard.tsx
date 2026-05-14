import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '../../../shared/ui/Card'
import type { StatsCardModel } from '../types'

type StatsCardProps = StatsCardModel & {
  icon: ReactNode
}

export function StatsCard({ label, value, trend, tone, icon }: StatsCardProps) {
  // We can still use tone for some subtle background/border highlights
  const borderHighlight = 
    tone === 'primary' ? 'border-primary/20' :
    tone === 'danger' ? 'border-status-banned/20' :
    tone === 'warning' ? 'border-status-pending/20' :
    tone === 'success' ? 'border-status-active/20' :
    'border-background-muted'

  const iconHighlight = 
    tone === 'primary' ? 'text-primary bg-primary/10' :
    tone === 'danger' ? 'text-status-banned bg-status-banned/10' :
    tone === 'warning' ? 'text-status-pending bg-status-pending/10' :
    tone === 'success' ? 'text-status-active bg-status-active/10' :
    'text-text-secondary bg-background-muted'

  return (
    <Card className={`relative overflow-hidden bg-background-card p-6 shadow-sm border ${borderHighlight} transition-all duration-300 hover:scale-[1.02] hover:shadow-md group`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${iconHighlight}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">{label}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
              {typeof value === 'number' ? value.toLocaleString('en-US') : value}
            </p>
          </div>
        </div>

        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${trend >= 0 ? 'bg-status-active/10 text-status-active' : 'bg-status-banned/10 text-status-banned'}`}>
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </Card>
  )
}