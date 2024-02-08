import copyIcon from '../../assets/images/copy.svg'
import emptyIcon from '../../assets/images/empty-list.svg'
import UpArrowIcon from '../../assets/images/up_Arrow.svg'
import downArrowIcon from '../../assets/images/down_Arrow.svg'
import leftArrowIcon from '../../assets/images/left_Arrow.svg'
import rightArrowIcon from '../../assets/images/right_Arrow.svg'

import { useNavigate, useParams } from 'react-router-dom'
import { RoomObjects } from './RoomObjects'
import { useEffect, useState } from 'react'
import { Roomservices } from '../../services/RoomServices'
import { createPeerConnectionContext } from '../../services/WebSocketsServices'

const roomServices = new Roomservices()

const wsServices = createPeerConnectionContext()

export const RoomHome = () => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [objects, setObjects] = useState([])
  const [connectedUsers, setConnectedUsers] = useState([])
  const [me, setMe] = useState<any>({})
  const { link } = useParams()

  const userId = localStorage.getItem('id') || ''
  const mobile = window.innerWidth <= 992
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

  const enterRoom = () => {
    if (!link || !userId) {
      return navigate('/')
    }
    wsServices.joinRoom(link, userId)
    wsServices.onUpdateUserList(async (users: any) => {
      if (users) {
        setConnectedUsers(users)
        localStorage.setItem('connectedUsers', JSON.stringify(users));
        const me = users.find((u: any) => u.user === userId)
        if (me) {
          setMe(me)
          localStorage.setItem('me', JSON.stringify(me))
        }
      }
    });

    wsServices.onRemoveUser((socketId: any) => {
      const connectedStr = localStorage.getItem('connectedUsers') || ''
      const connectedUsers = JSON.parse(connectedStr)
      const filtered = connectedUsers?.filter(
        (u: any) => u.clientId !== socketId
      )
      setConnectedUsers(filtered);
    })
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href) //copia o link para a barra de pesquisa
  }
  const toogleMute = () => {

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
              <RoomObjects
                objects={objects}
                enterRoom={enterRoom}
                connectedUsers={connectedUsers}
                me={me}
                toogleMute={toogleMute}
              />
              {mobile && me?.user &&
                <div className='movement'>
                  <div className='button' onClick={() => { }}>
                    <img src={UpArrowIcon} alt=" Andar para cima " />
                  </div>
                  <div className='line'>
                    <div className='button' onClick={() => { }}>
                      <img src={leftArrowIcon} alt=" Andar para esquerda " />
                    </div>
                    <div className='button' onClick={() => { }}>
                      <img src={downArrowIcon} alt=" Andar para baixo " />
                    </div>
                    <div className='button' onClick={() => { }}>
                      <img src={rightArrowIcon} alt=" Andar para direita" />
                    </div>

                  </div>

                </div>
              }
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
