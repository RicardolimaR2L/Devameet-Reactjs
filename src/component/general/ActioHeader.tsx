import { useNavigate } from 'react-router-dom'

type ActioHeaderProps = {
  actionCallBack(): void,
  disabled:boolean;
}

export const ActioHeader: React.FC<ActioHeaderProps> = ({ actionCallBack, disabled }) => {
  const navigate = useNavigate() //Hook navigate do React-router-dom, que possiblita a navegaçaõ entre páginas.

  const goback = () => {
    navigate(-1) //comando para voltar uma página.
  }

  return (
    <>
      <div className="container-action-header">
        <span onClick={goback}>Cancelar</span>
        <strong>Editar Perfil</strong>
        {disabled ? <span className='disabled'> Concluir </span> : <span className="principal" onClick={actionCallBack}>Concluir </span>}
        {/*Desabilita o Concluir caso o nome não esteja preenchido.*/}
      </div>
    </>
  )
}
