import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '../../features/user-authentication/containers/login/Login'
import Register from '../../features/user-authentication/containers/register/Register'
import Forgot from '../../features/user-authentication/containers/forgot/Forgot'
import NewFeeds from '../../features/new-feeds/containers/new-feeds/NewFeeds'
import Group from '../../features/group/containers/group/Group'
import GroupDetail from '../../features/group/containers/detail-group/DetailGroup'

const Routes = () => {

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgot',
      element: <Forgot />
    },
    {
      path: '/new-feeds',
      element: <NewFeeds />
    },
    {
      path: '/groups',
      element: <Group />
    },
    {
      path: '/groups/:groupName', 
      element: <GroupDetail/> // Protect this route
    }
  ]

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element:<Navigate to="/login" />
    },
  ]

  // Combine routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default Routes