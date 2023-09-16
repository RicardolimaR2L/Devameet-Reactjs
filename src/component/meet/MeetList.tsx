import { useEffect, useState } from 'react'
import emptyIcon from '../../assets/images/empty-list.svg'
import { MeetService } from '../../services/MeetServices'
import { MeetListaItem } from './MeetListItem'

import { Modal } from 'react-bootstrap'

const meetService = new MeetService();

export const MeetList = () => {
  const [meets, setMeets] = useState([]);
  const [showModal, setShowModal] = useState(false);


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
  const selectToRemove = (id:string) => {//Seleciona a reunião a ser excluída.
    setShowModal(true)
  }

  useEffect(() => {
    getMeets()
  }, [])

  const  closeModal=() =>{
    setShowModal(false)
  }

  return (
    <>
      <div className="container-meet-list">
        {meets && meets.length > 0 ? (
          meets.map((meet: any) => (
            <MeetListaItem key={meet.id} meet={meet} selectToRemove={selectToRemove} />
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
      onhide={()=>setShowModal(false)}
      className="container-modal ">
      <Modal.Body>
        <div className='content'>
          <div className='container'>
          <span>Deletar reunião</span>
          <p>Deseja deletar a reunião?</p>
          <p>Essa ação não poderá ser desfeita.</p>
          </div>
          <div className='actions'>
          <span onClick={closeModal}>Cancelar</span>
          <button type='button'> Confirmar </button>
          </div>

        </div>
      </Modal.Body>
      </Modal>
    </>
  )
}
