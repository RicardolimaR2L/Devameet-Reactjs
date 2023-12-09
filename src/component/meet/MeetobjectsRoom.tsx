import thrashIcon from '../../assets/images/trash_object.svg'
import rightIcon from '../../assets/images/Rotate_right.svg'
import leftIcon from '../../assets/images/Rotate_left.svg'

export const MeetObjectsRoom = () => {
  return (
    <>
      <div className="container-objects">
        <div className="center">
          <div className="grid">
            <div className="line row one" />
            <div className="line row two" />
            <div className="line row three" />
            <div className="line row four" />
            <div className="line row five" />
            <div className="line row six" />
            <div className="line row seven" />
            <div className="line column one" />
            <div className="line column two" />
            <div className="line column three" />
            <div className="line column four" />
            <div className="line column five" />
            <div className="line column six" />
            <div className="line column seven" />
          </div>
          <div className="actions">
                    <div>
                        <img src={thrashIcon}/>
                    </div>
                    <div >
                        <img src={rightIcon}/>
                    </div>
                    <div >
                        <img src={leftIcon}/>
                    </div>
                </div>
        </div>
      </div>
    </>
  )
}
