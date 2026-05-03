import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStories, deleteStory } from '../services';
import type { StoryQueryParams } from '../types';

export const useStories = (params: StoryQueryParams) => {
  return useQuery({
    queryKey: ['stories', params],
    queryFn: () => fetchStories(params),
    staleTime: 30 * 1000,
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
};
