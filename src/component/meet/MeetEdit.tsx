import { useState } from 'react'
import { MeetAddEditHeader } from './MeetAddEditHeader'
import { MeetObjectPicker } from './MeetObjectPicker'
import { useNavigate } from 'react-router-dom'
import wallIcon from '../../assets/images/wall.svg'
import floorIcon from '../../assets/images/floor.svg'
import rugIcon from '../../assets/images/rug.svg'
import tableIcon from '../../assets/images/table.svg'
import chairIcon from '../../assets/images/chair.svg'
import couchIcon from '../../assets/images/couch.svg'
import decorIcon from '../../assets/images/decor.svg'
import natureIcon from '../../assets/images/nature.svg'
import objectsJson from '../../assets/objects/objects.json'
import { MeetObjectsRoom } from './MeetobjectsRoom'

export const MeetEdit = () => {
  const [index, setIndex] = useState(0)
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [selected, setSelected] = useState<any>({})
  const [objects, setObjects] = useState<any>([])

  const isFormInvalid = true

  const setObject = (object: any) => {
    //chamada do objectFinal já montado
    const newIndex = index + 1
    object._id = newIndex
    setIndex(newIndex)
    if (object.selectMultiple === true) {
      //verifica se o objectFinal pode ser multiplo ou não.
      const newArray = [...objects, object]
      setObjects(newArray)
    } else {
      const filtered = objects.filter((o: any) => o.type !== object.type) //caso ele seja único cai aqui e só monta um objeto.
      filtered.push(object)
      setObjects(filtered)
    }

    setSelected(object) //passamos o name para que o objeto selecionado substitua o objeto anterior da mesma categoria
  }

  const removeObject =(object:any)=>{
    const filtered = objects.filter((o: any) => o._id !== object._id);
    setObjects(filtered)
    setSelected(null)
  }
  

  const navigate = useNavigate()
  const goBack = () => {
    return navigate(-1)
  }

  return (
    <div className="container-principal">
      <div className="container-meet">
        <MeetAddEditHeader
          name={name}
          setName={setName}
          color={color}
          setColor={setColor}
          isEdit={true}
        />
        <div className="scroll">
          <MeetObjectPicker
            image={wallIcon}
            label={'Paredes'}
            asset={objectsJson.wall}
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            image={floorIcon}
            label={'Pisos'}
            asset={objectsJson.floor}
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            image={rugIcon}
            label={'Tapetes'}
            asset={objectsJson.rug}
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            image={tableIcon}
            label={'Mesas'}
            asset={objectsJson.table}
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            image={chairIcon}
            label={'Cadeiras'}
            asset={objectsJson.chair}
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            image={couchIcon}
            label={'Sofás'}
            asset={objectsJson.couch}
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            image={decorIcon}
            label={'Decorações'}
            asset={objectsJson.decor}
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            image={natureIcon}
            label={'Plantas'}
            asset={objectsJson.nature}
            selected={selected?.name}
            setObject={setObject}
          />
        </div>
        <div className="form">
          <span onClick={goBack}>Voltar</span>
          <button
            disabled={isFormInvalid}
            className={isFormInvalid ? 'disabled' : ''}
          >
            Salvar
          </button>
        </div>
      </div>
      <MeetObjectsRoom  
      objects={objects} 
      selected={selected}
      setSelected={setSelected}
      removeObject={removeObject}
      />
    </div>
  )
}
