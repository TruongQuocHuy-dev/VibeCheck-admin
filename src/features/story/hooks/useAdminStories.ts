import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminStories, fetchStoryStats, deleteStory, hideStory, extendStory, bulkDeleteStories } from '../services';
import type { StoryQueryParams } from '../types';

export const useAdminStories = (params: StoryQueryParams) => {
  return useQuery({
    queryKey: ['admin-stories', params],
    queryFn: () => fetchAdminStories(params),
    staleTime: 30 * 1000,
    refetchInterval: 5 * 60 * 1000, // 5 min auto-refresh
  });
};

export const useStoryStats = () => {
  return useQuery({
    queryKey: ['story-stats'],
    queryFn: fetchStoryStats,
    staleTime: 60 * 1000,
  });
};

export const useModerateStory = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
      queryClient.invalidateQueries({ queryKey: ['story-stats'] });
    },
  });

  const hideMutation = useMutation({
    mutationFn: (id: string) => hideStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
    },
  });

  const extendMutation = useMutation({
    mutationFn: (id: string) => extendStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => bulkDeleteStories(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
      queryClient.invalidateQueries({ queryKey: ['story-stats'] });
    },
  });

  return {
    deleteStory: deleteMutation,
    hideStory: hideMutation,
    extendStory: extendMutation,
    bulkDeleteStories: bulkDeleteMutation,
  };
};
