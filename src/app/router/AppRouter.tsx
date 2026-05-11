import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../../features/auth'
import { AdminDashboardPage } from '../../features/dashboard'
import { ProtectedAdminRoute } from './ProtectedAdminRoute'
import { PublicRoute } from './PublicRoute'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
