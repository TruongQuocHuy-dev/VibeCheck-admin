import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layout'
import { ProtectedRoute } from '../shared/components/ProtectedRoute'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { UserListPage } from '../features/user/pages/UserListPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute allowedRoles={['admin', 'mod']} />,
    children: [
      {
        path: '/admin',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'users',
            element: <UserListPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/admin" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/admin" replace />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}