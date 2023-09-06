import logo from '../../assets/images/logo.svg'
import homeIcon from '../../assets/images/home.svg'
import linkIcon from '../../assets/images/link.svg'
import homeActiveIcon from '../../assets/images/home_active.svg'
import linkActiveIcon from '../../assets/images/link_active.svg'
import avatarIcon from '../../assets/images/avatar.svg'
import { useLocation, useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation() //Hook que nos retorna a url em que estamos

  const getIcon = (name: string) => {
    switch (name) {
      case 'home':
        if (location.pathname !== '/user' && 
            location.pathname !== '/link' &&
            location.pathname !== '/room'
          ) {
          return homeActiveIcon
        }
        return homeIcon
      case 'room':
        if (location.pathname === '/room' || 
            location.pathname === '/link') {
          return linkActiveIcon
        }
        return linkIcon
        default:
          return'';
    }
  }

  const getSelectedClass = ()=>{
    if(location.pathname === '/user'){
      return 'selected';
    }
    return'';
  }



  return (
    <div className="container-header">
      <img src={logo} alt="logo Devameet" className="logo" />
      <div className="container-navigation">
        <ul>
          <li>
            <img
              src={getIcon('home')}
              alt="MInhas reuniões"
              className="iconeNav"
              onClick={() => navigate('/')}
            />
          </li>

          <li>
            <img
              src={getIcon('room')}
              alt="Entrar na reunião"
              className="iconeNav"
              onClick={() => navigate('/link')}
            />
          </li>

          <li>
            <div className={"avatar mini " + getSelectedClass()} >
              <img
                src={avatarIcon}
                alt="Editar usuário"
                onClick={() => navigate('/user')}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
