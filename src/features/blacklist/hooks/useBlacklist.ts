import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { 
  fetchBlacklist, 
  fetchBlacklistStats, 
  addBlacklistWord, 
  updateBlacklistWord, 
  deleteBlacklistWord,
  type BlacklistFilters,
  type BlacklistWord
} from '../services';

export const useBlacklist = (filters: BlacklistFilters) => {
  return useQuery({
    queryKey: ['blacklist', filters],
    queryFn: () => fetchBlacklist(filters),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useBlacklistStats = () => {
  return useQuery({
    queryKey: ['blacklist-stats'],
    queryFn: fetchBlacklistStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAddBlacklistWord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addBlacklistWord,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
      queryClient.invalidateQueries({ queryKey: ['blacklist-stats'] });
      toast.success(response.message || 'Thêm từ khóa thành công');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Không thể thêm từ khóa';
      toast.error(message);
    },
  });
};

export const useUpdateBlacklistWord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<BlacklistWord> }) => 
      updateBlacklistWord(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
      queryClient.invalidateQueries({ queryKey: ['blacklist-stats'] });
      toast.success(response.message || 'Cập nhật từ khóa thành công');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Không thể cập nhật từ khóa';
      toast.error(message);
    },
  });
};

export const useToggleBlacklistStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string, isActive: boolean }) => 
      updateBlacklistWord(id, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
      queryClient.invalidateQueries({ queryKey: ['blacklist-stats'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Không thể thay đổi trạng thái';
      toast.error(message);
    },
  });
};

export const useDeleteBlacklistWord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBlacklistWord,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
      queryClient.invalidateQueries({ queryKey: ['blacklist-stats'] });
      toast.success(response.message || 'Đã xóa từ khóa');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Không thể xóa từ khóa';
      toast.error(message);
    },
  });
};
