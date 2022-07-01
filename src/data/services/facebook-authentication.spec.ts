import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserByTokenApi: LoadFacebookUserByTokenApi
  ) {}

  async perfom (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserByTokenApi.loadUser(params)
  }
}

interface LoadFacebookUserByTokenApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}

class LoadFacebookUserSpy implements LoadFacebookUserByTokenApi {
  token?: string
  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token
  }
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookApi with correct values', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)
    await sut.perfom({ token: 'any_token' })
    expect(loadFacebookUserByTokenApi.token).toBe('any_token')
  })
})
