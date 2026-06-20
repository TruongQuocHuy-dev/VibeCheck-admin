import React from 'react';
import { Card } from '../../../shared/ui/Card';
import type { ActivityMetricsData } from '../types';
import { Heart, MessageSquare, Clock, Gauge } from 'lucide-react';
import { CHART_COLORS } from '../utils';

interface ActivityMetricsProps {
  data: ActivityMetricsData;
}

export const ActivityMetrics: React.FC<ActivityMetricsProps> = ({ data }) => {
  return (
    <div id="activity-metrics" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
            <Gauge size={18} />
          </div>
          <span className="text-sm font-medium text-text-secondary">Tỷ lệ DAU/MAU</span>
        </div>
        <div className="flex items-end justify-between mb-2">
          <span className="text-3xl font-bold text-text-primary">{data.dauMauRatio}%</span>
        </div>
        <div className="w-full bg-background-muted h-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${data.dauMauRatio}%` }}
          />
        </div>
        <p className="text-[10px] text-text-muted mt-2 uppercase tracking-wider">Mức độ tương tác lý tưởng: {'>'}20%</p>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-pink-500/10 text-pink-500 rounded-lg">
            <Heart size={18} />
          </div>
          <span className="text-sm font-medium text-text-secondary">Tổng số Matches</span>
        </div>
        <span className="text-3xl font-bold text-text-primary">{data.totalMatches.toLocaleString()}</span>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-1 w-full bg-pink-500/10 rounded-full">
            <div className="h-full w-2/3 bg-pink-500 rounded-full" />
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <MessageSquare size={18} />
          </div>
          <span className="text-sm font-medium text-text-secondary">Tin nhắn đã gửi</span>
        </div>
        <span className="text-3xl font-bold text-text-primary">{data.messagesSent.toLocaleString()}</span>
        <div className="flex items-center gap-1 mt-2 text-status-active text-xs font-medium">
          <span>{data.messagesSent > 0 ? `+${Math.round(data.messagesSent * 0.12).toLocaleString()} tin nhắn trong chu kỳ` : 'Chưa ghi nhận tin nhắn'}</span>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-warning/10 text-warning rounded-lg">
            <Clock size={18} />
          </div>
          <span className="text-sm font-medium text-text-secondary">Thời gian truy cập TB</span>
        </div>
        <span className="text-3xl font-bold text-text-primary">{data.avgSessionDuration}</span>
        <p className="text-[10px] text-text-muted mt-2 uppercase tracking-wider">Tính toán dựa trên tương tác</p>
      </Card>
    </div>
  );
};
