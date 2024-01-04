import { useState } from 'react'
import { useParams } from 'react-router-dom'

import emptyIcon from '../../assets/images/empty-list.svg'
import copyIcon from '../../assets/images/copy.svg'
import { RoomObjects } from './RoomObjects'

export const RoomHome = () => {
  const [objects, setObjects] = useState([])

  const { link } = useParams()
  const enterRoom = () => {}

  return (
    <>
      <div className="container-principal">
        <div className="conatiner-room">
          {objects.length > 0 ? (
            <>
              (
              <div className="resume">
                <div>
                  <span>
                    <strong>Reunião</strong>
                    {link}
                  </span>
                  <img src={copyIcon} />
                </div>
                <p>Reunião teste</p>
              </div>
              <RoomObjects objects={objects} enterRoom={enterRoom} />)
            </>
          ) : (
            <div className="empty">
              <img src={emptyIcon} alt="lista de reuniões" />
              <p>Reunião não encontrada</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
