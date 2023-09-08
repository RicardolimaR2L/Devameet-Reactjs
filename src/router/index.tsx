import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../views/Login'
import { Home } from '../views/Home'
import { Register } from '../views/Register'
import { Profile } from '../views/Profile'

export const getRouter = (token: string) => {
  if (!token) {
    return createBrowserRouter([
      {
        path: '*',
        id: 'login',
        element: <Login />
      },
      {
        path: '/Register',
        id: 'Resister',
        element: <Register />
      }
    ])
  } else {
    return createBrowserRouter([
      {
        path: '*',
        id: 'home',
        element: <Home />
      },
      {
        path: '/user',
        id: 'user',
        element: <Profile/>
      }
    
    ])


  }
}
