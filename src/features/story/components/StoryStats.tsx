import { StatsCard } from '../../dashboard/components/StatsCard';
import type { StoryStats } from '../types';

interface StoryStatsProps {
  stats?: StoryStats;
}

export function StoryStats({ stats }: StoryStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        key="activeStories"
        label="Active Stories"
        value={stats?.active || 0}
        helperText="Total currently live"
        tone="primary"
      />
      <StatsCard
        key="reportedStories"
        label="Reported"
        value={stats?.reported || 0}
        helperText="Needs attention"
        tone={stats?.reported && stats.reported > 10 ? 'danger' : 'warning'}
      />
      <StatsCard
        key="expiringStories"
        label="Expiring Soon"
        value={stats?.expiringSoon || 0}
        helperText="< 2h remaining"
        tone="warning"
      />
      <StatsCard
        key="storyViews"
        label="Total Views (24h)"
        value={stats?.totalViews || 0}
        helperText="Platform reach"
        tone="success"
      />
    </div>
  );
}
