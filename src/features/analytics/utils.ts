import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export const CHART_COLORS = {
  primary: '#7C3AED',      // User growth
  secondary: '#3B82F6',    // Activity
  warning: '#F59E0B',      // Reports
  danger: '#EF4444',       // Bans
  success: '#22C55E',      // Retention
  grid: '#27272A',         // Grid lines (background-muted)
  text: '#A1A1AA',         // Axis labels (text-secondary)
  tooltip: {
    bg: '#18181B',
    border: '#27272A',
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const formatDate = (dateStr: string, granularity: 'day' | 'week' | 'month'): string => {
  try {
    const date = parseISO(dateStr);
    if (granularity === 'day') return format(date, 'dd/MM', { locale: vi });
    if (granularity === 'week') return `Tuần ${format(date, 'ww', { locale: vi })}`;
    if (granularity === 'month') return format(date, 'MM/yyyy', { locale: vi });
    return dateStr;
  } catch (e) {
    return dateStr;
  }
};

export const getStatusVariant = (trend: string, type: 'users' | 'reports' | 'retention'): 'positive' | 'negative' | 'neutral' => {
  const isUp = trend.startsWith('+');
  const isDown = trend.startsWith('-');
  
  if (type === 'reports') {
    return isDown ? 'positive' : (isUp ? 'negative' : 'neutral');
  }
  
  return isUp ? 'positive' : (isDown ? 'negative' : 'neutral');
};
