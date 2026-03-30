import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { PrivateRoute } from './PrivateRoute'
import LoginPage from '@/pages/Login'
import DashboardPage from '@/pages/Dashboard'
import TransferPage from '@/pages/Transfer'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'transfer',
            element: <TransferPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ],
  },
])
