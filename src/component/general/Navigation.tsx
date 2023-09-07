import homeIcon from '../../assets/images/home.svg'
import linkIcon from '../../assets/images/link.svg'
import homeActiveIcon from '../../assets/images/home_active.svg'
import linkActiveIcon from '../../assets/images/link_active.svg'
import avatarIcon from '../../assets/images/avatar.svg'
import { useLocation, useNavigate } from 'react-router-dom'

export const Navigation = () => {

  const navigate = useNavigate()
  const location = useLocation() //Hook que nos retorna a url em que estamos.

  const mobile = window.innerWidth <= 992;// atribiu um tamanho máximo para ser considerado mobile.

  const avatarImage = ()=>{ //função para pegar o avatar que o usuario escolheu.
    const avatar = localStorage.getItem('avatar'); //pega a imagem do localStorage.
    if(avatar){ 
      const path = `../../assets/objects/avatar/${avatar}_front.png` // path é o caminho de onde vem a imagem, aqui estamos fazendo a interpolação com a variavél avatar para pegar a imagem correta de acordo com o descrito no localStorage.
      const imageUrl = new URL(path, import.meta.url); //pega o caminho e a importação e converte para uma nova url, isso vai trazer a imagem
      return imageUrl.href
    }
    return avatarIcon //Se não tivermos um avatar selecionado pelo usuário, retorna somente a imagem de avatar padrão.
   }

  const getIcon = (name: string) => {
    switch (name) {
      case 'home':
        if (location.pathname !== '/user' && 
            location.pathname !== '/link' &&
            location.pathname !== '/room'
          ) {
          return homeActiveIcon
        }
        return homeIcon
      case 'room':
        if (location.pathname === '/room' || 
            location.pathname === '/link') {
          return linkActiveIcon
        }
        return linkIcon
        default:
          return'';
    }
  }

  const getSelectedClass = ()=>{
    if(location.pathname === '/user'){
      return 'selected';
    }
    return'';
  }
  return <>

      <div className="container-navigation">
        <ul>
          <li>
            <img
              src={getIcon('home')}
              alt="MInhas reuniões"
              className="iconeNav"
              onClick={() => navigate('/')}
            />
          </li>
              {mobile ?  <li> {/* if para decidir como será renderizado o icone de entra na reunião , no mobile com click, no desktop sem click.*/}
            <img
              src={getIcon('room')}
              alt="Entrar na reunião"
              className="iconeNav"
              onClick={() => navigate('/link')}
            />
          </li> : 
          
          <li className='disabled'>
            <img
              src={getIcon('room')}
              alt="Entrar na reunião"
              className="iconeNav"
            />
          </li>
          }

          <li>
            <div className={"avatar mini " + getSelectedClass()} >
              <img
                src={avatarImage()} //Aqui ocorre a chamada função para atualizar o avatar do usuário no menu de navegação.
                alt="Editar usuário"
                onClick={() => navigate('/user')}
              />
            </div>
          </li>
        </ul>
      </div>
  </>
}
