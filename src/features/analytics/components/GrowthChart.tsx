import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../../../shared/ui/Card';
import { CHART_COLORS, formatDate, formatNumber } from '../utils';
import type { GrowthDataPoint, Granularity } from '../types';

interface GrowthChartProps {
  data: GrowthDataPoint[];
  granularity: Granularity;
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ data, granularity }) => {
  return (
    <Card id="growth-chart" className="p-6 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Tăng trưởng người dùng</h3>
          <p className="text-sm text-text-secondary">Số lượng người dùng mới đăng ký</p>
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
              tickFormatter={(val) => formatDate(val, granularity)}
              minTickGap={30}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
              tickFormatter={formatNumber}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: CHART_COLORS.tooltip.bg, 
                border: `1px solid ${CHART_COLORS.tooltip.border}`,
                borderRadius: '8px',
                color: '#fff'
              }}
              itemStyle={{ color: CHART_COLORS.primary }}
              labelFormatter={(val) => `Ngày: ${formatDate(val, 'day')}`}
              formatter={(val: number) => [formatNumber(val), 'Người dùng mới']}
            />
            <Area 
              type="monotone" 
              dataKey="users" 
              stroke={CHART_COLORS.primary} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorUsers)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
