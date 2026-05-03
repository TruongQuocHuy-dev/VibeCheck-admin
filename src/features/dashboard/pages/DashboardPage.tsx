import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../../../shared/ui/Button'
import { Card } from '../../../shared/ui/Card'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { RecentActivity } from '../components/RecentActivity'
import { StatsCard } from '../components/StatsCard'
import { useDashboardStats } from '../hooks/useDashboardStats'
import type { StatsCardModel } from '../types'

const pageSize = 5

function createPageLink(page: number) {
  const params = new URLSearchParams()
  params.set('page', String(page))
  return params
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-5">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="mt-4 h-10 w-24 rounded-2xl" />
            <Skeleton className="mt-4 h-4 w-full rounded-full" />
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <Skeleton className="h-5 w-40 rounded-full" />
        <Skeleton className="mt-4 h-4 w-3/5 rounded-full" />
        <Skeleton className="mt-6 h-16 w-full rounded-3xl" />
        <Skeleton className="mt-3 h-16 w-full rounded-3xl" />
        <Skeleton className="mt-3 h-16 w-full rounded-3xl" />
      </Card>
    </div>
  )
}

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dashboardQuery = useDashboardStats()

  const currentPage = Number(searchParams.get('page') ?? '1')
  const safePage = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1

  const stats = dashboardQuery.data
  const pageCount = Math.max(1, Math.ceil((stats?.recentActivity.length ?? 0) / pageSize))
  const activePage = Math.min(safePage, pageCount)

  useEffect(() => {
    if (activePage !== safePage) {
      setSearchParams(createPageLink(activePage), { replace: true })
    }
  }, [activePage, safePage, setSearchParams])

  const paginatedActivities = useMemo(() => {
    const items = stats?.recentActivity ?? []
    const startIndex = (activePage - 1) * pageSize
    return items.slice(startIndex, startIndex + pageSize)
  }, [activePage, stats?.recentActivity])

  const statsCards: StatsCardModel[] = useMemo(
    () => [
      {
        key: 'totalUsers',
        label: 'Total Users',
        value: stats?.totalUsers ?? 0,
        helperText: 'All registered admin-visible accounts in the system.',
        tone: 'primary' as const,
      },
      {
        key: 'activeToday',
        label: 'Active Today',
        value: stats?.activeToday ?? 0,
        helperText: 'Users active within the current calendar day.',
        tone: 'success' as const,
      },
      {
        key: 'reportedVibes',
        label: 'Reported Vibes',
        value: stats?.reportedVibes ?? 0,
        helperText: 'Vibes flagged by the moderation pipeline or community.',
        tone: 'warning' as const,
      },
      {
        key: 'pendingReports',
        label: 'Pending Reports',
        value: stats?.pendingReports ?? 0,
        helperText: 'Open moderation reports waiting for review.',
        tone: 'danger' as const,
      },
    ],
    [stats],
  )

  if (dashboardQuery.isPending && !stats) {
    return <DashboardSkeleton />
  }

  if (dashboardQuery.isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-2xl p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Dashboard error
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text-primary">
            Could not load admin dashboard
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            The dashboard request failed. Retry to fetch stats again.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => dashboardQuery.refetch()}>Retry</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statsCards.map(({ key: cardKey, ...card }) => (
          <StatsCard key={cardKey} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <RecentActivity
          items={paginatedActivities}
          page={activePage}
          pageCount={pageCount}
          totalCount={stats?.recentActivity.length ?? 0}
          onPageChange={(nextPage) => setSearchParams(createPageLink(nextPage), { replace: true })}
        />

        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Sync status
          </p>
          <h2 className="mt-3 text-xl font-semibold text-text-primary">Data pipeline health</h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Dashboard data is fetched via React Query. Axios automatically injects the vibe_token
            header and falls back to /users, /vibes, and /reports if /admin/stats is not
            available.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-background-muted bg-black/20 p-4">
              <p className="text-sm text-text-secondary">Last updated</p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                {stats?.lastUpdated ?? 'Just now'}
              </p>
            </div>
            <div className="rounded-2xl border border-background-muted bg-black/20 p-4">
              <p className="text-sm text-text-secondary">Query key</p>
              <p className="mt-1 text-sm font-medium text-text-primary">dashboard.stats</p>
            </div>
            <div className="rounded-2xl border border-background-muted bg-black/20 p-4">
              <p className="text-sm text-text-secondary">Routing</p>
              <p className="mt-1 text-sm font-medium text-text-primary">Protected admin shell</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}