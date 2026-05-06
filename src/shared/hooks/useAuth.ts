import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'

export type AuthUser = {
  _id: string
  email: string
  role: 'user' | 'admin' | 'mod'
  status: 'active' | 'banned'
  fullName?: string
  displayName?: string
  name?: string
}

const AUTH_TOKEN_KEY = 'vibe_token'

export function useAuth() {
  const queryClient = useQueryClient()

  const { data: user, isLoading: loading, refetch } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      if (!token) return null

      try {
        const { data } = await api.get('/users/profile')
        return data.data?.user ?? data.user ?? data
      } catch (error) {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        return null
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    queryClient.setQueryData(['auth-user'], null)
    window.location.href = '/login'
  }, [queryClient])

  return {
    user: user || null,
    loading,
    logout,
    refetch,
  }
}