import { PublicInput } from '../component/general/PublicInput'
import { AvatarInput } from '../component/general/Avatarinput'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import logo from '../assets/images/logo.svg'
import userIcon from '../assets/images/user.svg'
import emailIcom from '../assets/images/mail.svg'
import passwordIcon from '../assets/images/key.svg'

export const Register = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')

  const doRegister = async () => {
    try {
      setError('')
      if (
        !image 
        || image.trim().length < 1 
        || !name || name.trim().length < 2
        || !email || email.trim().length < 5
        || !password || password.trim().length < 4
        || !confirm || confirm.trim().length < 4
      ) {
        return setError('Favor preencher os campos corretamente.')
      }

      if(password !== confirm){
        
        return setError('Senha e confirmação não são iguais.')
      }
      setLoading(false)
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
            setValue={() => {
              setName
            }}
          />
          <PublicInput
            icon={emailIcom}
            name="Email"
            alt="Email"
            modelValue={email}
            type="email"
            setValue={() => {
              setEmail
            }}
          />
          <PublicInput
            icon={passwordIcon}
            name="Senha"
            alt="Senha"
            modelValue={password}
            type="password"
            setValue={() => {
              setPassword
            }}
          />
          <PublicInput
            icon={passwordIcon}
            name="Confirme a senha"
            alt="Confirme a Senha"
            modelValue={confirm}
            type="password"
            setValue={() => {
              setConfirm
            }}
          />
          <button type="button" disabled={loading}>
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
