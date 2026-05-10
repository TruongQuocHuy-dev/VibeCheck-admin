import { useQuery } from '@tanstack/react-query';
import { fetchPageVersions } from '../services';

export const usePageVersions = (pageId?: string) => {
  return useQuery({
    queryKey: ['cms-page-versions', pageId],
    queryFn: () => fetchPageVersions(pageId!),
    enabled: !!pageId,
  });
};
