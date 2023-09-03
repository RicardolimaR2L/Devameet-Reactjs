import { RouterProvider } from 'react-router-dom'
import { getRouter } from './router'
import { useState } from 'react'

export const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  return <RouterProvider router={getRouter(token)} />
}
