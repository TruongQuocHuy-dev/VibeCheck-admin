import { Badge } from '../../../shared/ui/Badge'
import { Button } from '../../../shared/ui/Button'
import { Card } from '../../../shared/ui/Card'
import type { RecentActivityItem } from '../types'

type RecentActivityProps = {
  items: RecentActivityItem[]
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  totalCount: number
}

const activityToneToBadgeTone = {
  neutral: 'neutral',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  primary: 'primary',
} as const

const dateTimeFormatter = new Intl.DateTimeFormat('vi-VN', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatTimestamp(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateTimeFormatter.format(date)
}

export function RecentActivity({
  items,
  page,
  pageCount,
  onPageChange,
  totalCount,
}: RecentActivityProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-background-muted px-5 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-text-secondary">
            Recent activity
          </p>
          <h2 className="mt-2 text-xl font-semibold text-text-primary">Latest moderation events</h2>
        </div>

        <p className="text-sm text-text-secondary">
          Showing {items.length} of {totalCount} records
        </p>
      </div>

      <div className="divide-y divide-background-muted/80">
        {items.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-text-secondary">
            No recent activity available yet.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={activityToneToBadgeTone[item.tone]}>{item.kind}</Badge>
                  <p className="text-base font-semibold text-text-primary">{item.title}</p>
                </div>
                <p className="text-sm leading-6 text-text-secondary">{item.description}</p>
              </div>

              <p className="text-sm text-text-secondary lg:text-right">{formatTimestamp(item.timestamp)}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-background-muted px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary">
          Page {page} of {pageCount}
        </p>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <Button variant="secondary" size="sm" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}