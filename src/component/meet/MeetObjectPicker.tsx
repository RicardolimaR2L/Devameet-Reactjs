import { useState } from 'react'
import downIcon from '../../assets/images/arrow_down_object.svg'
import rightIcon from '../../assets/images/arrow_right_object.svg'
import addIcon from '../../assets/images/plus-circle.svg'

type MeetObjectPickerType = {
  image: string
  label: string
  asset: any
  selected: string
  setObject(s: any): void
}

export const MeetObjectPicker: React.FC<MeetObjectPickerType> = ({
  image,
  label,
  asset,
  selected,
  setObject
}) => {
  const [show, setShow] = useState(false)

  const getImageFromObject = (object: string) => {
    if (typeof object === "string" && object.trim().length > 0) {
      const path = `../../assets/objects/${asset.path}/${object}${
        asset.canRotate ? "_front" : ""
      }.png`;
      const imgUrl = new URL(path, import.meta.url);
      return imgUrl.href;
    }
  };

  const selectObject = (object: any) => {
    const objectFinal = {
      name: object.name,
      x: asset.defaultXPosition,
      y: asset.defaultYPosition,
      width: object.width,
      height: object.height,
      zIndex: asset.defaultZIndex,
      orientation: asset.canRotate? 'front' : '',
      type: asset.path,
      flexStart: asset.flexStart,
      selectMultiple: asset.selectMultiple,
      canWalkOver: asset?.canWalkOver
    }
    console.log(objectFinal.canWalkOver)
    setObject(objectFinal);
  }

  return (
    <div className="container-object-picker">
      <div className="action" onClick={() => setShow(!show)}>
        <img src={image} alt={label} />
        <span>{label}</span>
        {!show ? <img src={downIcon} /> : <img src={rightIcon} />}
      </div>
      {show && (
        <div className="objects">
          {asset?.objects?.map((o: any) => (
            <div
              key={o}
              className={o === selected ? 'selected' : ''}
              onClick={() => selectObject(o)}
            >
              <img
                className={
                  'object ' +
                  (asset.path === 'wall' || asset.path === 'couch'
                  ? 'large'
                  : '')
                }
                src={getImageFromObject(o.name)}
              />
              <img src={addIcon} className="add" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
