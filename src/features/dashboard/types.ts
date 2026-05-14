export type DashboardStatKey =
  | 'totalUsers'
  | 'activeNow'
  | 'pendingReports'
  | 'pendingContent'

export type ActivityAction = 'admin_action' | 'new_user' | 'report'

export type ActivityTone = 'neutral' | 'success' | 'warning' | 'danger' | 'primary'

export type RecentActivityItem = {
  id: string
  timestamp: string
  type: ActivityAction
  user: string
  action: string
  status: 'completed' | 'pending' | 'failed'
}

export type ChartDataPoint = {
  name: string
  [key: string]: string | number
}

export type SystemHealth = {
  serverStatus: 'online' | 'offline' | 'degraded'
  dbConnection: 'connected' | 'disconnected' | 'latency'
  lastBackup: string
  activeAdmins: number
}

export type DashboardStats = {
  totalUsers: number
  totalUsersTrend: number
  activeNow: number
  pendingReports: number
  pendingContent: number
  recentActivity: RecentActivityItem[]
  charts: {
    userGrowth: ChartDataPoint[]
    contentStatus: ChartDataPoint[]
    reportsByType: ChartDataPoint[]
  }
  systemHealth: SystemHealth
  lastUpdated: string
}

export type StatsCardModel = {
  key: DashboardStatKey
  label: string
  value: number | string
  trend?: number
  tone: ActivityTone
}