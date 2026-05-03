import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'

export function ProtectedAdminRoute() {
  const location = useLocation()
  const { user, loading } = useAuth()

  console.log('ProtectedAdminRoute user=', user, 'loading=', loading)

  if (loading) return null

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