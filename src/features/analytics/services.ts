import { api } from '../../shared/lib/api';
import type { AnalyticsParams, AnalyticsResponse } from './types';
import { subDays, format, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';

export const fetchAnalytics = async (params: AnalyticsParams): Promise<AnalyticsResponse> => {
  return api.get('/admin/analytics', { params }).then(res => res.data.data);
};
