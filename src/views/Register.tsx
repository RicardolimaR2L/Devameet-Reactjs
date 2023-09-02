import { PublicInput } from '../component/general/PublicInput'
import { AvatarInput } from '../component/general/Avatarinput'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import logo from '../assets/images/logo.svg'
import userIcon from '../assets/images/user.svg'
import emailIcom from '../assets/images/mail.svg'
import passwordIcon from '../assets/images/key.svg'
import { RegisterServices } from '../services/RegisterServices'

const registerServices = new RegisterServices()

export const Register = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')


  const navigate = useNavigate();// Hook do react-router-dom para fazer direcionamento de páginas.

  const doRegister = async () => {
    try {
      setError('')
      if ( //Validações do formulário
        !image ||
        image.trim().length < 1 ||
        !name ||
        name.trim().length < 2 ||
        !email ||
        email.trim().length < 5 ||
        !password ||
        password.trim().length < 4 ||
        !confirm ||
        confirm.trim().length < 4
      ) {
        return setError('Favor preencher os campos corretamente.')
      }
      if (password !== confirm) { 
        return setError('Senha e confirmação não são iguais.')
      }

      setLoading(true)

      const body = { //Variável que identifica os dados do formúlario.
        name,
        email,
        password,
        avatar: image
      }

      await registerServices.register(body)
      setLoading(false)
      return navigate('/?success=true')//Retorna para o login após efetuar o cadastro com sucesso.
    } catch (e: any) {
      console.log('Erro ao efetuar login:', e)
      setLoading(false)
      if (e?.response?.data?.message) {
        return setError(e?.response?.data?.message)
      }
      return setError('Erro ao efetuar cadastro, tente novamente')
    }
  }

  return (
    <>
      <div className="container-public register">
        <img src={logo} alt="logo devameet" className="logo" />
        <form>
          <AvatarInput image={image} setImage={setImage} />
          {error && <p className="error">{error}</p>}
          <PublicInput
            icon={userIcon}
            name="Nome"
            alt="Nome"
            modelValue={name}
            type="text"
            setValue={setName}
          />
          <PublicInput
            icon={emailIcom}
            name="Email"
            alt="Email"
            modelValue={email}
            type="email"
            setValue={setEmail}
          />
          <PublicInput
            icon={passwordIcon}
            name="Senha"
            alt="Senha"
            modelValue={password}
            type="password"
            setValue={setPassword}
          />
          <PublicInput
            icon={passwordIcon}
            name="Confirme a senha"
            alt="Confirme a Senha"
            modelValue={confirm}
            type="password"
            setValue={setConfirm}
          />
          <button type="button" onClick={doRegister} disabled={loading}>
            {' '}
            {loading ? '...Loading' : 'Cadastrar'}
          </button>
          <div className="link">
            <p> Já possui uma conta?</p>
            <Link to="/"> Faça seu login agora</Link>
          </div>
        </form>
      </div>
    </>
  )
}
