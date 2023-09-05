import { createContext, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { getRouter } from './router'

export const AuthorizeContext = createContext<any>(null) //contexto criado fora dos commponentes pra que possamos armazenar o estado da aplicação

export const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  return (
    <AuthorizeContext.Provider
      value={{
        token,
        setToken
      }}
    >
      <RouterProvider router={getRouter(token)} />
    </AuthorizeContext.Provider>
  )
}
