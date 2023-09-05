import logo from '../../assets/images/logo.svg'
import homeIcon from '../../assets/images/home.svg'
import linkIcon from '../../assets/images/link.svg'
import avatarIcon from '../../assets/images/avatar.svg'

export const Header = () => {
  return (
    <div className="container-header">
      <img src={logo} alt="logo Devameet" className="logo" />
      <div className="container-navigation">
        <ul>
          <li>
            <img src={homeIcon} alt="MInhas reuniões" />
          </li>

          <li>
            <img src={linkIcon} alt="Entrar na reunião" />
          </li>

          <li>
            <div className="avatar mini">
              <img src={avatarIcon} alt="Editar usuário" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
