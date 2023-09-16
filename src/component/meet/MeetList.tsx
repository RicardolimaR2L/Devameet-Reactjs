import { useEffect, useState } from 'react'
import emptyIcon from '../../assets/images/empty-list.svg'
import { MeetService } from '../../services/MeetServices'
import { MeetListaItem } from './MeetListItem'

const meetService = new MeetService()

export const MeetList = () => {
  const [meets, setMeets] = useState([])

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
  const selectToRemove = () => {}
  
  useEffect(() => {
    getMeets()
  }, [])

  return (
    <>
      <div className="container-meet-list">
        {meets && meets.length > 0 ? (
          meets.map((meet: any) => (
            <MeetListaItem key={meet.id} meet={meet} selectToRemove={''} />
          ))
        ) : (
          <div className="empty">
            <img src={emptyIcon} alt="" />
            <p>Você ainda não possui reuniões criadas :(</p>
          </div>
        )}
      </div>
    </>
  )
}
