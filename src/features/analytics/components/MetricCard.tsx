import React from 'react';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: string;
  comparedTo: string;
  variant?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  comparedTo,
  variant = 'neutral',
  icon,
  onClick,
}) => {
  const isPositive = variant === 'positive';
  const isNegative = variant === 'negative';

  const TrendIcon = trend.startsWith('+') ? TrendingUp : trend.startsWith('-') ? TrendingDown : Minus;

  return (
    <Card 
      className="p-6 cursor-pointer hover:border-primary/50 transition-all group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {value}
          </h3>
        </div>
        <div className="p-2 bg-background-muted rounded-lg text-text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-all">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <Badge 
          variant={isPositive ? 'success' : isNegative ? 'error' : 'secondary'}
          className="flex items-center gap-1 py-0.5 px-2"
        >
          <TrendIcon size={12} />
          {trend}
        </Badge>
        <span className="text-text-muted text-xs">so với {comparedTo}</span>
      </div>
    </Card>
  );
};
