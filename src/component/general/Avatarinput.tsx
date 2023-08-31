import { Modal } from 'react-bootstrap'
import { useState } from 'react'

import avatarIcon from '../../assets/images/avatar.svg'
//import avatar01 from '../../assets/objects/avatar/avatar_01_front.png'

export const AvatarInput = () => {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(false)

  const avatars = [
    { value: 'avatar_01' },
    { value: 'avatar_02' },
    { value: 'avatar_03' },
    { value: 'avatar_04' },
    { value: 'avatar_05' },
    { value: 'avatar_06' },
    { value: 'avatar_07' },
    { value: 'avatar_08' },
    { value: 'avatar_09' }
  ]

  const getAvatarUrl = (avatar: string) => {
    const path = `../../assets/objects/avatar/${avatar}_front.png`; // Caminho que especifica a localização da imagem com base na variável "avatar"
    const imageUrl = new URL(path, import.meta.url); // Cria uma nova URL com base no caminho da imagem e na URL do módulo atual
    return imageUrl.href; // Retorna a URL completa da imagem
}


  return (
    <>
      <div
        className="Container-upload-image"
        onClick={() => setShowModal(true)}
      >
        <div className="avatar">
          <img src={avatarIcon} alt=" avatar" className="avatar" />
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="container-modal"
      >
        <Modal.Body>
          <div className="content">
            <p>Avatar</p>
            <span>Selecione seu avatar</span>
            <div className="line" />
            <div className="avatars-scroll">
              <div className="avatars">
               {avatars.map((avatar: any) =>
               <div className={'container-avatar'} key={avatar.value}>
                <img src={getAvatarUrl(avatar.value)}/>

               </div>
               
               )}
              </div>
            </div>
            <div className="actions">
              <span onClick={() => setShowModal(false)}>Voltar</span>
              <button>Salvar</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
