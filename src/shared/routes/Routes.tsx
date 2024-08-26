import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '../../features/user-authentication/containers/login/Login'
import Register from '../../features/user-authentication/containers/register/Register'
import Forgot from '../../features/user-authentication/containers/forgot/Forgot'

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