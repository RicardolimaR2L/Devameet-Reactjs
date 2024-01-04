import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../views/Login'
import { Home } from '../views/Home'
import { Register } from '../views/Register'
import { Profile } from '../views/Profile'
import { MeetAddView } from '../views/MeetAdd'
import { MeetEditView } from '../views/MeettEditView'
import { LinkView } from '../views/Link'
import { RoomView } from '../views/Room'

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
    const router = [
      {
        path: '*',
        id: 'home',
        element: <Home />
      },
      {
        path: '/user',
        id: 'user',
        element: <Profile />
      },
      {
        path: '/room/:link',
        id: 'room',
        element: <RoomView />
      }
    ]

    const mobile = window.innerWidth <= 992

    if (!mobile) {
      //Verifica se é mobile, se não for adiciona a rota de criação de salas.
      router.push({
        path: '/add',
        id: 'add',
        element: <MeetAddView />
      })
      router.push({
        path: '/edit/:meetId',
        id: 'edit',
        element: <MeetEditView />
      })
    } else {
      router.push({
        path: '/link',
        id: 'edit',
        element: <LinkView />
      })
    }
    return createBrowserRouter(router)
  }
}
