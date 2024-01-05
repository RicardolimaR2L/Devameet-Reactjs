import { HttpApiServices } from './HttpApiServices'

export class Roomservices extends HttpApiServices {
  getRoomByLink(link: string) {
    return this.get('/room/' + link)
  }
}
