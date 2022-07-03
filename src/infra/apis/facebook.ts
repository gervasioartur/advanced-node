import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { HttpGetClient } from '../http'

export class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor (
    private readonly httpclient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    const appToekn = await this.httpclient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })

    const debugToken = await this.httpclient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToekn.access_token,
        input_token: params.token
      }
    })

    await this.httpclient.get({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: params.token
      }
    })
  }
}
