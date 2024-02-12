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
  const [me, setMe] = useState<any>({});
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


  useEffect(() => {
  document.addEventListener('keyup', (event:any)=> domovement(event));
  
  return()=>{
    document.removeEventListener('keyup', (event:any)=> domovement(event));
  }

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

  const toggleMute = () => {
    const payload = {
      userId,
      link,
      muted: !me.muted
    }
    wsServices.updateUserMute(payload);
  }

  const domovement = (event: any) => {
    const meStr = localStorage.getItem('me') || '';
    const user = JSON.parse(meStr);
    if (event && user) {
      const payload = {
        userId,
        link
      } as any;
      switch (event.key) {
        case 'ArrowUp':
          payload.x = user.x;
          payload.orientation = 'back';
          if (user.orientation === 'back') {
            payload.y = user.y > 1 ? user.y - 1 : 1;
          } else {
            payload.y = user.y;
          }
          break;
        case 'ArrowDown':
          payload.x = user.x;
          payload.orientation = 'front';
          if (user.orientation === 'front') {
            payload.y = user.y < 7 ? user.y + 1 : 7;
          } else {
            payload.y = user.y;
          }
          break;
        case 'ArrowLeft':
          payload.y = user.y;
          payload.orientation = 'left';
          if (user.orientation === 'left') {
            payload.x = user.x > 0 ? user.x - 1 : 0;
          } else {
            payload.x = user.x;
          }
          break;
        case 'ArrowRight':
          payload.y = user.y;
          payload.orientation = 'right';
          if (user.orientation === 'right') {
            payload.x = user.x < 7 ? user.x + 1 : 7;
          } else {
            payload.x = user.x;
          }
          break;
        default: break;
      }
      if (payload.x >= 0 && payload.y >= 0 && payload.orientation) {
        wsServices.updateUserMovement(payload);
      }
    }
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
                toggleMute={toggleMute}
              />
              {mobile && me?.user &&
                <div className='movement'>
                  <div className='button' onClick={() => domovement({ key: 'ArrowUp' })}>
                    <img src={UpArrowIcon} alt=" Andar para cima " />
                  </div>
                  <div className='line'>
                    <div className='button' onClick={() => domovement({ key: 'ArrowLeft' })}>
                      <img src={leftArrowIcon} alt=" Andar para esquerda " />
                    </div>
                    <div className='button' onClick={() => domovement({ key: 'ArrowDown' })}>
                      <img src={downArrowIcon} alt=" Andar para baixo " />
                    </div>
                    <div className='button' onClick={() => domovement({ key: 'ArrowRight' })}>
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
