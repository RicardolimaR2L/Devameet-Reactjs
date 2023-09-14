import { HttpApiServices } from './HttpApiServices'

export class MeetService extends HttpApiServices {
  baseUrl = '/meet'

  async getMeets() {
    return await this.get(this.baseUrl)
  }
}
