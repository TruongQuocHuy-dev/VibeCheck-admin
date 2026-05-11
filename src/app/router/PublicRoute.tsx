import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'

export function PublicRoute() {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) return null

  if (isAuthenticated && user) {
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}
