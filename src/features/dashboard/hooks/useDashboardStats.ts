import { useQuery } from '@tanstack/react-query'
import { fetchDashboardStats } from '../services'

export const dashboardStatsQueryKey = ['dashboard', 'stats'] as const

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardStatsQueryKey,
    queryFn: fetchDashboardStats,
    refetchInterval: 60000,
  })
}