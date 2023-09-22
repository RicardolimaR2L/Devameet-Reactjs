import { MeetAddEditHeader } from './MeetAddEditHeader'
import trashIcon from '../../assets/images/trash_object.svg'
import rotateLeftIcon from '../../assets/images/Rotate_left.svg'
import rotateRightIcon from '../../assets/images/Rotate_right.svg'

export const MeetAdd = () => {
  return (
    <>
      <div className="container-principal">
        <div className="container-meet">
          <MeetAddEditHeader />
        </div>
        <div className="container-objects">
          <div className="center">
            <div className="grid"></div>
            <div className="actions">
              <div>
                <img src={trashIcon} alt="trash" />
              </div>
              <div>
                <img src={rotateRightIcon} alt="rotate-left" />
              </div>
              <div>
                <img src={rotateLeftIcon} alt="rotate-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
