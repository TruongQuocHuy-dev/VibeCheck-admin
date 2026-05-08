import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Skeleton } from '../ui/Skeleton'

type ProtectedRouteProps = {
  allowedRoles?: Array<'admin' | 'user'>
  redirectTo?: string
}

export function ProtectedRoute({ allowedRoles, redirectTo = '/login' }: ProtectedRouteProps) {
  const location = useLocation()
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-[1.75rem] border border-background-muted bg-background-card p-6 shadow-2xl shadow-black/30">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="mt-4 h-8 w-3/4 rounded-2xl" />
          <Skeleton className="mt-3 h-4 w-full rounded-full" />
          <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  if (allowedRoles && !allowedRoles.some((role) => role === user.role)) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}