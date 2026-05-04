import { useSearchParams } from 'react-router-dom';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import type { Granularity } from '../types';

export const useDateRange = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const from = searchParams.get('from') || format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const to = searchParams.get('to') || format(new Date(), 'yyyy-MM-dd');
  const granularity = (searchParams.get('granularity') as Granularity) || 'day';

  const setRange = (newFrom: string, newTo: string, newGranularity?: Granularity) => {
    const params = new URLSearchParams(searchParams);
    params.set('from', newFrom);
    params.set('to', newTo);
    if (newGranularity) {
      params.set('granularity', newGranularity);
    }
    setSearchParams(params);
  };

  const setPreset = (preset: 'today' | '7days' | '30days' | 'thisMonth') => {
    const today = new Date();
    let newFrom = '';
    let newTo = format(today, 'yyyy-MM-dd');
    let newGranularity: Granularity = 'day';

    switch (preset) {
      case 'today':
        newFrom = format(today, 'yyyy-MM-dd');
        newGranularity = 'day';
        break;
      case '7days':
        newFrom = format(subDays(today, 7), 'yyyy-MM-dd');
        newGranularity = 'day';
        break;
      case '30days':
        newFrom = format(subDays(today, 30), 'yyyy-MM-dd');
        newGranularity = 'day';
        break;
      case 'thisMonth':
        newFrom = format(startOfMonth(today), 'yyyy-MM-dd');
        newTo = format(endOfMonth(today), 'yyyy-MM-dd');
        newGranularity = 'week';
        break;
    }

    setRange(newFrom, newTo, newGranularity);
  };

  return {
    from,
    to,
    granularity,
    setRange,
    setPreset,
  };
};
