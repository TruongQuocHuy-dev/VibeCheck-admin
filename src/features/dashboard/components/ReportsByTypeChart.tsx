import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card } from '../../../shared/ui/Card'
import type { ChartDataPoint } from '../types'

type ReportsByTypeChartProps = {
  data: ChartDataPoint[]
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#64748b'] // Red, Orange, Yellow, Gray

export function ReportsByTypeChart({ data }: ReportsByTypeChartProps) {
  return (
    <Card className="p-5 bg-background-card border border-background-muted shadow-sm h-full min-h-[300px] flex flex-col">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-text-primary">Báo cáo theo loại</h2>
      </div>
      
      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#888" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#888" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              cursor={{ fill: '#333', opacity: 0.4 }}
              contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={1500}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
