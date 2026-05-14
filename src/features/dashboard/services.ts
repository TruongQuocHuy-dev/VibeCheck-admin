import { api } from '../../shared/lib/api'
import type { DashboardStats } from './types'

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const [statsRes, activityRes, chartsRes] = await Promise.all([
    api.get('/admin/stats'),
    api.get('/admin/dashboard/activity'),
    api.get('/admin/dashboard/charts')
  ])

  const statsData = statsRes.data.data
  const activityData = activityRes.data.data
  const chartsData = chartsRes.data.data

  return {
    totalUsers: statsData.totalUsers,
    totalUsersTrend: statsData.totalUsersTrend,
    activeNow: statsData.activeNow,
    pendingReports: statsData.pendingReports,
    pendingContent: statsData.pendingContent,
    recentActivity: activityData,
    charts: chartsData,
    systemHealth: {
      serverStatus: 'online',
      dbConnection: 'connected',
      lastBackup: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      activeAdmins: 3,
    },
    lastUpdated: new Date().toISOString(),
  }
}