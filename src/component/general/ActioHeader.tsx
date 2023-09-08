import { useNavigate } from "react-router-dom"

export const ActioHeader = () => {

  const navigate = useNavigate();
  const goback=()=>{
    navigate(-1);
  }

  return (
    <>
      <div className="container-action-header">
    <span
    onClick={goback}
    >Cancelar</span>
      </div>
    </>
  )
}
