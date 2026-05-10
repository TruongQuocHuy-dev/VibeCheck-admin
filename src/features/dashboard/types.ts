export type DashboardStatKey =
  | 'totalUsers'
  | 'activeToday'
  | 'reportedVibes'
  | 'pendingReports'
  | 'activeStories'
  | 'reportedStories'
  | 'expiringStories'
  | 'storyViews'

export type RecentActivityKind = 'user' | 'vibe' | 'report'

export type ActivityTone = 'neutral' | 'success' | 'warning' | 'danger' | 'primary'

export type RecentActivityItem = {
  id: string
  title: string
  description: string
  timestamp: string
  kind: RecentActivityKind
  tone: ActivityTone
}

export type DashboardStats = {
  totalUsers: number
  activeToday: number
  reportedVibes: number
  pendingReports: number
  recentActivity: RecentActivityItem[]
  lastUpdated: string
}

export type StatsCardModel = {
  key: DashboardStatKey
  label: string
  value: number
  helperText: string
  tone: ActivityTone
}