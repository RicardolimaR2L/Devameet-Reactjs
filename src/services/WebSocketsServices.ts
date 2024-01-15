import { io } from 'socket.io-client'

class PeerConnectionSession {
  _userId: any
  _room: any
  socket: any
  constructor(socket: any) {
    this.socket = socket
  }

  joinRoom(link: string, userId: String) {
    this._room = link
    this._userId = userId
    this.socket.emit('join', { link, userId }) //emit() envia informações
  }

  onUpdateUserList(callback: any) {
    this.socket.on(`${this._room}-update-user-list`, ({ users }: any) => {
      //.on recebe as informações atualizadas da da
      callback(users)
    })
  }

  onRemoveUser(callback: any) {
    this.socket.on(`${this._room}-remove-user`),
      ({ socketId }: any) => {
        callback(socketId)
      }
  }
}

export const createPeerConnectionContext = () => {
  const { VITE_PUBLIC_WS_URL } = import.meta.env

  const socket = io(VITE_PUBLIC_WS_URL)
  return new PeerConnectionSession(socket)
}
