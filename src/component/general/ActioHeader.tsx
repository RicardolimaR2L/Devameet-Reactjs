import { useNavigate } from 'react-router-dom'

export const ActioHeader = () => {
  const navigate = useNavigate()  //Hook navigate do React-router-dom, que possiblita a navegaçaõ entre páginas.

  const goback = () => {
    navigate(-1) //comando para voltar uma página.
  }

  return (
    <>
      <div className="container-action-header">
        <span onClick={goback}>Cancelar</span>
        <strong>Editar Perfil</strong>
        <span className="principal">Concluir</span>
      </div>
    </>
  )
}
