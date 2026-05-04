export type Granularity = 'day' | 'week' | 'month';

export interface AnalyticsParams {
  from: string;
  to: string;
  granularity: Granularity;
}

export interface MetricValue {
  value: number | string;
  trend: string;
  comparedTo: string;
  variant?: 'positive' | 'negative' | 'neutral';
}

export interface StatsOverviewData {
  newUsers: MetricValue;
  dau: MetricValue;
  reports: MetricValue;
  retention7d: MetricValue;
}

export interface GrowthDataPoint {
  date: string;
  users: number;
}

export interface ActivityMetricsData {
  dauMauRatio: number;
  totalMatches: number;
  messagesSent: number;
  avgSessionDuration: string;
}

export interface SafetyDataPoint {
  date: string;
  reports: number;
  bans: number;
  avgResolutionTime: number; // in hours
}

export interface RetentionDataPoint {
  cohort: string;
  day1: number;
  day7: number;
  day30: number;
}

export interface AnalyticsResponse {
  metrics: StatsOverviewData;
  charts: {
    growth: GrowthDataPoint[];
    activity: ActivityMetricsData;
    safety: SafetyDataPoint[];
    retention: RetentionDataPoint[];
  };
}
