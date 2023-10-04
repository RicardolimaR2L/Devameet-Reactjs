import arrowIcon from '../../assets/images/arrow_down_color.svg'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'

type MeetAddEditHeaderProps = {
  name: string
  setName(s: string): void
  color: string
  setColor(s: string): void
}

export const MeetAddEditHeader: React.FC<MeetAddEditHeaderProps> = ({
  name,
  color,
  setName,
  setColor
}) => {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const cancelSelection = () => {
    setSelected(null)
    setShowModal(false)
  }

  const colors = [
    '#25CBD3',
    '#3BD32D',
    '#F0F5FF',
    '#A7FAE9',
    '#D44231',
    '#DADADA',
    '#B0A4FF',
    '#5E49FF'
  ]

  const selectColor = () => {
    if (selected) {
      setColor(selected)
    }
    setShowModal(false)
  }
  
  return (
    <>
      <div className="container-user-header">
        <span>Nova reunião</span>
        <div>
          <input
            type="text"
            placeholder="Digite o nome de sua reunião"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="color-select" onClick={() => setShowModal(true)}>
            <div
              className="circle"
               style={{ backgroundColor: color }} />
            
            <img src={arrowIcon} alt="Selecionar cor" />
          </div>
        </div>
        <Modal
               show={showModal}
               onHide={() => setShowModal(false)}
               className="container-modal">
      
          <Modal.Body>
            <div className="content">
              <div className="container">
                <span>Selecione a cor da reunião</span>
                <div className="colors">
                  {colors?.map(c => (
                    <div
                      className={c === selected ? 'selected' : ''}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelected(c)}
                      onDoubleClick={selectColor}
                    />
                  ))}
                </div>
              </div>
              <div className="actions">
                <span onClick={cancelSelection}>Cancelar</span>
                <button onClick={selectColor}> Confirmar </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
