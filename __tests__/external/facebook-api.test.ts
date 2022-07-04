import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('facebook Api Integration Tests', () => {
  let sut: FacebookApi
  let axioClient: AxiosHttpClient
  beforeEach(() => {
    axioClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axioClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a facebook user if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: env.facebookApi.accessTokenInTestMode })
    expect(fbUser).toEqual({
      facebookId: '100139682770806',
      email: 'gerry_sgxlsjq_teste@tfbnw.net',
      name: 'Gerry Teste'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid_token' })
    expect(fbUser).toBeUndefined()
  })
})
