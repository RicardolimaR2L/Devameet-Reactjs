import thrashIcon from '../../assets/images/trash_object.svg'
import rightIcon from '../../assets/images/Rotate_right.svg'
import leftIcon from '../../assets/images/Rotate_left.svg'

type MeetObjectsRoomType = {
  objects?: []
}

export const MeetObjectsRoom: React.FC<MeetObjectsRoomType> = ({ objects }) => {
  const getImageFromObject = (object: any) => {
    if (object && object._id) {
      const path = `../../assets/objects/${object?.type}/${object.name}${
        object.orientation ? '_' + object.orientation : ''
      }.png`
      const imageUrl = new URL(path, import.meta.url)
      return imageUrl.href
    }
  }

  const getclassFromObject = (object: any) => {
    let style = '';
    switch (object.x) {
      case 0: {
        style += 'row-one '
        break
      }
      case 1: {
        style += 'row-two '
        break
      }
      case 2: {
        style += 'row-three '
        break
      }
      case 3: {
        style += 'row-four '
        break
      }
      case 4: {
        style += 'row-five '
        break
      }
      case 5: {
        style += 'row-six '
        break
      }
      case 6: {
        style += 'row-seven '
        break
      }

      default:
        break
    }
    switch (object.y) {
      case 0: {
        style += 'column-one '
        break
      }
      case 1: {
        style += 'column-two '
        break
      }
      case 2: {
        style += 'column-three '
        break
      }
      case 3: {
        style += 'column-four '
        break
      }
      case 4: {
        style += 'column-five '
        break
      }
      case 5: {
        style += 'column-six '
        break
      }
      case 6: {
        style += 'column-seven '
        break
      }

      default:
        break
    }
    return style
  }

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
            {objects?.map((object: any) => (
              <img
                key={object?._id}
                src={getImageFromObject(object)}
                className={getclassFromObject(object)}
              />
              // Parei de assistir a aula no minuto 7:00 meus objects estão sendo renderizado na tela mais fora do grid: verificar os etilos e o grid da edit meet
            ))}
          </div>
          <div className="actions">
            <div>
              <img src={thrashIcon} />
            </div>
            <div>
              <img src={rightIcon} />
            </div>
            <div>
              <img src={leftIcon} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
