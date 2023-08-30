import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' //
import './assets/styles/global.scss'
import { router } from './router' //importação do arquivo index.tsx que é onde temos as rotas

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />{' '}
    {/* Componente do  react-router-dom efetua a troca de tela de acordo com a rota vinda do aquivo router */}
  </React.StrictMode>
)
