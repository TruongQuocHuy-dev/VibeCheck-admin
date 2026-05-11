import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'

export type AuthUser = {
  id: string
  email?: string
  phone?: string
  role: 'user' | 'admin' | 'mod'
  fullName?: string
  displayName?: string
  avatar?: string
}

const AUTH_TOKEN_KEY = 'vibe_token'

export function useAuth() {
  const queryClient = useQueryClient()

  // Kiểm tra token tồn tại trong localStorage
  const hasToken = !!localStorage.getItem(AUTH_TOKEN_KEY)

  const { 
    data: user, 
    isLoading, 
    isFetching,
    refetch 
  } = useQuery<AuthUser | null>({
    queryKey: ['auth-user'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/users/profile')
        // Thích ứng với các format response khác nhau từ BE
        const userData = data.data?.user ?? data.user ?? data
        return userData as AuthUser
      } catch (error) {
        // Interceptor đã xử lý xóa token, ở đây chỉ trả về null
        return null
      }
    },
    // Chỉ fetch khi có token trong localStorage
    enabled: hasToken,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000,
    retry: false,
  })

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    // Clear toàn bộ cache để bảo mật
    queryClient.clear()
    // Chuyển hướng cứng để reset toàn bộ state của app
    window.location.href = '/login'
  }, [queryClient])

  return {
    user: user || null,
    isLoading: isLoading || (hasToken && isFetching && !user),
    logout,
    refetch,
    isAuthenticated: !!user && hasToken,
  }
}