import { Header } from '../component/general/Header'
import { Footer } from '../component/general/Footer'
import { ActioHeader } from '../component/general/ActioHeader'
import { AvatarInput } from '../component/general/Avatarinput'
import { useState, useContext } from 'react'

import clearIcon from '../assets/images/clear.svg'
import logoutIcon from '../assets/images/logout.svg'
import { LoginServices } from '../services/LoginServices'
import { useNavigate } from 'react-router-dom'
import { AuthorizeContext } from '../App'
import { UserServices } from '../services/UserServices'

const loginServices = new LoginServices()
const userServices = new UserServices()

export const Profile = () => {
  const navigate = useNavigate()
  const { SetToken } = useContext(AuthorizeContext)

  const [name, setName] = useState(localStorage.getItem('name') || '') //State está pegando o nome do usuário no localStorage a mostrando na tela.
  const [image, setImage] = useState(localStorage.getItem('avatar') || '') //State está pegando o Avatar do usuário no localStorage a mostrando na tela.

  const mobile = window.innerWidth <= 992 //Variavel que defini o tamanho para ser o mobile.

  const finishUpdate = async() => {
    try{
        if(!name || name.trim().length < 2){
          alert('coloca o nome do boneco')
            return;
        }

        const body = { name } as any;

        if(image){
            body.avatar = image;
        }

        await userServices.update(body);

        localStorage.setItem('name', name);

        if(image){
            localStorage.setItem('avatar', image);
        }

        return navigate(-1);
    }catch(e:any){
        if(e?.response?.data?.message){
            console.log('Ocorreu erro ao atualizar dados do usuário:', e?.response?.data?.message);
        }else{
            console.log('Ocorreu erro ao atualizar dados do usuário:', e);
        }
    }
}
    const logout = async () => {
      loginServices.logout(SetToken) // SetToken: Função que é usada para atualizar o token de autorização no contexto de autenticação da aplicação.
      navigate('/')
    }
    return (
      <>
        {!mobile && <Header />}
        <div className="container-profile">
          <ActioHeader actionCallBack={finishUpdate} disabled={!name}/> {/*vaio deixar o botão de concluir desabilitado se o nome naoestiver preenchido no input*/}
          <AvatarInput image={image} setImage={setImage} />
          <div className="input">
            <div>
              <span>Nome</span>
              <input
                type="text"
                placeholder="Informe seu nome"
                value={name}
                onChange={e => setName(e.target.value)} // Captura de clique ou evento e atualiza o valor do input na tela.
              />
              {name && (
                <img src={clearIcon} alt="LImpar" onClick={() => setName('')} />
              )}
              {/* onclick para limpar o nome que esta sendo escrito, o icone de limpar o input só vai ser exibido caso tenha algum valor no input. */}
            </div>
          </div>
          <div className="logout">
            <div onClick={logout}>
              <img src={logoutIcon} alt=" Sair" />
              <span>Sair</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

