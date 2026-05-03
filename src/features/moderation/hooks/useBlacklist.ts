import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlacklist, addBlacklistWord, removeBlacklistWord, toggleBlacklistWord } from '../services';
import type { BlacklistType } from '../types';

export const useBlacklist = () => {
  return useQuery({
    queryKey: ['blacklist'],
    queryFn: fetchBlacklist,
  });
};

export const useAddWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ word, type }: { word: string; type: BlacklistType }) => addBlacklistWord(word, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    },
  });
};

export const useRemoveWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeBlacklistWord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    },
  });
};

export const useToggleWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => toggleBlacklistWord(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    },
  });
};
