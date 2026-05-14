import { useMemo } from 'react'
import { Users, Activity, AlertTriangle, Clock } from 'lucide-react'
import { Button } from '../../../shared/ui/Button'
import { Card } from '../../../shared/ui/Card'
import { Skeleton } from '../../../shared/ui/Skeleton'
import { StatsCard } from '../components/StatsCard'
import { ActivityTable } from '../components/ActivityTable'
import { QuickActions } from '../components/QuickActions'
import { SystemHealth } from '../components/SystemHealth'
import { UserGrowthChart } from '../components/UserGrowthChart'
import { ContentDistributionChart } from '../components/ContentDistributionChart'
import { ReportsByTypeChart } from '../components/ReportsByTypeChart'
import { useDashboardStats } from '../hooks/useDashboardStats'

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-6 h-[300px]">
            <Skeleton className="h-6 w-32 rounded-full mb-4 mx-auto" />
            <Skeleton className="h-full w-full rounded-xl" />
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6 h-[400px]">
            <Skeleton className="h-full w-full rounded-xl" />
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6 h-[200px]">
            <Skeleton className="h-full w-full rounded-xl" />
          </Card>
          <Card className="p-6 h-[200px]">
            <Skeleton className="h-full w-full rounded-xl" />
          </Card>
        </div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const dashboardQuery = useDashboardStats()
  const stats = dashboardQuery.data

  const statsCards = useMemo(() => {
    if (!stats) return []
    return [
      {
        key: 'totalUsers' as const,
        label: 'Tổng người dùng',
        value: stats.totalUsers,
        trend: stats.totalUsersTrend,
        tone: 'primary' as const,
        icon: <Users size={24} />,
      },
      {
        key: 'activeNow' as const,
        label: 'Đang online',
        value: stats.activeNow,
        tone: 'success' as const,
        icon: <Activity size={24} />,
      },
      {
        key: 'pendingReports' as const,
        label: 'Báo cáo chờ',
        value: stats.pendingReports,
        tone: stats.pendingReports > 0 ? 'danger' : 'neutral' as const,
        icon: <AlertTriangle size={24} />,
      },
      {
        key: 'pendingContent' as const,
        label: 'Content chờ duyệt',
        value: stats.pendingContent,
        tone: stats.pendingContent > 0 ? 'warning' : 'neutral' as const,
        icon: <Clock size={24} />,
      },
    ]
  }, [stats])

  if (dashboardQuery.isPending && !stats) {
    return <DashboardSkeleton />
  }

  if (dashboardQuery.isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-2xl p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Lỗi tải dữ liệu
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text-primary">
            Không thể tải bảng điều khiển
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Đã xảy ra lỗi khi lấy dữ liệu thống kê. Vui lòng thử lại.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => dashboardQuery.refetch()}>Thử lại</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Stats Cards */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((card, idx) => (
          <div key={card.key} className={`animate-in slide-in-from-bottom-4 duration-500 delay-[${idx * 100}ms]`}>
            <StatsCard {...card} icon={card.icon} />
          </div>
        ))}
      </section>

      {/* 2. Charts Section */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 animate-in zoom-in-95 duration-500 delay-200">
          <UserGrowthChart data={stats?.charts?.userGrowth || []} />
        </div>
        <div className="lg:col-span-1 animate-in zoom-in-95 duration-500 delay-300">
          <ContentDistributionChart data={stats?.charts?.contentStatus || []} />
        </div>
        <div className="lg:col-span-1 animate-in zoom-in-95 duration-500 delay-400">
          <ReportsByTypeChart data={stats?.charts?.reportsByType || []} />
        </div>
      </section>

      {/* 3. Bottom Layout: Activity Table + Right Sidebar (Quick Actions & Health) */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 animate-in slide-in-from-left-4 duration-500 delay-500">
          <ActivityTable items={stats?.recentActivity || []} />
        </div>

        {/* Right Stack */}
        <div className="space-y-6 lg:col-span-1">
          <div className="animate-in slide-in-from-right-4 duration-500 delay-600">
            <QuickActions />
          </div>
          {stats?.systemHealth && (
            <div className="animate-in slide-in-from-right-4 duration-500 delay-700">
              <SystemHealth health={stats.systemHealth} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}