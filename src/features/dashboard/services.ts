import { api } from '../../shared/lib/api'
import type { DashboardStats, RecentActivityItem, ChartDataPoint, SystemHealth } from './types'

// TODO: Replace with real API
function generateMockChartsData() {
  const userGrowth: ChartDataPoint[] = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    userGrowth.push({
      name: d.toLocaleDateString('vi-VN', { weekday: 'short' }),
      users: Math.floor(Math.random() * 50) + 100 + (6 - i) * 10
    })
  }

  const contentStatus: ChartDataPoint[] = [
    { name: 'Active', value: 750 },
    { name: 'Hidden', value: 120 },
    { name: 'Reported', value: 45 },
  ]

  const reportsByType: ChartDataPoint[] = [
    { name: 'Spam', count: 120 },
    { name: 'Inappropriate', count: 85 },
    { name: 'Harassment', count: 40 },
    { name: 'Other', count: 25 },
  ]

  return { userGrowth, contentStatus, reportsByType }
}

// TODO: Replace with real API
function generateMockSystemHealth(): SystemHealth {
  return {
    serverStatus: 'online',
    dbConnection: 'connected',
    lastBackup: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    activeAdmins: 3,
  }
}

// TODO: Replace with real API
function generateMockActivity(): RecentActivityItem[] {
  return [
    {
      id: 'act-1',
      timestamp: new Date().toISOString(),
      type: 'admin_action',
      user: 'Admin Truong',
      action: 'Duyệt Vibe #1024',
      status: 'completed',
    },
    {
      id: 'act-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      type: 'report',
      user: 'User_982',
      action: 'Báo cáo Vibe #1025 (Spam)',
      status: 'pending',
    },
    {
      id: 'act-3',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      type: 'new_user',
      user: 'Nguyen Van A',
      action: 'Đăng ký tài khoản',
      status: 'completed',
    },
    {
      id: 'act-4',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      type: 'admin_action',
      user: 'Admin Dat',
      action: 'Khóa tài khoản User_112',
      status: 'completed',
    },
    {
      id: 'act-5',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      type: 'report',
      user: 'System',
      action: 'Phát hiện nội dung nhạy cảm',
      status: 'pending',
    },
  ]
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  let totalUsers = 1500
  let pendingReports = 12
  let pendingContent = 45
  
  // Try to fetch real stats if available
  try {
    const { data } = await api.get('/admin/stats')
    if (data?.data) {
      totalUsers = data.data.users ?? totalUsers
      pendingReports = data.data.reports ?? pendingReports
    }
  } catch (err) {
    // Fallback to mock data if API fails
    console.warn('Failed to fetch real stats, using mock data', err)
  }

  return {
    totalUsers,
    totalUsersTrend: 12.5, // Mock trend
    activeNow: Math.floor(Math.random() * 50) + 100, // Mock active now
    pendingReports,
    pendingContent,
    recentActivity: generateMockActivity(),
    charts: generateMockChartsData(),
    systemHealth: generateMockSystemHealth(),
    lastUpdated: new Date().toISOString(),
  }
}