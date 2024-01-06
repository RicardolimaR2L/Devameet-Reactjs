import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RoomObjects } from './RoomObjects'
import copyIcon from '../../assets/images/copy.svg'
import emptyIcon from '../../assets/images/empty-list.svg'
import { Roomservices } from '../../services/RoomServices'

const roomServices = new Roomservices()

export const RoomHome = () => {
  const [objects, setObjects] = useState([])
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const { link } = useParams()

  const navigate = useNavigate()

  const getRoom = async () => {
    try {
      if (!link) {
        return navigate('/')
      }

      const result = await roomServices.getRoomByLink(link)

      if (!result || !result.data) {
        return
      }

      const { name, color, objects } = result.data

      setName(name)
      setColor(color)

      const newObjects = objects.map((o: any) => {
        return { ...o, type: o?.name?.split('_')[0] }
      })

      setObjects(newObjects)
    } catch (e) {
      console.log('Ocorreu erro ao Buscar dados da sala:', e)
    }
  }

  useEffect(() => {
    getRoom()
  }, [])

  const enterRoom = () => {}

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href) //copia o link par a barra de pesquisa
  }

  return (
    <>
      <div className="container-principal">
        <div className="container-room">
          {objects.length > 0 ? (
            <>
              <div className="resume">
                <div onClick={copyLink}>
                  <span>
                    <strong>Reunião </strong>
                    {link}
                  </span>
                  <img src={copyIcon} />
                </div>
                <p style={{ color }}> {name}</p>
              </div>
              <RoomObjects objects={objects} enterRoom={enterRoom} />
            </>
          ) : (
            <div className="empty">
              <img src={emptyIcon} alt="lista de reuniões" />
              <p>Reunião não encontrada :/</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
