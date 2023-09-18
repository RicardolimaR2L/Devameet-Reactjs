import arrowIcon from "../../assets/images/arrow_down_color.svg"

export const MeetAddEditHeader = () => {
  return (
    <>
      <div className="container-user-header">
        <span>Nova reunião</span>
        <div>
          <input type="text" placeholder="Digite o nome da sua reunião" />
          <div className="color-select">
            <div className="circle">
              <img src={arrowIcon} alt="Selecionar cor"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
