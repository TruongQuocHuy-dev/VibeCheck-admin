import type { ReactNode } from 'react'

type ToastProps = {
  open?: boolean
  title?: string
  description?: string
  action?: ReactNode
}

export function Toast({ open = false, title, description, action }: ToastProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-background-muted bg-background-card px-4 py-3 shadow-2xl shadow-black/35">
      {title ? <p className="text-sm font-semibold text-text-primary">{title}</p> : null}
      {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  )
}