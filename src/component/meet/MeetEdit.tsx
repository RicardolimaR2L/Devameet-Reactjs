import { useState } from 'react'
import { MeetAddEditHeader } from './MeetAddEditHeader'

export const MeetEdit = () => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const isFormInvalid = true


  return (
    <div className="container-principal">
      <div className="container-meet">
        <MeetAddEditHeader
          name={name}
          setName={setName}
          color={color}
          setColor={setColor}
          isEdit={true}
        />
        <div className="form">
          <span>Voltar</span>
          <button
            disabled={isFormInvalid}
            className={isFormInvalid ? 'disabled' : ''}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
