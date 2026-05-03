import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-[1.75rem] border border-background-muted bg-background-card/95 shadow-2xl shadow-black/25 backdrop-blur',
        className,
      ].join(' ')}
    />
  )
}