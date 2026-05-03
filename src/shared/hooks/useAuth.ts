import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/api'

export type AuthUser = {
  _id: string
  email: string
  role: 'user' | 'admin' | 'mod'
  status: 'active' | 'banned'
  name?: string
}

const AUTH_TOKEN_KEY = 'vibe_token'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    console.log('useAuth.fetchProfile token=', token)

    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      console.log('useAuth: calling /users/profile')
      const { data } = await api.get('/users/profile')
      console.log('useAuth: profile response=', data)
      setUser(data.data?.user ?? data.user ?? data)
    } catch {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setUser(null)
    window.location.href = '/login'
  }, [])

  return {
    user,
    loading,
    logout,
    refetch: fetchProfile,
  }
}