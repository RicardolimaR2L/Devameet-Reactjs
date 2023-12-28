import { useEffect, useState } from 'react'
import emptyIcon from '../../assets/images/empty-list.svg'
import { MeetServices } from '../../services/MeetServices'
import { MeetListaItem } from './MeetListItem'

import { Modal } from 'react-bootstrap'

const meetService = new MeetServices()

export const MeetList = () => {
  const [meets, setMeets] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<string | null>(null) // Começa como nulo, porém aceita string ou nulo.

  const getMeets = async () => {
    try {
      const result = await meetService.getMeets()
      if (result?.data) {
        setMeets(result?.data)
      }
    } catch (e) {
      console.log('Ocorreu erro ao listar reuniões', e)
    }
  }
  const selectToRemove = (id: string) => {
    //Seleciona a reunião a ser excluída.
    setSelected(id) //seleciona o id da reunião
    setShowModal(true)
  }

  const cancelSelection = () => {
    setSelected(null)
    setShowModal(false)
  }

  useEffect(() => {
    getMeets()
  }, [])

  const removeMeet = async () => {
    try {
      if (!selected) {
        return
      }
      await meetService.deleteMeet(selected)
      await getMeets()
      cancelSelection()
    } catch (e) {
      console.log('Ocorreu erro ao excluir reuniões', e)
    }
  }

  return (
    <>
      <div className="container-meet-list">
        {meets && meets.length > 0 ? (
          meets.map((meet: any) => (
            <MeetListaItem
              key={meet.id}
              meet={meet}
              selectToRemove={selectToRemove}
            />
          ))
        ) : (
          <div className="empty">
            <img src={emptyIcon} alt="" />
            <p>Você ainda não possui reuniões criadas :(</p>
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onhide={() => setShowModal(false)}
        className="container-modal "
      >
        <Modal.Body>
          <div className="content">
            <div className="container">
              <span>Deletar reunião</span>
              <p>Deseja deletar a reunião?</p>
              <p>Essa ação não poderá ser desfeita.</p>
            </div>
            <div className="actions">
              <span onClick={cancelSelection}>Cancelar</span>
              <button type="button" onClick={removeMeet}>
                {' '}
                Confirmar{' '}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
