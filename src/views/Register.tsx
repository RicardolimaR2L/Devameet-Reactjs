import logo from '../assets/images/logo.svg'
import userIcon from '../assets/images/logo.svg'
import emailIcom from '../assets/images/mail.svg'
import passwordIcon from '../assets/images/key.svg'

import { PublicInput } from '../component/general/PublicInput'

export const Register = () => {
  return (
    <>
      <div className="container-Public">
        <img src={logo} alt="logo devameet" className="logo" />
        <form>
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
            <a href=""> Faça seu login agora</a>
          </div>
        </form>
      </div>
    </>
  )
}
