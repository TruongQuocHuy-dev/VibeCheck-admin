import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchVibeTags, 
  createVibeTag, 
  updateVibeTag, 
  deleteVibeTag 
} from '../services';
import type { VibeTagQueryParams, CreateVibeTagDTO, UpdateVibeTagDTO } from '../types';
import { toast } from 'react-hot-toast';

export const useVibeTags = (params: VibeTagQueryParams) => {
  return useQuery({
    queryKey: ['vibe-tags', params],
    queryFn: () => fetchVibeTags(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateVibeTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVibeTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vibe-tags'] });
      toast.success('Đã tạo vibe tag thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể tạo vibe tag');
    },
  });
};

export const useUpdateVibeTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateVibeTagDTO }) => 
      updateVibeTag(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vibe-tags'] });
      toast.success('Đã cập nhật vibe tag thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể cập nhật vibe tag');
    },
  });
};

export const useDeleteVibeTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVibeTag,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vibe-tags'] });
      toast.success(data.message || 'Đã xóa vibe tag thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể xóa vibe tag');
    },
  });
};
