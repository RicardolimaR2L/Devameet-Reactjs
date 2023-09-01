import { PublicInput } from '../component/general/PublicInput'
import { AvatarInput } from '../component/general/Avatarinput'
import { Link } from 'react-router-dom'
import { useState } from 'react';

import logo from '../assets/images/logo.svg'
import userIcon from '../assets/images/user.svg'
import emailIcom from '../assets/images/mail.svg'
import passwordIcon from '../assets/images/key.svg'

export const Register = () => {

  const [image, setImage]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <>
      <div className="container-public register">
        <img src={logo} alt="logo devameet" className="logo" />
        <form>
          <AvatarInput
          image={image}
          setImage={setImage}
          
          
          />
          { error && <p className="error">{error}</p>}
          <PublicInput
            icon={userIcon}
            name="Nome"
            alt="Nome"
            modelValue={name}
            type="text"
            setValue={() => {setName}}
          />
          <PublicInput
            icon={emailIcom}
            name="Email"
            alt="Email"
            modelValue={email}
            type="email"
            setValue={() => {setEmail}}
          />
          <PublicInput
            icon={passwordIcon}
            name="Senha"
            alt="Senha"
            modelValue={password}
            type="password"
            setValue={() => {setPassword}}
          />
          <PublicInput
            icon={passwordIcon}
            name="Confirme a senha"
            alt="Confirme a Senha"
            modelValue={confirm}
            type="password"
            setValue={() => {setConfirm}}
          />
          <button type='button' disabled={loading} > {loading ? '...Loading' : 'Cadastrar' }</button>
          <div className="link">
            <p> Já possui uma conta?</p>
            <Link to="/"> Faça seu login agora</Link>
          </div>
        </form>
      </div>
    </>
  )
}
