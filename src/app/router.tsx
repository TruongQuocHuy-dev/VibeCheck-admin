import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layout'
import { ProtectedRoute } from '../shared/components/ProtectedRoute'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { UserListPage } from '../features/user/pages/UserListPage'
import { VibeModerationPage } from '../features/vibe'
import { StoryModerationPage } from '../features/story'
import { BlacklistPage } from '../features/moderation'
import { ReportManagementPage } from '../features/report'
import { AnalyticsPage } from '../features/analytics'
import { SettingsPage } from '../features/settings'
import { CMSPages } from '../features/cms'

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
          {
            path: 'vibes',
            element: <VibeModerationPage />,
          },
          {
            path: 'stories',
            element: <StoryModerationPage />,
          },
          {
            path: 'blacklist',
            element: <BlacklistPage />,
          },
          {
            path: 'reports',
            element: <ReportManagementPage />,
          },
          {
            path: 'analytics',
            element: <AnalyticsPage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
          {
            path: 'cms',
            element: <CMSPages />,
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