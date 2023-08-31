import { Modal } from 'react-bootstrap'
import { useState } from 'react'

import avatarIcon from '../../assets/images/avatar.svg'
import avatar01 from '../../assets/objects/avatar/avatar_01_front.png'

export const AvatarInput = () => {
  const [showModal, setShowModal] = useState(false)

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
                <div className="container-avatar">
                  <img src={avatar01} />
                </div>
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
