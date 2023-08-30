import { PublicInput } from '../component/general/PublicInput'
import { Link } from 'react-router-dom'

import logo from '../assets/images/logo.svg'
import avatar from '../assets/images/avatar.svg'
import userIcon from '../assets/images/user.svg'
import emailIcom from '../assets/images/mail.svg'
import passwordIcon from '../assets/images/key.svg'

export const Register = () => {
  return (
    <>
      <div className="container-public register">
        <img src={logo} alt="logo devameet" className="logo" />
        <form>
        <img src={avatar} alt=" avatar" className="avatar" />
    
          <p className="error"> Favor preencher os campos</p>
          <PublicInput
            icon={userIcon}
            name="Nome"
            alt="Nome"
            modelValue={''}
            type="text"
            setValue={() => {}}
          />
          <PublicInput
            icon={emailIcom}
            name="Email"
            alt="Email"
            modelValue={''}
            type="email"
            setValue={() => {}}
          />
          <PublicInput
            icon={passwordIcon}
            name="Senha"
            alt="Senha"
            modelValue={''}
            type="password"
            setValue={() => {}}
          />
          <PublicInput
            icon={passwordIcon}
            name="Confirme a senha"
            alt="Confirme a Senha"
            modelValue={''}
            type="password"
            setValue={() => {}}
          />
          <button type="button">
            {/* {loading ? '...Carregando' : 'Login'} */}
            cadastrar
          </button>
          <div className="link">
            <p> Já possui uma conta?</p>
            <Link to="/"> Faça seu cadastro agora</Link>
          </div>
        </form>
      </div>
    </>
  )
}
