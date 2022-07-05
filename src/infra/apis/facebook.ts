import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { HttpGetClient } from '@/infra/http'

type AppToken = {
  access_token: string
}

type DebugToken = {
  data: {
    user_id: string
  }
}

type UserInfo = {
  id: string
  name: string
  email: string
}

type Params = LoadFacebookUserApi.Params
type Result = LoadFacebookUserApi.Result

export class FacebookApi implements LoadFacebookUserApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor (
    private readonly httpclient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) { }

  private async getAppToken (): Promise<AppToken> {
    return await this.httpclient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })
  }

  private async getDebugToken (clientToken: string): Promise<DebugToken> {
    const appToken = await this.getAppToken()
    return await this.httpclient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken.access_token,
        input_token: clientToken
      }
    })
  }

  private async getUserInfo (clientToken: string): Promise<UserInfo> {
    const debugToken = await this.getDebugToken(clientToken)
    return await this.httpclient.get({
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: clientToken
      }
    })
  }

  async loadUser ({ token }: Params): Promise<Result> {
    return await this.getUserInfo(token)
      .then(({ id, name, email }) => ({ facebookId: id, name, email }))
      .catch(() => undefined)
  }
}
