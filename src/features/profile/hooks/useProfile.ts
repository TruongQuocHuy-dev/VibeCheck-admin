import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services';

export const useProfile = () => {
  return useQuery({
    queryKey: ['admin-profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
