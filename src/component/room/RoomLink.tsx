import { PublicInput } from '../general/PublicInput'
import { MeetUserHeader } from '../meet/MeetUserHeader'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import chainIcon from '../../assets/images/chain_link.svg'

export const RoomLink = () => {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const navigateToRoom = () => {
    setError('')
    if (link && link.length >= 8) {
      return navigate('/room/' + link)
    }
    setError('Link inválido, por favor verifique!')
  }

  return (
    <>
      <div className="container-principal">
        <div className="container-meet link">
          <MeetUserHeader isLink={true} />
          {error && <p className="error">{error}</p>}
          <PublicInput
            icon={chainIcon}
            type={'text'}
            alt="link"
            name="Informe o link da reunião para entrar "
            modelValue={link}
            setValue={setLink}
          />

          <button onClick={navigateToRoom}>Entrar</button>
        </div>
      </div>
    </>
  )
}
