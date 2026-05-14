import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '../../../shared/ui/Card'
import type { ChartDataPoint } from '../types'

type ContentDistributionChartProps = {
  data: ChartDataPoint[]
}

const COLORS = ['#22c55e', '#64748b', '#ef4444'] // Active (Green), Hidden (Gray), Reported (Red)

export function ContentDistributionChart({ data }: ContentDistributionChartProps) {
  return (
    <Card className="p-5 bg-background-card border border-background-muted shadow-sm h-full min-h-[300px] flex flex-col">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-text-primary">Trạng thái nội dung</h2>
      </div>
      
      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
