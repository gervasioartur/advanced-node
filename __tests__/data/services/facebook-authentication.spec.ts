import { AuthenticationError } from '@/domain/errors'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
class LoadFacebookUserSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookApi with correct values', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)
    await sut.perfom({ token: 'any_token' })
    expect(loadFacebookUserByTokenApi.token).toBe('any_token')
  })

  it('should return authentication error when LoadFacebookApi returns undefined', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserSpy()
    loadFacebookUserByTokenApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)
    const authResult = await sut.perfom({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
