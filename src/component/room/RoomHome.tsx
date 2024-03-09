import copyIcon from '../../assets/images/copy.svg'
import emptyIcon from '../../assets/images/empty-list.svg'
import UpArrowIcon from '../../assets/images/up_Arrow.svg'
import downArrowIcon from '../../assets/images/down_Arrow.svg'
import leftArrowIcon from '../../assets/images/left_Arrow.svg'
import rightArrowIcon from '../../assets/images/right_Arrow.svg'
import camOnIcon from '../../assets/images/cameraOn.png'
import camOffIcon from '../../assets/images/cameraOff.png'

import { useNavigate, useParams } from 'react-router-dom'
import { RoomObjects } from './RoomObjects'
import { useEffect, useState } from 'react'
import { RoomServices } from '../../services/RoomServices'
import { createPeerConnectionContext } from '../../services/WebSocketsServices'
import Modal from 'react-bootstrap/esm/Modal'

const roomServices = new RoomServices()
const wsServices = createPeerConnectionContext()

let userMediastream: any;

export const RoomHome = () => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [objects, setObjects] = useState([])
  const [connectedUsers, setConnectedUsers] = useState([])
  const [me, setMe] = useState<any>({});
  const { link } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [cantWalk, setCantWalk] = useState<any>([]);


  const userId = localStorage.getItem('id') || ''
  const mobile = window.innerWidth <= 992
  const navigate = useNavigate()
  const [cameraOn, setCameraOn] = useState(true);//Controla o estado da câmera, se ela fica ligada ou não. 


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

      const devices = await navigator.mediaDevices.enumerateDevices();
      const camera = devices.some(device => device.kind === 'videoinput');
      if (!camera) {
        console.log('Não foi detectada uma câmera.');
      }

      userMediastream = await navigator?.mediaDevices?.getUserMedia({
        video: {
          width: { min: 640, ideal: 1280 },
          height: { min: 400, ideal: 1080 },
          aspectRatio: { ideal: 1.777 }
        },
        audio: true
      });
      if (document.getElementById('localVideoRef')) {
        const videoRef: any = document.getElementById('localVideoRef')
        videoRef.srcObject = userMediastream;
      }


    } catch (e) {
      console.log('Ocorreu erro ao Buscar dados da sala:', e)
    }
  }
  const cantWalkOver = () => {
    let coordinates: any[] = [];

    objects.map((o: any) => {
      if (o.canWalkOver === false) {
        let width = o.width;
        let height = o.height;

        let y = o.y;
        let x = o.x;
        for (width; width > 0; width--) {
          for (height; height > 0; height--) {
            coordinates.push([x, y]);
            y++;
          }
          y = o.y;
          height = o.height;
          x++;
        }
      }
    });
    setCantWalk([coordinates]);
  };
  useEffect(() => {
    getRoom()
  }, [])

  useEffect(() => {
    document.addEventListener('keyup', (event: any) => doMovement(event));

    return () => {
      document.removeEventListener('keyup', (event: any) => doMovement(event));
    }

  }, [cantWalk]);


  const toggleCamera = async () => {
    if (cameraOn) {
      await disableCamera();
    } else {
      await enableCamera();
    }
    setCameraOn(prevState => !prevState);
  };

  const enableCamera = async () => { //Ativa a câmera
    try {
      if (userMediastream) {
        userMediastream.getTracks().forEach((track: { kind: string; enabled: boolean }) => {// Percorre cada uma das tracks existentes
          if (track.kind === 'video') { // Verifica se a track é de video e converte para true, assim a câmera é ligada
            track.enabled = true;
          }
        });
      }
    } catch (error) {
      console.error('Ocorreu um erro ao ligar câmera', error);
    }
  };


  const disableCamera = async () => {// Desativa a câmera
    try {
      if (userMediastream) {
        userMediastream.getTracks().forEach((track: { kind: string; enabled: boolean }) => {// Percorre cada uma das tracks existentes
          if (track.kind === 'video') {// Verifica se a track é de video e converte para false, assim a câmera é desligada
            track.enabled = false;
          }
        });
      }
    } catch (error) {
      console.error('Ocorreu um erro ao desligar câmera', error);
    }
  };



  const enterRoom = () => {
    if (!userMediastream) {
      return setShowModal(true)
    }

    if (!link || !userId) {
      return navigate('/')
    }
    wsServices.joinRoom(link, userId)
    wsServices.onCallMade();//recebe a ligação
    wsServices.onUpdateUserList(async (users: any) => {
      if (users) {
        setConnectedUsers(users)
        localStorage.setItem('connectedUsers', JSON.stringify(users));
        const me = users.find((u: any) => u.user === userId)
        if (me) {
          setMe(me)
          localStorage.setItem('me', JSON.stringify(me))
        }
        const usersWithoutMe = users.filter((u: any) => u.user !== userId) //captura todos os usuários com id diferente do meu 
        for (const user of usersWithoutMe) {
          wsServices.addPeerConnection(user.clientId, userMediastream, (_stream: any) => {
            if (document.getElementById(user.clientId)) {
              const videoRef: any = document.getElementById(user.clientId);
              videoRef.srcObject = _stream;
            }
          })
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
      wsServices.removePeerConnection(socketId);
    });

    wsServices.onAddUser((user: any) => {

      console.log('onAddUser', user);

      wsServices.addPeerConnection(user, userMediastream, (_stream: any) => {

        if (document.getElementById(user)) {
          const videoRef: any = document.getElementById(user);
          videoRef.srcObject = _stream;

        }
      });

      wsServices.callUser(user);
    });

    wsServices.onAnswerMade((socket: any) => wsServices.callUser(socket));
    cantWalkOver();
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
  const doMovement = (event: any) => {
    const meStr = localStorage.getItem("me") || "";
    const user = JSON.parse(meStr);


    if (event && user) {
      const payload = {
        userId,
        link,
      } as any;

      switch (event.key) {
        case "ArrowUp": {
          if (cantWalk[0]) {
            payload.x = user.x;
            payload.orientation = "back";
            if (user.orientation === "back") {
              payload.y = user.y > 1 ? user.y - 1 : 1;
            } else {
              payload.y = user.y;
            }
            cantWalk[0].map(((o: any) => {
              if (o[0] === payload.x && o[1] === payload.y) {
                payload.x = user.x;
                payload.y = user.y
              }
            }))
          }
          break;

        }

        case "ArrowDown": {
          if (cantWalk[0]) {
            payload.x = user.x;
            payload.orientation = "front";
            if (user.orientation === "front") {
              payload.y = user.y < 7 ? user.y + 1 : 7;
            } else {
              payload.y = user.y;
            }
            cantWalk[0].map(((o: any) => {
              if (o[0] === payload.x && o[1] === payload.y) {
                payload.x = user.x;
                payload.y = user.y
              }
            }))
          }
          break;
        }

        case "ArrowLeft": {
          if (cantWalk[0]) {
            payload.y = user.y;
            payload.orientation = "left";
            if (user.orientation === "left") {
              payload.x = user.x > 0 ? user.x - 1 : 0;
            } else {
              payload.x = user.x;
            }
            console.log(cantWalk[0])
            cantWalk[0].map(((o: any) => {
              if (o[0] === payload.x && o[1] === payload.y) {
                payload.x = user.x;
                payload.y = user.y
              }
            }))
          }
          break;
        }

        case "ArrowRight": {
          payload.y = user.y;
          if (cantWalk[0]) {
            payload.orientation = "right";
            if (user.orientation === "right") {
              payload.x = user.x < 7 ? user.x + 1 : 7;
            } else {
              payload.x = user.x;
            }
            cantWalk[0].map(((o: any) => {
              if (o[0] === payload.x && o[1] === payload.y) {
                payload.x = user.x;
                payload.y = user.y
              }
            }))
          }

          break;
        }

        default:
          break;
      }

      if (payload.x >= 0 && payload.y >= 0 && payload.orientation) {
        wsServices.updateUserMovement(payload);
      }
    }
  };
  const getUsersWithoutMe = () => {
    return connectedUsers.filter((u: any) => u.user !== userId)
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
                <>
                  <div className='streams'>
                    <div className='allUsersVideo'>
                      <>
                        {mobile ? (
                          <>
                            <audio id='localVideoRef' playsInline autoPlay muted />
                            {getUsersWithoutMe().map((user: any) =>
                              <audio key={user.clientId} id={user.clientId} playsInline autoPlay muted={user?.muted} />
                            )}
                          </>
                        ) : (
                          <div className="usersStreams">
                            {getUsersWithoutMe().map((user: { clientId: string; muted: boolean }) => (
                              <div className='usersVideoContainer' key={user.clientId}>
                                <video
                                  className='usersVideo '
                                  width={150}
                                  key={user.clientId}
                                  id={user.clientId}
                                  playsInline
                                  autoPlay
                                  muted={user?.muted}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    </div>

                    <div className='meStream'>
                      {mobile ? (
                        <>
                          <audio id='localVideoRef' playsInline autoPlay muted />
                          {getUsersWithoutMe().map((user: any) =>
                            <audio key={user.clientId} id={user.clientId} playsInline autoPlay muted={user?.muted} />
                          )}
                        </>
                      ) : (
                        <div className='video-container'>
                          <video id='localVideoRef' playsInline autoPlay muted />
                          {getUsersWithoutMe().map((user: any) =>
                            <audio key={user.clientId} id={user.clientId} playsInline autoPlay muted={user?.muted} />
                          )}
                          <div className='toggle-camera' onClick={toggleCamera}>
                            {cameraOn ? <img src={camOnIcon} alt="Câmera ligada" /> : <img src={camOffIcon} alt="Câmera desligada" />}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
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
                  <div className='button' onClick={() => doMovement({ key: 'ArrowUp' })}>
                    <img src={UpArrowIcon} alt=" Andar para cima " />
                  </div>
                  <div className='line'>
                    <div className='button' onClick={() => doMovement({ key: 'ArrowLeft' })}>
                      <img src={leftArrowIcon} alt=" Andar para esquerda " />
                    </div>
                    <div className='button' onClick={() => doMovement({ key: 'ArrowDown' })}>
                      <img src={downArrowIcon} alt=" Andar para baixo " />
                    </div>
                    <div className='button' onClick={() => doMovement({ key: 'ArrowRight' })}>
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
      </div >
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="container-modal"
      >
        <Modal.Body>
          <div className="content">
            <div className="container">
              <p>Aviso!</p>
              <span>Habilite a permissão de áudio e video para participar das reuniões</span>
            </div>
            <div className="actions">
              <button onClick={() => setShowModal(false)}> Ok</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>



  )
}
