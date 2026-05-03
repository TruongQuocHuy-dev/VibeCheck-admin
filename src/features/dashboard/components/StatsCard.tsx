import { Badge } from '../../../shared/ui/Badge'
import { Card } from '../../../shared/ui/Card'
import type { ActivityTone, StatsCardModel } from '../types'

const toneClasses: Record<ActivityTone, string> = {
  neutral: 'from-white/8 to-white/4 border-background-muted',
  success: 'from-status-active/12 to-white/4 border-status-active/30',
  warning: 'from-status-pending/12 to-white/4 border-status-pending/30',
  danger: 'from-status-banned/12 to-white/4 border-status-banned/30',
  primary: 'from-primary/16 to-white/4 border-primary/30',
}

type StatsCardProps = StatsCardModel & {
  suffix?: string
}

export function StatsCard({ label, value, helperText, tone, suffix }: StatsCardProps) {
  return (
    <Card className={`bg-gradient-to-br p-5 ${toneClasses[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text-secondary">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            {value.toLocaleString('en-US')}
            {suffix ? <span className="ml-1 text-lg text-text-secondary">{suffix}</span> : null}
          </p>
        </div>

        <Badge tone={tone === 'danger' ? 'danger' : tone === 'warning' ? 'warning' : tone === 'success' ? 'success' : tone === 'primary' ? 'primary' : 'neutral'}>
          Live
        </Badge>
      </div>

      <p className="mt-4 text-sm leading-6 text-text-secondary">{helperText}</p>
    </Card>
  )
}