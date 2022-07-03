import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { mock } from 'jest-mock-extended'

class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor (
    private readonly httpclient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    await this.httpclient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })
  }
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}

export interface HttpGetClient {
  get: (params: HttpGetClient.Params) => any
}

describe('FacebookApi', () => {
  const clientId = 'any_client_id'
  const clientSecret = 'any_client_secret'

  it('should get app token ', async () => {
    const httClient = mock<HttpGetClient>()
    const sut = new FacebookApi(httClient, clientId, clientSecret)
    await sut.loadUser({ token: 'any_client_token' })
    expect(httClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
  })
})
