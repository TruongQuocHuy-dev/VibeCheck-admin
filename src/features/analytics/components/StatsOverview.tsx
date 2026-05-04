import React from 'react';
import { MetricCard } from './MetricCard';
import { Users, Activity, ShieldAlert, Target } from 'lucide-react';
import type { StatsOverviewData } from '../types';
import { Skeleton } from '../../../shared/ui/Skeleton';

interface StatsOverviewProps {
  data?: StatsOverviewData;
  isLoading: boolean;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-[140px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const scrollToChart = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Người dùng mới"
        value={data.newUsers.value}
        trend={data.newUsers.trend}
        comparedTo={data.newUsers.comparedTo}
        variant={data.newUsers.variant}
        icon={<Users size={20} />}
        onClick={() => scrollToChart('growth-chart')}
      />
      <MetricCard
        title="DAU (Hoạt động)"
        value={data.dau.value}
        trend={data.dau.trend}
        comparedTo={data.dau.comparedTo}
        variant={data.dau.variant}
        icon={<Activity size={20} />}
        onClick={() => scrollToChart('activity-metrics')}
      />
      <MetricCard
        title="Báo cáo vi phạm"
        value={data.reports.value}
        trend={data.reports.trend}
        comparedTo={data.reports.comparedTo}
        variant={data.reports.variant}
        icon={<ShieldAlert size={20} />}
        onClick={() => scrollToChart('safety-chart')}
      />
      <MetricCard
        title="Retention (7 ngày)"
        value={data.retention7d.value}
        trend={data.retention7d.trend}
        comparedTo={data.retention7d.comparedTo}
        variant={data.retention7d.variant}
        icon={<Target size={20} />}
        onClick={() => scrollToChart('retention-chart')}
      />
    </div>
  );
};
