import type { HTMLAttributes } from 'react'

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'primary'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
}

const toneClassNames: Record<BadgeTone, string> = {
  neutral: 'border-background-muted bg-black/20 text-text-secondary',
  success: 'border-status-active/30 bg-status-active/10 text-status-active',
  warning: 'border-status-pending/30 bg-status-pending/10 text-status-pending',
  danger: 'border-status-banned/30 bg-status-banned/10 text-status-banned',
  primary: 'border-primary/30 bg-primary/10 text-primary',
}

export function Badge({ tone = 'neutral', className = '', ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide',
        toneClassNames[tone],
        className,
      ].join(' ')}
    />
  )
}