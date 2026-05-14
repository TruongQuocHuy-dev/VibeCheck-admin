import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '../../../shared/ui/Card'
import type { ChartDataPoint } from '../types'

type UserGrowthChartProps = {
  data: ChartDataPoint[]
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  // Use a modern primary color (purple/indigo) to match the dark mode theme
  const chartColor = '#8b5cf6' 

  return (
    <Card className="p-5 bg-background-card border border-background-muted shadow-sm h-full min-h-[300px] flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-text-primary">Tăng trưởng người dùng</h2>
        <p className="text-sm text-text-secondary">Lượng người dùng mới trong 7 ngày qua.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke={chartColor} 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#1a1a1a' }}
              activeDot={{ r: 6, fill: chartColor }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
