import { api } from '../../shared/lib/api';
import type { AnalyticsParams, AnalyticsResponse } from './types';
import { subDays, format, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';

export const fetchAnalytics = async (params: AnalyticsParams): Promise<AnalyticsResponse> => {
  // TODO: Cần endpoint GET /admin/analytics ở backend
  // return api.get('/admin/analytics', { params }).then(res => res.data);

  // Mock data for development
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

  const { from, to, granularity } = params;
  const startDate = new Date(from);
  const endDate = new Date(to);

  let intervals: Date[] = [];
  if (granularity === 'day') {
    intervals = eachDayOfInterval({ start: startDate, end: endDate });
  } else if (granularity === 'week') {
    intervals = eachWeekOfInterval({ start: startDate, end: endDate });
  } else {
    intervals = eachMonthOfInterval({ start: startDate, end: endDate });
  }

  return {
    metrics: {
      newUsers: { value: 1250, trend: '+12%', comparedTo: 'kỳ trước', variant: 'positive' },
      dau: { value: 3420, trend: '+5%', comparedTo: 'kỳ trước', variant: 'positive' },
      reports: { value: 48, trend: '-8%', comparedTo: 'kỳ trước', variant: 'positive' },
      retention7d: { value: '42%', trend: '+3%', comparedTo: 'kỳ trước', variant: 'positive' }
    },
    charts: {
      growth: intervals.map(date => ({
        date: format(date, 'yyyy-MM-dd'),
        users: Math.floor(Math.random() * 200) + 50
      })),
      activity: {
        dauMauRatio: 22.8,
        totalMatches: 8540,
        messagesSent: 42300,
        avgSessionDuration: '12m 45s'
      },
      safety: intervals.map(date => ({
        date: format(date, 'yyyy-MM-dd'),
        reports: Math.floor(Math.random() * 20) + 5,
        bans: Math.floor(Math.random() * 5),
        avgResolutionTime: Math.floor(Math.random() * 10) + 2
      })),
      retention: Array.from({ length: 6 }).map((_, i) => ({
        cohort: `Tuần ${i + 1}`,
        day1: Math.floor(Math.random() * 20) + 60,
        day7: Math.floor(Math.random() * 15) + 35,
        day30: Math.floor(Math.random() * 10) + 15
      }))
    }
  };
};
