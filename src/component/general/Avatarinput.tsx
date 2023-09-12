import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import avatarIcon from '../../assets/images/avatar.svg'

type AvatarInputProps = {
  image: string
  setImage(s: string): void
}

export const AvatarInput: React.FC<AvatarInputProps> = ({
  image,
  setImage
}) => {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState('')

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

  const avatarImage = () => {
    if (image && image.trim().length > 0) {
      const path = `../../assets/objects/avatar/${image}_front.png`
      const imageUrl = new URL(path, import.meta.url)
      return imageUrl.href
    }
    return avatarIcon
  }

  const getAvatarUrl = (avatar: string) => {
    const path = `../../assets/objects/avatar/${avatar}_front.png` // Caminho que especifica a localização da imagem com base na variável "avatar"
    const imageUrl = new URL(path, import.meta.url) // Cria uma nova URL com base no caminho da imagem e na URL do módulo atual
    return imageUrl.href // Retorna a URL completa da imagem
  }
  const submitAvatar = () => {
    if (selected) {
      setImage(selected)
    }
    setShowModal(false)
  }

  return (
    <>
      <div
        className="container-upload-image"
        onClick={() => setShowModal(true)}
      >
        <div className="avatar">
          <img src={avatarImage()} />
        </div>
          <span>Alterar avatar</span>
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
                {avatars.map((avatar: any) => (
                  <div
                    className={
                      'container-avatar ' +
                      (avatar.value === selected ? 'selected' : '') 
                    }
                    onClick={() => setSelected(avatar.value)}
                    onDoubleClick={() => { //seleciona a imagem com doubleClick
                      getAvatarUrl(avatar.value)//Captura imagem a ser utilizada  
                      submitAvatar()//utiliza a imagem seleciona como o avatar
                      setShowModal(false)// fecha o modal ao finalizar a seleção da imagem
                    }}

                    key={avatar.value}
                  >
                    <img src={getAvatarUrl(avatar.value)} />
                  </div>
                ))}
              </div>
            </div>
            <div className="actions">
              <span onClick={() => setShowModal(false)}>Voltar</span>
              <button type="button" onClick={submitAvatar}>
                Salvar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
