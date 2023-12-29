import roomIcon from '../../assets/images/room.svg'
import copyIcon from '../../assets/images/copy.svg'
import editIcon from '../../assets/images/edit.svg'
import thrashIcon from '../../assets/images/trash-2.svg'

import { useNavigate } from 'react-router-dom'

type MeetListaItemProps = {
  meet: any
  selected: string
  selectMeet(meet: any): void
  selectToRemove(id: string): void //void em selectToRemove indica que a função não retorna valor, apenas executa uma ação.
}

export const MeetListaItem: React.FC<MeetListaItemProps> = ({
  meet,
  selectToRemove,
  selectMeet,
  selected
}) => {
  const mobile = window.innerWidth <= 992

  const navigate = useNavigate()

  const goToRoom = () => {
    navigate('/room/' + meet?.link)
  }
  const goToEdit = () => {
    navigate('/edit/' + meet?.id)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window?.location?.href + 'room/' + meet?.link) //Acessa o navegador e copia a url em que estamos, adiciona o ROOM concatenando com o link do meet caso ele exista.
  }

  return (
    <>
      <div className="container-meet-list-item">
        <div className="meet" onClick={() => selectMeet(meet)}>
          <div className="color" style={{ backgroundColor: meet?.color }}></div>
          <span className={selected === meet?.id ? 'selected' : ''}>
            {meet?.name}
          </span>
        </div>
        <div className="action">
          {mobile && (
            <img src={roomIcon} alt="Entrar na reunião" onClick={goToRoom} />
          )}
          <img src={copyIcon} alt="Copiar link da reunião" onClick={copyLink} />
          {!mobile && (
            <img src={editIcon} alt="Editar reunião" onClick={goToEdit} />
          )}
          <img
            src={thrashIcon}
            alt="Deletar reunião"
            onClick={() => selectToRemove(meet?.id)}
          />
        </div>
      </div>
    </>
  )
}
