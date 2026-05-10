import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPages, savePage, deletePage } from '../services';
import type { CMSPage } from '../types';

export const usePages = () => {
  const queryClient = useQueryClient();

  const pagesQuery = useQuery({
    queryKey: ['cms-pages'],
    queryFn: fetchPages,
  });

  const savePageMutation = useMutation({
    mutationFn: savePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
    },
  });

  const deletePageMutation = useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
    },
  });

  return {
    pages: pagesQuery.data || [],
    isLoading: pagesQuery.isLoading,
    isError: pagesQuery.isError,
    savePage: savePageMutation.mutateAsync,
    isSaving: savePageMutation.isPending,
    deletePage: deletePageMutation.mutateAsync,
    isDeleting: deletePageMutation.isPending,
  };
};
