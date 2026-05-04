import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../../../shared/ui/Card';
import { CHART_COLORS } from '../utils';
import type { RetentionDataPoint } from '../types';

interface RetentionChartProps {
  data: RetentionDataPoint[];
}

export const RetentionChart: React.FC<RetentionChartProps> = ({ data }) => {
  return (
    <Card id="retention-chart" className="p-6 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Tỷ lệ giữ chân (Retention)</h3>
          <p className="text-sm text-text-secondary">Tỷ lệ người dùng quay lại sau ngày đăng ký</p>
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
            <XAxis 
              dataKey="cohort" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
              unit="%"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: CHART_COLORS.tooltip.bg, 
                border: `1px solid ${CHART_COLORS.tooltip.border}`,
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(val: number) => [`${val}%`, '']}
            />
            <Legend verticalAlign="top" height={36} iconType="plainline" />
            <Line 
              type="monotone" 
              dataKey="day1" 
              name="Day 1" 
              stroke="#A78BFA" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="day7" 
              name="Day 7" 
              stroke="#7C3AED" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="day30" 
              name="Day 30" 
              stroke="#5B21B6" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-background-muted/50 rounded-lg border border-background-muted">
        <p className="text-xs text-text-secondary">
          <span className="font-semibold text-text-primary">💡 Insight:</span> Tỷ lệ giữ chân Day 7 tăng 5% cho nhóm user có trên 3 matches trong ngày đầu tiên.
        </p>
      </div>
    </Card>
  );
};
