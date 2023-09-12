import { HttpApiServices } from './HttpApiServices'

export class LoginServices extends HttpApiServices {
  async login(body: any, setToken: any) {
    const { data } = await this.post('/auth/login', body)
    if (data) {
      localStorage.setItem('email', data.email)
      localStorage.setItem('token', data.token)
      setToken(data.token)

      const userReponse = await this.get('/user')
      if (userReponse && userReponse.data) {
        const user = userReponse.data

        localStorage.setItem('id', user.id)
        localStorage.setItem('name', user.name)

        if (user.avatar) {
          localStorage.setItem('avatar', user.avatar)
        }
      }
      setToken(data.token)
    }
  }
  logout(setToken: any) {
    // Deleta todos os dados do usuário no localStorage incluindo o token de autenticação, isso encerra a sessão do usuário.
    localStorage.clear()
    setToken('')
  }
}
