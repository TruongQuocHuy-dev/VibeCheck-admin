import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'

export function ProtectedAdminRoute() {
  const location = useLocation()
  const { user, isLoading } = useAuth()

  console.log('ProtectedAdminRoute user=', user, 'loading=', isLoading)

  if (isLoading) return null

  if (!user || (user.role !== 'admin' && user.role !== 'mod')) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  return <Outlet />
}