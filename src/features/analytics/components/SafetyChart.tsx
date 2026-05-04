import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../../../shared/ui/Card';
import { CHART_COLORS, formatDate, formatNumber } from '../utils';
import type { SafetyDataPoint, Granularity } from '../types';

interface SafetyChartProps {
  data: SafetyDataPoint[];
  granularity: Granularity;
}

export const SafetyChart: React.FC<SafetyChartProps> = ({ data, granularity }) => {
  return (
    <Card id="safety-chart" className="p-6 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">An toàn & Kiểm duyệt</h3>
          <p className="text-sm text-text-secondary">Báo cáo, Tài khoản bị khóa & Thời gian xử lý</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-xs text-text-secondary">Báo cáo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-danger" />
            <span className="text-xs text-text-secondary">Bị khóa</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
              unit="h"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: CHART_COLORS.tooltip.bg, 
                border: `1px solid ${CHART_COLORS.tooltip.border}`,
                borderRadius: '8px',
                color: '#fff'
              }}
              labelFormatter={(val) => `Ngày: ${formatDate(val, 'day')}`}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Bar yAxisId="left" dataKey="reports" name="Báo cáo" fill={CHART_COLORS.warning} radius={[4, 4, 0, 0]} barSize={20} />
            <Bar yAxisId="left" dataKey="bans" name="Bị khóa" fill={CHART_COLORS.danger} radius={[4, 4, 0, 0]} barSize={20} />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="avgResolutionTime" 
              name="Thời gian xử lý (giờ)" 
              stroke={CHART_COLORS.secondary} 
              strokeWidth={3}
              dot={{ fill: CHART_COLORS.secondary, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
