import { MeetAddEditHeader } from './MeetAddEditHeader'
import trashIcon from '../../assets/images/trash_object.svg'
import rotateLeftIcon from '../../assets/images/Rotate_left.svg'
import rotateRightIcon from '../../assets/images/Rotate_right.svg'
import { useState } from 'react'

export const MeetAdd = () => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')

  return (
    <>
      <div className="container-principal">
        <div className="container-meet">
          <MeetAddEditHeader
            name={name}
            color={color}
            setName={setName}
            setColor={setColor}
          />
          <div className="actions">
            <span>Voltar</span>
            <button>Salvar</button>
          </div>
        </div>
        <div className="container-objects">
          <div className="center">
            <div className="grid">
              <div className="line row one" />
              <div className="line row two" />
              <div className="line row three" />
              <div className="line row four" />
              <div className="line row five" />
              <div className="line row six" />
              <div className="line row seven" />
              <div className="line column one" />
              <div className="line column two" />
              <div className="line column three" />
              <div className="line column four" />
              <div className="line column five" />
              <div className="line column six" />
              <div className="line column seven" />
            </div>
            <div className="actions">
              <div>
                <img src={trashIcon} alt="trash" />
              </div>
              <div>
                <img src={rotateRightIcon} alt="rotate-left" />
              </div>
              <div>
                <img src={rotateLeftIcon} alt="rotate-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
