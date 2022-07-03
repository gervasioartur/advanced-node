import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { mock } from 'jest-mock-extended'

class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor (
    private readonly httpclient: HttpGetClient
  ) {}

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    await this.httpclient.get({ url: `${this.baseUrl}/oauth/access_token` })
  }
}

export namespace HttpGetClient {
  export type Params = {
    url: string
  }
}

export interface HttpGetClient {
  get: (params: HttpGetClient.Params) => any
}

describe('FacebookApi', () => {
  it('should get app token ', async () => {
    const httClient = mock<HttpGetClient>()
    const sut = new FacebookApi(httClient)
    await sut.loadUser({ token: 'any_client_token' })
    expect(httClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token'
    })
  })
})
