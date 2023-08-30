import { Modal } from 'react-bootstrap'
import { useState } from 'react'

import avatarIcon from '../../assets/images/avatar.svg'

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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <div>

            
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
