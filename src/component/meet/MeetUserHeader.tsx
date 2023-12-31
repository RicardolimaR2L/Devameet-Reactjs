import { useNavigate } from 'react-router-dom'
import addIcon from '../../assets/images/add.svg'

type meetUserHeaderProps = {
  isLink?: boolean
}

export const MeetUserHeader: React.FC<meetUserHeaderProps> = ({ isLink }) => {
  const navigate = useNavigate()
  const mobile = window.innerWidth <= 992
  const name = localStorage.getItem('name') || '' //Adiciona o nome do usuário logado ao cabeçalho de reuniões

  const navigateToAdd = () => {
    navigate('/add')
  }

  return (
    <>
      <div className="container-user-header">
        <span>{isLink ? 'Reunião' : 'Minhas reuniões'}</span>
        <div>
          <p>Olá, {name} </p>
          {!mobile && (
            <img
              src={addIcon}
              alt="Adicionar Reunião"
              onClick={navigateToAdd}
            />
          )}
        </div>
      </div>
    </>
  )
}
