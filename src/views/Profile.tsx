import { Header } from '../component/general/Header'
import { Footer } from '../component/general/Footer'
import { ActioHeader } from '../component/general/ActioHeader'
import { AvatarInput } from '../component/general/Avatarinput'
import { useState } from 'react'
import clearIcon from '../assets/images/clear.svg'
import logoutIcon from '../assets/images/logout.svg'

export const Profile = () => {
  const [image, setImage] = useState('')
  const [avatar, setAvatar] = useState('')

  return (
    <>
      <Header />
      <div className="container-profile">
        <ActioHeader />
        <AvatarInput image={image} setImage={setImage} />
        <div className="input">
          <span>Nome</span>
          <input type="text" placeholder="Infomre seu nome" />
          <img src={clearIcon} alt="LImpar" />
        </div>
        <div className="logout">
          <div>
            <img src={logoutIcon} alt=" Sair" />
            <span>Sair</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
